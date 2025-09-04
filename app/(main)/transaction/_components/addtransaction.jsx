'use client'

import { addTransaction } from "@/actions/addtransaction"
import { transactionSchema } from "@/app/lib/schema"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useFetch from "@/hooks/use-fetch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const AddTransactionForm = ({ accounts, categories }) => {
    const { register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
        getValues,

    } = useForm({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountid: accounts.find((ac) => ac.isDefault)?.id || "",
            date: new Date(),
            isRecurring: false,

        }
    })
    const {
        loading: transactionLoading,
        fn: transactionFn,
        data: transactionResult

    } = useFetch(addTransaction)


    return (
        <form className=" bg-amber-50 text-black  w-4xl flex flex-col p-6 rounded-lg shadow-md mx-auto my-10">
            <div className="space-y-3">
                <label className="text-sm font-bold  bg-amber-200  ">Type</label>
                <Select onvalueChange={(value)=>setValue("type",value)} defaultValue={(watch("type"))} className="mt-3">
                    <SelectTrigger className="w-full" >
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="INCOME">Income</SelectItem>
                        <SelectItem value="EXPENSE">Expense</SelectItem>
                    </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
            </div>
            <div className="space-y-3">
                <label className="text-sm font-bold  bg-amber-200  ">Type</label>
                <Input
                type="number"
                step="0.01"
                placeholder="Amount"
                {...register("amount")}
                />
            
                {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
            </div>
        </form>
    )
}

export default AddTransactionForm