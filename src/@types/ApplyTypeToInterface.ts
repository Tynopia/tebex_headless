import { ApplyType } from "@custom-types/ApplyType";
import { CouponCode } from "@custom-types/Code/CouponCode";
import { GiftCardCode } from "@custom-types/Code/GiftCardCode";
import { CreatorCode } from "@custom-types/Code/CreatorCode";

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
export type ApplyTypeToInterface<T extends ApplyType> = T extends "coupons"
    ? CouponCode
    : T extends "giftcards"
        ? GiftCardCode
        : T extends "creator-codes"
            ? CreatorCode
            : never;
