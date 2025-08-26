const RoleAccess = require("../models/RoleAccessModel.js");
const Role = require("../models/RoleModel.js");
const User = require("../models/UserModel.js");

const getRole = async (req, res) => {
    try {
        const role = await Role.findAll({
            order:[
                ['created_at', 'DESC']
              ],
        });
        res.json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getRoleById = async (req, res) => {
    try {
        const role = await Role.findAll({
            where: {
                id_role: req.params.id,
            }
        });
        res.json(role[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const postRole = async (req, res) => {
    if (req.body.title === '') return res.status(400).json({ message: "Maaf, Role Wajib Di isi" });

    const oldRole = await Role.findOne({where:{title: req.body.title}});
    if (oldRole) return res.status(400).json({ message: "Maaf Role Sudah Terdaftar" });


    const role = new Role(req.body);
    try {
        const postRole = await role.save();
        res.status(201).json(postRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateRole = async (req, res) => {
    if (req.body.title === '') return res.status(400).json({ message: "Maaf, Role Wajib Di isi" });

    try {
        await Role.update(req.body, {
            where: {
                id_role: req.params.id
            }
        });
        res.status(200).json({message: "Role Updated Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteRole = async (req, res) => {

    const oldUser = await User.findOne({where:{role_id: req.params.id}});
    if (oldUser) return res.status(400).json({message: "Role Telah Terdapat Pada User Aktif" });

    try {
        await Role.destroy({
            where: {
                id_role: req.params.id
            }
        });

        await RoleAccess.destroy({
            where: {
                role_id: req.params.id
            }
        });
        res.status(200).json({message: "Role Deleted Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {getRole, getRoleById, postRole, updateRole, deleteRole};
