const Kabupaten = require("../models/KabupatenModel.js")
const Kecamatan = require("../models/KecamatanModel.js")
const Kelurahan = require("../models/KelurahanModel.js")


const getKabupaten = async (req, res) => {
    try {
        const Kab = await Kabupaten.findAll();
        res.json(Kab);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getKecamatanByIdKab = async (req, res) => {
    try {
        const Kec = await Kecamatan.findAll({
            where: {
                kabupaten_id: req.params.id,
            }
        });
        res.json(Kec);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getKelurahanByIdKec = async (req, res) => {
    try {
        const Kel = await Kelurahan.findAll({
            where: {
                kecamatan_id: req.params.id,
            }
        });
        res.json(Kel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {getKabupaten, getKecamatanByIdKab, getKelurahanByIdKec};
