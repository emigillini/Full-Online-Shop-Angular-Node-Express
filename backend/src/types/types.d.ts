import { Document, Types } from 'mongoose';
export type Color = "Red" | "Blue" | "White" | "Black"
export type Model = "Model A"| "Model B"|"Model C"|"Model D"|"Model E"
export type Size = 5 | 6 | 7 | 8

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
    adress?:string
}
export interface IConversation extends Document {
    _id?: Types.ObjectId;
    name: string,
    user: Types.ObjectId;
    created_at: Date,
    closed_at?: Date,
    open: boolean
}
export interface IMessage extends Document {
    _id?: Types.ObjectId;
    conversation: Types.ObjectId;
    user:Types.ObjectId;
    content: string,
    created_at: Date
}


export interface IProduct extends Document {
    _id?: Types.ObjectId;
    model: Model;
    brand: Types.ObjectId;
    color: Color,
    size:Size;
    price: number, 
    stock: number, 
    image : string,
    detail : string,
}
export interface IBrand extends Document {
    _id?: Types.ObjectId;
    description: string

}

export interface IPaymentType extends Document {
    _id?: Types.ObjectId;
    description: string

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
    paymentType:Types.ObjectId;
    cart: Types.ObjectId;
    delivery:Types.ObjectId;

}


export interface IDelivery extends Document {
    _id?: Types.ObjectId;
    purchase:Types.ObjectId;
    tracking_number :string;
    delivery_address: string;
    estimated_date :Date;
    delivery_date : Date;
    delivery_status : Delivery;
}
export interface MailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

