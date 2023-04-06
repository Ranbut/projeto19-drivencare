import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import errors from "../errors/index.js";
import userRepositories from "../repositories/patientRepositories.js";

async function signUp({ name, cpf, email, password }) {

  const { rowCount : countEmail } = await userRepositories.findByEmail(email);
  if (countEmail) throw errors.duplicatedEmailError(email);

  const { rowCount : countCpf } = await userRepositories.findByCpf(cpf);
  if (countCpf) throw errors.duplicatedEmailError(cpf);

  const hashPassword = await bcrypt.hash(password, 10);
  await userRepositories.newPatient({ name, cpf, email, password: hashPassword });
}

async function login({ email, password }) {

  const { rowCount, rows: [user] } = await userRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw errors.invalidCredentialsError();

  const token = jwt.sign({ id: user.id, type: "patient" }, process.env.SECRET_JWT, { expiresIn: 86400 });

  return token;
}

export default {
  signUp,
  login,
};