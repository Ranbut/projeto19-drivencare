import errors from "../errors/index.js";
import patientsRepositories from "../repositories/patientRepositories.js";
import medicsRepositories from "../repositories/medicRepositories.js";
import sessionRepositories from "../repositories/sessionRepositories.js";

async function validationPatient(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) throw errors.unauthorizedError();
  
    try {
      const { rows: [session] } = await sessionRepositories.findSessionByToken(token);
      if (!session) throw errors.unauthorizedError();
  
      const { rows: [user] } = await patientsRepositories.findById(session.userId);
      if (!user) throw errors.notFoundError();
      res.locals.user = user;
      next();
    } catch (err) {
      next(err);
    }
  }
  
  async function validationMedic(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
  
    if (!token) throw errors.unauthorizedError();
  
    try {

      const { rows: [session] } = await sessionRepositories.findSessionByToken(token);
      if (!session) throw errors.unauthorizedError();

      const { rows: [user] } = await medicsRepositories.findById(session.userId);
      if (!user) throw errors.notFoundError();

      res.locals.user = user;
      next();
    } catch (err) {
      next(err);
    }
  }

  export default { validationPatient, validationMedic };