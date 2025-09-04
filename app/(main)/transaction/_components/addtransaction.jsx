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
        <form className="w-2xl flex flex-col p-6 rounded-lg shadow-md mx-auto my-10 bg-neutral-900">
            <div className="flex flex-col space-y-2 ">
                <label className="text-md font-bold">Type</label>
                <Select onvalueChange={(value) => setValue("type", value)} defaultValue={(watch("type"))}  className="rounded-md border border-neutral-800">
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
            <div className="grid grid-cols-2 gap-5 mt-5 md:">
                <div className="flex flex-col space-y-2">
                    <label className="text-md font-bold">Amount</label>
                    <Input
                        type="number"
                        step="0.01"
                        placeholder="Amount"
                        {...register("amount")}
                        
                    />

                    {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-md font-bold ">Account</label>
                    <Select onvalueChange={(value) => setValue("accountId", value)} defaultValue={(getValues("accountId"))} className="mt-3">
                        <SelectTrigger className="w-full" >
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                accounts.map((account)=>(
                                    <SelectItem key={account.id} value={account.id}>
                                        {account.name} (₹{parseFloat(account.balance).toFixed(2)})
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    {errors.accountId && <p className="text-sm text-red-500">{errors.accountId.message}</p>}
                </div>
            </div>
        </form>
    )
}

export default AddTransactionForm