import { z } from "zod";

export const User = z.object({
  email: z.string().email({ message: "Please enter correct email" }),
  password: z
    .string()
    .min(8, { message: "The password must be at least 8 characters" })
    .refine((value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(value), {
      message:
        "The password must contain at least one uppercase letter, one lowercase letter and one number",
    }),
});
