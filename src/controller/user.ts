import { Request, Response } from "express";
import { omit } from "lodash";

import log from "../logger"
import { createUser } from "../service/user";

export async function createUserHandler (req: Request, res: Response) {
    try {
        const user = await createUser(req.body)
        return res.send(omit(user.toJSON(), "password"));
    } catch (ex: any) {
        log.error(ex);
        return res.status(409).send(ex.message);
    }
}