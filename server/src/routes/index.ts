import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import clientRoutes from "./clientRoutes";
import petRoutes from "./petRoutes";
import appointmentRoutes from "./appointmentRoutes";



const routes = Router();

routes.use(userRoutes);
routes.use(authRoutes);
routes.use(clientRoutes);
routes.use(petRoutes)
routes.use(appointmentRoutes);


export default routes;
