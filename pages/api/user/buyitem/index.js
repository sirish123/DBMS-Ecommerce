import { updateCartItems } from "@/util/UserController";
import { updateBankAmount } from "@/util/BankController";
import { updateselleritems } from "@/util/SellerItemController";
export default async function handler(req, res) {
  try {
    console.info({ msg: "update cart and bank account", body: req.body });
    const data = await updateCartItems(req.body);
    const bankdata = await updateBankAmount(req.body);
    const sellerdata = await updateselleritems(req.body.cartItems);

    return res.status(201).json(data);
  } catch (err) {
    console.error({ msg: "update cart and bank account", err: err });
    return res.json({ error: err });
  }
}
