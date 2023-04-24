import { getBoughtAndReturn } from "@/util/UserController";

export default async function handler(req, res) {
  try {
    const data = await getBoughtAndReturn(req.body);
    console.log(data);
    return res.status(201).json(data);
  } catch (err) {
    console.error({ msg: "getBoughtAndReturn", err: JSON.stringify(err) });
    return res.json({ error: err.response });
  }
}
