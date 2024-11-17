import { GiftCardCode } from "@custom-types/Code/GiftCardCode";
import { KeyValuePair } from "@custom-types/KeyValuePair";
import { BasketPackage } from "@custom-types/Basket/BasketPackage";
import { Code } from "@custom-types/Code/Code";
import { Links } from "@custom-types/Links";


/**
 * @type {Basket}
 * @description The basket object returned from the Tebex Headless API
 *
 * @param {string} ident The identifier of the basket
 * @param {boolean} complete Whether the basket is complete
 * @param {number} id The ID of the basket
 * @param {string} country The country of the basket
 * @param {string} ip The IP address of the user
 * @param {string | null} username_id The ID of the user
 * @param {string | null} username The username of the user
 * @param {string} cancel_url The cancel url of the basket
 * @param {string} complete_url The complete url of the basket
 * @param {boolean} complete_auto_redirect Whether the basket should automatically redirect to the complete url
 * @param {number} base_price The base price of the basket
 * @param {number} sales_tax The sales tax of the basket
 * @param {number} total_price The total price of the basket
 * @param {string} email The email of the basket
 * @param {string} currency The currency of the basket
 * @param {BasketPackage[]} packages The packages in the basket
 * @param {Code[]} coupons The coupons in the basket
 * @param {GiftCardCode[]} giftcards The giftcards in the basket
 * @param {string} creator_code The creator code of the basket
 * @param {Links} links The links of the basket
 * @param {KeyValuePair<string, any>} custom The custom object of the basket
 */
export type Basket = {
    ident: string;
    complete: boolean;
    id: number;
    country: string;
    ip: string;
    username_id: string | null;
    username: string | null;
    cancel_url: string;
    complete_url: string;
    complete_auto_redirect: boolean;
    base_price: number;
    sales_tax: number;
    total_price: number;
    email: string;
    currency: string;
    packages: BasketPackage[];
    coupons: Code[];
    giftcards: GiftCardCode[];
    creator_code: string;
    links: Links;
    custom: KeyValuePair<string, any>;
}