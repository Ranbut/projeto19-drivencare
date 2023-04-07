import medicServices from "../services/medicServices.js";

async function signUp(req, res, next) {
  const userData = req.body;
  try {
    await medicServices.signUp(userData);

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function login(req, res, next) {
  const userData = req.body;
  try {
    const token = await medicServices.login(userData);

    return res.send(token);
  } catch (err) {
    next(err);
  }
}

async function addAvaliableDate(req, res, next) {
  const { date, time } = req.body;
  const { id : userId } = res.locals.user;
  try {
    await medicServices.addAvaliableDate(userId, date, time);

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function medicsByName(req, res, next) {
  const { name } = req.params;
  try {
    const { rows: medics } = await medicServices.medicsByName(name);

    return res.send(medics);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function medicsBySpecialty(req, res, next) {
  const { specialty } = req.params;
  try {
    const { rows: medics } = await medicServices.medicsBySpecialty(specialty);

    return res.send(medics);
  } catch (err) {
    next(err);
  }
}

async function medicsByAddress(req, res, next) {
  const { address } = req.params;
  try {
    const { rows: medics } = await medicServices.medicsByAddress(address);

    return res.send(medics);
  } catch (err) {
    next(err);
  }
}

export default {
  signUp,
  login,
  addAvaliableDate,
  medicsByName,
  medicsBySpecialty,
  medicsByAddress
};