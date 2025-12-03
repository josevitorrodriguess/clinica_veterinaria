import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { validateBody } from "../middlewares/validation";
import { createAppointmentData } from "../schema/appointmentSchema";
import * as appointmentController from "../controllers/appointmentController";

const router = Router();

router.use(authMiddleware);

router.post(
  "/appointments",
  validateBody(createAppointmentData),
  appointmentController.createAppointment
);

router.get("/appointments", appointmentController.getAllAppointments);
router.get("/appointments/:id", appointmentController.getAppointmentById);
router.delete("/appointments/:id", appointmentController.deleteAppointment);

export default router;
