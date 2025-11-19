import { Request, Response } from "express";
import * as clientService from "../services/clientService";

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = await clientService.createClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await clientService.getClientById(req.params.id);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getClientByEmail = async (req: Request, res: Response) => {
  try {
    const client = await clientService.getClientByEmail(req.params.email);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await clientService.getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const client = await clientService.deleteClient(req.params.id);
    res.status(200).json(client);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
