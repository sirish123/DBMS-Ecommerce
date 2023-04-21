import { getAllProducts } from "@/util/SellerItemController";
export default async function handler(req, res) {

  try {
    const data = await getAllProducts();
    console.log(data);
    return res.status(201).json(data);
  } catch (err) {
    console.error({ msg: "getAllProducts", err: JSON.stringify(err) });
    return res.json({ error: err.response });
  }
}
