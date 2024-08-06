import express, { urlencoded } from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const PORT = 3000;

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.spvzvph.mongodb.net/"
    );
    console.log("Connection to the database successful");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

connectDB();

app.get("/api", (req, res) => {
  const hiUser = "Hello New User...";
  res.send(hiUser);
});

app.listen(PORT, () => {
  console.log(`server is running on port  ${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing MongoDB connection");
  try {
    await mongoose.disconnect();
    console.log("Disconnected from the database");
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
  } finally {
    process.exit(0);
  }
});
