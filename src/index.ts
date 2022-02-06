import express, { Express } from "express";
import xss from "xss-clean";
import helmet from "helmet";

import log from "./logger";
import connect from "./db/connect";
import route from "./route";

import deserializeUser from './middleware/deserializeuser';

const app: Express = express();

const port = process.env.PORT || 3000;
// const host = config.get("host") as string;

app.use(express.json());
app.use(xss());
app.use(helmet());
app.use(deserializeUser);
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    log.info(`listening on port ${ port }`);
    connect();
    route(app);
});
