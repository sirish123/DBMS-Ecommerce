import nc from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { createaddress } from "@/util/mongodbcontroller";
const handler = nc();

dbConnect();

handler.post(createaddress);

export default handler;
