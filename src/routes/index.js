import { Router } from "express";
import patientsRoutes from "./patientsRoutes.js";
import medicsRoutes from "./medicsRoutes.js";

const routes = Router();

routes.use("/patients", patientsRoutes);
routes.use("/medics", medicsRoutes);

export default routes;