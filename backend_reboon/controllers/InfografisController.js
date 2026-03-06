const Infografis = require("../models/InfografisModel.js");
const { Op } = require("sequelize");
const fs = require("fs");
const { getImageUrl } = require("../config/env.js");

const getInfografisSearch = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Infografis.count({
        where: {
            [Op.or]: [
                { judul: { [Op.like]: "%" + search + "%" } },
                { tahun: { [Op.like]: "%" + search + "%" } },
                { kategori: { [Op.like]: "%" + search + "%" } },
            ],
        },
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Infografis.findAll({
        where: {
            [Op.or]: [
                { judul: { [Op.like]: "%" + search + "%" } },
                { tahun: { [Op.like]: "%" + search + "%" } },
                { kategori: { [Op.like]: "%" + search + "%" } },
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

const getInfografis = async (req, res) => {
    try {
        const data = await Infografis.findAll({
            order: [["created_at", "DESC"]],
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInfografisById = async (req, res) => {
    try {
        const data = await Infografis.findAll({
            where: { id: req.params.id },
        });
        res.json(data[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postInfografis = async (req, res) => {
    if (!req.file) return res.status(422).json({ message: "File harus diunggah" });

    const { judul, tahun, kategori } = req.body;
    const fileName = req.file.filename;
    const fileSize = req.file.size;
    const type = req.file.mimetype;
    const allowedType = ["image/jpeg", "image/jpg", "image/png"];
    const url = getImageUrl(fileName);

    if (!allowedType.includes(type)) return res.status(422).json({ message: "Format file tidak valid (hanya JPG/PNG)" });
    if (fileSize > 5000000) return res.status(422).json({ message: "Ukuran file maksimal 5 MB" });

    try {
        await Infografis.create({
            judul: judul,
            tahun: tahun,
            kategori: kategori,
            image: fileName,
            url: url,
        });
        res.status(201).json({ message: "Infografis berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateInfografis = async (req, res) => {
    const infografis = await Infografis.findOne({ where: { id: req.params.id } });
    if (!infografis) return res.status(404).json({ message: "Data tidak ditemukan" });

    const { judul, tahun, kategori } = req.body;
    let fileName = infografis.image;
    let url = infografis.url;

    if (req.file) {
        const fileSize = req.file.size;
        const type = req.file.mimetype;
        const allowedType = ["image/jpeg", "image/jpg", "image/png"];

        if (!allowedType.includes(type)) return res.status(422).json({ message: "Format file tidak valid (hanya JPG/PNG)" });
        if (fileSize > 5000000) return res.status(422).json({ message: "Ukuran file maksimal 5 MB" });

        // Hapus file lama
        const oldFilePath = `./public/images/${infografis.image}`;
        if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
        }

        fileName = req.file.filename;
        url = getImageUrl(fileName);
    }

    try {
        await Infografis.update(
            {
                judul: judul,
                tahun: tahun,
                kategori: kategori,
                image: fileName,
                url: url,
            },
            { where: { id: req.params.id } }
        );
        res.status(200).json({ message: "Infografis berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteInfografis = async (req, res) => {
    const infografis = await Infografis.findOne({ where: { id: req.params.id } });
    if (!infografis) return res.status(404).json({ message: "Data tidak ditemukan" });

    try {
        // Hapus file
        const filePath = `./public/images/${infografis.image}`;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await Infografis.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Infografis berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getInfografisSearch,
    getInfografis,
    getInfografisById,
    postInfografis,
    updateInfografis,
    deleteInfografis,
};
