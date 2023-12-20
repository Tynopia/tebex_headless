import { SetWebstoreIdentifier, SetPrivateKey } from "./dist";

require('dotenv').config();

SetWebstoreIdentifier(process.env.WEBSTORE_IDENTIFIER || "");
SetPrivateKey(process.env.PRIVATE_KEY || "");