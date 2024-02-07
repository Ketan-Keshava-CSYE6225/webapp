import User from '../models/User.js';

const checkExistingUsername = async (req, res, next) => {
  const { username } = req.body;

  // Check if a user with the provided email already exists
  const existingUser = await User.findOne({ where: { username } });

  if (existingUser) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  next();
};

export { checkExistingUsername };
