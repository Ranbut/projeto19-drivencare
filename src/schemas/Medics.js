import joi from "joi";

const signUp = joi.object({
    fullName: joi.string().required(),
    cpf: joi.string().min(11).required(),
    address: joi.string().required(),
    specialization: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref("password")
  });
  

const login = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export default {
    signUp,
    login,
  };
  