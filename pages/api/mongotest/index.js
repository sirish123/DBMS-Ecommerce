import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import { newProduct } from "@/util/mongodbcontroller";
const handler = nc();

dbConnect();

handler.post(newProduct);

export default handler;
