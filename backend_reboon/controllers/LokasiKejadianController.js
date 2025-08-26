const LokasiKejadian = require("../models/LokasiKejadianModel.js");
const Kabupaten = require("../models/KabupatenModel.js")
const Kecamatan = require("../models/KecamatanModel.js")
const Kelurahan = require("../models/KelurahanModel.js")

const getLokasiByIdKejadian = async (req, res) => {
    try {
        const lokasi = await LokasiKejadian.findAll({
            where: {
                id_kejadian : req.params.id,
            },
            include: [Kabupaten, Kecamatan, Kelurahan]
        });
        res.json(lokasi);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postLokasi = async (req, res) => {

    try {
        const postLokasi = await LokasiKejadian.bulkCreate(req.body);
        res.status(201).json(postLokasi);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateLokasi = async (req, res) => {

    try {

        await LokasiKejadian.bulkCreate(req.body,
            {
                updateOnDuplicate: ["id_kejadian", "kab", "kec", "desa", "dusun", "lat", "long"]
            },
            {
            where: {id_lokasi: req.params.id}
            }
        );
        res.status(200).json({message: "Lokasi Updates Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



module.exports = {getLokasiByIdKejadian, postLokasi, updateLokasi};
