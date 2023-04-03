import { Router } from "express";
import appointmentControllers from "../controllers/appointmentControllers.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import dateTimeValidation from "../middlewares/dateTimeValidationMiddleware.js";
import appointments from "../schemas/Appointments.js";
import auth from "../middlewares/authMiddleware.js";

const appointmentsRoutes = Router();

appointmentsRoutes.post('/create', validateSchema(appointments.add), auth.validationPatient, appointmentControllers.create);
appointmentsRoutes.post('/:appointId/:status', auth.validationMedic, appointmentControllers.confirmStatus);

export default appointmentsRoutes;