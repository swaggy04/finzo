import prisma from '@/lib/prisma'; // adjust your Prisma import

export async function getAccountTransaction(id) {
  const account = await prisma.account.findUnique({
    where: { id },
    include: { transactions: true }, // ✅ use plural
  });

  if (!account) return null;

  return {
    ...account,
    transactions: account.transactions ?? [], // ensure always an array
  };
}
