import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const REPORT_TYPE = {
  WARNING: 'warning',
  BAN: 'ban',
  FINE: 'fine',
};

const createReportSchema = z.object({
  userId: z.custom<ObjectId>(),
  reportType: z.nativeEnum(REPORT_TYPE),
  reason: z.string().optional(),
  fine: z
    .object({
      amount: z.number().optional(),
      reason: z.string(),
    })
    .optional(),
});

const updateReportSchema = z.object({
  userId: z.custom<ObjectId>(),
  reportType: z.nativeEnum(REPORT_TYPE),
  reason: z.string().optional(),
  fine: z
    .object({
      amount: z.number().optional(),
      reason: z.string(),
    })
    .optional(),
});

export type IReport = z.infer<typeof createReportSchema>;

export type IUpdateReport = z.infer<typeof updateReportSchema>;

const createReportZodBodySchema = z.object({
  body: createReportSchema,
});
const updateReportZodBodySchema = z.object({
  body: updateReportSchema,
});

export const ReportValidation = {
  createReportZodBodySchema,
  updateReportZodBodySchema,
};
