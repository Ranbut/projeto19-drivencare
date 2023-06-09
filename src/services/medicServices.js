import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import errors from "../errors/index.js";
import userRepositories from "../repositories/medicRepositories.js";

async function signUp({ name, cpf, email, password, address, specialization}) {

  const { rowCount : countEmail } = await userRepositories.findByEmail(email);
    if (countEmail) throw errors.duplicatedEmailError(email);
  
  const { rowCount : countCpf } = await userRepositories.findByCpf(cpf);
  if (countCpf) throw errors.duplicatedEmailError(cpf);

  const hashPassword = await bcrypt.hash(password, 10);
  await userRepositories.newMedic({ name, cpf, email, password: hashPassword, address, specialization });
}

async function login({ email, password }) {
  const { rowCount, rows: [user] } = await userRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = jwt.sign({ id: user.id, type: "medic"}, process.env.SECRET_JWT, { expiresIn: 86400 });

  return token;
}

async function addAvaliableDate(userId, date, time) {
  const { rowCount } = await userRepositories.findDateTime(date, time);
  if (rowCount) throw errors.duplicatedDateTimeAvaliable();
  
  await userRepositories.addAvaliableDate(userId, date, time);
}

async function medicsByName(name) {
  console.log(name)
  const result = await userRepositories.findByName(name);

  return result;
}

async function medicsBySpecialty(specialty) {
  const result = await userRepositories.findBySpecialty(specialty);

  return result;
}

async function medicsByAddress(address) {
  const typeLikeInput = `%${address}%`;
  const result = await userRepositories.findByAddress(typeLikeInput);

  return result;
}

export default {
  signUp,
  login,
  addAvaliableDate,
  medicsByName,
  medicsBySpecialty,
  medicsByAddress,
};