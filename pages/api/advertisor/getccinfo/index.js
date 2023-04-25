import { getcouponinfo } from "../../../../util/AdvertisorController";
export default async function handler(req, res) {
    console.info({"values":req.body});
  try {
    const data = await getcouponinfo(req.body);
    console.log(data);
    return res.status(201).json(data);
  } catch (err) {
    console.error({ msg: "Post coupon code", err });
    return res.json({ error: err });
  }
}
