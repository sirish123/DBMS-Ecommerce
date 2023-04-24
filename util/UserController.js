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
  const products =
    await prisma.$queryRaw`SELECT u.*, s.itemname, s.itemprice, s.itemimage, s.quantity as seller_quantity, u.quantity as user_quantity, s.producttype
    FROM useritems u
    JOIN selleritems s ON u.itemcode = s.id
    WHERE u.email = ${params.email} AND u.status = ${params.status};`;

  return products;
}
export async function getBoughtAndReturn(params) {
  if (params.status3 == null) {
    const products =
      await prisma.$queryRaw`SELECT u.*, s.itemname, s.itemprice, s.itemimage, s.producttype
    FROM useritems u
    JOIN selleritems s ON u.itemcode = s.id
    WHERE u.email =  ${params.email} AND u.status = ${params.status1} OR u.status = ${params.status2};
    `;
    return products;
  }
  const products =
    await prisma.$queryRaw`SELECT u.*, s.itemname, s.itemprice, s.itemimage, s.producttype
    FROM useritems u
    JOIN selleritems s ON u.itemcode = s.id
    WHERE u.email =  ${params.email} AND u.status = ${params.status1} OR u.status = ${params.status2} OR u.status = ${params.status3};
    `;
  return products;
}

export async function updateCartItems(params) {
  const { email, status } = params;
  const carttobuy = await prisma.$queryRaw`UPDATE useritems
  SET status = ${status}
  WHERE email = ${email} AND status = 1 ;`;

  return carttobuy;
}

export async function updatereturnstatus(params) {
  //1-cart, 2-purchased, 3-delivered,4-seller, 5-return rejected, 6-return accepted refunded
  const { id, status } = params;
  const carttobuy = await prisma.$queryRaw`UPDATE useritems
  SET status = ${status}
  WHERE id = ${id};`;

  return carttobuy;
}
