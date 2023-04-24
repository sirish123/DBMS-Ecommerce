import prisma from "../lib/prisma";

export async function postBankToDB(params) {
  console.info({ params: params });
  const { AccHolderName, Accountnum, cvv, Amount, email } = params;
  const result = await prisma.userbankaccount.create({
    data: {
      accholdername: AccHolderName,
      accountnum: Accountnum,
      cvv: cvv,
      amount: Amount,
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

export async function updateBankAmount(params) {
  const { id, amount, price} = params;
  const value = amount-price;

  const carttobuy = await prisma.$queryRaw`UPDATE userbankaccount
  SET Amount = ${value}
  WHERE id = ${id};`;

  return carttobuy;
}
