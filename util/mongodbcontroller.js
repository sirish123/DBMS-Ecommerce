import Useraddress from "../lib/models/user";
import Warehouse from "../lib/models/warehouse";
import Grievance from "../lib/models/grievance";
export const createaddress = async (req, res) => {
  const product = await Useraddress.create(req.body);
  res.status(201).json({
    product,
  });
};

export const createwarehouse = async (req, res) => {
  const product = await Warehouse.create(req.body);
  res.status(201).json({
    product,
  });
};

export const creategrievance = async (req, res) => {
  const product = await Grievance.create(req.body);
  res.status(201).json({
    product,
  });
};

export const getAllWarehouse = async (req, res) => {
  const warehouses = await Warehouse.find();
  res.status(200).json({
    warehouses,
  });
};
