import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(30, { message: "Name must not exceed 30 characters." })
    .regex(/^[A-Za-z]+$/, { message: "Name can only contain letters." }),
});

export default formSchema;
