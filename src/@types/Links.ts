/**
 * @type {Links}
 * @description The links object inside the basket object
 *
 * @param {string} checkout The checkout link of the basket
 */
export type Links = {
    checkout: string;
    [key: string]: string;
}