'use client'
import React, { useEffect, useState } from 'react'
import { PiggyBank, ReceiptText, Wallet, Sparkles, CircleDollarSign } from 'lucide-react'
import { formatAmount } from '@/lib/utils';
import { Budget, Income } from '@/lib/definitions';
import getFinancialAdvice from '../../../../../utils/getFinancialAdvice';

export default function Cardinfo({ budgetList, incomeList }: { budgetList: Budget[], incomeList: Income[] }) {

    const [totalBudget, setTotalBudget] = useState<number>(0);
    const [totalSpent, setTotalSpent] = useState<number>(0);
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [financialAdvice, setFinancialAdvice] = useState<string | null>('');


    useEffect(() => {
        if (budgetList.length > 0 || incomeList.length > 0) {
            calculateCardInfo();
        }
    }, [budgetList, incomeList])

    useEffect(() => {
        if (totalBudget > 0 || totalIncome > 0 || totalSpent > 0) {
            const fetchFinancialAdvice = async () => {
                const advice = await getFinancialAdvice(totalBudget, totalIncome, totalSpent)
                setFinancialAdvice(advice)
            }
            fetchFinancialAdvice();
        }
    }, [totalBudget, totalIncome, totalSpent])


    const calculateCardInfo = () => {
        let totalBudget_ = 0
        let totalIncome_ = 0
        let totalSpent_ = 0


        budgetList.forEach((budget: Budget) => {
            totalBudget_ += Number(budget.amount)
            totalSpent_ += budget.totalSpent
        })
        incomeList.forEach((income: Income) => {
            totalIncome_ += income.totalAmount
        })


        setTotalBudget(totalBudget_)
        setTotalIncome(totalIncome_)
        setTotalSpent(totalSpent_)
    }

    return (
        <div>
            {
                budgetList.length > 0 ? (
                    <>
                        <div>
                            <div className="p-7 rounded-2xl mt-4 border flex items-center justify-between">
                                <div className="">
                                    <div className="flex mb-2 flex-row space-x-1 items-center">
                                        <h2>FinacleFinance</h2>
                                        <Sparkles className='rounded-full text-white h-10 w-10 p-2 bg-gradient-to-r from-pink-300 via-red-500 to-yellow-500 background-animate' />
                                    </div>
                                    <h2 className='font-light text-md'>
                                        {financialAdvice || 'Loading the AI\'s insight'}

                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5'>
                            <div className="p-7 border rounded-2xl flex items-center justify-between">
                                <div>
                                    <h2 className='text-sm'>Total Budget</h2>
                                    <h2 className='font-bold text-2xl'>{formatAmount(totalBudget)}</h2>
                                </div>
                                <PiggyBank className='bg-blue-800 p-3 h-12 w-12 rounded-full' />
                            </div>
                        </div>
                        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5'>
                            <div className="p-7 border rounded-2xl flex items-center justify-between">
                                <div>
                                    <h2 className='text-sm'>Total Spent</h2>
                                    <h2 className='font-bold text-2xl'>{formatAmount(totalSpent)}</h2>
                                </div>
                                <PiggyBank className='bg-blue-800 p-3 h-12 w-12 rounded-full' />
                            </div>
                        </div>
                        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5'>
                            <div className="p-7 border rounded-2xl flex items-center justify-between">
                                <div>
                                    <h2 className='text-sm'>No of Budget</h2>
                                    <h2 className='font-bold text-2xl'>{budgetList.length}</h2>
                                </div>
                                <Wallet className='bg-blue-800 p-3 h-12 w-12 rounded-full' />
                            </div>
                        </div>
                        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5'>
                            <div className="p-7 border rounded-2xl flex items-center justify-between">
                                <div>
                                    <h2 className='text-sm'>Sum of Income Streams</h2>
                                    <h2 className='font-bold text-2xl'>{formatAmount(totalIncome)}</h2>
                                </div>
                                <CircleDollarSign className='bg-blue-800 p-3 h-12 w-12 rounded-full' />
                            </div>
                        </div>
                    </>




                ) : (
                    <></>
                )
            }
        </div >
    )
}
