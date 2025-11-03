import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);

    console.log("Connect successfully to DB!");
  } catch (error) {
    console.error("Fail to connect to DB: ", error);
    process.exit(1); //exit with error
  }
};
