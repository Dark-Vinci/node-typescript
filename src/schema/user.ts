import { object, string, ref } from "yup";

export const createSchema = object({
    body: object({
        name: string()
            .required("name is required"),
        
        password: string()
            .required("password is required")
            .min(6, "password too short, min of 6 characters")
            .matches(/^[a-zA-Z0-9_.-]*$/, "password can only contain latin letters"),

        passwordConfirmation: string().oneOf(
            [ref("password"), null],
            "password must match"
        ),

        email: string()
            .email("must be a valid email")
            .required("email is required"),
    }),
});