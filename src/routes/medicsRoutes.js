import { Router } from "express";
import medicControllers from "../controllers/medicControllers.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import Medic from "../schemas/Medics.js";
import authValidation from "../middlewares/authMiddleware.js";
import dateTimeValidation from "../middlewares/dateTimeValidationMiddleware.js";

const medicRoutes = Router();

medicRoutes.post('/sign-up', validateSchema(Medic.signUp), medicControllers.signUp)
medicRoutes.post('/login', validateSchema(Medic.login), medicControllers.login)
medicRoutes.post('/avaliable', validateSchema(Medic.createAvaliable), dateTimeValidation, authValidation, medicControllers.addAvaliableDate)
medicRoutes.get('/name/:name', authValidation, medicControllers.medicsByName)
medicRoutes.get('/specialty/:specialty', authValidation, medicControllers.medicsBySpecialty)
medicRoutes.get('/address/:address', authValidation, medicControllers.medicsByAddress)

export default medicRoutes;