const Majalah = require("../models/MajalahModel.js");
const { Op } = require("sequelize");
const fs = require("fs");
const { getImageUrl } = require("../config/env.js");

const getMajalahSearch = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Majalah.count({
        where: {
            [Op.or]: [
                { judul: { [Op.like]: "%" + search + "%" } },
            ],
        },
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Majalah.findAll({
        where: {
            [Op.or]: [
                { judul: { [Op.like]: "%" + search + "%" } },
            ],
        },
        offset: offset,
        limit: limit,
        order: [["created_at", "DESC"]],
    });
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage,
    });
};

const getMajalah = async (req, res) => {
    try {
        const data = await Majalah.findAll({
            order: [["created_at", "DESC"]],
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMajalahById = async (req, res) => {
    try {
        const data = await Majalah.findOne({
            where: { id: req.params.id },
        });
        if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postMajalah = async (req, res) => {
    if (!req.files || !req.files.sampul || !req.files.file_pdf) {
        return res.status(422).json({ message: "Sampul dan file PDF harus diunggah" });
    }

    const { judul } = req.body;
    if (!judul) return res.status(422).json({ message: "Judul wajib diisi" });

    const sampulFile = req.files.sampul[0];
    const pdfFile = req.files.file_pdf[0];

    // Validate sampul
    const allowedImage = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedImage.includes(sampulFile.mimetype)) {
        return res.status(422).json({ message: "Sampul harus berformat JPG/PNG" });
    }
    if (sampulFile.size > 5000000) {
        return res.status(422).json({ message: "Ukuran sampul maksimal 5 MB" });
    }

    // Validate PDF
    if (pdfFile.mimetype !== "application/pdf") {
        return res.status(422).json({ message: "File harus berformat PDF" });
    }
    if (pdfFile.size > 50000000) {
        return res.status(422).json({ message: "Ukuran PDF maksimal 50 MB" });
    }

    try {
        await Majalah.create({
            judul: judul,
            sampul: sampulFile.filename,
            url_sampul: getImageUrl(sampulFile.filename),
            file_pdf: pdfFile.filename,
            url_pdf: getImageUrl(pdfFile.filename),
        });
        res.status(201).json({ message: "Majalah berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMajalah = async (req, res) => {
    const majalah = await Majalah.findOne({ where: { id: req.params.id } });
    if (!majalah) return res.status(404).json({ message: "Data tidak ditemukan" });

    const { judul } = req.body;
    let sampulName = majalah.sampul;
    let urlSampul = majalah.url_sampul;
    let pdfName = majalah.file_pdf;
    let urlPdf = majalah.url_pdf;

    if (req.files && req.files.sampul) {
        const sampulFile = req.files.sampul[0];
        const allowedImage = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedImage.includes(sampulFile.mimetype)) {
            return res.status(422).json({ message: "Sampul harus berformat JPG/PNG" });
        }
        // Delete old
        const oldPath = `./public/images/${majalah.sampul}`;
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

        sampulName = sampulFile.filename;
        urlSampul = getImageUrl(sampulFile.filename);
    }

    if (req.files && req.files.file_pdf) {
        const pdfFile = req.files.file_pdf[0];
        if (pdfFile.mimetype !== "application/pdf") {
            return res.status(422).json({ message: "File harus berformat PDF" });
        }
        // Delete old
        const oldPath = `./public/images/${majalah.file_pdf}`;
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

        pdfName = pdfFile.filename;
        urlPdf = getImageUrl(pdfFile.filename);
    }

    try {
        await Majalah.update(
            {
                judul: judul || majalah.judul,
                sampul: sampulName,
                url_sampul: urlSampul,
                file_pdf: pdfName,
                url_pdf: urlPdf,
            },
            { where: { id: req.params.id } }
        );
        res.status(200).json({ message: "Majalah berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMajalah = async (req, res) => {
    const majalah = await Majalah.findOne({ where: { id: req.params.id } });
    if (!majalah) return res.status(404).json({ message: "Data tidak ditemukan" });

    try {
        const sampulPath = `./public/images/${majalah.sampul}`;
        if (fs.existsSync(sampulPath)) fs.unlinkSync(sampulPath);
        const pdfPath = `./public/images/${majalah.file_pdf}`;
        if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);

        await Majalah.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Majalah berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMajalahSearch,
    getMajalah,
    getMajalahById,
    postMajalah,
    updateMajalah,
    deleteMajalah,
};
