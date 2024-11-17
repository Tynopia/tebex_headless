
/**
 * @type {Webstore}
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
export type Webstore = {
    id: number;
    description: string;
    name: string;
    webstore_url: string;
    currency: string;
    lang: string;
    logo: string;
    platform_type: string;
    platform_type_id: number;
    created_at: string;
}