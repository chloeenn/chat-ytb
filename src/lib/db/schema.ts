import {integer, pgEnum, pgTable, serial, text, timestamp, varchar} from 'drizzle-orm/pg-core'

export const userSystemEnum = pgEnum('user_system_enum',['system','user'])
export const chats = pgTable("chats", {
    id: serial('id').primaryKey(),
    ytbTitle: text('ytb_title'),
    fileUrl: text('ytb_url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    userId: varchar('user_id',{length:256}).notNull(), 
    fileKey: text('ytb_key').notNull(),
});
export type DrizzleChat = typeof chats.$inferSelect;
export const messages = pgTable("messages", {
    id: serial('id').primaryKey(),
    chatId: integer('chat_id').references(()=>chats.id).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    role: userSystemEnum("role").notNull(),
    
});