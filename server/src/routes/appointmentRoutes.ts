import { Router } from "express";
import * as appointmentController from "../controllers/appointmentController";
import { validateBody } from "../middlewares/validation";
import { createAppointmentData } from "../schema/appointmentSchema";
import { authMiddleware } from "../middlewares/auth";


const router = Router();

router.use(authMiddleware);
router.post(
	"/appointments",
	validateBody(createAppointmentData),
	appointmentController.createAppointment
);

router.get("/appointments/:id", appointmentController.getAppointmentById);

router.get("/appointments", appointmentController.getAllAppointments);

router.delete("/appointments/:id", appointmentController.deleteAppointment);



export default router;
