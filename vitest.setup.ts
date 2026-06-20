import "dotenv/config";
import { TebexHeadless } from "./src/index.js";

declare global {
  var tebexHeadless: TebexHeadless;
}

globalThis.tebexHeadless = new TebexHeadless(
  process.env["WEBSTORE_IDENTIFIER"]!,
  process.env["PRIVATE_KEY"]
);
