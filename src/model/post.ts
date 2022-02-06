import mongoose, { Schema, Document } from "mongoose";

export interface PostDocument extends Document {
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: string;
    user: mongoose.Schema.Types.ObjectId;
}

export const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    body: {
        type: String,
        required: true,
        minlength: 120,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
}, { timestamps: true });

export const Post = mongoose.model<PostDocument>("Post", PostSchema);