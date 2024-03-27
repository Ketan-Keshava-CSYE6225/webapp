import bcrypt from 'bcrypt';
import { findUserByUsername } from '../dataAccessLayer/userDAL.js';
import logger from '../utils/logger.js';

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        logger.error('Unauthorized: No credentials provided');
        return res.status(401).json();
    }

    // Checking if Basic Auth
    if (!authHeader.startsWith('Basic')) {
        res.setHeader('WWW-Authenticate', 'Basic');
        logger.warn('Unauthorized: Invalid authentication method')
        return res.status(401).json();
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii').split(':');
    const username = auth[0];
    const password = auth[1];

    if (!username || !password) {
        logger.error('Unauthorized: Invalid credentials');
        return res.status(401).json();
    }

    try {
        // Retrieve user from the database based on username
        const user = await findUserByUsername(username);

        if (user === null) {
            // If user not found, return 401 Unauthorized
            logger.error(`Invalid login attempt for ${username}`);
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // If password doesn't match, return 401 Unauthorized
            logger.error('Unauthorized: Invalid credentials');
            return res.status(401).json({ message: 'Unauthorized: Incorrect password' });
        }

        if(user.user_verification_status === false){
            logger.warn('Unauthorized: User not verified');
            return res.status(403).json({ message: 'Unauthorized: User not verified' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name && error.name === 'SequelizeConnectionRefusedError') {
            logger.error('Database connection error: ' + error);
            return res.status(503).json();
        } else {
            logger.error('Error authenticating user:' + error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export { authenticateToken };
