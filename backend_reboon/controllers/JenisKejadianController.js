const JenisKejadian = require("../models/JenisKejadianModel.js");

const getJenisKejadian = async (req, res) => {
  try {
    const jenisKejadian = await JenisKejadian.findAll({
      order: [["created_at", "DESC"]],
    });
    res.json(jenisKejadian);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJenisKejadianById = async (req, res) => {
  try {
    const jenisKejadian = await JenisKejadian.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(jenisKejadian[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const PostJenisKejadian = async (req, res) => {
  if (req.body.nama === "") return res.status(400).json({ message: "Maaf, Jenis Kejadian Wajib Di isi" });

  const oldJenisKejadian = await JenisKejadian.findOne({ where: { nama: req.body.nama } });
  if (oldJenisKejadian) return res.status(400).json({ message: "Maaf Jenis Kejadian Sudah Terdaftar" });

  const jenisKejadian = new JenisKejadian(req.body);
  try {
    const postJenisKejadian = await jenisKejadian.save();
    res.status(201).json(postJenisKejadian);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateJenisKejadian = async (req, res) => {
  if (req.body.nama === "") return res.status(400).json({ message: "Maaf, Jenis Kejadian Wajib Di isi" });

  try {
    await JenisKejadian.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Jenis Kejadian Updated Successfuly" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteJenisKejadian = async (req, res) => {
  try {
    await JenisKejadian.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Jenis Kejadian Deleted Successfuly" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getJenisKejadian, getJenisKejadianById, PostJenisKejadian, updateJenisKejadian, deleteJenisKejadian };
