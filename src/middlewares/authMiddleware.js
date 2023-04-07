import errors from "../errors/index.js";
import patientsRepositories from "../repositories/patientRepositories.js";
import medicsRepositories from "../repositories/medicRepositories.js";
import jwt from "jsonwebtoken";

export default async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      try {
        if (error !== null) throw errors.unauthorizedError();
  
        if (decoded.type === "patient"){
          const { rows: [user]} = await patientsRepositories.findById(decoded.id);
          if (!user) throw errors.unauthorizedError();
          res.locals.user = user;
          res.locals.type = "patient";
        }
        else if (decoded.type === "medic"){
          const { rows: [user]} = await medicsRepositories.findById(decoded.id);
          if (!user) throw errors.unauthorizedError();
          res.locals.user = user;
          res.locals.type = "medic";
        }
        
        next();
      } catch (err) {
        console.log(decoded);
        console.log(err);
        next(err);
      }
    });
  }