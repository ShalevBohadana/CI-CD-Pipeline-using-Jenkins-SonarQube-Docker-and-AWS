import { z } from 'zod';

const createRoomZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(3),
    customRoomId: z.string({
      required_error: 'Room ID is required',
    }),
    creatorId: z.string({
      required_error: 'Creator ID is required',
    }),
  }),
});

export const RoomValidation = {
  createRoomZodSchema,
};
