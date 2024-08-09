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
    is_admin:boolean;
    last_connection?: Date, 
    identification_number?: number,
    phone?: string,
    address?:string
}
export interface IConversation extends Document {
    name: string,
    user: IUser,
    created_at: date,
    closed_at?: date,
    open: boolean
}
export interface IMessage extends Document {
    conversation: IConversation,
    sender:IUser,
    content: string,
    created_at: date
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

export interface ICartProduct extends Document {
    product: Types.ObjectId;
    quantity: number;
}

export interface ICart extends Document {
    user:IUser,
    date:date
    products:ICartProduct[]

}

export interface IPurchase extends Document {
    invoice_number:string,
    date:date,
    user:IUser,
    total:number,
    Payment_Type:Payment,
    products: ICartProduct[];

}


export interface IDelivery extends Document {
    purchase:IPurchase;
    tracking_number :string;
    delivery_address: string;
    estimated_date :date;
    delivery_date : date;
    delivery_status : Delivery;
}

