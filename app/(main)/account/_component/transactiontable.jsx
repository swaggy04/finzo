"use client";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Ghost, MoreHorizontalIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Transactiontable = ({ transactions }) => {

  const router = useRouter()
  const allTransaction = transactions;

  const handleSort = () => { };

  return (
    <div className="mt-7">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                Date
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                Category
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allTransaction.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No transaction found
                </TableCell>
              </TableRow>
            ) : (
              allTransaction.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{format(new Date(transaction.date), "PP")}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell className="text-right font-medium" style={{ color: transaction.type === "EXPENSE" ? "red" : "green", }}>
                    {transaction.type === "EXPENSE" ? "-" : "+"}
                    {transaction.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontalIcon className='h-3 w-3'/>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel
                          onClick={()=>{
                            router.push(`/transaction/create?edit=${transaction.id}`);
                          }}
                        >Edit</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                        className='text-destructive' onClick={()=>deletefn([transaction.id])}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Transactiontable;
