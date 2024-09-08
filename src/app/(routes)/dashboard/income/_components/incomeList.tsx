"use client";
import React, { useEffect, useState } from "react";
import CreateIncomes from "./createIncomes";
import { db } from "./../../../../../../utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { income, expenses } from './../../../../../../utils/schema';
import { useUser } from "@clerk/nextjs";
import { Income } from "@/lib/definitions";
import IncomeItem from "./incomeItem";

function IncomeList() {
    const [incomelist, setIncomelist] = useState<Income[]>([]);
    const { user } = useUser();
    useEffect(() => {
        user && getIncomelist();
    }, [user]);

    const getIncomelist = async () => {
        const result = await db
            .select({
                ...getTableColumns(income),
                totalSpent: sql`sum(${expenses.amount})`.mapWith(Number),
                totalItem: sql`count(${expenses.id})`.mapWith(Number),
            })
            .from(income)
            .leftJoin(expenses, eq(income.id, expenses.budgetId))
            .where(eq(income.createdBy, user?.primaryEmailAddress?.emailAddress))
            .groupBy(income.id)
            .orderBy(desc(income.id));
        setIncomelist(result);
    };

    return (
        <div className="mt-7">
            <div
                className="grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
                <CreateIncomes refreshData={() => getIncomelist()} />
                {incomelist?.length > 0
                    ? incomelist.map((budget, index) => (
                        <IncomeItem budget={budget} key={index} />
                    ))
                    : [1, 2, 3, 4, 5].map((item, index) => (
                        <div
                            key={index}
                            className="w-full bg-slate-200 rounded-lg
        h-[150px] animate-pulse"
                        ></div>
                    ))}
            </div>
        </div>
    );
}

export default IncomeList;
