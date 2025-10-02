import { z } from 'zod';

export const personalSchema = z.object({
  firstName: z.string().min(2, 'Nombre muy corto'),
  lastName: z.string().min(2, 'Apellido muy corto'),
  email: z.string().email('Email inválido')
});

export const messageSchema = z.object({
  reason: z.enum(['support', 'sales']),
  message: z.string().min(10, 'Mensaje muy corto'),
  // attachments: allow array of metadata objects (name, size, type)
  attachments: z.array(z.object({ name: z.string(), size: z.number(), type: z.string(), base64: z.string().optional() })).optional()
});

export const contactFormSchema = z.object({
  firstName: personalSchema.shape.firstName,
  lastName: personalSchema.shape.lastName,
  email: personalSchema.shape.email,
  reason: messageSchema.shape.reason,
  message: messageSchema.shape.message,
  attachments: messageSchema.shape.attachments
});

// Export stepSchemas array matching the config steps order
export const stepSchemas = [personalSchema, messageSchema];

export default contactFormSchema;
