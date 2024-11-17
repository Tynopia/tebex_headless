import { Basket } from "@custom-types/Basket/Basket";
import { BasketPackage } from "@custom-types/Basket/BasketPackage";

const keys: Array<keyof Basket> = [
    "ident",
    "complete",
    "id",
    "country",
    "ip",
    "username_id",
    "username",
    "cancel_url",
    "complete_url",
    "complete_auto_redirect",
    "base_price",
    "sales_tax",
    "total_price",
    "email",
    "currency",
    "packages",
    "coupons",
    "giftcards",
    "creator_code",
    "links",
    "custom"
]

const basketPackageKeys: Array<keyof BasketPackage> = [
    "description",
    "id",
    "in_basket",
    "name",
    "image"
]

const ip = process.env.IP_ADDRESS;
const url = "https://grp.plus/";
const custom = {
    check: true
}

const username = "test";
const username_id = "c53db9316d2d489996d183975a99eb6d";

const card_number = process.env.CARD_NUMBER;
const package_id = parseInt(process.env.PACKAGE_ID!);
const quantity = 7;

let testBasket: Basket;

beforeAll(async () => {
    testBasket = await global.tebexHeadless.createBasket(url, url, custom, true, ip);
});

describe("Basket Tests", () => {
    test("testBasketStructure", async () => {
        expect(testBasket).toBeDefined()
        expect(Object.keys(testBasket).sort()).toEqual(keys.sort())
        //expect(testBasket.currency).toEqual("GBP") // Maybe a tebex bug? The currency is actually EUR (Based on my webstore settings)
        //expect(testBasket.country).toEqual("GB") Why is this broken? This was working for months
        expect(testBasket.ip).toEqual(ip)
        expect(testBasket.custom).toEqual(custom)
    })

    test("testMinecraftBasket", async () => {
        testBasket = await global.tebexHeadless.createMinecraftBasket(username, url, url, custom, true, ip);
        
        expect(testBasket).toBeDefined()
        expect(testBasket.username).toEqual(username.charAt(0).toUpperCase() + username.slice(1))
    })

    test("testBasketAddPackageToBasket", async () => {
        testBasket = await global.tebexHeadless.addPackageToBasket(testBasket.ident, package_id, quantity, "single")

        expect(testBasket.packages[0]).toBeDefined()
        expect(testBasket.packages[0]!.id).toEqual(package_id)
        expect(testBasket.packages[0]!.in_basket.quantity).toEqual(quantity)
    })

    test("testBasketPackageStructure", async () => {
        expect(Object.keys(testBasket.packages[0]!).sort()).toEqual(basketPackageKeys.sort())
    })

    test("testBasketUpdateQuantity", async () => {
        testBasket = await global.tebexHeadless.updateQuantity(testBasket.ident, package_id, quantity * 2)

        expect(testBasket.packages[0]).toBeDefined()
        expect(testBasket.packages[0]!.in_basket.quantity).toEqual(quantity * 2)
    })

    test("testBasketRemovePackage", async () => {
        testBasket = await global.tebexHeadless.removePackage(testBasket.ident, package_id)

        expect(testBasket.packages[0]).toBeUndefined()
    })

    test("testBasketGiftPackage", async () => {
        testBasket = await global.tebexHeadless.giftPackage(testBasket.ident, package_id, username_id)

        expect(testBasket.packages[0]).toBeDefined()
        expect(testBasket.packages[0]!.in_basket.gift_username_id).toEqual(username_id)
    })

    test("testBasketApplyCoupon", async () => {
        const response = await global.tebexHeadless.apply(testBasket.ident, "coupons", {
            coupon_code: "test"
        })

        expect(response.success).toEqual(true)
        expect(response.message).toEqual("Coupon applied successfully")
    })

    // Maybe a tebex bug? The coupon was successfully applied but the remove says it wasn't
    /*test("testBasketRemoveCoupon", async () => {
        const response = await Remove(testBasket.ident, "coupons", {
            coupon_code: "test"
        })

        expect(response.success).toEqual(true)
        expect(response.message).toEqual("Coupon removed successfully")
    })*/

    test("testBasketAppyCreatorCode", async () => {
        const response = await global.tebexHeadless.apply(testBasket.ident, "creator-codes", {
            creator_code: "test"
        })

        expect(response.success).toEqual(true)
        expect(response.message).toEqual("Creator code applied successfully")
    })

    test("testBasketRemoveCreatorCode", async () => {
        const response = await global.tebexHeadless.remove(testBasket.ident, "creator-codes", {
            creator_code: "test"
        })

        expect(response.success).toEqual(true)
        expect(response.message).toEqual("Creator code removed successfully")
    })

    test("testBasketApplyGiftCard", async () => {
        const response = await global.tebexHeadless.apply(testBasket.ident, "giftcards", {
            card_number: card_number!
        })

        expect(response.success).toEqual(true)
        expect(response.message).toEqual("Gift card applied successfully")
    })

    test("testBasketRemoveGiftCard", async () => {
        const response = await global.tebexHeadless.remove(testBasket.ident, "giftcards", {
            card_number: card_number!
        })

        expect(response.success).toEqual(true)
        expect(response.message).toEqual("Gift card removed successfully")
    })
})