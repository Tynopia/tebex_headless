import { BaseItem } from "@custom-types/BaseItem";
import { PackageType } from "@custom-types/Package/PackageType";

/**
 * @type {Package}
 * @description The package object returned from the Tebex Headless API
 *
 * @param {number} id The ID of the package
 * @param {string} name The name of the package
 * @param {string} description The description of the package
 * @param {PackageType} type The type of the package
 * @param {boolean} disable_gifting Whether gifting is disabled for the package
 * @param {boolean} disable_quantity Whether quantity is disabled for the package
 * @param {string | null} expiration_date The expiration date of the package
 * @param {BaseItem} category The category of the package
 * @param {number} base_price The base price of the package
 * @param {number} sales_tax The sales tax of the package
 * @param {number} total_price The total price of the package
 * @param {number} discount The discount of the package
 * @param {string | null} image The image of the package
 * @param {string} created_at The date the package was created
 * @param {string} updated_at The date the package was updated
 * @param {number} order The order this package should be sorted in
 */
export type Package = BaseItem & {
    description: string;
    type: PackageType;
    disable_gifting: boolean;
    disable_quantity: boolean;
    expiration_date: string | null;
    currency: string;
    category: BaseItem;
    base_price: number;
    sales_tax: number;
    total_price: number;
    discount: number;
    image: string | null;
    created_at: string;
    updated_at: string;
    order: number;
};