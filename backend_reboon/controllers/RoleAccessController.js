const RoleAccess = require("../models/RoleAccessModel.js");

const getRoleAccessById = async (req, res) => {
    try {
        const roleAccess = await RoleAccess.findAll({
            where: {
                role_id: req.params.id,
            },
        });
        res.json(roleAccess);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postRoleAccess = async (req, res) => {

    try {
        const postRoleAccess = await RoleAccess.bulkCreate(req.body);
        res.status(201).json(postRoleAccess);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

const updateRoleAccess = async (req, res) => {

    try {

        await RoleAccess.bulkCreate(req.body,
            {
                updateOnDuplicate: ["can_create", "can_read", "can_update", "can_delete", "can_other"]
            },
            {
            where: {id_role_access: req.params.id}
            }
        );
        res.status(200).json({message: "Role Updates Successfuly"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {getRoleAccessById, postRoleAccess, updateRoleAccess};
