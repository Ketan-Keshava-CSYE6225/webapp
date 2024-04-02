import User from "../models/User.js";
import logger from "../utils/logger.js"
import { mapUserToUserLogRead } from "../mappers/LogReadUserMapper.js";

const createUser = async (userData) => {
    const user = await User.create(userData);
    logger.debug("New user created:" + JSON.stringify(mapUserToUserLogRead(user),null, 2));
    return user;
}

const findUserByUsername = async (un) => {
    const user = await User.findOne({ where : { username : un } });
    logger.debug("User found:" + JSON.stringify(mapUserToUserLogRead(user),null, 2));
    return user;
}

const  updateUserByUsername = async (un, userData) => {
    const [, updatedUser] = await User.update(userData, {
        where: { username: un },
        returning: true
    })

    logger.debug("User updated:" + JSON.stringify(mapUserToUserLogRead(updatedUser),null, 2));

    return updatedUser;
}

const findUserById = async (userId) => {
    const user = await User.findOne({ where : { id : userId } });
    logger.debug("findUserById User:" + JSON.stringify(mapUserToUserLogRead(user),null, 2));
    return user;
}

const findUserByToken = async (token) => {
    const user = await User.findOne({ where : { verification_token : token } });
    logger.debug("findUserByToken User:" + JSON.stringify(mapUserToUserLogRead(user),null, 2));
    return user;
}

export { createUser , findUserByUsername, updateUserByUsername, findUserById, findUserByToken }