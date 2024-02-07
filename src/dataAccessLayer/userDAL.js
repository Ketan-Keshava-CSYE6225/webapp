import User from "../models/User.js";

const createUser = async (userData) => {
    return await User.create(userData);
}

const findUserByUsername = async (un) => {
    return await User.findOne({ where : { username : un } });
}

export { createUser , findUserByUsername}