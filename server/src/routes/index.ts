import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import clientRoutes from "./clientRoutes";
import petRoutes from "./petRoutes";



const routes = Router();

routes.use(userRoutes);
routes.use(authRoutes);
routes.use(clientRoutes);
routes.use(petRoutes)


export default routes;