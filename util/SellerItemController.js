import prisma from "../lib/prisma";

export async function postSellerItemToDB(params) {
    console.info({"params":params})
  const { itemname, itemprice, itemimage, phone } = params;
  const result = await prisma.selleritems.create({
    data: {
      itemname: itemname,
      itemprice: itemprice,
      itemimage: itemimage,
      phone: phone,
    },
  });
  return result;
}

export async function getAllProducts() {
  const products =
    await prisma.$queryRaw`SELECT * FROM selleritems`;

  return products;
}
