import config from "config";
import { get } from "lodash";
import { LeanDocument, UpdateQuery, FilterQuery } from "mongoose";

import { findUser } from "./user";
import { sign, decode } from "../utils/jwt";
import {UserDocument} from "../model/user";
import Session, { SessionDocument } from "../model/session";

export async function createSession(userId: string, userAgent: string) {
    const session = await Session.create({ user: userId, userAgent });

    return session.toJSON();
}

export function createAccessToken({ user, session }: {
    user: 
        | Omit<UserDocument, "password">
        | LeanDocument<Omit<UserDocument, "password">>
        | any;
    session:
        | Omit<SessionDocument, "password">
        | LeanDocument<Omit<SessionDocument, "password">>;
}) {
    const accessToken = sign(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTlt")}
    );

    return accessToken;
}

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
    const { decoded } = decode(refreshToken);

    if (!decoded || !get(decoded, "_id")) {
        return false;
    }

    const session = await Session.findById(get(decoded, "_id"));

    if (!session || !session?.valid) {
        return false;
    }

    const user = await findUser({ _id: session.user });

    if (!user) {
        return false;
    }

    const accessToken = createAccessToken({ user, session });

    return accessToken;
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return await Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return await Session.find(query).lean();
}