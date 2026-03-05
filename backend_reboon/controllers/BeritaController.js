const Berita = require("../models/BeritaModel.js")
const { Op, col } = require("sequelize");
const path = require("path");
const fs = require("fs");
const { getImageUrl } = require("../config/env.js");

const getBerita = async (req, res) => {
    try {
        const berita = await Berita.findAll({
            order: [
                ['created_at', 'DESC']
            ],
        });
        res.json(berita);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLatest = async (req, res) => {
    try {
        const berita = await Berita.findAll({
            order: [
                ['created_at', 'DESC']
            ],
            limit: 1
        });
        res.json(berita[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLatestFour = async (req, res) => {
    try {
        const berita = await Berita.findAll({
            order: [
                ['created_at', 'DESC']
            ],
            limit: 4
        });
        res.json(berita);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLatestFourRecommended = async (req, res) => {
    try {
        const berita = await Berita.findAll({
            where: {
                kategori: "rekomendasi"
            },
            order: [
                ['created_at', 'DESC']
            ],
            limit: 4
        });
        res.json(berita);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLatestFourFavorit = async (req, res) => {
    try {
        const berita = await Berita.findAll({
            where: {
                kategori: "favorit"
            },
            order: [
                ['created_at', 'DESC']
            ],
            limit: 4
        });
        res.json(berita);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBeritaSearch = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Berita.count({
        where: {
            [Op.or]: [{
                kategori: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                judul: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                status: {
                    [Op.like]: '%' + search + '%'
                }
            }],
        }
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Berita.findAll({
        where: {
            [Op.or]: [{
                kategori: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                judul: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                status: {
                    [Op.like]: '%' + search + '%'
                }
            }],
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
        totalPage: totalPage
    });
}

const getBeritaById = async (req, res) => {
    try {
        const berita = await Berita.findAll({
            where: {
                id: req.params.id,
            }
        });
        res.json(berita[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// const postBerita = async (req, res) =>  {
//     const { judul, kategori, tanggal, penulis, status, content } = req.body;

//     if (req.file) {
//         const files = req.file;
//         const fileName = files.filename;
//         const fileSize = files.size;
//         const type = files.mimetype;
//         const allowedType = ['image/jpeg','image/jpg','image/png'];
//         const url = `http://localhost:5001/public/images/${fileName}`;
//         // const url = `https://pusdalops-backend.com.pusdalops-bpbdsulteng.com/api/images/${fileName}`;

//         if(!allowedType.includes(type)) return res.status(422).json({message: "Invalid Images"});
//         if(fileSize > 5000000) return res.status(422).json({message: "Image must be less than 5 MB"});

//             try {
//                 await Berita.create({
//                     judul: judul,
//                     kategori: kategori,
//                     tanggal: tanggal,
//                     penulis: penulis,
//                     status: status,
//                     content: content,
//                     image: fileName,
//                     url: url
//                  });
//                     res.status(201).json({message: "Created Successfuly"});
//                 } catch (error) {
//                     res.status(400).json({ message: error.message });
//                 }
//     } else {
//             try {
//                 await Berita.create({
//                     judul: judul,
//                     kategori: kategori,
//                     tanggal: tanggal,
//                     penulis: penulis,
//                     status: status,
//                     content: content,
//                     image: "",
//                     url: ""
//                 });
//                 res.status(201).json({message: "Created Successfuly"});
//             } catch (error) {
//                 res.status(400).json({ message: error.message });
//             }
//     }


// }

// const updateBerita = async (req, res) =>  {
//     const { judul, kategori, tanggal, penulis, status, content } = req.body;
//     const berita = await Berita.findOne({
//         where:{
//             id: req.params.id
//         }
//     });
//     if(!berita) return res.status(404).json({message: "No Data Found"});

//     if (req.file) {
//         const files = req.file;
//         const fileName = files.filename;
//         const fileSize = files.size;
//         const type = files.mimetype;
//         const allowedType = ['image/jpeg','image/jpg','image/png'];
//         const url = `http://localhost:5001/public/images/${fileName}`;
//         // const url = `https://pusdalops-backend.com.pusdalops-bpbdsulteng.com/api/images/${fileName}`;

//         if(!allowedType.includes(type)) return res.status(422).json({message: "Invalid Images"});
//         if(fileSize > 5000000) return res.status(422).json({message: "Image must be less than 5 MB"});

//             try {
//                 await Berita.update({
//                     judul: judul,
//                     kategori: kategori,
//                     tanggal: tanggal,
//                     penulis: penulis,
//                     status: status,
//                     content: content,
//                     image: fileName,
//                     url: url
//                 },{
//                     where:{
//                         id: req.params.id
//                     }
//                 });
//                     res.status(201).json({message: "Created Successfuly"});
//                 } catch (error) {
//                     res.status(400).json({ message: error.message });
//                 }
//     } else {
//             try {
//                 await Berita.update({
//                     judul: judul,
//                     kategori: kategori,
//                     tanggal: tanggal,
//                     penulis: penulis,
//                     status: status,
//                     content: content,
//                     image: berita?.image,
//                     url: berita?.url
//                 },{
//                     where:{
//                         id: req.params.id
//                     }
//                     });
//                 res.status(201).json({message: "Created Successfuly"});
//             } catch (error) {
//                 res.status(400).json({ message: error.message });
//             }
//     }
// }

// const deleteBerita = async (req, res) => {
//     const berita = await Berita.findOne({where:{id: req.params.id}});
//     const filepath = `./public/images/${berita.image}`;
//     fs.unlinkSync(filepath);

//     try {
//         await Berita.destroy({
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({message: "Dokumen Deleted Successfuly"});
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }


// BASE_URL sekarang dari config/env.js via getImageUrl()

// =======================
// Helper Rename File
// =======================
const renameFile = (originalName) => {
    const ext = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, ext);

    const safeName = nameWithoutExt
        .toLowerCase()
        .replace(/\s+/g, "-")          // spasi jadi strip
        .replace(/[^a-z0-9\-]/g, "");  // hapus karakter aneh

    return `${Date.now()}-${safeName}${ext}`;
};

// =======================
// CREATE
// =======================
const postBerita = async (req, res) => {
    const { judul, kategori, tanggal, penulis, status, content } = req.body;

    try {
        let imageName = "";
        let imageUrl = "";

        if (req.file) {
            const files = req.file;
            const fileSize = files.size;
            const type = files.mimetype;
            const allowedType = ["image/jpeg", "image/jpg", "image/png"];

            if (!allowedType.includes(type)) {
                return res.status(422).json({ message: "Invalid Images" });
            }

            if (fileSize > 5000000) {
                return res.status(422).json({ message: "Image must be less than 5 MB" });
            }

            const newFileName = renameFile(files.originalname);

            fs.renameSync(
                `./public/images/${files.filename}`,
                `./public/images/${newFileName}`
            );

            imageName = newFileName;
            imageUrl = getImageUrl(newFileName);
        }

        await Berita.create({
            judul,
            kategori,
            tanggal,
            penulis,
            status,
            content,
            image: imageName,
            url: imageUrl
        });

        res.status(201).json({ message: "Created Successfully" });

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// =======================
// UPDATE
// =======================
const updateBerita = async (req, res) => {
    try {
        const { judul, kategori, tanggal, penulis, status, content } = req.body;

        const berita = await Berita.findOne({
            where: { id: req.params.id }
        });

        if (!berita) {
            return res.status(404).json({ message: "No Data Found" });
        }

        let imageName = berita.image;
        let imageUrl = berita.url;

        if (req.file) {
            const files = req.file;
            const fileSize = files.size;
            const type = files.mimetype;
            const allowedType = ["image/jpeg", "image/jpg", "image/png"];

            if (!allowedType.includes(type)) {
                return res.status(422).json({ message: "Invalid Images" });
            }

            if (fileSize > 5000000) {
                return res.status(422).json({ message: "Image must be less than 5 MB" });
            }

            const newFileName = renameFile(files.originalname);

            fs.renameSync(
                `./public/images/${files.filename}`,
                `./public/images/${newFileName}`
            );

            // hapus file lama jika ada
            if (berita.image) {
                const oldPath = `./public/images/${berita.image}`;
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            imageName = newFileName;
            imageUrl = getImageUrl(newFileName);
        }

        await Berita.update({
            judul,
            kategori,
            tanggal,
            penulis,
            status,
            content,
            image: imageName,
            url: imageUrl
        }, {
            where: { id: req.params.id }
        });

        res.status(200).json({ message: "Updated Successfully" });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// =======================
// DELETE
// =======================
const deleteBerita = async (req, res) => {
    try {
        const berita = await Berita.findOne({
            where: { id: req.params.id }
        });

        if (!berita) {
            return res.status(404).json({ message: "No Data Found" });
        }

        if (berita.image) {
            const filepath = `./public/images/${berita.image}`;
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }

        await Berita.destroy({
            where: { id: req.params.id }
        });

        res.status(200).json({ message: "Deleted Successfully" });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getBerita, getLatest, getLatestFour, getLatestFourRecommended, getLatestFourFavorit, getBeritaSearch, getBeritaById, postBerita, updateBerita, deleteBerita }