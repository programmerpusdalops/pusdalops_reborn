const VideoAsset = require("../models/VideoAssetModel.js");

const getVideoAssetLimit = async (req, res) => {
    try {
        const video = await VideoAsset.findAll({
            order:[
                ['created_at', 'DESC']
              ],
            limit: 4
        });
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getVideoAsset = async (req, res) => {
    try {
        const video = await VideoAsset.findAll({
            order:[
                ['created_at', 'DESC']
              ],
        });
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postVideoAsset = async (req, res) => {
    if (req.body.url === '') return res.status(400).json({ message: "Maaf, Url Wajib Di isi" });

    const video = new VideoAsset(req.body);
    try {
        const postVideo = await video.save();
        res.status(201).json(postVideo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteVideoAsset = async (req, res) => {
    try {
        await VideoAsset.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: "Asset Video Deleted Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {getVideoAssetLimit, getVideoAsset, postVideoAsset, deleteVideoAsset};
