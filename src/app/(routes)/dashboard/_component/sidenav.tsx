import React, { useEffect } from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, CircleDollarSign } from 'lucide-react';
import { UserButton, UserProfile } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import Logo from './../../../../assets/logo-no-bg.png';
import { MenuListItem } from "@/lib/definitions";
export default function SideNav() {
    const menulist: MenuListItem[] = [
        {
            id: 1, name: "Dashboard", icon: LayoutGrid, path: "/dashboard"
        },
        {
            id: 2, name: "Incomes", icon: CircleDollarSign, path: "/dashboard/income"
        },
        {
            id: 3, name: "Budgets", icon: PiggyBank, path: "/dashboard/budgets"
        },
        {
            id: 4, name: "Expenses", icon: ReceiptText, path: "/dashboard/expenses"
        },
        {
            id: 5, name: "Updrage", icon: ShieldCheck, path: "/dashboard/upgrade"
        },
    ]


    const path = usePathname();
    useEffect(() => {
        console.log(path)
    }, [path])

    return (
        <div className="h-screen p-5 border shadow-sm">
            <div className="flex flex-row items-center justify-center mb-8 mt-4">
                <Image src={Logo} alt="FinacleFinance Logo" width={150} height={150} />
            </div>

            <div className="mt-5">
                {menulist.map((item: MenuListItem, index: number) => {
                    return (
                        <Link href={item.path} key={item.id} className="flex flex-row items-center justify-between w-full h-auto">
                            <p className={clsx(
                                "flex gap-2 items-center text-gray-500 font-medium mb-2 p-4 cursor-pointer rounded-full hover:text-blue-800 hover:bg-blue-100 w-full justify-start",
                                {
                                    "text-blue-800 bg-blue-100": path == item.path,
                                },
                            )}>
                                <item.icon /> {item.name}
                            </p>
                        </Link>
                    )
                })}
            </div>
            <div className="flex flex-col items-center justify-end w-full mt-20 h-36">
                <UserButton />
            </div>
        </div >
    )
}