'use client';

import { accountSchema } from "@/app/lib/schema";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/use-fetch";
import { createAccount } from "@/actions/dashboard";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";



export default function PopupForm() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      email: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const selectedType = watch("type");
  const isDefault = watch("isDefault");

  const { data: newAccount,
    fn: createAccountFn,
    loading: loadingAccount,
    error
  } = useFetch(createAccount)

  useEffect(() => {
   if( newAccount && !loadingAccount) {
      toast.success("Account created successfully!");
      setOpen(false);
      reset();
    }
  }, [newAccount,loadingAccount])
  

  useEffect(() => {
    if (error) {
      toast.error(error.message ||"An error occurred while creating the account.");
    }
  }, [error])
  

  const onSubmit = async (data) => {
    await createAccountFn(data);
    setOpen(false);
    reset();
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#171717" }}
    >
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Create Account"
          className="fixed z-40 bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <svg
            width={32}
            height={32}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <line x1={12} y1={5} x2={12} y2={19} />
            <line x1={5} y1={12} x2={19} y2={12} />
          </svg>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative rounded-xl shadow-2xl w-full max-w-md p-8"
            style={{ backgroundColor: "#171717", color: "#e5e7eb" }} // text-gray-200 approx
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-300 text-2xl cursor-pointer"
              onClick={() => setOpen(false)}
              type="button"
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-200">
              Create Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Account name */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-gray-300"
                >
                  Account name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your account name"
                  autoComplete="off"
                  className="w-full px-3 py-2 bg-[#1f1f1f] border border-gray-700 rounded text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                {errors.name && (
                  <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Balance */}
              <div>
                <label
                  htmlFor="balance"
                  className="block mb-1 text-gray-300"
                >
                  Balance
                </label>
                <input
                  id="balance"
                  type="number"
                  step="0.01"
                  {...register("balance")}
                  placeholder="enter your initial balance"
                  autoComplete="off"
                  className="w-full px-3 py-2 bg-[#1f1f1f] border border-gray-700 rounded text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                {errors.balance && (
                  <p className="text-sm text-red-400 mt-1">{errors.balance.message}</p>
                )}
              </div>

              {/* Account Type (Select) */}
              <div>
                <label
                  htmlFor="type"
                  className="block mb-1 text-gray-300"
                >
                  Account Type
                </label>
                <Select
                  value={selectedType}
                  onValueChange={(value) => setValue("type", value)}
                  defaultValue={watch("type")}
                  className="w-full text-gray-100"
                >
                  <SelectTrigger className="w-full bg-[#1f1f1f] border border-gray-700 rounded text-gray-100">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1f1f1f] text-gray-100">
                    <SelectItem value="CURRENT">Current</SelectItem>
                    <SelectItem value="SAVINGS">Savings</SelectItem>
                    <SelectItem value="INVESTMENT">Investment</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-400 mt-1">{errors.type.message}</p>
                )}
              </div>

              {/* Default Account Switch */}
              <div className="flex items-center space-x-3 ">
                <Switch
                  id="isDefault"
                  onCheckedChange={(checked) => setValue("isDefault", checked)}
                  checked={isDefault}
                  className={` cursor-pointer`}
                />
                <label htmlFor="isDefault" className="select-none text-gray-300 cursor-pointer">
                  Set as default account
                </label>
              </div>

              <button
                type="submit"
                className="
                    w-full
                    py-2
                    px-4
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    font-medium
                    rounded-md
                    focus:outline-none
                    focus:ring-2
                    focus:ring-green-400
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition
                    duration-200
                    disabled:opacity-60
                    disabled:cursor-not-allowed
  "
                disabled={loadingAccount}
              >
                {loadingAccount ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
