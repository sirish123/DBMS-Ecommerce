import prisma from "../lib/prisma";

export async function postUserToDB(params) {
  console.info({ params: params });
  const { name, email, password, type } = params;
  const result = await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: password,
      type: type,
    },
  });
  return result;
}

export async function getUserById(userparams) {
  const user =
    await prisma.$queryRaw`SELECT * FROM users WHERE email = ${userparams.email} AND type = ${userparams.type}`;

  return user;
}

export async function postCartItems(params) {
  console.info({ params: params });
  const { email, itemcode, quantity, status } = params;
  const result = await prisma.useritems.create({
    data: {
      email: email,
      itemcode: itemcode,
      quantity: quantity,
      status: status,
    },
  });
  return result;
}
export async function getUserItems(params) {
  console.info({ params: params });
  const products =
    await prisma.$queryRaw`SELECT u.*, s.itemname, s.itemprice, s.itemimage, s.producttype
    FROM useritems u
    JOIN selleritems s ON u.itemcode = s.id
    WHERE u.email =  ${params.email} AND u.status = ${params.status};
    `;

  return products;
}

export async function updateCartItems(params) {
  //1-cart, 2-purchased, 3-canclled refund in process, 4-return item in process, 5-refunded
  const { email, status } = params;
  const carttobuy = await prisma.$queryRaw`UPDATE useritems
  SET status = ${status}
  WHERE email = ${email};`;

  return carttobuy;
}
