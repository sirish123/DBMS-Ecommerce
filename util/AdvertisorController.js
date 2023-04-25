import prisma from "../lib/prisma";

export async function postAdvertisementToDB(params) {
  const { email, productname, imageurl, producttype } = params;
  const result = await prisma.advertisorposter.create({
    data: {
      email: email,
      productname: productname,
      imageurl: imageurl,
      producttype: producttype,
    },
  });
  return result;
}

export async function postCouponCode(params) {
  const { email, couponcode,quantity,percent, producttype ,bankid} = params;
  const result = await prisma.advertisorcodevalue.create({
    data: {
      email: email,
      couponcode: couponcode,
      quantity: quantity,
      percent:percent,
      producttype: producttype,
      bankid:bankid,
    },
  });
  return result;
}


export async function getcouponinfo(params) {
  
  const getcc = await prisma.$queryRaw`
  SELECT * FROM advertisorcodevalue 
  WHERE couponcode = ${params.couponCode} ;
  `;
  return result;
}


