import User from "../lib/models/user";

export const newProduct = async (req, res) => {
  const product = await User.create(req.body);
  res.status(201).json({
    product,
  });
};