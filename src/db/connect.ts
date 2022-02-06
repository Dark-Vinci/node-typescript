import mongoose from "mongoose";
import config from "config";
import log from "../logger";

function connect() {
    const dbURI = config.get("dbURI") as string;

    return mongoose
        .connect(dbURI)
        .then(() => {
            log.info("database connected")
        })
        .catch((error) => {
            log.error("db error", error)
            process.exit(1);
        })
}

export default connect;