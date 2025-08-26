const Kerusakan = require("../models/KerusakanModel.js");

const getKerusakanByIdLokasi = async (req, res) => {
    try {
        const kerusakan = await Kerusakan.findAll({
            where: {
                id_lokasi : req.params.id,
            }
        });
        res.json(kerusakan[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postKerusakan = async (req, res) => {

    try {
        const postKerusakan = await Kerusakan.bulkCreate(req.body);
        res.status(201).json(postKerusakan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateKerusakan = async (req, res) => {
    try {

        await Kerusakan.bulkCreate(req.body,
            {
                updateOnDuplicate: ["id_kejadian", "id_lokasi", "rumah_terdampak", "rm_rusak_ringan", "rm_rusak_sedang", "rm_rusak_berat", "sarana_pendidikan", "sarana_ibadah", "sarana_kesehatan", "perkantoran", "bangunan_lain", "jalan", "jembatan", "sawah", "kebun", "tambak", "irigasi"]
            },
            {
            where: {id_kerusakan: req.params.id}
            }
        );
        res.status(200).json({message: "Kerusakan Updates Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}




module.exports = {getKerusakanByIdLokasi, postKerusakan, updateKerusakan};
