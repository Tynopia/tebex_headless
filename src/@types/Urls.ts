import { KeyValuePair } from "@custom-types/KeyValuePair";

/**
 * @type {Urls}
 * @description The url object for the complete and cancel urls
 *
 * @param {string} complete_url The complete url
 * @param {string} cancel_url The cancel url
 */
export type Urls = {
    complete_url: string;
    cancel_url: string;
    custom?: KeyValuePair<string, any>;
    complete_auto_redirect?: boolean;
};
