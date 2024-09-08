'use client'
import React, { useEffect } from "react";

import SideNav from "./_component/sidenav";
import DashboardHeader from "./_component/dashboardheader";

import { db } from './../../../../utils/dbConfig';
import { budget } from "../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";



export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        user && checkUserBudget();
    }, [user])

    const checkUserBudget = async () => {
        const result = await db.select().from(budget).where(eq(budget.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""))

        // if (result?.length === 0) {
        //     router.replace('/dashboard/budget')
        // }
    }
    return (
        <div>
            <div className="fixed md:w-64 hidden md:block">
                <SideNav />
            </div>
            <div className="md:ml-64">
                <DashboardHeader />
                {children}
            </div>
        </div>
    );
}