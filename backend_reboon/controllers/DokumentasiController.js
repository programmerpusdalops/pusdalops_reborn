const Files = require("../models/DokumentasiModel.js");
const fs = require("fs");

const getDokumentasiByIdKejadian = async (req, res) => {
    try {
        const doc = await Files.findAll({
            where: {
                id_kejadian: req.params.id,
            }
        });
        res.json(doc);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const postDokumentasi = async (req, res) =>  {
    const { id_kejadian, keterangan, jenis_file } = req.body;

    let list = { cari: []}
    for (let i = 0; i < id_kejadian?.length; i++) {
      list.cari.push({
            id_kejadian: id_kejadian[i],
            keterangan: keterangan[i],
            jenis_file: jenis_file[i],
            url: req?.files[i]?.path ? `http://localhost:5001/public/images/${req?.files[i]?.filename}` : null,
            // url: req?.files[i]?.path ? `https://pusdalops-backend.com.pusdalops-bpbdsulteng.com/api/images/${req?.files[i]?.filename}` : null,
            image: req?.files[i]?.filename ? req?.files[i]?.filename : null
        })
    }

    const item = [{
        id_kejadian: id_kejadian,
        keterangan: keterangan,
        jenis_file: jenis_file,
        url: req?.files[0]?.path ? `http://localhost:5001/public/images/${req?.files[0]?.filename}` : null,
        // url: req?.files[0]?.path ? `https://pusdalops-backend.com.pusdalops-bpbdsulteng.com/api/images/${req?.files[0]?.filename}` : null,
        image: req?.files[0]?.filename ? req?.files[0]?.filename : null
    }]

    try {
        if (req?.files?.length === 1) {
            await Files.bulkCreate(item);
        } else {
            await Files.bulkCreate(list.cari);
        }
        res.status(201).json({message: "Created Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
        
}

const postOneDokumentasi = async (req, res) =>  {
    const { id_kejadian, keterangan, jenis_file } = req.body;

    const item = [{
        id_kejadian: id_kejadian,
        keterangan: keterangan,
        jenis_file: jenis_file,
        url: req?.files[0]?.path ? `http://localhost:5001/public/images/${req?.files[0]?.filename}` : null,
        // url: req?.files[0]?.path ? `https://pusdalops-backend.com.pusdalops-bpbdsulteng.com/api/images/${req?.files[0]?.filename}` : null,
        image: req?.files[0]?.filename ? req?.files[0]?.filename : null
    }]

    try {
        await Files.bulkCreate(item);
        res.status(201).json({message: "Created Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
 
}

const deleteDokumentasi = async(req, res)=>{
    const files = await Files.findOne({
        where:{
            id_dokumentasi : req.params.id
        }
    });
    if(!files) return res.status(404).json({message: "No Data Found"});
 
    try {
        const filepath = `./public/images/${files.image}`;
        fs.unlinkSync(filepath);
        await files.destroy({
            where:{
                id_dokumentasi : req.params.id
            }
        });
        res.status(200).json({message: "Dokumentasi Deleted Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {getDokumentasiByIdKejadian, postDokumentasi, postOneDokumentasi, deleteDokumentasi};
