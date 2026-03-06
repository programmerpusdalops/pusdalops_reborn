const Pengetahuan = require("../models/PengetahuanModel.js")
const { Op } = require("sequelize");
const fs = require("fs");
const { getImageUrl } = require("../config/env.js");

const getPengetahuan = async (req, res) => {
    try {
        const pengetahuan = await Pengetahuan.findAll({
            order: [
                ['created_at', 'DESC']
            ],
        });
        res.json(pengetahuan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLatest = async (req, res) => {
    try {
        const pengetahuan = await Pengetahuan.findAll({
            order: [
                ['created_at', 'DESC']
            ],
            limit: 1
        });
        res.json(pengetahuan[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLatestFour = async (req, res) => {
    try {
        const pengetahuan = await Pengetahuan.findAll({
            order: [
                ['created_at', 'DESC']
            ],
            limit: 4
        });
        res.json(pengetahuan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLatestFourRecommended = async (req, res) => {
    try {
        const pengetahuan = await Pengetahuan.findAll({
            where: {
                kategori: "rekomendasi"
            },
            order: [
                ['created_at', 'DESC']
            ],
            limit: 4
        });
        res.json(pengetahuan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLatestFourFavorit = async (req, res) => {
    try {
        const pengetahuan = await Pengetahuan.findAll({
            where: {
                kategori: "favorit"
            },
            order: [
                ['created_at', 'DESC']
            ],
            limit: 4
        });
        res.json(pengetahuan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPengetahuanSearch = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Pengetahuan.count({
        where: {
            [Op.or]: [{
                kategori: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                judul: {
                    [Op.like]: '%' + search + '%'
                }
            }],
        }
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Pengetahuan.findAll({
        where: {
            [Op.or]: [{
                kategori: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                judul: {
                    [Op.like]: '%' + search + '%'
                }
            }],
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
        totalPage: totalPage
    });
}

const getPengetahuanById = async (req, res) => {
    try {
        const pengetahuan = await Pengetahuan.findAll({
            where: {
                id: req.params.id,
            }
        });
        res.json(pengetahuan[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postPengetahuan = async (req, res) => {
    const { judul, kategori, penulis, content } = req.body;

    if (req.file) {
        const files = req.file;
        const fileName = files.filename;
        const fileSize = files.size;
        const type = files.mimetype;
        const allowedType = ['image/jpeg', 'image/jpg', 'image/png'];
        const url = getImageUrl(fileName);

        if (!allowedType.includes(type)) return res.status(422).json({ message: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ message: "Image must be less than 5 MB" });

        try {
            await Pengetahuan.create({
                judul: judul,
                kategori: kategori,
                penulis: penulis,
                content: content,
                image: fileName,
                url: url
            });
            res.status(201).json({ message: "Created Successfuly" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        try {
            await Pengetahuan.create({
                judul: judul,
                kategori: kategori,
                penulis: penulis,
                content: content,
                image: "",
                url: ""
            });
            res.status(201).json({ message: "Created Successfuly" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


}

const updatePengetahuan = async (req, res) => {
    const { judul, kategori, penulis, content } = req.body;
    const pengetahuan = await Pengetahuan.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!pengetahuan) return res.status(404).json({ message: "No Data Found" });

    if (req.file) {
        const files = req.file;
        const fileName = files.filename;
        const fileSize = files.size;
        const type = files.mimetype;
        const allowedType = ['image/jpeg', 'image/jpg', 'image/png'];
        const url = getImageUrl(fileName);

        if (!allowedType.includes(type)) return res.status(422).json({ message: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ message: "Image must be less than 5 MB" });

        try {
            await Pengetahuan.update({
                judul: judul,
                kategori: kategori,
                penulis: penulis,
                content: content,
                image: fileName,
                url: url
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(201).json({ message: "Created Successfuly" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        try {
            await Pengetahuan.update({
                judul: judul,
                kategori: kategori,
                penulis: penulis,
                content: content,
                image: pengetahuan?.image,
                url: pengetahuan?.url
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(201).json({ message: "Created Successfuly" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

const deletePengetahuan = async (req, res) => {
    const pengetahuan = await Pengetahuan.findOne({ where: { id: req.params.id } });
    const filepath = `./public/images/${pengetahuan.image}`;
    fs.unlinkSync(filepath);

    try {
        await Pengetahuan.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: "Dokumen Deleted Successfuly" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { getPengetahuan, getLatest, getLatestFour, getLatestFourRecommended, getLatestFourFavorit, getPengetahuanSearch, getPengetahuanById, postPengetahuan, updatePengetahuan, deletePengetahuan }