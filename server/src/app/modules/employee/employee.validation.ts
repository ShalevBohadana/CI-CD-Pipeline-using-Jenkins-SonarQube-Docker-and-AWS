import { z } from 'zod';

// הגדרת הסכמה הבסיסית
const employeeSchema = z.object({
  name: z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
  }),
  email: z.string().email({
    message: 'Email is required and must be valid',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
  contactNumber: z.string(),
  roles: z.string(),
  dateHired: z.string().transform((str) => new Date(str)),
  department: z.string(),
  isVerified: z.boolean().optional(),
  profilePicture: z.string().optional(),
  shippingAddress: z
    .object({
      addressLine: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      zipCode: z.string(),
    })
    .optional(),
});

// סכמת יצירה - עם ולידציה נוספת
const createEmployeeSchema = employeeSchema.superRefine((data, ctx) => {
  if (data.dateHired) {
    try {
      new Date(data.dateHired).toISOString();
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: 'Invalid date format for dateHired',
        path: ['dateHired'],
      });
    }
  }
});

// סכמת עדכון - כל השדות אופציונליים
const updateEmployeeSchema = employeeSchema.partial();

const createEmployeeZodSchema = z.object({
  body: createEmployeeSchema,
});

export type IEmployeeZod = z.infer<typeof createEmployeeSchema>;

export const EmployeeValidation = {
  createEmployeeZodSchema,
  updateEmployeeSchema,
  employeeSchema,
};
