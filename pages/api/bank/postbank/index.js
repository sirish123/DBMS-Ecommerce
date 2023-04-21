import { postBankToDB } from "../../../../util/BankController";
export default async function handler(req, res) {
  try {
    const data = await postBankToDB(req.body.Bankdetails);
    console.log(data);
    return res.status(201).json(data);
  } catch (err) {
    console.error({ msg: "PostUserToDb", err });
    return res.json({ error: err });
  }
}
