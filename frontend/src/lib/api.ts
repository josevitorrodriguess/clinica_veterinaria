import { authStorage } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function request<T>(
  path: string,
  { method = "GET", body }: { method?: HttpMethod; body?: unknown } = {}
): Promise<T> {
  const token = authStorage.getToken();
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {})
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  let data: unknown = null;
  try {
    data = isJson ? await response.json() : await response.text();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const fallbackMessage = response.statusText || "Request failed";
    const message =
      typeof data === "string"
        ? data || fallbackMessage
        : (data as { error?: string; message?: string })?.error ??
          (data as { message?: string })?.message ??
          fallbackMessage;
    throw new Error(message);
  }

  return data as T;
}

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

export type AuthResponse = {
  token: string;
  user: UserProfile;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  pets?: Pet[];
  petIds?: string[];
  petCount?: number;
};

export type Pet = {
  id: string;
  name: string;
  species: string;
  breed?: string | null;
  age?: number | null;
  clientId: string;
  client?: {
    id: string;
    name: string;
    phone?: string | null;
  };
  appointments?: {
    id: string;
    date: string;
    reason: string;
  }[];
};

export type Appointment = {
  id: string;
  date: string;
  reason: string;
  petId: string;
  clientId: string;
  vet?: string;
  userId?: string;
};

type AppointmentResponse = Appointment & {
  user?: { id: string; name: string };
  client?: { id: string; name: string };
  pet?: { id: string; name: string };
  vet?: string;
  clientName?: string;
  petName?: string;
};

function toAppointment(response: AppointmentResponse): Appointment {
  return {
    id: response.id,
    date: response.date,
    reason: response.reason,
    petId: response.petId,
    clientId: response.clientId,
    userId: response.userId ?? response.user?.id,
    vet: response.vet ?? response.user?.name
  };
}

function toAppointmentWithDetails(
  response: AppointmentResponse
): Appointment & { petName: string; clientName: string } {
  const base = toAppointment(response);
  return {
    ...base,
    petName: response.pet?.name ?? response.petName ?? "Pet",
    clientName: response.client?.name ?? response.clientName ?? "Cliente"
  };
}

async function login(email: string, password: string): Promise<AuthResponse> {
  return request<AuthResponse>("/login", {
    method: "POST",
    body: { email, password }
  });
}

async function register(payload: RegisterPayload): Promise<UserProfile> {
  return request<UserProfile>("/users", {
    method: "POST",
    body: payload
  });
}

async function getClients(): Promise<Client[]> {
  const [clients, pets] = await Promise.all([
    request<Client[]>("/clients"),
    request<Pet[]>("/pets").catch(() => [] as Pet[])
  ]);

  const petsByClient = pets.reduce<Record<string, { petIds: string[] }>>((acc, pet) => {
    if (!acc[pet.clientId]) acc[pet.clientId] = { petIds: [] };
    acc[pet.clientId].petIds.push(pet.id);
    return acc;
  }, {});

  return clients.map((client) => {
    const info = petsByClient[client.id];
    return {
      ...client,
      petIds: info?.petIds ?? [],
      petCount: info?.petIds.length ?? 0
    };
  });
}

async function getClient(id: string): Promise<Client | null> {
  try {
    const client = await request<Client>(`/clients/${id}`);
    const petIds = client.pets?.map((pet) => pet.id) ?? client.petIds ?? [];
    return { ...client, petIds, petCount: petIds.length };
  } catch (error) {
    if (error instanceof Error && error.message.toLowerCase().includes("not found")) {
      return null;
    }
    throw error;
  }
}

async function createClient(payload: Pick<Client, "name" | "email" | "phone">): Promise<Client> {
  return request<Client>("/clients", {
    method: "POST",
    body: payload
  });
}

async function deleteClient(id: string): Promise<Client> {
  return request<Client>(`/clients/${id}`, { method: "DELETE" });
}

async function getPets(): Promise<Pet[]> {
  return request<Pet[]>("/pets");
}

async function getPet(id: string): Promise<Pet | null> {
  try {
    return await request<Pet>(`/pets/${id}`);
  } catch (error) {
    if (error instanceof Error && error.message.toLowerCase().includes("not found")) {
      return null;
    }
    throw error;
  }
}

async function createPet(payload: Omit<Pet, "id">): Promise<Pet> {
  return request<Pet>("/pets", {
    method: "POST",
    body: payload
  });
}

async function deletePet(id: string): Promise<Pet> {
  return request<Pet>(`/pets/${id}`, { method: "DELETE" });
}

async function getDashboardSummary() {
  const [clients, pets, appointments] = await Promise.all([
    getClients(),
    getPets().catch(() => [] as Pet[]),
    getAppointmentsWithDetails().catch(() => [] as (Appointment & { petName: string; clientName: string })[])
  ]);

  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  const todaysAppointments = appointments.filter((appointment) => {
    const date = new Date(appointment.date);
    return date >= startOfDay && date < endOfDay;
  }).length;

  return {
    clients: clients.length,
    pets: pets.length,
    todaysAppointments
  };
}

async function getAppointmentsWithDetails(): Promise<(Appointment & { petName: string; clientName: string })[]> {
  const response = await request<AppointmentResponse[]>("/appointments");
  return response.map(toAppointmentWithDetails);
}

async function createAppointment(payload: Omit<Appointment, "id">): Promise<Appointment> {
  const storedUser = authStorage.getUser();
  const body = {
    date: payload.date,
    reason: payload.reason,
    petId: payload.petId,
    clientId: payload.clientId,
    ...(payload.userId
      ? { userId: payload.userId }
      : storedUser?.id
      ? { userId: storedUser.id }
      : {})
  };

  const response = await request<AppointmentResponse>("/appointments", {
    method: "POST",
    body
  });

  return toAppointment(response);
}

async function getAppointments(): Promise<Appointment[]> {
  const response = await request<AppointmentResponse[]>("/appointments");
  return response.map(toAppointment);
}

export const api = {
  login,
  register,
  getClients,
  getClient,
  createClient,
  deleteClient,
  getPets,
  getPet,
  createPet,
  deletePet,
  getDashboardSummary,
  getAppointments,
  createAppointment,
  getAppointmentsWithDetails
};
