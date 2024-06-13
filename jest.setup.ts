import { TebexHeadless } from "./dist";

declare global {
    var tebexHeadless: TebexHeadless;
}

require("dotenv").config();

global.tebexHeadless = new TebexHeadless(
    process.env.WEBSTORE_IDENTIFIER!,
    process.env.PRIVATE_KEY!
);