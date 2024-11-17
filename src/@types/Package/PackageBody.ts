import { PackageType } from "@custom-types/Package/PackageType";

/**
 * @type {PackageBody}
 * @description The package object for the body of the request
 *
 * @param {number} package_id The ID of the package
 * @param {number} quantity The quantity of the package
 * @param {PackageType} type The type of the package
 */
export type PackageBody = {
    package_id: number;
    quantity: number;
    type: PackageType;
}