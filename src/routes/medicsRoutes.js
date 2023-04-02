import { Router } from "express";
import medicControllers from "../controllers/medicControllers.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import medicsSchemma from "../schemas/Medics.js";

const medicRoutes = Router();

medicRoutes.post('/sign-up', validateSchema(medicsSchemma.signUp), medicControllers.signUp)
medicRoutes.post('/login', validateSchema(medicsSchemma.login), medicControllers.login)
medicRoutes.post('/sign-up', medicControllers.signUp)
medicRoutes.get('/name/:fullName', medicControllers.medicsByName)
medicRoutes.get('/specialty/:specialty', medicControllers.medicsBySpecialty)
medicRoutes.get('/address/:address', medicControllers.medicsByAddress)

export default medicRoutes;