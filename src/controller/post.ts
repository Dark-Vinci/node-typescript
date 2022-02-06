import { Request, Response } from "express";
import { get } from "lodash";

import { createPost, findPost, findAndUpdate, deletePost } from "../service/post";

export async function createPostHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const body = req.body;

    const post = await createPost({ ...body, user: userId });

    return res.send(post);
}

export async function deletePostHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const postId = get(req, "params.id");

    const post = await findPost({ id: postId });

    if (!post) {
        return res.sendStatus(404);
    }

    if (String(post.user) !== userId) {
        return res.sendStatus(401)
    }

    await deletePost({ id: postId });

    return res.sendStatus(200);
}

export async function updatePostHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const id = get(req, "params.id");
    const update = req.body;

    const post = await findPost({ id });

    if (!post) {
        return res.sendStatus(404);
    }

    if (String(post.user) !== userId) {
        return res.sendStatus(401)
    }

    const updatedPost = await findAndUpdate({ id }, update, { new: true });

    return res.send(updatedPost);
}

export async function getPostHandler(req: Request, res: Response) {
    const id = get(req, "params.id");
    const post = await findPost({ id });

    if (!post) {
        return res.sendStatus(404);
    }

    return res.send(post);
}