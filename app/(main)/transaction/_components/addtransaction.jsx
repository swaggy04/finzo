'use client'

import { addTransaction } from "@/actions/addtransaction"
import { transactionSchema } from "@/app/lib/schema"
import useFetch from "@/hooks/use-fetch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const AddTransactionForm = ({}) => {
    useForm({

        resolver: zodResolver(transactionSchema),
        defaultValues:{
            type: "EXPENSE",
            amount: "",
            description: "", 
            accountid:accounts.find((ac)=> ac.isDefault)?.id || "",
            date: new Date(),
            isRecurring: false,

        }
    })
    const {
        loading:transactionLoading,
        fn:transactionFn,
        data:transactionResult

    }=useFetch(addTransaction)


  return (
    <form action="">
        <div>
            <label htmlFor="">Type</label>
        </div>
    </form>
  )
}

export default AddTransactionForm