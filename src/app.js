import express from 'express';
import healthRoutes from './routes/healthRoutes.js';
import userRouter from './routes/userRoutes.js';
import db from './orm/sequelize.js'
import { stringToBoolean } from './utils/utils.js';
import logger from './utils/logger.js';

export const app = express();
app.use(express.json());

//Bootstrap the database by synchronizing Sequelize models with the database
//force: stringToBoolean(process.env.DROP_DB)
db.sequelize.sync({force: stringToBoolean(process.env.DROP_DB)})
  .then(() => {
    logger.info('Database sychronised successfully.')
  })
  .catch((error) => {
    logger.error('Error synchronizing database: ' + error)
  })

app.use('/healthz', healthRoutes);
app.use('/v2/user', userRouter)

app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});