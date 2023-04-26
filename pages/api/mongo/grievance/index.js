import nc from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { creategrievance } from "@/util/mongodbcontroller";
const handler = nc();

dbConnect();

handler.post(creategrievance);

export default handler;
