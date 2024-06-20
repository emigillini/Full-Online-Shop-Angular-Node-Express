import mongoose from 'mongoose';
import { IUser } from '../../types';

const usersCollection = "users";

const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true , unique:true},
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    last_connection: { type: Date, default: Date.now }
});
UserSchema.methods.updateLastConnection = async function(this:IUser) {
    this.last_connection = new Date();
    await this.save();
  };
export const UserModel = mongoose.model<IUser>(usersCollection, UserSchema);


