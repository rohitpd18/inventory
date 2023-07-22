import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
        console.log("Mongoose connected to DB Cluster");
    });

    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
}