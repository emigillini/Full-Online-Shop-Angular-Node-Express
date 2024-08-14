import { Document, Types } from 'mongoose';

export type Color = "red" | "blue" | "white" | "black"
export type Brand = "nike" | "adidas" | "puma" |"reebok"
export type Model = 2024 | 2023|2022|2000
export type Size = 5 | 6 | 7 | 8
export type Payment = "Debit_Card" | "Paypal" | "Credit_Card" 
export type Delivery = "Pending" | "Transit" | "Complete" 


export interface IUser extends Document {
    _id?: Types.ObjectId;
    username: string;
    email: string; 
    password: string,
    is_admin:boolean;
    last_connection?: Date, 
    identification_number?: number,
    phone?: string,
    address?:string
}
export interface IConversation extends Document {
    _id?: Types.ObjectId;
    name: string,
    user: IUser,
    created_at: Date,
    closed_at?: Date,
    open: boolean
}
export interface IMessage extends Document {
    _id?: Types.ObjectId;
    conversation: IConversation,
    sender:IUser,
    content: string,
    created_at: Date
}


export interface IProduct extends Document {
    _id?: Types.ObjectId;
    model: Model;
    brand: Brand;
    color: Color,
    size:Size;
    price: number, 
    stock: number, 
    image : string,
    detail : string,
}

export interface ICartProduct extends Document {
    _id?: Types.ObjectId;
    product: Types.ObjectId;
    quantity: number;
    
}

export interface ICart extends Document {
    user:Types.ObjectId,
    date:Date
    products:ICartProduct[]

}

export interface IPurchase extends Document {
    _id?: Types.ObjectId;
    invoice_number:string,
    date:Date,
    user:Types.ObjectId,
    total:number,
    Payment_Type:Payment,
    cart: Types.ObjectId;

}


export interface IDelivery extends Document {
    _id?: Types.ObjectId;
    purchase:IPurchase;
    tracking_number :string;
    delivery_address: string;
    estimated_date :Date;
    delivery_date : Date;
    delivery_status : Delivery;
}

