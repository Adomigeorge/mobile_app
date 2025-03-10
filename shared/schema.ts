import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  hobbies: text("hobbies").array().notNull(),
  notifications: boolean("notifications").notNull().default(false),
  favorite: boolean("favorite").notNull().default(false),
});

export const insertProfileSchema = createInsertSchema(profiles)
  .omit({ id: true })
  .extend({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\+?[\d\s-]{10,}$/, "Invalid phone number"),
    age: z.number().min(13, "Must be at least 13 years old"),
    gender: z.enum(["male", "female", "other"]),
    hobbies: z.array(z.string()).min(1, "Select at least one hobby"),
  });

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;