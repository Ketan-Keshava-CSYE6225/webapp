// Import Sequelize library and database connection
import { Sequelize, DataTypes } from 'sequelize';
import db from '../orm/sequelize.js'; // Assuming your Sequelize instance is exported from this file

// Define the User model
const User = db.sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
    noUpdate: true //Adds no update/readonly attributes support to models
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      // You can hash the password here before saving it to the database
      // Example: this.setDataValue('password', hashFunction(value));
      this.setDataValue('password', value);
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  account_created: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
    noUpdate: true //Adds no update/readonly attributes support to models
  },
  account_updated: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  verification_token: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4
  },
  verification_link_expiry_timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  user_verification_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  // timestamps: false, // Disable sequelize's default timestamps (createdAt, updatedAt)
  tableName: 'users', // Define the table name explicitly
  createdAt: 'account_created',
  updatedAt: 'account_updated',
  indexes: [
    {
      unique: true,
      fields: ['username']
    }
  ]
});

// Export the User model
export default User;