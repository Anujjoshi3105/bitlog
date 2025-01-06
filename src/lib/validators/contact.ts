import * as v from "valibot";

export const contactSchema = v.object({
  name: v.pipe(
    v.string("Your name must be a string."),
    v.nonEmpty("Please enter your name.")
  ),
  email: v.pipe(
    v.string("Your email must be a string."),
    v.nonEmpty("Please enter your email."),
    v.email("The email address is badly formatted.")
  ),
  subject: v.pipe(
    v.string("Your name must be a string."),
    v.nonEmpty("Please enter your name.")
  ),
  message: v.pipe(
    v.string("Your name must be a string."),
    v.nonEmpty("Please enter your name.")
  ),
});

export type ContactFormData = v.InferInput<typeof contactSchema>;
