import { getUserBankById } from "../../../../util/BankController";
export default async function handler(req, res) {
  try {
  
    const data = await getUserBankById(req.body.email);
    console.log(data);
    return res.status(201).json(data);
  } catch (err) {
    console.error({ msg: "getUserBankById", err });
    return res.json({ error: err });
  }
}
