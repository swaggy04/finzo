'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Check, Pencil, X } from 'lucide-react';
import React from 'react'
import { useState } from 'react';

const BudgetProgress = ({ initalBudget, currentExpense }) => {
const [isEditing, setisEditing] = useState(false)

  const [newBudget, setnewBudget] = useState(initalBudget?.amount?.toString() || '0');



  const handleBudget=()=>{}
  const cancelBudget=()=>{
    setnewBudget(initalBudget?.amount?.toString() || '0');
    setisEditing(false);
  }

  const percent = initalBudget ? ( currentExpense / initalBudget.amount) * 100 : 0;

return (
  <Card >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      
      <div className='flex-1'>
      <CardTitle>Monthly budget (Default Account)</CardTitle>
      <div className='flex items-center gap-2 mt-1'>
        {
          isEditing ?( 
          <div className='flex items-center'>
            <Input
              type='number'
              value={newBudget}
              onChange={(e) => setnewBudget(e.target.value)}
              className='w-24'
              placeholder="enter the budget"
              autoFocus
            />
            <Button variant="ghost" size="icon" onClick={handleBudget}><Check className='h-4 w-4 text-green-500'/></Button>
            <Button variant="ghost" size="icon" onClick={cancelBudget}><X className='h-4 w-4 text-red-500'/></Button>
          </div> ):(
            <>
          <CardDescription>
            {initalBudget ?`$${currentExpense.toFixed(2)} of $${initalBudget.amount.toFixed(2)} spent this month` : 'No budget set for this month'}
            
            </CardDescription>
            <Button variant="ghost" size="icon" onClick={()=> setisEditing(true)} className='h-6 w-6'>
              <Pencil className='h-3 w-3 '/>
            </Button>
            
            </>
            
            
          )
        }
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <p>Card Content</p>
    </CardContent>
    
  </Card>
)
}

export default BudgetProgress