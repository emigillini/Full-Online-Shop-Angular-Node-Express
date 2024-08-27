import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/products.routes";
import userRoutes from "./routes/user.routes";
import cartRoutes from "./routes/cart.routes";
import purchaseRoutes from "./routes/purchase.routes";
import deliveryRoutes from "./routes/delivery.routes";
import mailRoutes from "./routes/mail.routes";
import passwordRoutes from "./routes/password.routes";
import conversationRoutes from "./routes/conversations.routes";
import messageRoutes from "./routes/message.routes";
import brandRoutes from "./routes/brand.routes";
import paymentRoutes from "./routes/payment.routes";
import passport from "./config/passport";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
const allowedOrigins = [
  "http://localhost:4200",
  "https://fullexpressangular.netlify.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  })
);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/send_mail", mailRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/payment", paymentRoutes);
const PORT: string = process.env.PORT;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MOONGOSE_CONNECT);
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
