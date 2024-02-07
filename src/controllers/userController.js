import bcrypt from 'bcrypt';
import User from '../models/User.js';

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, password, username } = req.body;

    // Hash the user's password securely using BCrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set account_created and account_updated to the current time
    const currentDateTime = new Date();

    // Create the user in the database
    const newUser = await User.create({
      first_name,
      last_name,
      password: hashedPassword,
      username,
      account_created: currentDateTime,
      account_updated: currentDateTime
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
    console.error('Error creating user:', error);

    // Check for specific error types
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { createUser };
