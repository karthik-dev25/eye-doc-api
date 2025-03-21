import Joi from "joi";

// Define Joi schema for validation
const signupSchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      "any.required": "First name is required",
      "string.empty": "First name cannot be empty",
      "string.min": "First name must be at least 2 characters",
      "string.max": "First name cannot exceed 50 characters",
    }),
    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.email": "Invalid email format",
      "string.empty": "Email cannot be empty",
    }),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "any.required": "Phone number is required",
        "string.pattern.base": "Phone number must be 10 to 15 digits long",
        "string.empty": "Phone number cannot be empty",
      }),
    password: Joi.string().min(6).required().messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least 6 characters long",
      "string.empty": "Password cannot be empty",
    }),
  });

  const loginSchema = Joi.object({
    // email: Joi.string().email().required().messages({
    //   "any.required": "Email is required",
    //   "string.email": "Invalid email format",
    //   "string.empty": "Email cannot be empty",
    // }),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "any.required": "Phone number is required",
        "string.pattern.base": "Phone number must be 10 to 15 digits long",
        "string.empty": "Phone number cannot be empty",
      }),
    password: Joi.string().min(6).required().messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least 6 characters long",
      "string.empty": "Password cannot be empty",
    }),
  });

  export {signupSchema,loginSchema};