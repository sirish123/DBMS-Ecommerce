import { postAdvertisementToDB } from "../../../../util/AdvertisorController";
export default async function handler(req, res) {
    console.info({"values":req.body});
  try {
    const data = await postAdvertisementToDB(req.body.advdata);
    console.log(data);
    return res.status(201).json(data);
  } catch (err) {
    console.error({ msg: "Post Advertisement", err });
    return res.json({ error: err });
  }
}
