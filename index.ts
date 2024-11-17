import axios, { AxiosRequestConfig, Method } from "axios";
import { Route } from "@custom-types/Route";
import { KeyValuePair } from "@custom-types/KeyValuePair";
import { GenericObject } from "@custom-types/GenericObject";
import { ApplyType } from "@custom-types/ApplyType";
import { Data } from "@custom-types/Data";
import { Message } from "@custom-types/Message";
import { Category } from "@custom-types/Category";
import { ApplyTypeToInterface } from "@custom-types/ApplyTypeToInterface";
import { Basket } from "@custom-types/Basket/Basket";
import { AuthUrl } from "@custom-types/AuthUrl";
import { PackageType } from "@custom-types/Package/PackageType";
import { Webstore } from "@custom-types/Webstore";
import { Page } from "@custom-types/Page";
import { Package } from "@custom-types/Package/Package";

/**
 * @constant baseUrl
 * @description The base URL of the Tebex Headless API
 *
 * @type {string}
 */
const baseUrl: string = "https://headless.tebex.io";


/**
 * @function Request
 * @description A function to make a request to the Tebex Headless API
 *
 * @param webstoreIdentifier
 * @param privateKey
 * @param {Method | string} method The method of the request
 * @param identifier
 * @param {Route} route The route of the request
 * @param {string} path The path of the request
 * @param {KeyValuePair<string, GenericObject>} params The parameters of the request
 *
 * @param body
 * @returns {Promise<T>}
 */
export async function Request<T, Body>(
    webstoreIdentifier: string,
    privateKey: string | undefined,
    method: Method,
    identifier: string | null,
    route: Route,
    path?: string,
    params?: KeyValuePair<string, GenericObject>,
    body?: Body
): Promise<T> {
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            if (typeof value === "boolean") {
                params[key] = value ? 1 : 0;
            }
        }
    }

    const config: AxiosRequestConfig = {
        url: `${baseUrl}/api/${route}/${identifier}${path ?? ""}`,
        params: params,
        method: method,
        data: body,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (webstoreIdentifier && privateKey) {
        config.auth = {
            username: webstoreIdentifier,
            password: privateKey,
        };
    }

    const response = await axios.request<T>(config);

    return response.data;
}

export class TebexHeadless {
    constructor(
        /**
         * @constant webstoreIdentifier
         * @description A function to set the webstore identifier
         *
         * @param {string} identifier The identifier of the webstore
         *
         * @returns {void}
         */
        readonly webstoreIdentifier: string,
        /**
         * @private {privateKey}
         * @description A function to set the private key
         *
         * @param {string} key The private key of the webstore
         *
         * @returns {void}
         */
        private privateKey?: string
    ) {}

    /**
     * @function getCategories
     * @description A function to get the categories from the Tebex Headless API
     *
     * @param {boolean} includePackages Whether to include the packages in the categories
     * @param {string} basketIdent The identifier of the basket
     * @param {string} ipAddress The IP address of the user
     *
     * @returns {Promise<Category[]>}
     */
    async getCategories(
        includePackages?: boolean,
        basketIdent?: string,
        ipAddress?: string
    ): Promise<Category[]> {
        const { data }: Data<Category[]> = await Request(
            this.webstoreIdentifier,
            this.privateKey,
            "get",
            this.webstoreIdentifier,
            "accounts",
            "/categories",
            {
                includePackages,
                basketIdent,
                ipAddress,
            }
        );

        return data;
    }

    /**
     * @function getCategory
     * @description A function to get a category from the Tebex Headless API
     *
     * @param {number} id The ID of the category
     * @param {boolean} includePackages Whether to include the packages in the category
     * @param {string} basketIdent The identifier of the basket
     * @param {string} ipAddress The IP address of the user
     *
     * @returns {Promise<Category>}
     */
    async getCategory(
        id: number,
        includePackages?: boolean,
        basketIdent?: string,
        ipAddress?: string
    ): Promise<Category> {
        const { data }: Data<Category> = await Request(
            this.webstoreIdentifier,
            this.privateKey,
            "get",
            this.webstoreIdentifier,
            "accounts",
            `/categories/${id}`,
            {
                includePackages,
                basketIdent,
                ipAddress,
            }
        );

        return data;
    }

    /**
     * @function apply
     * @description A function to apply a coupon, giftcard or creator code to a basket
     *
     * @param {A} body The body of the request
     * @param {string} basketIdent The identifier of the basket
     * @param {ApplyType} type The type of the apply request
     *
     * @returns {Promise<Message>}
     */
    async apply<T extends ApplyType, A extends ApplyTypeToInterface<T>>(
        basketIdent: string,
        type: T,
        body: A
    ): Promise<Message> {
        return await Request<Message, A>(
            this.webstoreIdentifier,
            this.privateKey,
            "post",
            this.webstoreIdentifier,
            "accounts",
            `/baskets/${basketIdent}/${type}`,
            {},
            body
        );
    }

    /**
     * @function remove
     * @description A function to remove a coupon, giftcard or creator code from a basket
     *
     * @param {A} body The body of the request
     * @param {string} basketIdent The identifier of the basket
     * @param {ApplyType} type The type of the apply request
     *
     * @returns {Promise<Message>}
     */
    async remove<T extends ApplyType, A extends ApplyTypeToInterface<T>>(
        basketIdent: string,
        type: T,
        body: A
    ): Promise<Message> {
        return await Request<Message, A>(
            this.webstoreIdentifier,
            this.privateKey,
            "post",
            this.webstoreIdentifier,
            "accounts",
            `/baskets/${basketIdent}/${type}/remove`,
            {},
            body
        );
    }

    /**
     * @function getPackage
     * @description A function to get a package from the Tebex Headless API
     *
     * @param {number} id The ID of the package
     * @param {string} basketIdent The identifier of the basket
     * @param {string} ipAddress The IP address of the user
     *
     * @returns {Promise<Package>}
     */
    async getPackage(
        id: number,
        basketIdent?: string,
        ipAddress?: string
    ): Promise<Package> {
        const { data }: Data<Package> = await Request(
            this.webstoreIdentifier,
            this.privateKey,
            "get",
            this.webstoreIdentifier,
            "accounts",
            `/packages/${id}`,
            {
                basketIdent,
                ipAddress,
            }
        );

        return data;
    }

    /**
     * @function getPackages
     * @description A function to get all packages from the Tebex Headless API
     *
     * @param {string} basketIdent The identifier of the basket
     * @param {string} ipAddress The IP address of the user
     *
     * @returns {Promise<Package[]>}
     */
    async getPackages(
        basketIdent?: string,
        ipAddress?: string
    ): Promise<Package[]> {
        const { data }: Data<Package[]> = await Request(
            this.webstoreIdentifier,
            this.privateKey,
            "get",
            this.webstoreIdentifier,
            "accounts",
            `/packages`,
            {
                basketIdent,
                ipAddress,
            }
        );

        return data;
    }

    /**
     * @function getBasket
     * @description A function to get a basket from the Tebex Headless API
     *
     * @param {string} basketIdent The identifier of the basket
     *
     * @returns {Promise<Package[]>}
     */
    async getBasket(basketIdent: string): Promise<Basket> {
        const { data }: Data<Basket> = await Request(
            this.webstoreIdentifier,
            this.privateKey,
            "get",
            this.webstoreIdentifier,
            "accounts",
            `/baskets/${basketIdent}`
        );
        return data;
    }

    /**
     * @function createBasket
     * @description A function to create a basket from the Tebex Headless API
     *
     * @param {string} complete_url The complete url
     * @param {string} cancel_url The cancel url
     * @param {KeyValuePair<string, any>} custom The custom object of the basket
     * @param {boolean} complete_auto_redirect Whether the basket should automatically redirect to the complete url
     * @param {string} ip_address The IP address of the user
     *
     * @returns {Promise<Basket>}
     */
    async createBasket(
        complete_url: string,
        cancel_url: string,
        custom?: KeyValuePair<string, any>,
        complete_auto_redirect?: boolean,
        ip_address?: string
    ): Promise<Basket> {
        const { data }: Data<Basket> = await Request(
            this.webstoreIdentifier,
            this.privateKey,
            "post",
            this.webstoreIdentifier,
            "accounts",
            "/baskets",
            {
                ip_address,
            },
            {
                complete_url,
                cancel_url,
                custom,
                complete_auto_redirect,
            }
        );

        return data;
    }

    /**
     * @function createMinecraftBasket
     * @description A function to create a minecraft basket from the Tebex Headless API
     *
     * @param {string} username The username of the user
     * @param {string} complete_url The complete url
     * @param {string} cancel_url The cancel url
     * @param {KeyValuePair<string, any>} custom The custom object of the basket
     * @param {boolean} complete_auto_redirect Whether the basket should automatically redirect to the complete url
     * @param {string} ip_address The IP address of the user
     *
     * @returns {Promise<Basket>}
     */
    async createMinecraftBasket(
        username: string,
        complete_url: string,
        cancel_url: string,
        custom?: KeyValuePair<string, any>,
        complete_auto_redirect?: boolean,
        ip_address?: string
    ): Promise<Basket> {
        const { data }: Data<Basket> = await Request(
            this.webstoreIdentifier,
            this.privateKey,
            "post",
            this.webstoreIdentifier,
            "accounts",
            "/baskets",
            {
                ip_address,
            },
            {
                username,
                complete_url,
                cancel_url,
                custom,
                complete_auto_redirect,
            }
        );

        return data;
    }

    /**
     * @function getBasketAuthUrl
     * @description A function to get the auth url of a basket from the Tebex Headless API
     *
     * @param {string} basketIdent The identifier of the basket
     * @param {string} returnUrl The return url of the basket
     *
     * @returns {Promise<AuthUrl[]>} The data returned or an axios error
     */
    async getBasketAuthUrl(
        basketIdent: string,
        returnUrl: string
    ): Promise<AuthUrl[]> {
        return await Request(
            this.webstoreIdentifier,
            this.privateKey,
            "get",
            this.webstoreIdentifier,
            "accounts",
            `/baskets/${basketIdent}/auth`,
            {
                returnUrl,
            }
        );
    }

    /**
     * @function addPackageToBasket
     * @description A function to add a package to a basket from the Tebex Headless API
     *
     * @param {string} basketIdent The identifier of the basket
     * @param {number} package_id The ID of the package
     * @param {number} quantity The quantity of the package
     * @param {PackageType} type The type of the package
     * @param {KeyValuePair<string, any>} variable_data The variable data of the package
     *
     * @returns {Promise<Basket>}
     */
    async addPackageToBasket(
        basketIdent: string,
        package_id: number,
        quantity: number,
        type?: PackageType,
        variable_data?: KeyValuePair<string, any>
    ): Promise<Basket> {
        const { data }: Data<Basket> = await Request(
            this.webstoreIdentifier,
            this.privateKey,
            "post",
            basketIdent,
            "baskets",
            "/packages",
            {},
            {
                package_id,
                quantity,
                type,
                variable_data,
            }
        );

        return data;
    }

    /**
     * @function giftPackage
     * @description A function to gift a package to a user from the Tebex Headless API
     *
     * @param {string} basketIdent The identifier of the basket
     * @param {number} package_id The ID of the package
     * @param {string} target_username_id The ID of the user to gift the package to
     *
     * @returns {Promise<Basket>}
     */
    async giftPackage(
        basketIdent: string,
        package_id: number,
        target_username_id: string
    ): Promise<Basket> {
        const { data }: Data<Basket> = await Request(
            this.webstoreIdentifier,
            this.privateKey,
            "post",
            basketIdent,
            "baskets",
            "/packages",
            {},
            {
                package_id,
                target_username_id,
            }
        );

        return data;
    }

    /**
     * @function removePackage
     * @description A function to remove a package from a basket from the Tebex Headless API
     *
     * @param {string} basketIdent The identifier of the basket
     * @param {number} package_id The ID of the package
     *
     * @returns {Promise<Basket>}
     */
    async removePackage(
        basketIdent: string,
        package_id: number
    ): Promise<Basket> {
        const { data }: Data<Basket> = await Request(
            this.webstoreIdentifier,
            this.privateKey,
            "post",
            basketIdent,
            "baskets",
            "/packages/remove",
            {},
            {
                package_id,
            }
        );

        return data;
    }

    /**
     * @function updateQuantity
     * @description A function to update the quantity of a package in a basket from the Tebex Headless API
     *
     * @param {string} basketIdent The identifier of the basket
     * @param {number} package_id The ID of the package
     * @param {number} quantity The quantity of the package
     *
     * @returns {Promise<Basket>}
     */
    async updateQuantity(
        basketIdent: string,
        package_id: number,
        quantity: number
    ): Promise<Basket> {
        const { data }: Data<Basket> = await Request(
            this.webstoreIdentifier,
            this.privateKey,
            "put",
            basketIdent,
            "baskets",
            `/packages/${package_id}`,
            {},
            {
                quantity,
            }
        );

        return data;
    }

    /**
     * @function getWebstore
     * @description A function to get the webstore from the Tebex Headless API
     *
     * @returns {Promise<Webstore>}
     */
    async getWebstore(): Promise<Webstore> {
        const { data }: Data<Webstore> = await Request(
            this.webstoreIdentifier,
            this.privateKey,
            "get",
            this.webstoreIdentifier,
            "accounts"
        );
        return data;
    }

    /**
     * @function getPages
     * @description A function to get the pages from the Tebex Headless API
     * 
     * @returns {Promise<Page>}
    */
    async getPages(): Promise<Array<Page>> {
        const { data }: Data<Array<Page>> = await Request(
            this.webstoreIdentifier,
            this.privateKey,
            "get",
            this.webstoreIdentifier,
            "accounts",
            "/pages"
        );

        return data;
    }

    /**
     * @function updateTier
     * @description Update an tier of an package
     *
     * @param {unknown} tierId The ID of the tier
     * @param {number} package_id The ID of the package
     *
     * @returns {Promise<Message>}
     */
    async updateTier(tierId: unknown, package_id: number): Promise<Message> {
        return await Request(
            this.webstoreIdentifier,
            this.privateKey,
            "patch",
            this.webstoreIdentifier,
            "accounts",
            `/tiers/${tierId}`,
            {},
            {
                package_id,
            }
        );
    }
}
