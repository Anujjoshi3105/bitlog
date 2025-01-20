import { relations, sql, SQL } from "drizzle-orm";
import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  type AnyPgColumn,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// Custom lower function
export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}

// Enums
export const roleEnum = pgEnum("role", ["user", "admin"]);

// Users
export const users = pgTable(
  "user",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text("password"),
    role: roleEnum("role").notNull().default("user"),
  },
  (table) => ({
    emailUniqueIndex: uniqueIndex("emailUniqueIndex").on(lower(table.email)),
  })
);

export const userRelations = relations(users, ({ many }) => ({
  stories: many(story),
  comments: many(comment),
  replies: many(reply),
  claps: many(clap),
  saves: many(save),
}));

// Authentication Tables
export const adminUserEmailAddresses = pgTable(
  "adminUserEmailAddresses",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    email: text("email").notNull(),
  },
  (table) => ({
    adminEmailUniqueIndex: uniqueIndex("adminEmailUniqueIndex").on(
      lower(table.email)
    ),
  })
);

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

export const authenticatorsRelations = relations(authenticators, ({ one }) => ({
  user: one(users, {
    fields: [authenticators.userId],
    references: [users.id],
  }),
}));

// Content Tables
export const story = pgTable("story", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  content: text("content"),
  topics: text("topics")
    .array()
    .default(sql`'{}'::text[]`),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  publish: boolean("publish").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const storyRelations = relations(story, ({ one, many }) => ({
  author: one(users, {
    fields: [story.userId],
    references: [users.id],
  }),
  comments: many(comment),
  claps: many(clap),
  saves: many(save),
}));

export const comment = pgTable("comment", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  content: text("content").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  storyId: text("storyId")
    .notNull()
    .references(() => story.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const commentRelations = relations(comment, ({ one, many }) => ({
  author: one(users, {
    fields: [comment.userId],
    references: [users.id],
  }),
  story: one(story, {
    fields: [comment.storyId],
    references: [story.id],
  }),
  replies: many(reply),
  claps: many(clap),
}));

export const reply = pgTable("reply", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  content: text("content").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  commentId: text("commentId")
    .notNull()
    .references(() => comment.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const replyRelations = relations(reply, ({ one, many }) => ({
  author: one(users, {
    fields: [reply.userId],
    references: [users.id],
  }),
  comment: one(comment, {
    fields: [reply.commentId],
    references: [comment.id],
  }),
  claps: many(clap),
}));

export const clap = pgTable("clap", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  commentId: text("commentId").references(() => comment.id, {
    onDelete: "cascade",
  }),
  replyId: text("replyId").references(() => reply.id, {
    onDelete: "cascade",
  }),
  storyId: text("storyId")
    .notNull()
    .references(() => story.id, { onDelete: "cascade" }),
  clapCount: integer("clapCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const clapRelations = relations(clap, ({ one }) => ({
  author: one(users, {
    fields: [clap.userId],
    references: [users.id],
  }),
  comment: one(comment, {
    fields: [clap.commentId],
    references: [comment.id],
  }),
  reply: one(reply, {
    fields: [clap.replyId],
    references: [reply.id],
  }),
  story: one(story, {
    fields: [clap.storyId],
    references: [story.id],
  }),
}));

export const save = pgTable("save", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  storyId: text("storyId")
    .notNull()
    .references(() => story.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const saveRelations = relations(save, ({ one }) => ({
  author: one(users, {
    fields: [save.userId],
    references: [users.id],
  }),
  story: one(story, {
    fields: [save.storyId],
    references: [story.id],
  }),
}));

export const topics = pgTable("topics", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  topics: text("topics")
    .array()
    .default(sql`'{}'::text[]`),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
