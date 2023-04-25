import mongoose from "mongoose";

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGODB_URI);
};

export default dbConnect;
