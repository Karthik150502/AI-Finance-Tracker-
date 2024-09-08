import { db } from './../../../../../../utils/dbConfig';
import { expenses } from './../../../../../../utils/schema';

import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Expense } from '@/lib/definitions';
function ExpenseListTable(
    {
        expensesList, refreshData
    }: {
        expensesList: Expense[], refreshData: () => {}
    }
) {
    const deleteExpense = async (expense: Expense) => {
        const result = await db
            .delete(expenses)
            .where(eq(expenses.id, expense.id))
            .returning();

        if (result) {
            toast("Expense Deleted!");
            refreshData();
        }
    };
    return (
        <div className="mt-3">
            <h2 className="font-bold text-lg">Latest Expenses</h2>
            <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
                <h2 className="font-bold">Name</h2>
                <h2 className="font-bold">Amount</h2>
                <h2 className="font-bold">Date</h2>
                <h2 className="font-bold">Action</h2>
            </div>
            {expensesList.map((expense: Expense, index: number) => (
                <div key={index} className="grid grid-cols-4 bg-slate-50 rounded-bl-xl rounded-br-xl p-2">
                    <h2>{expense.name}</h2>
                    <h2>{expense.amount}</h2>
                    <h2>{expense.createdAt}</h2>
                    <h2
                        onClick={() => deleteExpense(expense)}
                        className="text-red-500 cursor-pointer"
                    >
                        Delete
                    </h2>
                    <h2>
                        <Trash
                            className="text-red-500 cursor-pointer"
                            onClick={() => deleteExpense(expense)}
                        />
                    </h2>
                </div>
            ))}
        </div>
    );
}

export default ExpenseListTable;
