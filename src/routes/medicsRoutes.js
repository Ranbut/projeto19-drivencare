import { Router } from "express";
import medicControllers from "../controllers/medicControllers.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import Patient from "../schemas/Medics.js";
import authValidation from "../middlewares/authMiddleware.js";

const medicRoutes = Router();

medicRoutes.post('/sign-up', validateSchema(Patient.signUp), medicControllers.signUp)
medicRoutes.post('/login', validateSchema(Patient.login), medicControllers.login)
medicRoutes.get('/name/:name', authValidation, medicControllers.medicsByName)
medicRoutes.get('/specialty/:specialty', authValidation, medicControllers.medicsBySpecialty)
medicRoutes.get('/address/:address', authValidation, medicControllers.medicsByAddress)

export default medicRoutes;