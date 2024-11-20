var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as dotenv from "dotenv";
import { createRequire } from "node:module";
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv.config();
        const dbUri = process.env.dbUri || "";
        const require = createRequire(import.meta.url);
        const mongoose = require("mongoose");
        try {
            yield mongoose.connect(dbUri);
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    });
}
export default connect;
