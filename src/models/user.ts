import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        rquired: true,
        minlength: 3
    }
});

export default mongoose.model<IUser>('User', UserSchema);