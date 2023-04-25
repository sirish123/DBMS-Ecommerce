import prisma from "../lib/prisma";

export async function postSellerItemToDB(params) {
  console.info({ params: params });
  const {
    itemname,
    itemprice,
    itemimage,
    email,
    quantity,
    contact,
    producttype,
  } = params;
  const result = await prisma.selleritems.create({
    data: {
      itemname: itemname,
      itemprice: itemprice,
      itemimage: itemimage,
      quantity: quantity,
      contact: contact,
      email: email,
      producttype: producttype,
    },
  });
  return result;
}

export async function getAllProducts() {
  const products = await prisma.$queryRaw`SELECT * FROM selleritems`;
  return products;
}

export async function updateselleritems(params) {
  console.info({ params: params });
  const transactionResult = await prisma.$transaction(
    params.map((item) => {
      return prisma.selleritems.update({
        where: {
          id: item.itemcode,
        },
        data: {
          quantity: {
            decrement: item.user_quantity,
          },
        },
      });
    })
  );

  return transactionResult;
}

export async function getsellerreturnees(params) {
  const products =
    await prisma.$queryRaw`SELECT u.id as user_id, u.email as user_email, u.quantity as user_quantity, u.status as status,
  s.id as seller_id, s.email as seller_email, s.itemname, s.itemprice, s.quantity as seller_quantity, s.itemimage, s.contact, s.producttype
FROM useritems u
JOIN selleritems s ON u.itemcode = s.id
WHERE u.status = 4 OR u.status = 5 OR u.status = 6 AND s.email = ${params};
`;
  return products;
}
