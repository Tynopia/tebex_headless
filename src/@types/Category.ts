import { Package } from "@custom-types/Package/Package";
import { BaseItem } from "@custom-types/BaseItem";

/**
 * @type {Category}
 * @description The category object returned from the Tebex Headless API
 *
 * @param {number} id The ID of the category
 * @param {string} name The name of the category
 * @param {string} description The description of the category
 * @param {Category | null} parent The parent category of the category
 * @param {number} order The order of the category
 * @param {Package[]} packages The packages in the category
 * @param {"grid" | "list" | string} display_type The display type of the category
 * @param {string | null} slug The slug of the category
 */
export type Category = BaseItem & {
    description: string;
    parent: Category | null;
    order: number;
    packages: Package[];
    display_type: "grid" | "list";
    slug: string | null;
};