

/**
 * @type {Page}
 * @description The page object returned from the Tebex Headless API
 *
 * @param {number} id The ID of the page
 * @param {string} created_at The date the page was created
 * @param {string} updated_at The date the page was updated
 * @param {number} account_id The ID of the account
 * @param {string} title The title of the page
 * @param {string} slug The slug of the page
 * @param {boolean} private Whether the page is private
 * @param {boolean} hidden Whether the page is hidden
 * @param {boolean} disabled Whether the page is disabled
 * @param {boolean} sequence Whether the page is in a sequence
 * @param {string} content The content of the page
 */
export type Page = {
    id: number;
    created_at: string;
    updated_at: string;
    account_id: number;
    title: string;
    slug: string;
    private: boolean;
    hidden: boolean;
    disabled: boolean;
    sequence: boolean;
    content: string;
}
