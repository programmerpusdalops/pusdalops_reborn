const Dokumen = require("../models/DokumenModel.js");
const JenisDokumen = require("../models/JenisDokumenModel.js");
const { Op } = require("sequelize");
const fs = require("fs");

const getDokumenSearch = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await Dokumen.count({
    where: {
      [Op.or]: [
        {
          judul: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          id_jenis_dokumen: {
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
  const result = await Dokumen.findAll({
    where: {
      [Op.or]: [
        {
          judul: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          id_jenis_dokumen: {
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
    include: [JenisDokumen],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

const getDokumen = async (req, res) => {
  try {
    const dokumen = await Dokumen.findAll({
      order: [["created_at", "DESC"]],
      include: [JenisDokumen],
    });
    res.json(dokumen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDokumenById = async (req, res) => {
  try {
    const dokumen = await Dokumen.findAll({
      where: {
        id: req.params.id,
      },
      include: [JenisDokumen],
    });
    res.json(dokumen[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postDokumen = async (req, res) => {
  const { judul, id_jenis_dokumen, tahun } = req.body;

  if (req.file) {
    const files = req.file;
    const fileName = files.filename;
    const fileSize = files.size;
    const type = files.mimetype;
    const allowedType = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    const url = `http://localhost:5001/${fileName}`;
    // const url = `https://pusdalops-backend.com.pusdalops-bpbdsulteng.com/api/images/${fileName}`;

    if (!allowedType.includes(type)) return res.status(422).json({ message: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ message: "Image must be less than 5 MB" });

    try {
      await Dokumen.create({
        judul: judul,
        id_jenis_dokumen: id_jenis_dokumen,
        tahun: tahun,
        file_name: fileName,
        url: url,
      });
      res.status(201).json({ message: "Created Successfuly" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    try {
      await Dokumen.create({
        judul: judul,
        id_jenis_dokumen: id_jenis_dokumen,
        tahun: tahun,
        file_name: "",
        url: "",
      });
      res.status(201).json({ message: "Created Successfuly" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

const updateDokumen = async (req, res) => {
  const { judul, id_jenis_dokumen, tahun } = req.body;
  const dokumen = await Dokumen.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dokumen) return res.status(404).json({ message: "No Data Found" });

  if (req.file) {
    const files = req.file;
    const fileName = files.filename;
    const fileSize = files.size;
    const type = files.mimetype;
    const allowedType = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    const url = `http://localhost:5001/${fileName}`;
    // const url = `https://pusdalops-backend.com.pusdalops-bpbdsulteng.com/api/images/${fileName}`;

    if (!allowedType.includes(type)) return res.status(422).json({ message: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ message: "Image must be less than 5 MB" });

    try {
      await Dokumen.update(
        {
          judul: judul,
          id_jenis_dokumen: id_jenis_dokumen,
          tahun: tahun,
          file_name: fileName,
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
      await Dokumen.update(
        {
          judul: judul,
          id_jenis_dokumen: id_jenis_dokumen,
          tahun: tahun,
          file_name: dokumen?.file_name,
          url: dokumen?.url,
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

const deleteDokumen = async (req, res) => {
  const dokumen = await Dokumen.findOne({where:{id: req.params.id}});
  const filepath = `./public/images/${dokumen.file_name}`;
  fs.unlinkSync(filepath);

  try {
    await Dokumen.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Dokumen Deleted Successfuly" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getDokumenSearch, getDokumen, getDokumenById, postDokumen, updateDokumen, deleteDokumen };
