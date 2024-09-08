"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './createBudget'
// import { db } from '@/utils/dbConfig'
import { db } from '../../../../../../utils/dbConfig'
import { desc, eq, getTableColumns, sql, SQLWrapper } from 'drizzle-orm'
import { budget, expenses } from './../../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { Budget } from '@/lib/definitions'
import BudgetItem from './budgetItem'


function BudgetList() {
    const [budgetList, setBudgetList] = useState<Budget[]>([]);
    const { user } = useUser();
    useEffect(() => {
        user && getBudgetList();
    }, [user])
    /**
     * used to get budget List
     */
    const getBudgetList = async () => {

        const result = await db.select({
            ...getTableColumns(budget),
            totalSpent: sql`sum(${expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${expenses.id})`.mapWith(Number)
        }).from(budget)
            .leftJoin(expenses, eq(budget.id, expenses.budgetId))
            .where(eq(budget.createdBy, user?.primaryEmailAddress?.emailAddress))
            .groupBy(budget.id)
            .orderBy(desc(budget.id)) as Budget[];

        setBudgetList(result);

    }

    return (
        <div className='mt-7'>
            <div className='grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <CreateBudget
                    refreshData={() => getBudgetList()} />
                {budgetList?.length > 0 ? budgetList.map((budget, index) => (
                    <BudgetItem budget={budget} key={index} />
                ))
                    : ["", "", "", "", ""].map((item, index) => (
                        <div key={index} className='w-full bg-slate-200 rounded-lg
        h-[150px] animate-pulse'>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default BudgetList