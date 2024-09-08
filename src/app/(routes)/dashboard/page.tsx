'use client'

import React, { useState, useEffect } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import Cardinfo from './_component/cardinfo';
import { getBudgetList, getAllExpenses, getIncomeList } from '../../../../utils/actions';
import { Budget, Income, Expense } from '@/lib/definitions';
import BarChartDashboard from './_component/barchartdashboard';
import BudgetItem from './budgets/_components/budgetItem';
import ExpenseListTable from './expenses/_components/expenseListTable';
// import {CardInfo} from '' 




export default function Dashboard() {
    const { user } = useUser();
    const [budgetList, setBudgetList] = useState<Budget[]>([])
    const [incomeList, setIncomeList] = useState<Income[]>([])
    const [expenseList, setExpenseList] = useState<Expense[]>([])


    useEffect(() => {
        if (user) {
            getBudgets();
    //         getExpenses();
    //         getIncomes();
        }

    })

    const getBudgets = async () => {
        let budgets = await getBudgetList(user?.primaryEmailAddress?.emailAddress);
        setBudgetList(budgets)
    }

    const getExpenses = async () => {
        let expens = await getAllExpenses(user?.primaryEmailAddress?.emailAddress);
        setExpenseList(expens)
    }

    const getIncomes = async () => {
        let incomes = await getIncomeList();
        setIncomeList(incomes)
    }







    return (
        <div className='p-8'>
            <h2 className='font-bold text-4xl'>Hi, {user?.fullName}</h2>
            <p>Here's what's happening with your money, lets manage your expenses...</p>
            <Cardinfo budgetList={budgetList} incomeList={incomeList} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
                <div className="lg:col-span-2">
                    <BarChartDashboard budgetList={budgetList} />
                    <ExpenseListTable expensesList={expenseList} refreshData={() => getBudgets()} />
                </div>
                <div className="grid gap-5">
                    <h2 className='font-bold text-lg'>Latest Budgets</h2>
                    {
                        budgetList.length > 0 ? (
                            budgetList.map((budget: Budget, index: number) => {
                                return <BudgetItem key={budget.id} budget={budget} />
                            })
                        ) : (
                            ["", "", "", ""].map((item: string) => <div className='h-[180px] w-full bg-slate-200 lg animate-pulse rounded-md'></div >)
                        )
                    }
                </div>
            </div>
        </div>
    )
}
