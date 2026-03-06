const KontakPenting = require("../models/KontakPentingModel.js");
const { Op } = require("sequelize");

const getKontakSearch = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await KontakPenting.count({
        where: {
            [Op.or]: [
                {
                    nama: {
                        [Op.like]: "%" + search + "%",
                    },
                },
                {
                    jabatan: {
                        [Op.like]: "%" + search + "%",
                    },
                },
                {
                    nomor: {
                        [Op.like]: "%" + search + "%",
                    },
                },
            ],
        },
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await KontakPenting.findAll({
        where: {
            [Op.or]: [
                {
                    nama: {
                        [Op.like]: "%" + search + "%",
                    },
                },
                {
                    jabatan: {
                        [Op.like]: "%" + search + "%",
                    },
                },
                {
                    nomor: {
                        [Op.like]: "%" + search + "%",
                    },
                },
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

const getKontak = async (req, res) => {
    try {
        const kontak = await KontakPenting.findAll({
            order: [["created_at", "DESC"]],
        });
        res.json(kontak);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getKontakById = async (req, res) => {
    try {
        const kontak = await KontakPenting.findAll({
            where: {
                id: req.params.id,
            },
        });
        res.json(kontak[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postKontak = async (req, res) => {
    const { nama, jabatan, nomor } = req.body;
    try {
        await KontakPenting.create({
            nama: nama,
            jabatan: jabatan,
            nomor: nomor,
        });
        res.status(201).json({ message: "Kontak Penting Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateKontak = async (req, res) => {
    const { nama, jabatan, nomor } = req.body;
    try {
        await KontakPenting.update(
            {
                nama: nama,
                jabatan: jabatan,
                nomor: nomor,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json({ message: "Kontak Penting Updated Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteKontak = async (req, res) => {
    try {
        await KontakPenting.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ message: "Kontak Penting Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getKontakSearch,
    getKontak,
    getKontakById,
    postKontak,
    updateKontak,
    deleteKontak,
};
