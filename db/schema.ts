import { sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
    id: text("id").primaryKey().default(uuidv4()),
    email: text("email").notNull(),
    password: text("password").notNull(),
    role: text("role").notNull()
})