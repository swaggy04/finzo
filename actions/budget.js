"use server"

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"

export async function getcurrentbudget(accountId) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("unauthorised");

        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            }
        })
        if (!user) throw new Error("user not found");

        const budget = await db.budget.findFirst({
            where: {
                userId: user.id
            }
        })

        const currentDate = new Date();
        const startOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        )

        const endOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        )

        const expense = await db.transaction.aggregate({
            where:
            {
                userId: user.id,
                type: "EXPENSE",
                date: {
                    gte: startOfMonth,
                    lte: endOfMonth
                },
                accountId,
            },
            _sum: {
                amount: true,
            },
        })

        return {
            budget: budget ? { ...budget, amount: budget.amount.toNumber() } : null,
            currentExpenses: expenses._sum.amount
                ? expense._sum.amount.toNumber()
                : 0,
        }


    } catch (error) {
        console.error("Error fetching budget:", error);
        throw error;
    }

}