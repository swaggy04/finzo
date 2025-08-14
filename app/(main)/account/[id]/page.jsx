import { getAccountTransaction } from '@/actions/account';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Transactiontable from '../_component/transactiontable';
import { BarLoader } from 'react-spinners';

const AccountPage = async ({ params }) => {
  const accountData = await getAccountTransaction(params.id);

  if (!accountData) {
    return notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className=" mx-auto min-h-[120px]  max-w-7xl  text-white">
      <div className='flex justify-between items-center border border-[#18181b] bg-[#171717] px-6 py-8 rounded-3xl '>
      {/* Left side: Account Name and Type */}
      <div className="flex flex-col items-start">
        <h1 className="text-5xl font-extrabold text-green-400">{account.name}</h1>
        <span className="mt-2 text-md text-gray-400">
          {account.type.charAt(0).toUpperCase() + account.type.slice(1)} Account
        </span>
      </div>

      {/* Right side: Balance and Transactions */}
      <div className="flex flex-col items-end">
        <div className="text-3xl font-bold text-white">
          ₹ {parseFloat(account.balance).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </div>
        <span className="mt-1 text-xs text-gray-500">
          {account._count.transactions} Transactions
        </span>
      </div>
      </div>


      <Suspense
      fallback={<BarLoader width={"100%"} className='mt-4' color='#9333ea'/>}
      >
        <Transactiontable transactions={transactions}/>
      </Suspense>
    </div>
  );
};

export default AccountPage;
