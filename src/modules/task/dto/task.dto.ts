import { z } from 'zod';
import { isNotEmpty } from 'src/common/utils/objectUtils';

export const idTaskSchema = z.string().cuid({ message: 'Invalid id' });

export const createTaskSchema = z.object({
  title: z.string().min(1).trim(),
  description: z.string().min(1).trim().nullable().optional(),
});

export const updateTaskSchema = z
  .object({
    title: z.string().min(1).trim().optional(),
    description: z.string().min(1).trim().nullable().optional(),
  })
  .refine((arg) => isNotEmpty(arg), 'At least one field must be provided.');

export type IdTaskDto = z.infer<typeof idTaskSchema>;
export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
