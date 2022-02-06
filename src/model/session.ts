import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./user";

export interface SessionDocument extends Document {
    user: UserDocument["_id"];
    valid: boolean;
    userAgent: string;
    createdAt: string;
    updatedAt: string;
}

const SessionSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    valid: {
        type: Boolean,
        default: true,
        required: true,
    },

    userAgent: {
        type: String,
    }
}, { timestamps: true });

const Session = mongoose.model<SessionDocument>("Session", SessionSchema)

export default Session;