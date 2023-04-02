import { Router } from "express";
import patientControllers from "../controllers/patientControllers.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import patientSchemma from "../schemas/Patients.js";

const patientRoutes = Router();

patientRoutes.post('/sign-up', validateSchema(patientSchemma.signUp), patientControllers.signUp)
patientRoutes.post('/login', validateSchema(patientSchemma.login), patientControllers.login)

export default patientRoutes;