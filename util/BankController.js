import prisma from "../lib/prisma";

export async function postBankToDB(params) {
  console.info({ params: params });
  const { AccHolderName, Accountnum, cvv, Amount, email } = params;
  const result = await prisma.userbankaccount.create({
    data: {
      AccHolderName: AccHolderName,
      Accountnum: Accountnum,
      cvv: cvv,
      Amount: Amount,
      email: email,
    },
  });
  return result;
}
export async function getUserBankById(userId) {
  console.log(userId);
  const user = await prisma.userbankaccount.findMany({
    where: {
      email: userId,
    },
  });

  return user;
}
