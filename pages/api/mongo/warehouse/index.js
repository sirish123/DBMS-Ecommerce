import nc from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { createwarehouse, getAllWarehouse } from "@/util/mongodbcontroller";
const handler = nc();

dbConnect();

handler.post(createwarehouse);
handler.get(getAllWarehouse)
export default handler;
