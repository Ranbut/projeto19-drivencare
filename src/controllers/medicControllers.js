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

export default {
  signUp,
  login,
};