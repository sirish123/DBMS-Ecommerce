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
    await prisma.$queryRaw`SELECT u.*, s.itemname, s.itemprice, s.itemimage,s.bankid, s.quantity as seller_quantity, u.quantity as user_quantity, s.producttype
    FROM useritems u
    JOIN selleritems s ON u.itemcode = s.id
    WHERE u.email = ${params.email} AND u.status = ${params.status};`;

  return products;
}
export async function getBoughtAndReturn(params) {
  console.info({ params: params });
  const products =
    await prisma.$queryRaw`SELECT u.*, s.itemname, s.itemprice, s.itemimage,s.contact, s.bankid,s.producttype
    FROM useritems u
    JOIN selleritems s ON u.itemcode = s.id
    WHERE u.email =  ${params.email} ;
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
  //1-cart, 2-purchased, 3-delivered,4-seller has to decide, 5-return rejected, 6-return accepted refunded

  const { id, status } = params;
  const carttobuy = await prisma.$queryRaw`UPDATE useritems
  SET status = ${status}
  WHERE id = ${id};`;

  return carttobuy;
}

export async function postusehistory(params) {
  //1-cart, 2-purchased, 3-delivered,4-seller has to decide, 5-return rejected, 6-return accepted refunded

  const { email, producttype } = params;
  const result = await prisma.$transaction(
    params.cartItems.map((item) => {
      return prisma.userhistory.create({
        data: {
          email: email,
          producttype: item.producttype,
        },
      });
    })
  );
  return result;
}

export async function getusehistory(params) {
  const products =
    await prisma.$queryRaw`SELECT * FROM userhistory WHERE email = ${params};`;
  if (products.length > 0) {
    const result = await prisma.$transaction(
      products.map((item) => {
        return prisma.$queryRaw`SELECT * FROM advertisorposter WHERE producttype = ${item.producttype};`;
      })
    );
    return result;
  }

  return products;
}
