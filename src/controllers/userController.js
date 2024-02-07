import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { createUser } from '../dataAccessLayer/userDAL.js';

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

    // Exclude password from response payload
    const userResponse = {
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      username: newUser.username,
      account_created: newUser.account_created,
      account_updated: newUser.account_updated
    };

    res.status(201).json(userResponse);
  } catch (error) {

    // Check for specific error types
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    if (error.name && error.name === "SequelizeConnectionRefusedError"){
      console.error('Database connection error: ', error);
      return res.status(503).send();
    }
    
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserAccount = async (req, res) => {
  try{
    res.status(204).json();
  } catch(error){
    if (error.name && error.name === 'SequelizeConnectionRefusedError') {
      console.error('Database connection error: ', error);
      return res.status(503).json();
    } else {
        console.error('Error authenticating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

const getUserAccount = async (req, res) => {
  try{
    res.status(200).json();
  } catch(error){
    if (error.name && error.name === 'SequelizeConnectionRefusedError') {
      console.error('Database connection error: ', error);
      return res.status(503).json();
    } else {
        console.error('Error authenticating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export { createUserAccount, getUserAccount, updateUserAccount };
