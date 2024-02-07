import User from "../models/User.js";

const createUser = async (userData) => {
    return await User.create(userData);
}

const findUserByUsername = async (un) => {
    return await User.findOne({ where : { username : un } });
}

const  updateUserByUsername = async (un, userData) => {
    const [, updatedUser] = await User.update(userData, {
        where: { username: un },
        returning: true
    })

    return updatedUser;
}
export { createUser , findUserByUsername, updateUserByUsername }