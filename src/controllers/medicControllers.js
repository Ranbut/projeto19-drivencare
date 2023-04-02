import medicServices from "../services/medicServices.js";

async function signUp(req, res, next) {
  const { fullName, cpf, email, password, address, specialization } = req.body;
  try {
    await medicServices.signUp({ fullName, cpf, email, password, address, specialization });

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await medicServices.login({ email, password });

    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

async function medicsByName(req, res, next) {
  const { fullName } = req.params;
  try {
    const { rows: medics } = await medicServices.medicsByName({ fullName });

    return res.send({ medics });
  } catch (err) {
    next(err);
  }
}

async function medicsBySpecialty(req, res, next) {
  const { specialty } = req.params;
  try {
    const { rows: medics } = await medicServices.medicsBySpecialty({ specialty });

    return res.send({ medics });
  } catch (err) {
    next(err);
  }
}

async function medicsByAddress(req, res, next) {
  const { address } = req.params;
  try {
    const { rows: medics } = await medicServices.medicsByAddress({ address });

    return res.send({ medics });
  } catch (err) {
    next(err);
  }
}

export default {
  signUp,
  login,
  medicsByName,
  medicsBySpecialty,
  medicsByAddress
};