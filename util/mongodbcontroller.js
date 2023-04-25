import Useraddress from "../lib/models/user";

export const newProduct = async (req, res) => {
  const product = await Useraddress.create(req.body);
  res.status(201).json({
    product,
  });
};
