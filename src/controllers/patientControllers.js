import patientServices from "../services/patientServices.js";

async function signUp(req, res, next) {
  const userData = req.body;
  try {
    await patientServices.signUp(userData);

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function login(req, res, next) {
  const userData = req.body;
  try {
    const token = await patientServices.login(userData);

    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

export default {
  signUp,
  login,
};