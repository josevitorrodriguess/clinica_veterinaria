import { Request, Response } from "express";
import * as appointmentService from "../services/appointmentService";


export const createAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await appointmentService.createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};


export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId; // vindo da rota
    const appointments = await appointmentService.getAllAppointments(userId);
    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointment = await appointmentService.getAppointmentById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const appt = await appointmentService.deleteAppointment(req.params.id);
    res.status(200).json(appt);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
