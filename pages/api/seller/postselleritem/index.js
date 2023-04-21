import { postSellerItemToDB } from "@/util/SellerItemController";
export default async function handler(req, res) {
  console.info(req.body)
  try {
    const data = await postSellerItemToDB(req.body.selleritem);
    console.log(data);
    return res.status(201).json(data);
  } catch (err) {
    console.error({ msg: "postSellerItemToDB", err: JSON.stringify(err) });
    return res.json({ error: err.response });
  }
}
