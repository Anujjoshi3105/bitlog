import * as v from "valibot";

export const registerSchema = v.object({
  name: v.pipe(
    v.string("Your name must be a string."),
    v.nonEmpty("Please enter your name.")
  ),
  email: v.pipe(
    v.string("Your email must be a string."),
    v.nonEmpty("Please enter your email."),
    v.email("The email address is badly formatted.")
  ),
  password: v.pipe(
    v.string("Your password must be a string."),
    v.nonEmpty("Please enter your password."),
    v.minLength(8, "Password must be at least 8 characters long."),
    v.regex(/[0-9]/, "Password must contain at least one number."),
    v.regex(/[a-z]/, "Password must contain at least one lowercase letter."),
    v.regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  ),
});

export type RegisterFormData = v.InferInput<typeof registerSchema>;
