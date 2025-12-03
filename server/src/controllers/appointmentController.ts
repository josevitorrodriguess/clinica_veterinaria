import { Response } from "express";
import * as appointmentService from "../services/appointmentService";
import { AuthRequest } from "../middlewares/auth";

export const createAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || req.body.userId;

    if (!userId) {
      return res.status(400).json({ error: "User not found in token" });
    }

    const appointment = await appointmentService.createAppointment({
      ...req.body,
      userId,
    });

    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

export const getAllAppointments = async (req: AuthRequest, res: Response) => {
  try {
    const appointments = await appointmentService.getAllAppointments();
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

export const getAppointmentById = async (req: AuthRequest, res: Response) => {
  try {
    const appointment = await appointmentService.getAppointmentById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const appointment = await appointmentService.deleteAppointment(req.params.id);
    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};
