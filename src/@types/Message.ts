/**
 * @type {Message}
 * @description The message returned from the Tebex Headless API
 *
 * @param {boolean} success Whether the request was successful
 * @param {string} message The message returned from the Tebex Headless API
 */
export type Message = {
    success: boolean;
    message: string;
}