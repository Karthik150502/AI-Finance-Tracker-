import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from './../../../../../../utils/dbConfig';
import { budget, expenses } from './../../../../../../utils/schema';
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";
import { SQL } from "drizzle-orm";
function AddExpense({ budgetId, user, refreshData }: {
    budgetId: string, user: any, refreshData: () => {}
}) {
    const [name, setName] = useState<string>();
    const [amount, setAmount] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    /**
     * Used to Add New Expense
     */
    const addNewExpense = async () => {
        setLoading(true);
        const result = await db
            .insert(expenses)
            .values({
                name: name,
                amount: amount,
                budgetId: budgetId,
                createdAt: moment().format("DD/MM/yyy"),
            })
            .returning({ insertedId: budget.id });

        setAmount("");
        setName("");
        if (result) {
            setLoading(false);
            refreshData();
            toast("New Expense Added!");
        }
        setLoading(false);
    };
    return (
        <div className="border p-5 rounded-2xl">
            <h2 className="font-bold text-lg">Add Expense</h2>
            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Name</h2>
                <Input
                    placeholder="e.g. Bedroom Decor"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
            </div>
            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Amount</h2>
                <Input
                    placeholder="e.g. 1000"
                    value={amount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                />
            </div>
            <Button
                disabled={!(name && amount) || loading}
                onClick={() => addNewExpense()}
                className="mt-3 w-full rounded-full"
            >
                {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
            </Button>
        </div>
    );
}

export default AddExpense;
