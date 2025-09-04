
import { getAccounts } from '@/actions/dashboard'
import PopupForm from '@/components/popup'
import React from 'react'
import AccountCard from './_component/AccountCard'
// import BudgetProgress from './_component/budgetProgress'
import { currentbudget } from '@/actions/budget'

const Dashboard = async () => {
  const accounts = await getAccounts();
  
  const defaultaccount = accounts?.find((account) => account.isDefault);

  let budgetData = null;
  if(defaultaccount){
   budgetData = await currentbudget(defaultaccount.id)

  }
  

  return (
    <div>
      {/*progress budget*/ }
      {/* {defaultaccount && <BudgetProgress
        initialbudget={budgetData?.budget}
        currentbudget={budgetData?.currentExpenses || 0}
      />} */}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 mt-10'>
        {accounts?.length > 0 && accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
      <div className='flex items-center justify-between mb-5'>
        <PopupForm />
      </div>

    </div>
  )
}

export default Dashboard 