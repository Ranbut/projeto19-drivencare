import { Router } from "express";
import appointmentControllers from "../controllers/appointmentControllers.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import dateTimeValidation from "../middlewares/dateTimeValidationMiddleware.js";
import Appointments from "../schemas/Appointments.js";
import authValidation from "../middlewares/authMiddleware.js";

const appointmentsRoutes = Router();

appointmentsRoutes.post('/create', validateSchema(Appointments.create), dateTimeValidation, authValidation, appointmentControllers.create);
appointmentsRoutes.put('/:appointId/:status', authValidation, appointmentControllers.confirmStatus);

export default appointmentsRoutes;