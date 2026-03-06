const LaporBencana = require("../models/LaporBencanaModel.js");
const DokumentasiLaporan = require("../models/DokumentasiLaporanModel.js");
const { Op } = require("sequelize");
const fs = require("fs");
const { getImageUrl } = require("../config/env.js");

// ==================== GENERATE TICKET ====================
const generateTicket = async () => {
    const year = new Date().getFullYear();
    const lastLaporan = await LaporBencana.findOne({
        where: { nomor_tiket: { [Op.like]: `LAP-${year}-%` } },
        order: [["id", "DESC"]],
    });
    let nextNumber = 1;
    if (lastLaporan) {
        const parts = lastLaporan.nomor_tiket.split("-");
        nextNumber = parseInt(parts[2]) + 1;
    }
    return `LAP-${year}-${String(nextNumber).padStart(6, "0")}`;
};

// ==================== WHATSAPP NOTIFICATION ====================
const sendWhatsAppNotification = async (laporan, imageUrl = null) => {
    const token = process.env.WA_TOKEN;
    const target = process.env.WA_TARGET;

    if (!token || !target) {
        console.log("⚠️  WA_TOKEN atau WA_TARGET belum diset di .env, notifikasi WhatsApp dilewati.");
        return;
    }

    // Build dampak section
    const dampakList = [];
    if (laporan.korban_meninggal > 0) dampakList.push(`☠️ Meninggal: ${laporan.korban_meninggal}`);
    if (laporan.korban_luka > 0) dampakList.push(`🤕 Luka-luka: ${laporan.korban_luka}`);
    if (laporan.korban_hilang > 0) dampakList.push(`❓ Hilang: ${laporan.korban_hilang}`);
    if (laporan.pengungsi > 0) dampakList.push(`🏕️ Pengungsi: ${laporan.pengungsi}`);
    if (laporan.rumah_rusak > 0) dampakList.push(`🏠 Rumah rusak: ${laporan.rumah_rusak}`);
    if (laporan.jalan_rusak > 0) dampakList.push(`🛣️ Jalan rusak: ${laporan.jalan_rusak}`);
    if (laporan.jembatan_rusak > 0) dampakList.push(`🌉 Jembatan rusak: ${laporan.jembatan_rusak}`);
    if (laporan.fasilitas_umum_rusak > 0) dampakList.push(`🏢 Fas. umum rusak: ${laporan.fasilitas_umum_rusak}`);
    if (laporan.sekolah_terdampak > 0) dampakList.push(`🏫 Sekolah terdampak: ${laporan.sekolah_terdampak}`);
    if (laporan.dampak_lainnya) dampakList.push(`📝 Lainnya: ${laporan.dampak_lainnya.substring(0, 150)}`);

    const dampakText = dampakList.length > 0
        ? `\n⚠️ *DAMPAK:*\n${dampakList.join('\n')}`
        : '';

    const message = `📢 *LAPORAN BENCANA BARU*

🎫 Tiket: *${laporan.nomor_tiket}*
🔥 Jenis: *${laporan.jenis_kejadian}*
📍 Lokasi: ${laporan.alamat_lokasi || '-'}
🕐 Waktu: ${laporan.tanggal_kejadian} ${laporan.jam_kejadian}

👤 Pelapor: ${laporan.nama_pelapor}
📱 HP: ${laporan.no_hp}

📌 Koordinat: ${laporan.latitude}, ${laporan.longitude}
${dampakText}

📝 Kronologi: ${laporan.kronologi ? laporan.kronologi.substring(0, 200) : '-'}`;

    try {
        const bodyParams = {
            target: target,
            message: message,
        };
        // Kirim foto dokumentasi pertama jika ada
        if (imageUrl) {
            bodyParams.url = imageUrl;
            bodyParams.filename = 'dokumentasi.jpg';
        }

        const response = await fetch("https://api.fonnte.com/send", {
            method: "POST",
            headers: {
                "Authorization": token,
            },
            body: new URLSearchParams(bodyParams),
        });
        const result = await response.json();
        console.log("✅ WhatsApp notification result:", JSON.stringify(result));
    } catch (error) {
        console.error("❌ WhatsApp notification failed:", error.message);
    }
};

// ==================== VALIDASI HP ====================
const isValidPhone = (phone) => {
    // Format Indonesia: 08xx, +628xx, 628xx (10-15 digit)
    const cleaned = phone.replace(/[\s\-\(\)]/g, "");
    return /^(\+62|62|0)8[1-9][0-9]{7,11}$/.test(cleaned);
};

// ==================== PUBLIC: SUBMIT LAPORAN ====================
const postLaporan = async (req, res) => {
    const {
        jenis_kejadian, tanggal_kejadian, jam_kejadian, kronologi,
        latitude, longitude, alamat_lokasi,
        korban_meninggal, korban_luka, korban_hilang, pengungsi,
        rumah_rusak, jalan_rusak, jembatan_rusak, fasilitas_umum_rusak, sekolah_terdampak,
        dampak_lainnya,
        nama_pelapor, no_hp, email, bersedia_dihubungi
    } = req.body;

    // Validasi wajib
    if (!jenis_kejadian || !tanggal_kejadian || !nama_pelapor || !no_hp) {
        return res.status(422).json({ message: "Jenis kejadian, tanggal, nama pelapor, dan nomor HP wajib diisi." });
    }

    // Validasi nomor HP
    if (!isValidPhone(no_hp)) {
        return res.status(422).json({ message: "Format nomor HP tidak valid. Gunakan format 08xx." });
    }

    // Validasi file
    if (req.files && req.files.length > 5) {
        return res.status(422).json({ message: "Maksimal 5 file dokumentasi." });
    }

    if (req.files) {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "video/mp4"];
        for (const f of req.files) {
            if (!allowedTypes.includes(f.mimetype)) {
                return res.status(422).json({ message: `Tipe file '${f.originalname}' tidak valid. Hanya JPG, PNG, MP4.` });
            }
            if (f.size > 10000000) {
                return res.status(422).json({ message: `File '${f.originalname}' melebihi 10 MB.` });
            }
        }
    }

    try {
        const nomor_tiket = await generateTicket();

        const laporan = await LaporBencana.create({
            nomor_tiket,
            jenis_kejadian,
            tanggal_kejadian,
            jam_kejadian: jam_kejadian || null,
            kronologi: kronologi || null,
            latitude: latitude ? parseFloat(latitude) : null,
            longitude: longitude ? parseFloat(longitude) : null,
            alamat_lokasi: alamat_lokasi || null,
            korban_meninggal: parseInt(korban_meninggal) || 0,
            korban_luka: parseInt(korban_luka) || 0,
            korban_hilang: parseInt(korban_hilang) || 0,
            pengungsi: parseInt(pengungsi) || 0,
            rumah_rusak: parseInt(rumah_rusak) || 0,
            jalan_rusak: parseInt(jalan_rusak) || 0,
            jembatan_rusak: parseInt(jembatan_rusak) || 0,
            fasilitas_umum_rusak: parseInt(fasilitas_umum_rusak) || 0,
            sekolah_terdampak: parseInt(sekolah_terdampak) || 0,
            dampak_lainnya: dampak_lainnya || null,
            nama_pelapor,
            no_hp,
            email: email || null,
            bersedia_dihubungi: bersedia_dihubungi === "true" || bersedia_dihubungi === true,
            status: "Menunggu Verifikasi",
        });

        // Upload dokumentasi
        if (req.files && req.files.length > 0) {
            for (const f of req.files) {
                await DokumentasiLaporan.create({
                    id_laporan: laporan.id,
                    image: f.filename,
                    url: getImageUrl(f.filename),
                });
            }
        }

        // Kirim notifikasi WhatsApp (async, jangan block response)
        // Hanya kirim foto jika URL publik (bukan localhost)
        let firstImageUrl = null;
        if (req.files && req.files.length > 0) {
            const imgUrl = getImageUrl(req.files[0].filename);
            if (!imgUrl.includes('localhost') && !imgUrl.includes('127.0.0.1')) {
                firstImageUrl = imgUrl;
            }
        }
        sendWhatsAppNotification(laporan, firstImageUrl).catch(err => console.error("WA error:", err));

        res.status(201).json({
            message: "Laporan berhasil dikirim",
            nomor_tiket: nomor_tiket,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==================== ADMIN: DASHBOARD STATS ====================
const getDashboardStats = async (req, res) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const totalHariIni = await LaporBencana.count({ where: { created_at: { [Op.gte]: startOfDay } } });
        const totalBulanIni = await LaporBencana.count({ where: { created_at: { [Op.gte]: startOfMonth } } });
        const totalSemua = await LaporBencana.count();
        const menunggu = await LaporBencana.count({ where: { status: "Menunggu Verifikasi" } });
        const terverifikasi = await LaporBencana.count({ where: { status: "Terverifikasi" } });
        const ditangani = await LaporBencana.count({ where: { status: "Sedang Ditangani" } });
        const selesai = await LaporBencana.count({ where: { status: "Selesai" } });
        const tidakValid = await LaporBencana.count({ where: { status: "Tidak Valid" } });

        res.json({
            totalHariIni,
            totalBulanIni,
            totalSemua,
            menunggu,
            terverifikasi,
            ditangani,
            selesai,
            tidakValid,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==================== ADMIN: LIST SEARCH ====================
const getLaporanSearch = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const status = req.query.status || "";
    const offset = limit * page;

    const whereClause = {
        [Op.and]: [
            search ? {
                [Op.or]: [
                    { nomor_tiket: { [Op.like]: "%" + search + "%" } },
                    { jenis_kejadian: { [Op.like]: "%" + search + "%" } },
                    { nama_pelapor: { [Op.like]: "%" + search + "%" } },
                    { alamat_lokasi: { [Op.like]: "%" + search + "%" } },
                ],
            } : {},
            status ? { status: status } : {},
        ],
    };

    const totalRows = await LaporBencana.count({ where: whereClause });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await LaporBencana.findAll({
        where: whereClause,
        offset: offset,
        limit: limit,
        order: [["created_at", "DESC"]],
    });

    res.json({
        result,
        page,
        limit,
        totalRows,
        totalPage,
    });
};

// ==================== ADMIN: GET BY ID ====================
const getLaporanById = async (req, res) => {
    try {
        const laporan = await LaporBencana.findOne({
            where: { id: req.params.id },
            include: [{ model: DokumentasiLaporan, as: "dokumentasi" }],
        });
        if (!laporan) return res.status(404).json({ message: "Laporan tidak ditemukan" });
        res.json(laporan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==================== ADMIN: UPDATE STATUS ====================
const updateStatus = async (req, res) => {
    const { status, catatan_admin } = req.body;
    const validStatuses = ["Menunggu Verifikasi", "Terverifikasi", "Sedang Ditangani", "Selesai", "Tidak Valid"];

    if (status && !validStatuses.includes(status)) {
        return res.status(422).json({ message: "Status tidak valid" });
    }

    try {
        const updateData = {};
        if (status) updateData.status = status;
        if (catatan_admin !== undefined) updateData.catatan_admin = catatan_admin;

        await LaporBencana.update(updateData, { where: { id: req.params.id } });
        res.status(200).json({ message: "Status laporan berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==================== ADMIN: DELETE ====================
const deleteLaporan = async (req, res) => {
    try {
        // Hapus dokumentasi dulu
        const docs = await DokumentasiLaporan.findAll({ where: { id_laporan: req.params.id } });
        for (const doc of docs) {
            const filePath = `./public/images/${doc.image}`;
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        await DokumentasiLaporan.destroy({ where: { id_laporan: req.params.id } });
        await LaporBencana.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Laporan berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==================== PUBLIC: TRACK BY TICKET ====================
const trackLaporan = async (req, res) => {
    try {
        const laporan = await LaporBencana.findOne({
            where: { nomor_tiket: req.params.tiket },
            attributes: ['nomor_tiket', 'jenis_kejadian', 'tanggal_kejadian', 'jam_kejadian', 'alamat_lokasi', 'status', 'created_at'],
        });
        if (!laporan) return res.status(404).json({ message: "Laporan tidak ditemukan. Periksa kembali nomor tiket Anda." });
        res.json(laporan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postLaporan,
    getDashboardStats,
    getLaporanSearch,
    getLaporanById,
    updateStatus,
    deleteLaporan,
    trackLaporan,
};
