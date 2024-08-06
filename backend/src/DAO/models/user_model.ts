import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../types';

const usersCollection = "users";

const UserSchema:Schema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true , unique:true},
    identification_number: { type: Number, unique: true, sparse: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
    phone: { type: String, maxlength: 45 },
    address: { type: String, maxlength: 45 },
    last_connection: { type: Date, default: Date.now }
});
UserSchema.virtual('conversations', {
  ref: 'ConversationModel',
  localField: '_id',
  foreignField: 'user'
});
UserSchema.methods.updateLastConnection = async function(this:IUser) {
    this.last_connection = new Date();
    await this.save();
  };
export const UserModel = mongoose.model<IUser>(usersCollection, UserSchema);


