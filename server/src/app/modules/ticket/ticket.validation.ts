import { ObjectId } from 'mongoose';
import { z } from 'zod';

const CreateTicketZ = z.object({
  category: z.string().min(1, 'Please select a category'),
  game: z.custom<ObjectId>(),
  issue: z.string().min(1, 'Please describe your issue'),
});
export type CreateTicket = z.infer<typeof CreateTicketZ>;
const createTicketZodSchema = z.object({
  body: CreateTicketZ,
});

export const TicketValidation = {
  createTicketZodSchema,
};
