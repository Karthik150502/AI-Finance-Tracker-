import { getTableColumns } from "drizzle-orm"
import { db } from "./dbConfig"
import { budget, expenses, income } from "./schema"
import { sql } from "drizzle-orm"
import { eq, desc } from "drizzle-orm"
import { User } from "@clerk/nextjs/server"
import { Budget, Expense, Income } from "@/lib/definitions"
import { numeric } from "drizzle-orm/pg-core"

export async function getBudgetList(userPrimEmailAddress: string | undefined) {
    let result: Budget[] = [];
    try {
        result = await db.select({
            ...getTableColumns(budget),
            totalSpent: sql`sum(${expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${expenses.id})`.mapWith(Number)
        }).from(budget).leftJoin(expenses, eq(budget.id, expenses.budgetId)).where(eq(budget.createdBy, userPrimEmailAddress || '')).groupBy(budget.id).orderBy(desc(budget.id))
        return result
    } catch (error) {
        return result;
    }
}

export async function getAllExpenses(userPrimEmailAddress: string | undefined) {
    let result: Expense[] = [];
    try {
        result = await db.select({
            id: expenses.id,
            name: expenses.name,
            amount: expenses.amount,
            createdBy: expenses.createdAt,
        }).from(expenses).rightJoin(expenses, eq(budget.id, expenses.budgetId)).where(eq(budget.createdBy, userPrimEmailAddress || '')).orderBy(expenses.id)
        return result
    } catch (error) {
        return result;
    }
}


export async function getIncomeList() {
    let result: Income[] = [];
    try {
        result = await db.select({
            ...getTableColumns(income),
            totalAmount: sql`sum(cast(${income.amount} as int))`.mapWith(Number)
        }).from(income).groupBy(income.id)
        return result
    } catch (error) {
        return result;
    }
}