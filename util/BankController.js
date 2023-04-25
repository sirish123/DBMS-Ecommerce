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
  const { id, amount, price } = params;
  let discount = 0;
  const getcc = await prisma.$queryRaw`
  SELECT * FROM advertisorcodevalue 
  WHERE couponcode = ${params.couponCode} ;
  `;
  if (getcc.length != 0) {
    const getbank = await prisma.$queryRaw`
  SELECT * FROM userbankaccount
  WHERE id = ${getcc[0].bankid};
`;
    discount = parseInt((price * getcc[0].percent) / 100);
    const advbankamount = parseInt(Math.floor(getbank[0].amount - discount));
    const advbank = await prisma.$queryRaw`UPDATE userbankaccount
  SET amount = ${advbankamount}
  WHERE id = ${getcc[0].bankid};`;
  }
  if (getcc.length == 0) {
    discount = 0;
  }
  const totaldeduc = parseInt(Math.floor(amount - price + discount));
  await prisma.$queryRaw`UPDATE userbankaccount
  SET amount = ${totaldeduc}
  WHERE id = ${id};`;

  await prisma.$transaction(
    params.cartItems.map((item) => {
      return prisma.userbankaccount.update({
        where: {
          id: item.bankid,
        },
        data: {
          amount: {
            increment: item.itemprice,
          },
        },
      });
    })
  );

  return getcc;
}
