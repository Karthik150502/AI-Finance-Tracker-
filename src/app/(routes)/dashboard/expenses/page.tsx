"use client"
import { db } from './../../../../../utils/dbConfig';
import { budget, expenses } from './../../../../../utils/schema';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/expenseListTable';
import { Expense } from '@/lib/definitions';
import { useUser } from '@clerk/nextjs';
import AddExpense from './_components/addExpenses';
function ExpensesScreen() {

  const [expensesList, setExpensesList] = useState<Expense[]>([]);
  const { user } = useUser();

  useEffect(() => {
    user && getAllExpenses();
  }, [user])
  /**
 * Used to get All expenses belong to users
 */
  const getAllExpenses = async () => {
    const result = await db.select({
      id: expenses.id,
      name: expenses.name,
      amount: expenses.amount,
      createdAt: expenses.createdAt
    }).from(budget)
      .rightJoin(expenses, eq(budget.id, expenses.budgetId))
      .where(eq(budget.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(expenses.id));
    setExpensesList(result);

  }
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl'>My Expenses</h2>
      {/* <AddExpense/> */}
      <ExpenseListTable refreshData={() => getAllExpenses()}
        expensesList={expensesList}
      />
    </div>
  )
}

export default ExpensesScreen