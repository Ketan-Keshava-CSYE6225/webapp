import db from '../orm/sequelize.js';
import logger from '../utils/logger.js';

export const healthController = async (req, res) => {
  try {
    await db.sequelize.authenticate();
    logger.info('Connection has been established successfully.');
    res.status(200).send();
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    res.status(503).send();
  }
};