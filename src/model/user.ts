import config from "config";
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: string;

    comparePassword(cd: string): Promise<boolean>;
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    name: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

UserSchema.pre("save", async function (next: any) {
    let user = this as UserDocument;

    if (!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get("saltFactor"));
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    return next();
});

UserSchema.methods.comparePassword = async function (password: string) {
    const user = this as UserDocument;
    return bcrypt.compare(password, user.password).catch((e) => false);
}

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;