
/**
 * @type {KeyValuePair}
 * @description A key value pair
 *
 * @type {K} The type of the key
 * @type {V} The type of the value
 */
export type KeyValuePair<K extends string | number, V> = {
    [key in K]: V;
};