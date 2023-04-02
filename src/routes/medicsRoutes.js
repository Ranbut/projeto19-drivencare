import { Router } from "express";
import medicControllers from "../controllers/medicControllers.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import medicsSchemma from "../schemas/Medics.js";

const medicRoutes = Router();

medicRoutes.post('/sign-up', validateSchema(medicsSchemma.signUp), medicControllers.signUp)
medicRoutes.post('/login', validateSchema(medicsSchemma.login), medicControllers.login)

export default medicRoutes;