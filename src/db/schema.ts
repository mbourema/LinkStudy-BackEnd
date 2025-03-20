//Définir la structure des tables de la base de données en utilisant Drizzle ORM.
import { integer, pgTable, varchar, date } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  forname: varchar({ length: 255 }).notNull(),  // Prénom
  password: varchar({ length: 255 }).notNull(),  // Mot de passe (à hacher avant d'enregistrer)
  pseudo: varchar({ length: 255 }).notNull().unique(),  // Pseudonyme unique
  date_of_birth: date().notNull(),  // Date de naissance
});

