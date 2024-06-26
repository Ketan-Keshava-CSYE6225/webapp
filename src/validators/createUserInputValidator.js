import Ajv from 'ajv';
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'
import logger from '../utils/logger.js';

// Define the JSON schema
const schema = {
  type: 'object',
  properties: {
    first_name: { 
      type: 'string', 
      minLength: 1, // Minimum length of 1 character
      pattern: '^[a-zA-Z]+$', // Alphabetic characters only
      errorMessage: {
        minLength: 'First name must be at least one character long',
        pattern: 'First name must contain only alphabetic characters'
      }
    },
    last_name: { 
      type: 'string', 
      minLength: 1, // Minimum length of 1 character
      pattern: '^[a-zA-Z]+$', // Alphabetic characters only
      errorMessage: {
        minLength: 'Last name must be at least one character long',
        pattern: 'Last name must contain only alphabetic characters'
      }
    },
    password: {
      type: 'string',
      minLength: 8,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\\d@$!%*?&]+$',
      errorMessage: {
        minLength: 'Password must be at least eight characters long',
        pattern: 'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, &, etc)'
      }
    },
    username: { 
      type: 'string', 
      pattern: '^\\S+@\\S+\\.\\S+$', // Regex pattern for email validation
      errorMessage: 'Invalid email address format' // Error message for invalid email format
    }
  },
  required: ['first_name', 'last_name', 'password', 'username']
};

// Create an instance of Ajv
const ajv = new Ajv({ allErrors: true, $data: true });
addFormats(ajv);
ajvErrors(ajv);

// Create a validator function based on the JSON schema
const validate = ajv.compile(schema);

const createUserInputValidator = (req, res, next) => {
  // Check for unexpected properties
  const allowedProperties = ['first_name', 'last_name', 'password', 'username', 'account_created', 'account_updated'];
  const unexpectedProperties = Object.keys(req.body).filter(property => !allowedProperties.includes(property));

  if (unexpectedProperties.length > 0) {
    logger.error('Unexpected properties in request body: ' + unexpectedProperties);
    return res.status(400).json({ error: 'Unexpected properties in request body', unexpectedProperties });
  }

  // Validating the request body against the JSON schema
  const valid = validate(req.body);

  if (!valid) {
    // If validation fails, return a 400 Bad Request response
    logger.error('Invalid request body: ' + ajv.errorsText(validate.errors));
    return res.status(400).json({ error: 'Invalid request body', errors: validate.errors });
  }

  next();
};

export { createUserInputValidator };
