const Korban = require("../models/KorbanModel.js");
const { Sequelize } = require("sequelize");

const getKorbanByIdLokasi = async (req, res) => {
  try {
    const korban = await Korban.findAll({
      where: {
        id_lokasi: req.params.id,
      },
    });
    res.json(korban[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCountKorbanTerdampak = async (req, res) => {
  try {
    const korban = await Korban.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("meninggal")), "countMeninggal"],
        [Sequelize.fn("SUM", Sequelize.col("hilang")), "countHilang"],
        [Sequelize.fn("SUM", Sequelize.col("menderita_jiwa")), "countMenderita"],
        [Sequelize.fn("SUM", Sequelize.col("mengungsi_jiwa")), "countMengungsi"],
      ],
    });
    res.json(korban);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postKorban = async (req, res) => {
  try {
    const postKorban = await Korban.bulkCreate(req.body);
    res.status(201).json(postKorban);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateKorban = async (req, res) => {
  try {
    await Korban.bulkCreate(
      req.body,
      {
        updateOnDuplicate: ["id_kejadian", "id_lokasi", "meninggal", "luka_luka", "sakit", "hilang", "menderita_kk", "menderita_jiwa", "mengungsi_kk", "mengungsi_jiwa"],
      },
      {
        where: { id_korban: req.params.id },
      }
    );
    res.status(200).json({ message: "Kerusakan Updates Successfuly" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getKorbanByIdLokasi, getCountKorbanTerdampak, postKorban, updateKorban };
