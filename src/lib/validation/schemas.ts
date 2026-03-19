import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName:  z.string().min(2, 'Last name must be at least 2 characters'),
  email:     z.string().email('Invalid email address'),
  password:  z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  phone: z.string().optional(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const bookingSchema = z.object({
  serviceAssetId: z.string().uuid('Please select a service'),
  checkIn:  z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  numberOfGuests: z.number().min(1, 'At least 1 guest required').max(500),
  notes: z.string().optional(),
  firstName: z.string().min(2),
  lastName:  z.string().min(2),
  email:     z.string().email(),
  phone:     z.string().min(10, 'Valid phone number required'),
});

export const contactSchema = z.object({
  name:    z.string().min(2, 'Name is required'),
  email:   z.string().email('Invalid email'),
  phone:   z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const customerSchema = z.object({
  firstName:   z.string().min(2),
  lastName:    z.string().min(2),
  email:       z.string().email(),
  phone:       z.string().min(10),
  address:     z.string().optional(),
  nationality: z.string().optional(),
  idNumber:    z.string().optional(),
});

export const employeeSchema = z.object({
  firstName:  z.string().min(2),
  lastName:   z.string().min(2),
  email:      z.string().email(),
  phone:      z.string().min(10),
  department: z.string().min(1, 'Department is required'),
  salary:     z.number().positive('Salary must be positive'),
  hireDate:   z.string().min(1, 'Hire date is required'),
  roleId:     z.string().uuid('Role is required'),
});

export const inventoryItemSchema = z.object({
  name:         z.string().min(2),
  category:     z.string().min(1),
  unit:         z.string().min(1),
  currentStock: z.number().min(0),
  reorderLevel: z.number().min(0),
  unitCost:     z.number().positive(),
  supplierId:   z.string().uuid().optional(),
});

export const expenseSchema = z.object({
  category:    z.string().min(1),
  description: z.string().min(3),
  amount:      z.number().positive(),
  date:        z.string().min(1),
  notes:       z.string().optional(),
});

export type LoginFormData       = z.infer<typeof loginSchema>;
export type RegisterFormData    = z.infer<typeof registerSchema>;
export type BookingFormData     = z.infer<typeof bookingSchema>;
export type ContactFormData     = z.infer<typeof contactSchema>;
export type CustomerFormData    = z.infer<typeof customerSchema>;
export type EmployeeFormData    = z.infer<typeof employeeSchema>;
export type InventoryItemFormData = z.infer<typeof inventoryItemSchema>;
export type ExpenseFormData     = z.infer<typeof expenseSchema>;
