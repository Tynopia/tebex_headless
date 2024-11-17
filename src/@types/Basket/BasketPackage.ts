import { BaseItem } from "@custom-types/BaseItem";
import { InBasket } from "@custom-types/Basket/InBasket";


/**
 * @type {BasketPackage}
 * @description The basket package object returned from the Tebex Headless API
 *
 * @param {number} id The ID of the package
 * @param {string} name The name of the package
 * @param {string} description The description of the package
 * @param {InBasket} in_basket The in_basket object inside the basket package object
 * @param {string | null} image The image of the package
 */
export type BasketPackage = BaseItem & {
    description: string;
    in_basket: InBasket;
    image: string | null;
};
