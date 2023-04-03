import { Router } from "express";
import patientsRoutes from "./patientsRoutes.js";
import medicsRoutes from "./medicsRoutes.js";
import appointmentsRoutes from "./appointmentsRoutes.js";

const routes = Router();

routes.use("/patients", patientsRoutes);
routes.use("/medics", medicsRoutes);
routes.use("/appointments", appointmentsRoutes);

export default routes;