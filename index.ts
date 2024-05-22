import axios, { AxiosRequestConfig, Method } from "axios";

/**
 * @constant baseUrl
 * @description The base URL of the Tebex Headless API
 * 
 * @type {string}
 */
const baseUrl: string = "https://headless.tebex.io";

/**
 * @var webstoreIdentifier
 * @description The identifier of the webstore
 * 
 * @type {string | null}
 */
export let webstoreIdentifier: string | null = null;

/**
 * @function SetWebstoreIdentifier
 * @description A function to set the webstore identifier
 * 
 * @param {string} identifier The identifier of the webstore
 * 
 * @returns {void}
 */
export function SetWebstoreIdentifier(identifier: string): void {
    webstoreIdentifier = identifier;
}

/**
 * @var privateKey
 * @description The private key of the webstore
 * 
 * @type {string | null}
 */
export let privateKey: string | null = null;

/**
 * @function SetPrivateKey
 * @description A function to set the private key
 * 
 * @param {string} key The private key of the webstore
 * 
 * @returns {void}
 */
export function SetPrivateKey(key: string): void {
    privateKey = key;
}

/**
 * @interface Data
 * @description The data returned from the Tebex Headless API
 * 
 * @type {T} The type of data to be returned
 */
export interface Data<T> {
    data: T
}

/**
 * @interface Message
 * @description The message returned from the Tebex Headless API
 * 
 * @param {boolean} success Whether the request was successful
 * @param {string} message The message returned from the Tebex Headless API
 */
export interface Message {
    success: boolean,
    message: string
}

/**
 * @type {GenericObject}
 * @description A generic object
 */
export type GenericObject = string | number | boolean | null | undefined;

/**
 * @type {Route}
 * @description The route of the Tebex Headless API
 * 
 * @param {string} accounts The accounts route
 * @param {string} baskets The baskets route
 */
export type Route = "accounts" | "baskets";

/**
 * @type {ApplyType}
 * @description The type of the apply request
 * 
 * @param {string} coupons The coupons type
 * @param {string} giftcards The giftcards type
 * @param {string} creator-codes The creator codes type
 */
export type ApplyType = "coupons" | "giftcards" | "creator-codes";

/**
 * @type {KeyValuePair}
 * @description A key value pair
 * 
 * @type {K} The type of the key
 * @type {V} The type of the value
 */
export type KeyValuePair<K extends string | number, V> = {
    [key in K]: V;
}

/**
 * @interface BaseItem
 * @description The base item object for the package and category objects
 * 
 * @param {number} id The ID of the base item
 * @param {string} name The name of the base item
 */
export interface BaseItem {
    id: number,
    name: string
}

/**
 * @interface CouponCodeBody
 * @description The coupon code object for the body of the request
 * 
 * @param {string} coupon_code The coupon code to apply or remove
 */
export interface CouponCode {
    coupon_code: string
}

/**
 * @interface GiftCardCodeBody
 * @description The gift card code object for the body of the request
 * 
 * @param {string} card_number The gift card code to apply or remove
 */
export interface GiftCardCode {
    card_number: string
}

/**
 * @interface CreatorCodeBody
 * @description The creator code object for the body of the request
 * 
 * @param {string} creator_code The creator code to apply or remove
 */
export interface CreatorCode {
    creator_code: string
}

/**
 * @function Request
 * @description A function to make a request to the Tebex Headless API
 * 
 * @param {Method | string} method The method of the request
 * @param {Route} route The route of the request
 * @param {string} path The path of the request
 * @param {KeyValuePair<string, GenericObject>} params The parameters of the request
 * 
 * @returns {Promise<T>}
 */
export async function Request<T, Body>(method: Method, identifier: string | null, route: Route, path?: string, params?: KeyValuePair<string, GenericObject>, body?: Body): Promise<T> {
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
            "Content-Type": "application/json"
        }
    }

    if (webstoreIdentifier && privateKey) {
        config.auth = {
            username: webstoreIdentifier,
            password: privateKey
        }
    }

    const response = await axios.request<T>(config);

    return response.data;
}

/**
 * @interface Category
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
    description: string,
    parent: Category | null,
    order: number,
    packages: Package[],
    display_type: "grid" | "list",
    slug: string | null
}

/**
 * @function GetCategories
 * @description A function to get the categories from the Tebex Headless API
 * 
 * @param {boolean} includePackages Whether to include the packages in the categories
 * @param {string} basketIdent The identifier of the basket
 * @param {string} ipAddress The IP address of the user
 * 
 * @returns {Promise<Category[]>}
 */
export async function GetCategories(includePackages?: boolean, basketIdent?: string, ipAddress?: string): Promise<Category[]> {
    const { data }: Data<Category[]> = await Request("get", webstoreIdentifier, "accounts", "/categories", {
        includePackages,
        basketIdent,
        ipAddress
    })
    
    return data;
}

/**
 * @function GetCategory
 * @description A function to get a category from the Tebex Headless API
 * 
 * @param {number} id The ID of the category
 * @param {boolean} includePackages Whether to include the packages in the category
 * @param {string} basketIdent The identifier of the basket
 * @param {string} ipAddress The IP address of the user
 * 
 * @returns {Promise<Category>}
 */
export async function GetCategory(id: number, includePackages?: boolean, basketIdent?: string, ipAddress?: string): Promise<Category> {
    const { data }: Data<Category> = await Request("get", webstoreIdentifier, "accounts", `/categories/${id}`, {
        includePackages,
        basketIdent,
        ipAddress
    })

    return data;
}

/**
 * @type {ApplyTypeToInterface}
 * @description The type of the apply request
 * 
 * @param {string} coupons The coupons type
 * @param {string} giftcards The giftcards type
 * @param {string} creator-codes The creator codes type
 * 
 * @returns {CouponCode | GiftCardCode | CreatorCode}
 */
export type ApplyTypeToInterface<T extends ApplyType> =
    T extends "coupons" ? CouponCode :
    T extends "giftcards" ? GiftCardCode :
    T extends "creator-codes" ? CreatorCode :
    never;

/**
 * @function Apply
 * @description A function to apply a coupon, giftcard or creator code to a basket
 * 
 * @param {A} body The body of the request
 * @param {string} basketIdent The identifier of the basket
 * @param {ApplyType} type The type of the apply request
 * 
 * @returns {Promise<Message>}
 */
export async function Apply<T extends ApplyType, A extends ApplyTypeToInterface<T>>(basketIdent: string, type: T, body: A): Promise<Message> {
    return await Request<Message, A>("post", webstoreIdentifier, "accounts", `/baskets/${basketIdent}/${type}`, {}, body);
}

/**
 * @function Remove
 * @description A function to remove a coupon, giftcard or creator code from a basket
 * 
 * @param {A} body The body of the request
 * @param {string} basketIdent The identifier of the basket
 * @param {ApplyType} type The type of the apply request
 * 
 * @returns {Promise<Message>}
 */
export async function Remove<T extends ApplyType, A extends ApplyTypeToInterface<T>>(basketIdent: string, type: T, body: A): Promise<Message> {
    return await Request<Message, A>("post", webstoreIdentifier, "accounts", `/baskets/${basketIdent}/${type}/remove`, {}, body);
}

/**
 * @type {PackageType}
 * @description The type of the package
 * 
 * @param {string} subscription The subscription type
 * @param {string} single The single type
 */
export type PackageType = "subscription" | "single" | "both";

/**
 * @interface Package
 * @description The package object returned from the Tebex Headless API
 * 
 * @param {number} id The ID of the package
 * @param {string} name The name of the package
 * @param {string} description The description of the package
 * @param {PackageType} type The type of the package
 * @param {boolean} disable_gifting Whether gifting is disabled for the package
 * @param {boolean} disable_quantity Whether quantity is disabled for the package
 * @param {string | null} expiration_date The expiration date of the package
 * @param {ShortCategory} category The category of the package
 * @param {number} base_price The base price of the package
 * @param {number} sales_tax The sales tax of the package
 * @param {number} total_price The total price of the package
 * @param {number} discount The discount of the package
 * @param {string | null} image The image of the package
 * @param {string} created_at The date the package was created
 * @param {string} updated_at The date the package was updated
 */
export type Package = BaseItem & {
    description: string,
    type: PackageType,
    disable_gifting: boolean,
    disable_quantity: boolean,
    expiration_date: string | null,
    currency: string,
    category: BaseItem,
    base_price: number,
    sales_tax: number,
    total_price: number,
    discount: number,
    image: string | null,
    created_at: string,
    updated_at: string
}

/**
 * @function GetPackage
 * @description A function to get a package from the Tebex Headless API
 * 
 * @param {number} id The ID of the package
 * @param {string} basketIdent The identifier of the basket
 * @param {string} ipAddress The IP address of the user
 * 
 * @returns {Promise<Package>}
 */
export async function GetPackage(id: number, basketIdent?: string, ipAddress?: string): Promise<Package> {
    const { data }: Data<Package> = await Request("get", webstoreIdentifier, "accounts", `/packages/${id}`, {
        basketIdent,
        ipAddress
    })

    return data;
}

/**
 * @function GetPackages
 * @description A function to get all packages from the Tebex Headless API
 * 
 * @param {string} basketIdent The identifier of the basket
 * @param {string} ipAddress The IP address of the user
 * 
 * @returns {Promise<Package[]>}
 */
export async function GetPackages(basketIdent?: string, ipAddress?: string): Promise<Package[]> {
    const { data }: Data<Package[]> = await Request("get", webstoreIdentifier, "accounts", `/packages`, {
        basketIdent,
        ipAddress
    })

    return data;
}

/**
 * @interface InBasket
 * @description The in_basket object inside a basket package object
 * 
 * @param {number} quantity The quantity of the package in the basket
 * @param {number} price The price of the package in the basket
 * @param {string | null} gift_username_id The ID of the user the package is gifted to
 * @param {string | null} gift_username The username of the user the package is gifted to
 */
export interface InBasket {
    quantity: number,
    price: number,
    gift_username_id: string | null,
    gift_username: string | null
}

/**
 * @interface BasketPackage
 * @description The basket package object returned from the Tebex Headless API
 * 
 * @param {number} id The ID of the package
 * @param {string} name The name of the package
 * @param {string} description The description of the package
 * @param {InBasket} in_basket The in_basket object inside the basket package object
 */
export type BasketPackage = BaseItem & {
    description: string,
    in_basket: InBasket,
}

/**
 * @interface Code
 * @description The code object inside the basket coupons object
 * 
 * @param {string} code The code of the object
 */
export interface Code {
    code: string
}

/**
 * @interface Links
 * @description The links object inside the basket object
 * 
 * @param {string} checkout The checkout link of the basket
 */
export interface Links {
    checkout: string,
    [key: string]: string
}

/**
 * @interface Basket
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
 * @param {string} currency The currency of the basket
 * @param {BasketPackage[]} packages The packages in the basket
 * @param {Code[]} coupons The coupons in the basket
 * @param {GiftCardCode[]} giftcards The giftcards in the basket
 * @param {string} creator_code The creator code of the basket
 * @param {Links} links The links of the basket
 * @param {KeyValuePair<string, any>} custom The custom object of the basket
 */
export interface Basket {
    ident: string,
    complete: boolean,
    id: number,
    country: string,
    ip: string,
    username_id: string | null,
    username: string | null,
    cancel_url: string,
    complete_url: string,
    complete_auto_redirect: boolean,
    base_price: number,
    sales_tax: number,
    total_price: number,
    currency: string,
    packages: BasketPackage[],
    coupons: Code[],
    giftcards: GiftCardCode[],
    creator_code: string,
    links: Links,
    custom: KeyValuePair<string, any>
}

/**
 * @function GetBasket
 * @description A function to get a basket from the Tebex Headless API
 * 
 * @param {string} basketIdent The identifier of the basket
 * 
 * @returns {Promise<Package[]>}
 */
export async function GetBasket(basketIdent: string): Promise<Basket> {
    const { data }: Data<Basket> = await Request("get", webstoreIdentifier, "accounts", `/baskets/${basketIdent}`);
    return data;
}

/**
 * @type {Urls}
 * @description The url object for the complete and cancel urls
 * 
 * @param {string} complete_url The complete url
 * @param {string} cancel_url The cancel url
 */
export type Urls = {
    complete_url: string,
    cancel_url: string,
    custom?: KeyValuePair<string, any>,
    complete_auto_redirect?: boolean
}

/**
 * @function CreateBasket
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
export async function CreateBasket(complete_url: string, cancel_url: string, custom?: KeyValuePair<string, any>, complete_auto_redirect?: boolean, ip_address?: string): Promise<Basket> {
    const { data }: Data<Basket> = await Request("post", webstoreIdentifier, "accounts", "/baskets", {
        ip_address
    }, {
        complete_url,
        cancel_url,
        custom,
        complete_auto_redirect
    });
    
    return data;
}

/**
 * @function CreateMinecraftBasket
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
export async function CreateMinecraftBasket(username: string, complete_url: string, cancel_url: string, custom?: KeyValuePair<string, any>, complete_auto_redirect?: boolean, ip_address?: string): Promise<Basket> {
    const { data }: Data<Basket> = await Request("post", webstoreIdentifier, "accounts", "/baskets", {
        ip_address
    }, {
        username,
        complete_url,
        cancel_url,
        custom,
        complete_auto_redirect
    });
    
    return data;
}

/**
 * @interface AuthUrl
 * @description The auth url object returned from the Tebex Headless API
 * 
 * @param {string} name The name of the auth url
 * @param {string} url The url of the auth url
 */
export interface AuthUrl {
    name: string,
    url: string
}

/**
 * @function GetBasketAuthUrl
 * @description A function to get the auth url of a basket from the Tebex Headless API
 * 
 * @param {string} basketIdent The identifier of the basket
 * @param {string} returnUrl The return url of the basket
 * 
 * @returns {Promise<AuthUrl[]>} The data returned or an axios error
 */
export async function GetBasketAuthUrl(basketIdent: string, returnUrl: string): Promise<AuthUrl[]> {
    return await Request("get", webstoreIdentifier, "accounts", `/baskets/${basketIdent}/auth`, {
        returnUrl
    })
}

/**
 * @interface PackageBody
 * @description The package object for the body of the request
 * 
 * @param {number} package_id The ID of the package
 * @param {number} quantity The quantity of the package
 * @param {PackageType} type The type of the package
 */
export interface PackageBody {
    package_id: number,
    quantity: number,
    type: PackageType
}

/**
 * @function AddPackageToBasket
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
export async function AddPackageToBasket(basketIdent: string, package_id: number, quantity: number, type: PackageType, variable_data?: KeyValuePair<string, any>): Promise<Basket> {
    const { data }: Data<Basket> = await Request("post", basketIdent, "baskets", "/packages", {}, {
        package_id,
        quantity,
        type,
        variable_data
    })

    return data;
}

/**
 * @function GiftPackage
 * @description A function to gift a package to a user from the Tebex Headless API
 * 
 * @param {string} basketIdent The identifier of the basket
 * @param {number} package_id The ID of the package
 * @param {string} target_username_id The ID of the user to gift the package to
 * 
 * @returns {Promise<Basket>}
 */
export async function GiftPackage(basketIdent: string, package_id: number, target_username_id: string): Promise<Basket> {
    const { data }: Data<Basket> = await Request("post", basketIdent, "baskets", "/packages", {}, {
        package_id,
        target_username_id
    })

    return data;
}

/**
 * @function RemovePackage
 * @description A function to remove a package from a basket from the Tebex Headless API
 * 
 * @param {string} basketIdent The identifier of the basket
 * @param {number} package_id The ID of the package
 * 
 * @returns {Promise<Basket>}
 */
export async function RemovePackage(basketIdent: string, package_id: number): Promise<Basket> {
    const { data }: Data<Basket> = await Request("post", basketIdent, "baskets", "/packages/remove", {}, {
        package_id
    })

    return data;
}

/**
 * @function UpdateQuantity
 * @description A function to update the quantity of a package in a basket from the Tebex Headless API
 * 
 * @param {string} basketIdent The identifier of the basket
 * @param {number} package_id The ID of the package
 * @param {number} quantity The quantity of the package
 * 
 * @returns {Promise<Basket>}
 */
export async function UpdateQuantity(basketIdent: string, package_id: number, quantity: number): Promise<Basket> {
    const { data }: Data<Basket> = await Request("put", basketIdent, "baskets", `/packages/${package_id}`, {}, {
        quantity
    })

    return data;
}

/**
 * @interface Webstore
 * @description The webstore object returned from the Tebex Headless API
 * 
 * @param {number} id The ID of the webstore
 * @param {string} description The description of the webstore
 * @param {string} name The name of the webstore
 * @param {string} webstore_url The webstore url of the webstore
 * @param {string} currency The currency of the webstore
 * @param {string} lang The language of the webstore
 * @param {string} logo The logo of the webstore
 * @param {string} platform_type The platform type of the webstore
 * @param {number} platform_type_id The platform type ID of the webstore
 * @param {string} created_at The date the webstore was created
 */
export interface Webstore {
    id: number,
    description: string,
    name: string,
    webstore_url: string,
    currency: string,
    lang: string,
    logo: string,
    platform_type: string,
    platform_type_id: number,
    created_at: string
}

/**
 * @function GetWebstore
 * @description A function to get the webstore from the Tebex Headless API
 * 
 * @returns {Promise<Webstore>}
 */
export async function GetWebstore(): Promise<Webstore> {
    const { data }: Data<Webstore> = await Request("get", webstoreIdentifier, "accounts");
    return data;
}