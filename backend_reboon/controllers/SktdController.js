const Sktd = require("../models/SktdModel.js");

const getSktdByIdKejadian = async (req, res) => {
    try {
        const sktd = await Sktd.findAll({
            where: {
                id_kejadian : req.params.id,
            }
        });
        res.json(sktd[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const postSktd = async (req, res) => {

    const sktd = new Sktd(req.body);
    try {
        const postSktd = await sktd.save();
        res.status(201).json(postSktd);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateSktd = async (req, res) => {
    try {
        await Sktd.update(req.body, {
            where: {
                id_sktd : req.params.id
            }
        });
        res.status(200).json({message: "Sktd Updated Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const deleteSktd = async (req, res) => {

    try {
        await Sktd.destroy({
            where: {
                id_sktd : req.params.id
            }
        });
        res.status(200).json({message: "Sktd Deleted Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {getSktdByIdKejadian, postSktd, updateSktd, deleteSktd};
