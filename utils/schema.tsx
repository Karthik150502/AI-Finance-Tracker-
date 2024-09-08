import { integer, numeric, pgTable, varchar, serial } from 'drizzle-orm/pg-core'



// Budgets
export const budget = pgTable('budget',
    {
        id: serial("id").primaryKey(),
        name: varchar("name").notNull(),
        amount: varchar("amount").notNull(),
        icon: varchar("icon"),
        createdBy: varchar("createdBy").notNull(),
    }
)


// Income
export const income = pgTable('income',
    {
        id: serial('id').primaryKey(),
        name: varchar('name').notNull(),
        amount: varchar('amount').notNull(),
        icon: varchar('icon'),
        createdBy: varchar('createdBy').notNull()
    }
)


// Expenses
export const expenses = pgTable('expenses',
    {
        id: serial("id").primaryKey(),
        name: varchar("name").notNull(),
        amount: numeric("amount").notNull().default("0"),
        budgetId: integer("budgetId").references(() => budget.id),
        createdAt: varchar("createdAt").notNull(),
    }
)