import User from '../models/User.js';
import { findUserByUsername } from '../dataAccessLayer/userDAL.js';

const checkExistingUsername = async (req, res, next) => {
  try{
    const { username } = req.body;

    // Check if a user with the provided email already exists
    const existingUser = await findUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    next();
  } catch(error) {
    if (error.name && error.name === "SequelizeConnectionRefusedError"){
      console.error('Database connection error: ', error);
      return res.status(503).send();
    } else {
      console.error('Error checking if user exists: ', error)
      return res.status(500).json({ message: "Internal Server Error"});
    }
  }
  
};

export { checkExistingUsername };
