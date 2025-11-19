import { Request, Response } from "express";
import * as clientService from "../services/clientService";

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = await clientService.createClient(req.body);
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await clientService.getAllClients();
    res.status(200).json(clients);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await clientService.getClientById(req.params.id);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    return res.status(200).json(client);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const client = await clientService.deleteClient(req.params.id);
    res.status(200).json(client);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
