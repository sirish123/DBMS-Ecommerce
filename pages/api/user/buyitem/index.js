import { updateCartItems } from "@/util/UserController";
import { updateBankAmount } from "@/util/BankController";
export default async function handler(req, res) {
  try {
    const data = await updateCartItems(req.body);
    const bankdata = await updateBankAmount(req.body);
    console.log(data);
    console.log(bankdata)
    return res.status(201).json(data);
  } catch (err) {
    console.error({ msg: "update cart and bank account", err: err });
    return res.json({ error: err });
  }
}
