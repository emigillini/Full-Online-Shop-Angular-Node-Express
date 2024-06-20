import { Document, Types } from 'mongoose';

export type Color = "red" | "blue" | "white" | "black"
export type Brand = "nike" | "adidas" | "puma" |"reebok"
export type Model = 2024 | 2023|2022|2000
export type Size = 5 | 6 | 7 | 8
export type Payment = "Debit_Card" | "Paypal" | "Credit_Card" 
export type Delivery = "Pending" | "Transit" | "Complete" 


export interface IUser extends Document {
    username: string;
    email: string;
    password: string,
    role:string;
    last_connection: Date, 
}

export interface IProduct extends Document {
    model: Model;
    brand: Brand;
    color: Color,
    size:Size;
    price: number, 
    stock: number, 
    image : string,
    detail : string,
}

export interface ICart extends Document {
    user:IUser,
    date:Date
    products:IProduct[]

}

export interface IPurchase extends Document {
    invoice_number:String,
    date:Date,
    user:IUser,
    total:Number,
    Payment_Type:Payment,
    cart:ICart

}

export interface IDelivery extends Document {
    purchase:IPurchase;
    tracking_number :String;
    delivery_address: String;
    estimated_date :Date;
    delivery_date : Date;
    delivery_status : Delivery;


}




