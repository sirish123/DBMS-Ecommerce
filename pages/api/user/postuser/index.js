import { postUserToDB } from "@/util/UserController";
export default async function handler(req, res) {
  //console.info(req.body)
  try {
    const data = await postUserToDB(req.body.user);
    console.log(data);
    return res.status(201).json(data);
  } catch (err) {
    console.error({ msg: "PostUserToDb", err: err });
    return res.json({ error: err.response });
  }
}
