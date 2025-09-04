'use client'
import { updateBudget } from '@/actions/budget';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import useFetch from '@/hooks/use-fetch';
import { Check, Pencil, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'; // or your toast library

const BudgetProgress = ({ initialBudget, currentExpense = 0 }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newBudget, setNewBudget] = useState(initialBudget?.amount?.toString() || '0');

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const handleBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    try {
      const result = await updateBudgetFn(amount);
      
      // Show success toast immediately if the result indicates success
      if (result?.success) {
        setIsEditing(false);
        toast.success("Budget updated successfully");
      }
    } catch (err) {
      console.error('Budget update failed:', err);
    }
  }

  const cancelBudget = () => {
    setNewBudget(initialBudget?.amount?.toString() || '0');
    setIsEditing(false);
  }

  // Use the updated budget if available, otherwise use initial budget
  const currentBudget = updatedBudget?.budget || initialBudget;
  const percent = currentBudget ? Math.min((currentExpense / currentBudget.amount) * 100, 100) : 0;
  const remaining = currentBudget ? Math.max(currentBudget.amount - currentExpense, 0) : 0;
  const isOverBudget = currentBudget && currentExpense > currentBudget.amount;

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
      // Update the newBudget state to reflect the new amount
      setNewBudget(updatedBudget?.budget?.amount?.toString() || newBudget);
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className='flex-1'>
          <CardTitle>Monthly Budget (Default Account)</CardTitle>
          <div className='flex items-center gap-2 mt-1'>
            {isEditing ? ( 
              <div className='flex items-center gap-1'>
                <Input
                  type='number'
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className='w-32'
                  placeholder="Enter budget"
                  autoFocus
                  min="0"
                  step="0.01"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleBudget}  
                  disabled={isLoading}
                  className="h-8 w-8"
                >
                  <Check className='h-4 w-4 text-green-500'/>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={cancelBudget}  
                  disabled={isLoading}
                  className="h-8 w-8"
                >
                  <X className='h-4 w-4 text-red-500'/>
                </Button>
              </div> 
            ) : (
              <>
                <CardDescription>
                  {currentBudget ? 
                    `$${currentExpense.toFixed(2)} of $${currentBudget.amount.toFixed(2)} spent this month` : 
                    'No budget set for this month'
                  }
                </CardDescription>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsEditing(true)} 
                  className='h-6 w-6'  
                  disabled={isLoading}
                >
                  <Pencil className='h-3 w-3'/>
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {currentBudget ? (
          <div className="space-y-3">
            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress 
                value={percent} 
                className={`h-3 ${isOverBudget ? 'progress-danger' : ''}`}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{percent.toFixed(1)}% spent</span>
                <span className={isOverBudget ? 'text-red-500 font-medium' : ''}>
                  {isOverBudget ? 
                    `$${(currentExpense - currentBudget.amount).toFixed(2)} over budget` :
                    `$${remaining.toFixed(2)} remaining`
                  }
                </span>
              </div>
            </div>

            {/* Budget Status */}
            {isOverBudget && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600 font-medium">
                  ⚠️ You've exceeded your monthly budget by $${(currentExpense - currentBudget.amount).toFixed(2)}
                </p>
              </div>
            )}
            
            {percent >= 80 && !isOverBudget && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <p className="text-sm text-yellow-600 font-medium">
                  ⚠️ You've used {percent.toFixed(1)}% of your budget
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Set a budget to track your spending</p>
            <Button 
              onClick={() => setIsEditing(true)} 
              className="mt-2"
              disabled={isLoading}
            >
              Set Budget
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default BudgetProgress