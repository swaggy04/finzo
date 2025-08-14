import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  return (
    <Card
      className="
        w-full max-w-sm border border-[#18181b] bg-[#171717] text-white shadow-xl 
        transition-transform hover:scale-[1.02] hover:shadow-2xl duration-200
      "
    >
      {/* Make all card content clickable, but don't cover the whole card to preserve design */}
      <Link href={`/account/${id}`} className="block rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow hover:bg-[#202024] px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <CardHeader className="p-0">
            <CardTitle className="text-xl font-semibold">{name}</CardTitle>
          </CardHeader>
          <Switch checked={isDefault} className="ml-4" />
        </div>
        <CardContent className="p-0 mb-2">
          <div className="my-2 text-3xl font-extrabold text-green-400 tracking-tight">
            ₹ {parseFloat(balance).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-gray-400 font-medium mt-1">
            {type.charAt(0).toUpperCase() + type.slice(1)} Account
          </p>
        </CardContent>
        <CardFooter className="p-0 mt-6 flex justify-between items-center border-t border-slate-700 pt-4">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="text-green-400 w-5 h-5" />
            <span className="text-white text-sm font-medium">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowDownRight className="text-red-400 w-5 h-5" />
            <span className="text-white text-sm font-medium">Expense</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
