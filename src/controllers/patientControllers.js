import patientServices from "../services/patientServices.js";

async function signUp(req, res, next) {
  const { fullName, cpf ,email, password } = req.body;
  try {
    await patientServices.signUp({ fullName, cpf, email, password });

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await patientServices.login({ email, password });

    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

export default {
  signUp,
  login,
};