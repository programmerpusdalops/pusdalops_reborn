const Users = require("../models/UserModel.js");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = Register = async(req, res) => {
    const { username, password, confPassword, role_id } = req.body;

    const oldUser = await Users.findOne({where:{username: req.body.username}});
    if (oldUser) return res.status(400).json({ message: "Maaf Username Sudah Terdaftar" });

    if(password !== confPassword) return res.status(400).json({message: "Password dan Confirm Password tidak cocok"});

    // const salt = await bcrypt.genSalt();
    // const hashPassword = await bcrypt.hash(password, salt);

    try {
        await Users.create({
            username: username,
            // password: hashPassword,
            password: password,
            url: `https://pusdalops-backend.com.pusdalops-bpbdsulteng.com/api/images/default.png`,
            image: 'default.png',
            role_id: role_id
        });
        res.json({message: "Register Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
 
}




module.exports = Login = async(req, res) => {
    try {
        const user = await Users.findAll({where:{username: req.body.username}});
        if(user[0].is_active === false) return res.status(400).json({message: "Maaf, Username belum diaktifkan"});
        
        if(req.body.password !== user[0].password) return res.status(400).json({message: "Password Anda salah"});

        // const match = await bcrypt.compare(req.body.password, user[0].password);
        // if(!match) return res.status(400).json({message: "Password Anda Salah"});

        const userId = user[0].id_user;
        const username = user[0].username;

        const token = jwt.sign({ username, userId }, 'test', { expiresIn: '24h' });

        const data = {
            id_user: user[0]?.id_user,
            username: user[0]?.username,
            url: user[0]?.url,
            role_id: user[0]?.role_id,
            telepon: user[0]?.telepon,
            kab: user[0]?.kab
        }

        res.status(200).json({ result: data, token });
    } catch (error) {
        res.status(404).json({message:"Username Tidak Terdaftar"});
    }
}

