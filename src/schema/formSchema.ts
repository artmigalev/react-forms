import { z } from "zod";
import {
  countries,
  REG_EXP_MAIL_CONTAINS,
  REG_EXP_PASSWORD,
  REG_EXP_UPPER_NAME,
} from "@/data/variables";

export const schema = z
  .object({
    name: z
      .string()
      .min(2)
      .max(100)
      .nonempty({
        error: "Name is required",
      })
      .regex(REG_EXP_UPPER_NAME, { error: "Name must start with an uppercase letter" }),
    age: z
      .number({
        error: "age must be number",
      })
      .int({
        error: "age must be an integer",
      })

      .nonnegative({
        error: "age must be a non-negative integer",
      }),
    email: z.email({
      error: "Invalid email address",
      pattern: REG_EXP_MAIL_CONTAINS,
    }),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters" })
      .regex(REG_EXP_PASSWORD, {
        error:
          "Password must contain at least 1 digit, 1 uppercase letter, and 1 special character",
      }),
    selectCountry: z.enum(countries, {
      error: "Invalid country",
    }),
    passwordSecond: z.string(),
    gender: z.enum(["male", "female"], {
      error: "Gender must be either male, female",
    }),
    accept: z.boolean().refine((val) => val === true, { message: "must accept terms" }),
    image: z.string().min(2).max(100).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordSecond) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["passwordSecond"],
      });
    }
  });

export type SchemaForm = z.infer<typeof schema>;
