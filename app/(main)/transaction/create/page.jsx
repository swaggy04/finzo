import { getAccounts } from '@/actions/dashboard'
import AddTransactionForm from '../_components/addtransaction'
import { defaultCategories } from '@/data/category'

const AddTransaction = async() => {

  const account = await getAccounts()

  return (
    <div>
      <div className='max-w-3xl mx-auto px-5'>
        <h1 className='text-5xl flex justify-center items-center font-extrabold'>Add Transaction</h1>
      </div>
      <AddTransactionForm accounts={account} category={defaultCategories}/>
    </div>
  )
}

export default AddTransaction