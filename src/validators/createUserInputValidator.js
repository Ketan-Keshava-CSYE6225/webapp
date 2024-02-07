import Ajv from 'ajv';
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'

// Define the JSON schema
const schema = {
  type: 'object',
  properties: {
    first_name: { type: 'string', minLength: 1 },
    last_name: { type: 'string', minLength: 1 },
    password: { type: 'string', minLength: 6 },
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
  // Validating the request body against the JSON schema
  const valid = validate(req.body);

  if (!valid) {
    // If validation fails, return a 400 Bad Request response
    return res.status(400).json({ error: 'Invalid request body', errors: validate.errors });
  }

  next();
};

export { createUserInputValidator };
