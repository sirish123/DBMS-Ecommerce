import prisma from "../lib/prisma";

export async function postSellerItemToDB(params) {
    console.info({"params":params})
  const { itemname, itemprice, itemimage, email, quantity,contact ,producttype} = params;
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
  const products =
    await prisma.$queryRaw`SELECT * FROM selleritems`;

  return products;
}
