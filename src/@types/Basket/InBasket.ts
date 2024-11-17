/**
 * @type {InBasket}
 * @description The in_basket object inside a basket package object
 *
 * @param {number} quantity The quantity of the package in the basket
 * @param {number} price The price of the package in the basket
 * @param {string | null} gift_username_id The ID of the user the package is gifted to
 * @param {string | null} gift_username The username of the user the package is gifted to
 */
export type InBasket = {
    quantity: number;
    price: number;
    gift_username_id: string | null;
    gift_username: string | null;
}