const Users = require("../models/UserModel.js");
const Kejadian = require("../models/KejadianBencanaModel.js");
const LokasiKejadian = require("../models/LokasiKejadianModel.js");
const Korban = require("../models/KorbanModel.js");
const Kerusakan = require("../models/KerusakanModel.js");
const Dokumentasi = require("../models/DokumentasiModel.js");
const JenisKejadian = require("../models/JenisKejadianModel.js");
const {Op} = require("sequelize");
const fs = require("fs");
const Kabupaten = require("../models/KabupatenModel.js");
const Kecamatan = require("../models/KecamatanModel.js");
const Kelurahan = require("../models/KelurahanModel.js");

const getCountKejadian = async (req, res) => {
  try {
    const jenisKejadian = await JenisKejadian.findAll();

    let jenis = []
    for (let i = 0; i < jenisKejadian?.length; i++) {
      const kejadian = await Kejadian.findAndCountAll({
        where:{
          [Op.and]: [{tanggal:{
              [Op.like]: '%'+'2025'+'%'
          }}, {id_jenis_kejadian:{
              [Op.like]: '%'+jenisKejadian[i]?.id+'%'
          }}],
        }
      });
      jenis.push(kejadian.count)
    }

    let hasil = []
    jenisKejadian.map((val, _in) => {
      hasil.push(val?.nama, jenis[_in])
    })

    res.json(hasil);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCountKorbanTerdampak = async (req, res) => {
  try {
    const tahun_2025 = '2025'
    const tahun_2024 = '2024'
    const subjek = ['meninggal', 'hilang', 'menderita_jiwa', 'mengungsi_jiwa']


    let list_2025 = []
    for (let i = 0; i < subjek?.length; i++) {
      const korban = await Korban.sum(subjek[i], {
        include: [
          {
            model: Kejadian,
            where: {
              tanggal: {[Op.like]: '%'+tahun_2025+'%'}
            }
          }
        ]
      });
      list_2025.push(korban)
    }

    let list_2024 = []
    for (let i = 0; i < subjek?.length; i++) {
      const korban = await Korban.sum(subjek[i], {
        include: [
          {
            model: Kejadian,
            where: {
              tanggal: {[Op.like]: '%'+tahun_2024+'%'}
            }
          }
        ]
      });
      list_2024.push(korban)
    }

   const total_2025 = list_2025.reduce((a, i) => a + i)

   const total_2024 = list_2024.reduce((a, i) => a + i)

    // query perhitungan persentase
    const nilai_awal = total_2024
    const nilai_akhir = total_2025
    const hasil_pengurangan =  nilai_akhir - nilai_awal
    const hasil_pembagian = hasil_pengurangan / nilai_awal
    const hasil_kali = hasil_pembagian * 100
    // query perhitungan persentase




    res.json({
      meninggal: list_2025[0],
      hilang: list_2025[1],
      menderita: list_2025[2],
      mengungsi: list_2025[3],
      hasil_persentase: hasil_kali 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCountKejadianPerTahun = async (req, res) => {

  const tgl_2024 = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12']
  const tgl_2025 = ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12']


  try {
    let list_2025 = []
    for (let i = 0; i < tgl_2025?.length; i++) {
      const kejadian = await Kejadian.findAndCountAll({
        where: {
          tanggal: {[Op.like]: '%'+tgl_2025[i]+'%'}
        },
      });
      list_2025.push(kejadian.count)
    }

    let list_2024 = []
    for (let i = 0; i < tgl_2024?.length; i++) {
      const kejadian = await Kejadian.findAndCountAll({
        where: {
          tanggal: {[Op.like]: '%'+tgl_2024[i]+'%'}
        },
      });
      list_2024.push(kejadian.count)
    }

      res.json({total_2025: list_2025, total_2024: list_2024});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const getCountKejadianPerJenisKejadian = async (req, res) => {

  const search = req.query.search_query || "";
  const tahun = req.query.search_tahun || "";
  const tgl = [`${tahun}-01`, `${tahun}-02`, `${tahun}-03`, `${tahun}-04`, `${tahun}-05`, `${tahun}-06`, `${tahun}-07`, `${tahun}-08`, `${tahun}-09`, `${tahun}-10`, `${tahun}-11`, `${tahun}-12`]

  try {
    let list = []
    for (let i = 0; i < tgl?.length; i++) {
      const kejadian = await Kejadian.findAndCountAll({
        where:{
          [Op.and]: [{tanggal:{
              [Op.like]: '%'+tgl[i]+'%'
          }}, {id_jenis_kejadian:{
              [Op.like]: '%'+search+'%'
          }}],
        }
      });
      list.push(kejadian.count)
    }

      res.json({total: list});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const getCountKejadianPerWilayah = async (req, res) => {

  const tahun = req.query.search_tahun || "";
  const Kab = ['7201', '7202', '7203', '7204', '7205', '7206', '7207', '7208', '7209', '7210', '7211', '7212', '7271']


  try {
    let list_ya = []
    for (let i = 0; i < Kab?.length; i++) {
      const kejadian = await Kejadian.findAndCountAll({
        where:{
          [Op.and]: [{ket:{
              [Op.like]: '%'+Kab[i]+'%'
          }}, {tanggal:{
              [Op.like]: '%'+tahun+'%'
          }}, {status_ditangani:{
            [Op.like]: "Ya"
          }}],
        }
      });
      list_ya.push(kejadian.count)
    }

    let list_tidak = []
    for (let i = 0; i < Kab?.length; i++) {
      const kejadian = await Kejadian.findAndCountAll({
        where:{
          [Op.and]: [{ket:{
              [Op.like]: '%'+Kab[i]+'%'
          }}, {tanggal:{
              [Op.like]: '%'+tahun+'%'
          }}, {status_ditangani:{
            [Op.like]: "Tidak"
          }}],
        }
      });
      list_tidak.push(kejadian.count)
    }

      res.json({total_ya: list_ya, total_tidak: list_tidak});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const getKejadianPerJenisKejadian = async (req, res) => {

  const jenisKejadian = await JenisKejadian.findAll();

  try {

    const total_kejadian = await Kejadian.findAndCountAll({
      where: {
        tanggal: {[Op.like]: '%'+'2025'+'%'}
      },
    });


    let list = []
    for (let i = 0; i < jenisKejadian?.length; i++) {
      const kejadian = await Kejadian.findAndCountAll({
        where:{
          [Op.and]: [{tanggal:{
              [Op.like]: '%'+'2025'+'%'
          }}, {id_jenis_kejadian:{
              [Op.like]: '%'+jenisKejadian[i].id+'%'
          }}],
        },
        // include: [JenisKejadian]
      });
      list.push(
      {
        "label" : jenisKejadian[i],
        "count" : kejadian?.count
      }
    )
    }

      res.json({data: list, total: total_kejadian.count});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};


const getPersentaseKejadian = async (req, res) => {
  try {
    
    const kejadian_2024 = await Kejadian.findAndCountAll({
      where: {
        tanggal: {[Op.like]: '%'+'2024'+'%'}
      },
    });
    const kejadian_2025 = await Kejadian.findAndCountAll({
      where: {
        tanggal: {[Op.like]: '%'+'2025'+'%'}
      },
    });

    // query perhitungan persentase
    const nilai_awal = kejadian_2024.count
    const nilai_akhir = kejadian_2025.count
    const hasil_pengurangan =  nilai_akhir - nilai_awal
    const hasil_pembagian = hasil_pengurangan / nilai_awal
    const hasil_kali = hasil_pembagian * 100
    // query perhitungan persentase

    // kalo mines berarti penurunan bencana, dan kebalikanya

    res.json(hasil_kali);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const getKejadianSearch = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;

    const kab = req.query.kab || "";
    const jenis = req.query.jenis || "";
    const tahun = req.query.tahun || "";
    const bulan = req.query.bulan || "";
    const status = req.query.status || "";

    const offset = limit * page;
    const totalRows = await Kejadian.count({
        where:{
            [Op.and]: [{id_jenis_kejadian:{
                [Op.like]: '%'+jenis+'%'
            }}, {tanggal:{
                [Op.like]: '%'+tahun+'%'
            }}, {tanggal:{
                [Op.like]: '%'+bulan+'%'
            }}, {status_ditangani:{
                [Op.like]: '%'+status+'%'
            }}, {ket:{
                [Op.like]: '%'+kab+'%'
            }}],
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Kejadian.findAll({
      where:{
        [Op.and]: [{id_jenis_kejadian:{
            [Op.like]: '%'+jenis+'%'
        }}, {tanggal:{
            [Op.like]: '%'+tahun+'%'
        }}, {tanggal:{
            [Op.like]: '%'+bulan+'%'
        }}, {status_ditangani:{
            [Op.like]: '%'+status+'%'
        }}, {ket:{
            [Op.like]: '%'+kab+'%'
        }}],
      },
        offset: offset,
        limit: limit,
        order: [["tanggal", "DESC"]],
        include: [JenisKejadian],
    });
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
}

const getKejadian = async (req, res) => {
  try {
    const kejadian = await Kejadian.findAll({
      order: [["created_at", "DESC"]],
      include: [JenisKejadian],
    });
    res.json(kejadian);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getKejadian = async (req, res) => {

// };

const getKejadianById = async (req, res) => {
  try {
    const kejadian = await Kejadian.findAll({
      where: {
        id_kejadian: req.params.id,
      },
      include: [JenisKejadian],
    });
    res.json(kejadian[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getKejadianByIdUser = async (req, res) => {
    try {
        const kejadian = await Kejadian.findAll({
            where: {
                id_user: req.params.id,
            }
        });
        res.json(kejadian);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postKejadian = async (req, res) => {
  const {id_kejadian, id_user, id_jenis_kejadian, kronologis, tanggal, jam, titik_lokasi, status_ditangani, verification, ket} = req.body;

  if (req.file) {
    const files = req.file;
    const fileName = files.filename;
    const fileSize = files.size;
    const type = files.mimetype;
    const allowedType = ['image/jpeg','image/jpg','image/png', "application/pdf"];
    const url = `http://localhost:5001/public/images/${fileName}`;
    // const url = `https://pusdalops-backend.com.pusdalops-bpbdsulteng.com/api/images/${fileName}`;

    if(!allowedType.includes(type)) return res.status(422).json({message: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({message: "Image must be less than 5 MB"});
    
        try {
            await Kejadian.create({
                id_kejadian: id_kejadian,
                id_user: id_user,
                id_jenis_kejadian: id_jenis_kejadian,
                kronologis: kronologis,
                tanggal: tanggal,
                jam: jam,
                titik_lokasi: titik_lokasi,
                file_laporan_akhir: fileName,
                url: url,
                status_ditangani: status_ditangani,
                verification: verification,
                ket: ket
             });
                res.status(201).json({message: "Created Successfuly"});
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
         
  } else {
      
          try {
              await Kejadian.create({
                id_kejadian: id_kejadian,
                id_user: id_user,
                id_jenis_kejadian: id_jenis_kejadian,
                kronologis: kronologis,
                tanggal: tanggal,
                jam: jam,
                titik_lokasi: titik_lokasi,
                file_laporan_akhir: "",
                url: "",
                status_ditangani: status_ditangani,
                verification: verification,
                ket: ket
              });
              res.status(201).json({message: "Created Successfuly"});
          } catch (error) {
              res.status(400).json({ message: error.message });
          }
  }
};

const updateKejadian = async (req, res) => {
    const {id_kejadian, id_user, id_jenis_kejadian, kronologis, tanggal, jam, titik_lokasi, status_ditangani, verification, ket} = req.body;
    const kejadian = await Kejadian.findOne({
        where:{
            id_kejadian: req.params.id
        }
    });
    if(!kejadian) return res.status(404).json({message: "No Data Found"});

    if (req.file) {
        const files = req.file;
        const fileName = files.filename;
        const fileSize = files.size;
        const type = files.mimetype;
        const allowedType = ['image/jpeg','image/jpg','image/png', "application/pdf"];
        const url = `http://localhost:5001/public/images/${fileName}`;
        // const url = `https://pusdalops-backend.com.pusdalops-bpbdsulteng.com/api/images/${fileName}`;

        if(!allowedType.includes(type)) return res.status(422).json({message: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({message: "Image must be less than 5 MB"});
        
            try {
                await Kejadian.update({
                  id_kejadian: id_kejadian,
                  id_user: id_user,
                  id_jenis_kejadian: id_jenis_kejadian,
                  kronologis: kronologis,
                  tanggal: tanggal,
                  jam: jam,
                  titik_lokasi: titik_lokasi,
                  file_laporan_akhir: fileName,
                  url: url,
                  status_ditangani: status_ditangani,
                  verification: verification,
                  ket: ket
                },{
                    where:{
                        id_kejadian: req.params.id
                    }
                });
                    res.status(201).json({message: "Created Successfuly"});
                } catch (error) {
                    res.status(400).json({ message: error.message });
                }
        
    } else {

            try {
                await Kejadian.update({
                  id_kejadian: id_kejadian,
                  id_user: id_user,
                  id_jenis_kejadian: id_jenis_kejadian,
                  kronologis: kronologis,
                  tanggal: tanggal,
                  jam: jam,
                  titik_lokasi: titik_lokasi,
                  file_laporan_akhir: kejadian.file_laporan_akhir,
                  url: kejadian.url,
                  status_ditangani: status_ditangani,
                  verification: verification,
                  ket: ket
                },{
                    where:{
                        id_kejadian: req.params.id
                    }
                    });
                res.status(201).json({message: "Created Successfuly"});
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
    }
};

const getKejadianForUpdate = async (req, res) => {
  try {
    const lokasi = await LokasiKejadian.findAll({where:{id_kejadian: req.params.id}});

    const korban = await Korban.findAll({where:{id_kejadian: req.params.id}});

    const kerusakan = await Kerusakan.findAll({where:{id_kejadian: req.params.id}});

    let data = []
    for (let i = 0; i < lokasi?.length; i++) {
      data.push({
        id_lokasi: lokasi[i]?.id_lokasi,
        kab: lokasi[i]?.kab,
        kec: lokasi[i]?.kec,
        desa: lokasi[i]?.desa,
        dusun: lokasi[i]?.dusun,
        lat: lokasi[i]?.lat,
        long: lokasi[i]?.long,
  
        id_korban: korban[i]?.id_korban,
        meninggal: korban[i]?.meninggal,
        luka_luka: korban[i]?.luka_luka,
        sakit: korban[i]?.sakit,
        hilang: korban[i]?.hilang,
        menderita_kk: korban[i]?.menderita_kk,
        menderita_jiwa: korban[i]?.menderita_jiwa,
        mengungsi_kk: korban[i]?.mengungsi_kk,
        mengungsi_jiwa: korban[i]?.mengungsi_jiwa,
  
        id_kerusakan: kerusakan[i].id_kerusakan,
        rumah_terdampak: kerusakan[i]?.rumah_terdampak,
        rm_rusak_ringan: kerusakan[i]?.rm_rusak_ringan,
        rm_rusak_sedang: kerusakan[i]?.rm_rusak_sedang,
        rm_rusak_berat: kerusakan[i]?.rm_rusak_berat,
        sarana_pendidikan: kerusakan[i]?.sarana_pendidikan,
        sarana_ibadah: kerusakan[i]?.sarana_ibadah,
        sarana_kesehatan: kerusakan[i]?.sarana_kesehatan,
        perkantoran: kerusakan[i]?.perkantoran,
        bangunan_lain: kerusakan[i]?.bangunan_lain,
        jalan: kerusakan[i]?.jalan,
        jembatan: kerusakan[i]?.jembatan,
        sawah: kerusakan[i]?.sawah,
        kebun: kerusakan[i]?.kebun,
        tambak: kerusakan[i]?.tambak,
        irigasi: kerusakan[i]?.irigasi
      })
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteKejadian = async (req, res) => {
  const dokumentasi = await Dokumentasi.findAll({where:{id_kejadian: req.params.id}});
  dokumentasi.map((val) => {
    const filepath = `./public/images/${val?.dataValues?.image}`;
    fs.unlinkSync(filepath);
  })

  try {
    await Kejadian.destroy({
      where: {
        id_kejadian: req.params.id,
      },
    });
    await LokasiKejadian.destroy({
      where: {
        id_kejadian: req.params.id,
      },
    });
    await Korban.destroy({
      where: {
        id_kejadian: req.params.id,
      },
    });
    await Kerusakan.destroy({
      where: {
        id_kejadian: req.params.id,
      },
    });
    await Dokumentasi.destroy({
      where: {
        id_kejadian: req.params.id,
      },
    });

    res.status(200).json({ message: "Kejadian Deleted Successfuly" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// const getKejadianPerTahun = async (req, res) => {
//   try {
//     // const tahun = req.query.tahun || "2025";
//     const tahun = req.query.tahun || new Date().getFullYear().toString();

//     const kejadianList = await Kejadian.findAll({
//       where: { tanggal: { [Op.like]: `%${tahun}%` } },
//       include: [
//         { model: JenisKejadian },
//         { 
//           model: LokasiKejadian,
//           include: ["Kabupaten", "Kecamatan", "Desa"] // pastikan alias sesuai model Anda
//         }
//       ]
//     });

//     const geojson = {
//       type: "FeatureCollection",
//       features: kejadianList.flatMap(kejadian =>
//         kejadian.LokasiKejadians.map(lokasi => ({
//           type: "Feature",
//           geometry: {
//             type: "Point",
//             coordinates: [
//               parseFloat(lokasi.long),
//               parseFloat(lokasi.lat)
//             ]
//           },
//           properties: {
//             kejadian: kejadian.JenisKejadian?.nama || "",
//             tgl: kejadian.tanggal,
//             lokasi: lokasi.Desa?.nama || lokasi.desa,   // nama desa
//             kec: lokasi.Kecamatan?.nama || lokasi.kec,  // nama kecamatan
//             kab: lokasi.Kabupaten?.nama || lokasi.kab,  // nama kabupaten
//             kronologis: kejadian.kronologis
//           }
//         }))
//       )
//     };

//     res.json(geojson);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

//versi aman

const getKejadianPerTahun = async (req, res) => {
  try {
    const tahun = req.query.tahun || new Date().getFullYear().toString();

    const { Kejadian, LokasiKejadian, Kabupaten, Kecamatan, Kelurahan } = require("../models/Connector.js");
    const kejadianList = await Kejadian.findAll({
      where: { tanggal: { [Op.like]: `%${tahun}%` } },
      include: [
        { model: JenisKejadian, as: "JenisKejadian" },
        { 
          model: LokasiKejadian, as: "LokasiKejadians",
          include: [
            { model: Kabupaten, as: "Kabupaten" },
            { model: Kecamatan, as: "Kecamatan" },
            { model: Kelurahan, as: "Kelurahan" }
          ]
        }
      ]
    });
    const geojson = {
      type: "FeatureCollection",
      features: kejadianList.flatMap(kejadian =>
        (kejadian.LokasiKejadians ?? [])
          .filter(lokasi => lokasi?.lat && lokasi?.long) // hanya ambil lokasi yg ada koordinat
          .map(lokasi => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [parseFloat(lokasi.long), parseFloat(lokasi.lat)]
            },
            properties: {
              kejadian: kejadian?.JenisKejadian?.nama ?? "",
              tgl: kejadian?.tanggal ?? "",
              lokasi: lokasi?.Kelurahan?.name ?? lokasi?.desa ?? "",
              kab: lokasi?.Kabupaten?.name ?? lokasi?.kab ?? "",
              kronologis: kejadian?.kronologis ?? ""
            }
          }))
      )
    };

    res.json(geojson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
    // try {
    //   const tahun = req.query.tahun || new Date().getFullYear().toString();

    //   const { Kejadian, LokasiKejadian, Kabupaten, Kecamatan, Kelurahan } = require("../models/Connector.js");

    //   const kejadianList = await Kejadian.findAll({
    //     where: { tanggal: { [Op.like]: `%${tahun}%` } },
    //     include: [
    //       { model: JenisKejadian, as: "JenisKejadian" },
    //       { 
    //         model: LokasiKejadian, 
    //         as: "LokasiKejadians",
    //         where: {
    //           lat: { [Op.ne]: null },
    //           long: { [Op.ne]: null }
    //         },
    //         required: false, // supaya kejadian tanpa lokasi tetap bisa muncul kalau dibutuhkan
    //         include: [
    //           { model: Kabupaten, as: "Kabupaten" },
    //           { model: Kecamatan, as: "Kecamatan" },
    //           { model: Kelurahan, as: "Kelurahan" }
    //         ]
    //       }
    //     ]
    //   });

    //   const geojson = {
    //     type: "FeatureCollection",
    //     features: kejadianList.flatMap(kejadian =>
    //       (kejadian.LokasiKejadians ?? [])
    //         .filter(lokasi => lokasi?.lat && lokasi?.long && !isNaN(lokasi.lat) && !isNaN(lokasi.long))
    //         .map(lokasi => ({
    //           type: "Feature",
    //           geometry: {
    //             type: "Point",
    //             coordinates: [parseFloat(lokasi.long), parseFloat(lokasi.lat)]
    //           },
    //           properties: {
    //             kejadian: kejadian?.JenisKejadian?.nama ?? "",
    //             tgl: kejadian?.tanggal ?? "",
    //             lokasi: lokasi?.Kelurahan?.name ?? lokasi?.desa ?? "",
    //             kec: lokasi?.Kecamatan?.name ?? lokasi?.kec ?? "",
    //             kab: lokasi?.Kabupaten?.name ?? lokasi?.kab ?? "",
    //             kronologis: kejadian?.kronologis ?? ""
    //           }
    //         }))
    //     )
    //   };

    //   res.json(geojson);
    // } catch (error) {
    //   res.status(500).json({ message: error.message });
    // }

};





module.exports = {
  getCountKejadian,
  getCountKorbanTerdampak,
  getCountKejadianPerTahun, 
  getCountKejadianPerJenisKejadian, 
  getCountKejadianPerWilayah, 
  getKejadianPerJenisKejadian, 
  getPersentaseKejadian,
  getKejadianSearch, 
  getKejadian, 
  getKejadianById, 
  getKejadianByIdUser, 
  postKejadian, 
  updateKejadian, 
  deleteKejadian, 
  getKejadianForUpdate,
  getKejadianPerTahun
};
