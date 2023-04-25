import { getusehistory} from "@/util/UserController";

export default async function handler(req, res) {
  try {
    const data = await getusehistory(req.body.email);
    console.log(data);
    return res.status(201).json(data);
  } catch (err) {
    console.error({ msg: "get use history", err: err });
    return res.json({ error: err });
  }
}
