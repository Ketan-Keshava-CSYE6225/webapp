import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { createUser, updateUserByUsername, findUserById, findUserByToken } from '../dataAccessLayer/userDAL.js';
import { mapUserToUserResponse } from '../mappers/userMappers.js';
import logger from '../utils/logger.js';
import { publishMessage } from '../utils/pubsubClient.js';

const createUserAccount = async (req, res) => {
  try {
    const { first_name, last_name, password, username } = req.body;

    // Hash the user's password securely using BCrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set account_created and account_updated to the current time
    const currentDateTime = new Date();

    // Create the user in the database
    const newUser = await createUser({
      first_name,
      last_name,
      password: hashedPassword,
      username,
      // account_created: currentDateTime,
      // account_updated: currentDateTime
    });

    await publishMessage(process.env.TOPIC_VERIFY_EMAIL, {
      token: newUser.verification_token,
      email: newUser.username
    });

    res.status(201).json(mapUserToUserResponse(newUser));
  } catch (error) {

    // Check for specific error types
    if (error.name === 'SequelizeUniqueConstraintError') {
      logger.error('User with this email already exists' );
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    if (error.name && error.name === "SequelizeConnectionRefusedError"){
      logger.error('Database connection error: ' + error);
      return res.status(503).send();
    }
    
    logger.error('Error creating user:' + error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserAccount = async (req, res) => {
  try{
    const authenticatedUser = req.user;

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const password = req.body.password;

    //Hash the password before storing
    let hashedPassword;
    if(password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Constructing updated user data
    const updateUserData = {};
    if(first_name){
      updateUserData.first_name = first_name;
    }
    if(last_name){
      updateUserData.last_name = last_name;
    }
    if(password){
      updateUserData.password = hashedPassword;
    }

    // logger.info(updateUserData)

    //Update user information
    const updatedUser = updateUserByUsername(authenticatedUser.username, updateUserData);
    logger.info("Updated User Data -> ", updatedUser)

    res.status(204).json();
  } catch(error){
    if (error.name && error.name === 'SequelizeConnectionRefusedError') {
      logger.error('Database connection error: ' + error);
      return res.status(503).json();
    } else {
        logger.error('Error authenticating user:' + error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

const getUserAccount = async (req, res) => {
  try{
    const authenticatedUser = req.user;
    
    res.status(200).json(mapUserToUserResponse(authenticatedUser));
  } catch(error){
    if (error.name && error.name === 'SequelizeConnectionRefusedError') {
      logger.error('Database connection error: ' + error);
      return res.status(503).json();
    } else {
        logger.error('Error authenticating user:' + error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

const verifyUserAccount = async (req, res) => {
  try{
    const { id } = req.params; //params.id = verification_token

    const user = await findUserByToken(id);
    if(!user){
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.user_verification_status === true) {
      logger.warn(`User already verified: ${user.id}`)
      return res.status(200).json({ message: `${user.username} verified successfully` });
    }

    const currentTimestamp = new Date().getTime();

    if(currentTimestamp > user.verification_link_expiry_timestamp.getTime()){
      logger.error(`Verification link expired for ${user.verification_token} `);
      return res.status(403).json({ message: `Verification link expired for ${user.username} ` });
    } else {
      // Prepare the updated user data
      const updatedUserData = {
        user_verification_status: true
      };

      const updatedUser = await updateUserByUsername(user.username, updatedUserData);

      logger.info(`User verified: ${updatedUser.id}`);
      return res.status(200).json({ message: `${user.username} verified successfully` });

    }
  } catch(error){
    if (error.name && error.name === 'SequelizeConnectionRefusedError') {
      logger.error('Database connection error: ' + error);
      return res.status(503).json();
    } else {
        logger.error('Error authenticating user:' + error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export { createUserAccount, getUserAccount, updateUserAccount, verifyUserAccount };
