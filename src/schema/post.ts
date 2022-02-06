import { object, string } from "yup";

const payload = {
    body: object({
        title: string()
            .required("title is required"),

        body: string()
            .required("body is required")
            .min(120, "must be at least 120 characters long"),
    })
}

export const createPostSchema = object({
    ...payload,
});

export const updatePostSchema = object({
    params: object({
        id: string()
            .required("post id is required")
    }),
    ...payload,
});

export const deletePostSchema = object({
    params: object({
        id: string()
            .required("post id is required")
    })
});