import express from "express"
import config from "config";
import connect from "./utils/connect"
import logger from "./utils/logger";
import routes from "./utils/routes";
import cors from "cors"

const port = config.get<number>('port')

const app = express();

app.use(express.json())

app.use(cors({ origin: ['http://localhost:3000', "*"] }));

app.use(express.static("profileImage"))

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`)

    await connect();
    routes(app);
})
