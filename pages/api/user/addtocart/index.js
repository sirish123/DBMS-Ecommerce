import { postCartItems} from "@/util/UserController";

export default async function handler(req, res) {
  try {
    const data = await postCartItems(req.body);
    console.log(data);
    return res.status(201).json(data);
  } catch (err) {
    console.error({ msg: "postCartItems", err: err });
    return res.json({ error: err });
  }
}
