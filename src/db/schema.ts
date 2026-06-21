import { pgTable, bigserial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable("users", {
    id: bigserial("id", {mode: "number"}).primaryKey(),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    fullName: text("fullName"),
    passwordHash: text("passwordHash").notNull(),
    createdAt: timestamp().defaultNow().notNull()
})