import { getsellerreturnees } from "@/util/SellerItemController";
export default async function handler(req, res) {

  try {
    const data = await getsellerreturnees(req.body.email);
    console.log(data);
    return res.status(201).json(data);
  } catch (err) {
    console.error({ msg: "getsellerreturnees", err: err });
    return res.json({ error: err });
  }
}
