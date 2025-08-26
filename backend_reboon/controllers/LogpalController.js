const Logpal = require("../models/LogpalModel.js")
const {Op} = require("sequelize");

const getLogpalSearch = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Logpal.count({
        where:{
            [Op.or]: [{nama_barang:{
                [Op.like]: '%'+search+'%'
            }}, {tahun:{
                [Op.like]: '%'+search+'%'
            }}, {kondisi:{
                [Op.like]: '%'+search+'%'
            }}],
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Logpal.findAll({
        where:{
            [Op.or]: [{nama_barang:{
                [Op.like]: '%'+search+'%'
            }}, {tahun:{
                [Op.like]: '%'+search+'%'
            }}, {kondisi:{
                [Op.like]: '%'+search+'%'
            }}],
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

const getLogpalById = async (req, res) => {
    try {
        const logpal = await Logpal.findAll({
            where: {
                id: req.params.id,
            }
        });
        res.json(logpal[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const postLogpal = async (req, res) => {

    // const oldLogpal = await Logpal.findOne({where:{nama_barang: req.body.nama_barang}});
    // if (oldLogpal) return res.status(400).json({ message: "Maaf Nama Barang Sudah Terdaftar" });


    const logpal = new Logpal(req.body);
    try {
        const postLogpal = await logpal.save();
        res.status(201).json(postLogpal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateLogpal = async (req, res) => {
    try {
        await Logpal.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: "Logpal Updated Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteLogpal = async (req, res) => {
    try {
        await Logpal.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: "Logpal Deleted Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {getLogpalSearch, getLogpalById, postLogpal, updateLogpal, deleteLogpal};
