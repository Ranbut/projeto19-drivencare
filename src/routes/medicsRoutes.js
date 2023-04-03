import { Router } from "express";
import medicControllers from "../controllers/medicControllers.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import medicsSchemma from "../schemas/Medics.js";
import auth from "../middlewares/authMiddleware.js";

const medicRoutes = Router();

medicRoutes.post('/sign-up', validateSchema(medicsSchemma.signUp), medicControllers.signUp)
medicRoutes.post('/login', validateSchema(medicsSchemma.login), medicControllers.login)
medicRoutes.get('/name/:fullName', auth.validationMedic, medicControllers.medicsByName)
medicRoutes.get('/specialty/:specialty', auth.validationMedic, medicControllers.medicsBySpecialty)
medicRoutes.get('/address/:address', auth.validationMedic, medicControllers.medicsByAddress)

export default medicRoutes;