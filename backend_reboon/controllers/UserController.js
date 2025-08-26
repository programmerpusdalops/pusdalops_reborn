const User = require("../models/UserModel.js");
const Kejadian = require("../models/KejadianBencanaModel.js")
// const bcrypt = require("bcrypt");
const fs = require("fs");
const Role = require("../models/RoleModel.js");
const Kabupaten = require("../models/KabupatenModel.js");

const getUsers = async (req, res) => {
    try {
        const user = await User.findAll({
            order:[
                ['created_at', 'DESC']
              ],
            include: [Role]
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                id_user: req.params.id,
            },
            include: [Role, Kabupaten]
        });
        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const postUser = async (req, res) =>  {
    const { username, password, telepon, kab, is_active, role_id} = req.body;

    const oldUser = await User.findOne({where:{username: req.body.username}});
    if (oldUser) return res.status(400).json({ message: "Maaf Username Sudah Terdaftar" });

    if (req.file) {
        const files = req.file;
        const fileName = files.filename;
        const fileSize = files.size;
        const type = files.mimetype;
        const allowedType = ['image/jpeg','image/jpg','image/png'];
        const url = `http://localhost:5001/public/images/${fileName}`;
        // const url = `https://pusdalops-backend.com.pusdalops-bpbdsulteng.com/api/images/${fileName}`;

        if(!allowedType.includes(type)) return res.status(422).json({message: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({message: "Image must be less than 5 MB"});

        // const salt = await bcrypt.genSalt();
        // const hashPassword = await bcrypt.hash(password, salt);
        
            try {
                await User.create({
                    username: username,
                    // password: hashPassword,
                    password: password,
                    image: fileName,
                    url: url,
                    telepon: telepon,
                    kab: kab,
                    is_active: is_active,
                    role_id: role_id
                 });
                    res.status(201).json({message: "Created Successfuly"});
                } catch (error) {
                    res.status(400).json({ message: error.message });
                }
             
        
    } else {
        // const salt = await bcrypt.genSalt();
        // const hashPassword = await bcrypt.hash(password, salt);
        
            try {
                await User.create({
                    username: username,
                    // password: hashPassword,
                    password: password,
                    telepon: telepon,
                    kab: kab,
                    image: 'default.png',
                    url: `http://localhost:5001/public/images/default.png`,
                    is_active: is_active,
                    role_id: role_id
                });
                res.status(201).json({message: "Created Successfuly"});
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
    }

    
}


const updateUser = async (req, res) =>  {
    const { username, telepon, kab, role_id, is_active } = req.body;
    const user = await User.findOne({
        where:{
            id_user: req.params.id
        }
    });
    if(!user) return res.status(404).json({message: "No Data Found"});

    if (req.file) {
        const files = req.file;
        const fileName = files.filename;
        const fileSize = files.size;
        const type = files.mimetype;
        const allowedType = ['image/jpeg','image/jpg','image/png'];
        const url = `http://localhost:5001/public/images/${fileName}`;
        // const url = `https://pusdalops-backend.com.pusdalops-bpbdsulteng.com/api/images/${fileName}`;

        if(!allowedType.includes(type)) return res.status(422).json({message: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({message: "Image must be less than 5 MB"});
        
            try {
                await User.update({
                    username: username,
                    telepon: telepon,
                    kab: kab,
                    image: fileName,
                    url: url,
                    is_active: is_active,
                    role_id: role_id
                },{
                    where:{
                        id_user: req.params.id
                    }
                });
                    res.status(201).json({message: "Created Successfuly"});
                } catch (error) {
                    res.status(400).json({ message: error.message });
                }
        
    } else {

            try {
                await User.update({
                    username: username,
                    telepon: telepon,
                    kab: kab,
                    image: user.image,
                    url: user.url,
                    is_active: is_active,
                    role_id: role_id
                },{
                    where:{
                        id_user: req.params.id
                    }
                    });
                res.status(201).json({message: "Created Successfuly"});
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
    }

    
}

const updateIsActive = async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                id_user: req.params.id
            }
        });
        res.status(201).json({message: "User update Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const deleteUser = async (req, res) => {

    const oldUser = await Kejadian.findOne({where:{id_user: req.params.id}});
    if (oldUser) return res.status(400).json({ message: "Maaf User Sudah Pernah Melakukan Asesment" });

    if (oldUser) {
        const user = await User.findOne({where:{id_user: req.params.id}});
        const filepath = `./public/images/${user.image}`;
        fs.unlinkSync(filepath);
    }

    try {
        await User.destroy({
            where: {
                id_user: req.params.id
            }
        });
        res.status(200).json({message: "User Deleted Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {getUsers, getUserById, postUser, updateUser, updateIsActive, deleteUser}