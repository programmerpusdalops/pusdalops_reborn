const JenisDokumen = require("../models/JenisDokumenModel.js")

const getJenisDokumen = async (req, res) => {
    try {
        const jenisDokumen = await JenisDokumen.findAll({
            order:[
                ['created_at', 'DESC']
              ]
        });
        res.json(jenisDokumen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getJenisDokumenById = async (req, res) => {
    try {
        const jenisDokumen = await JenisDokumen.findAll({
            where: {
                id: req.params.id,
            }
        });
        res.json(jenisDokumen[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const PostJenisDokumen = async (req, res) => {
    if (req.body.nama === '') return res.status(400).json({ message: "Maaf, Jenis Dokumen Wajib Di isi" });

    const oldJenisDokumen = await JenisDokumen.findOne({where:{nama: req.body.nama}});
    if (oldJenisDokumen) return res.status(400).json({ message: "Maaf Jenis Dokumen Sudah Terdaftar" });


    const jenisDokumen = new JenisDokumen(req.body); 
    try {
        const postJenisDokumen = await jenisDokumen.save();
        res.status(201).json(postJenisDokumen);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateJenisDokumen = async (req, res) => {
    if (req.body.nama === '') return res.status(400).json({ message: "Maaf, Jenis Dokumen Wajib Di isi" });

    try {
        await JenisDokumen.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: "Jenis Dokumen Updated Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteJenisDokumen = async (req, res) => {
    try {
        await JenisDokumen.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: "Jenis Dokumen Deleted Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {getJenisDokumen, getJenisDokumenById, PostJenisDokumen, updateJenisDokumen, deleteJenisDokumen};
