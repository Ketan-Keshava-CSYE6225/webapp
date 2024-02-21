import express from 'express';
import healthRoutes from './routes/healthRoutes.js';
import userRouter from './routes/userRoutes.js';
import db from './orm/sequelize.js'
import { stringToBoolean } from './utils/utils.js';

export const app = express();
app.use(express.json());

//Bootstrap the database by synchronizing Sequelize models with the database
//force: stringToBoolean(process.env.DROP_DB)
db.sequelize.sync({force: stringToBoolean(process.env.DROP_DB)})
  .then(() => {
    console.log('Database sychronised successfully.')
  })
  .catch((error) => {
    console.error('Error synchronizing database: ', error)
  })
return 123
app.use('/healthz', healthRoutes);
app.use('/v1/user', userRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});