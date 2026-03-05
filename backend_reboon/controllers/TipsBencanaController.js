const Tips = require("../models/TipsBencanaModel.js");
// const JenisDokumen = require("../models/JenisDokumenModel.js");
const { Op } = require("sequelize");
const fs = require("fs");
const { getImageUrl } = require("../config/env.js");

const getTipsSearch = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await Tips.count({
    where: {
      [Op.or]: [
        {
          judul: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          tahun: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await Tips.findAll({
    where: {
      [Op.or]: [
        {
          judul: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          tahun: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
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
    totalPage: totalPage,
  });
};

const getTips = async (req, res) => {
  try {
    const tips = await Tips.findAll({
      order: [["created_at", "DESC"]],
    });
    res.json(tips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTipsById = async (req, res) => {
  try {
    const tips = await Tips.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(tips[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postTips = async (req, res) => {
  const { judul, tahun } = req.body;

  if (req.file) {
    const files = req.file;
    const fileName = files.filename;
    const fileSize = files.size;
    const type = files.mimetype;
    const allowedType = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    const url = getImageUrl(fileName);

    if (!allowedType.includes(type)) return res.status(422).json({ message: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ message: "Image must be less than 5 MB" });

    try {
      await Tips.create({
        judul: judul,
        tahun: tahun,
        image: fileName,
        url: url,
      });
      res.status(201).json({ message: "Created Successfuly" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    try {
      await Tips.create({
        judul: judul,
        tahun: tahun,
        image: "",
        url: "",
      });
      res.status(201).json({ message: "Created Successfuly" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

const updateTips = async (req, res) => {
  const { judul, tahun } = req.body;
  const tips = await Tips.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!tips) return res.status(404).json({ message: "No Data Found" });

  if (req.file) {
    const files = req.file;
    const fileName = files.filename;
    const fileSize = files.size;
    const type = files.mimetype;
    const allowedType = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    const url = getImageUrl(fileName);

    if (!allowedType.includes(type)) return res.status(422).json({ message: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ message: "Image must be less than 5 MB" });

    try {
      await Tips.update(
        {
          judul: judul,
          tahun: tahun,
          image: fileName,
          url: url,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(201).json({ message: "Created Successfuly" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    try {
      await Tips.update(
        {
          judul: judul,
          tahun: tahun,
          image: tips?.file_name,
          url: tips?.url,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(201).json({ message: "Created Successfuly" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

const deleteTips = async (req, res) => {
  const tips = await Tips.findOne({ where: { id: req.params.id } });
  const filepath = `./public/images/${tips.image}`;
  fs.unlinkSync(filepath);

  try {
    await Tips.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Tips Deleted Successfuly" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getTipsSearch, getTips, getTipsById, postTips, updateTips, deleteTips };
