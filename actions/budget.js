"use server"

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"

export async function getcurrentbudget(accountId){
    try {
        const {userId} = await auth();
        if(!userId) throw new Error ("unauthorised");

        const user = await db.user.findUnique({
            where:{
                clerkUserId:userId,
            }
        })
        if(!user) throw new Error ("user not found");

        const budget = await db.budget.findFirst({
            where:{
                userId:user.id
            }
        })



    } catch (error) {
        
    }

}