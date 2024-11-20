import express from "express"
import connect from "./utils/connect.js"
import logger from "./utils/logger.js";
import routes from "./utils/routes.js";
import cors from "cors"

const port = process.env.PORT || 8080
const app = express();

app.use(express.json())

app.use(cors({ origin: "*" }));

app.listen(port, async () => {
    await connect();
    console.log(`localhost is running at port${port}`)
    routes(app);
})  
