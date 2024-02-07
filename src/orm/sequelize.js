import Sequelize from 'sequelize';
import { development as dbConfig } from '../config/database.js';

const sequelize = new Sequelize(dbConfig);

const db = {
    Sequelize,
    sequelize,
};

export default db;