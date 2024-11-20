var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import connect from "./utils/connect.js";
import routes from "./utils/routes.js";
import cors from "cors";
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield connect();
    console.log(`localhost is running at port${port}`);
    routes(app);
}));
