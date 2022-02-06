import { object, string } from "yup";

export const createUserSessionSchema = object({
    body: object({
        password: string()
            .required("password is required")
            .min(6, "password too short")
            .matches(/^[a-zA-Z0-9_.-]*$/, "password can only contain latin letters"),

        email: string()
            .email("mist be a valid email")
            .required("email field is very much required"),
    }),
});