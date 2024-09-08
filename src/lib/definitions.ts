import React from "react"
import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent } from "react"
import { RefAttributes } from "react"
export type MenuListItem = {
    id: number,
    name: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    path: string
}



export type Budget = {
    totalSpent: number;
    totalItem: number;
    id: number;
    name: string;
    amount: string;
    icon: string | null;
    createdBy: string;
}


export type Income = {
    id: number,
    name: string,
    amount: string,
    icon: string | null,
    createdBy: string,
    totalSpent: number,
    totalItem: number,
    totalAmount: number,
}

export type Expense = {
    id: number,
    name: string,
    amount: string,
    createdAt: string
}