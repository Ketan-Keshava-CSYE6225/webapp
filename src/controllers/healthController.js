import db from '../orm/sequelize.js';

export const healthController = async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.status(200).send();
  } catch (error) {
    res.status(503).send();
  }
};