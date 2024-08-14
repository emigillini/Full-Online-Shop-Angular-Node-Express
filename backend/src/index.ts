import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/products.routes";
import userRoutes from "./routes/user.routes";
import cartRoutes from './routes/cart.routes';
import purchaseRoutes from './routes/purchase.routes';
import deliveryRoutes from './routes/delivery.routes';
import passport from './config/passport';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/deliveries', deliveryRoutes);
const PORT:string = process.env.PORT


const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MOONGOSE_CONNECT
    );
    console.log("Connection to the database successful");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

connectDB();

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
