import { CreateBasket, CreateMinecraftBasket, Basket, UpdateQuantity, AddPackageToBasket, RemovePackage, GiftPackage, Apply, Remove } from "..";

const keys = [
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
    "currency",
    "packages",
    "coupons",
    "giftcards",
    "creator_code",
    "links",
    "custom"
]

const ip = process.env.IP_ADDRESS;
const url = "https://grp.plus/";
const custom = {
    check: true
}

const username = "test";
const username_id = "c53db9316d2d489996d183975a99eb6d";

const card_number = process.env.CARD_NUMBER ?? "";
const package_id = parseInt(process.env.PACKAGE_ID || "0");
const quantity = 7;

let testBasket: Basket;

beforeAll(async () => {
    testBasket = await CreateBasket(url, url, custom, true, ip);
});

describe("Basket Tests", () => {
    test("testBasketStructure", async () => {
        expect(testBasket).toBeDefined()
        expect(Object.keys(testBasket).sort()).toEqual(keys.sort())
        expect(testBasket.currency).toEqual("EUR")
        expect(testBasket.country).toEqual("GB")
        expect(testBasket.ip).toEqual(ip)
        expect(testBasket.custom).toEqual(custom)
    })

    test("testMinecraftBasket", async () => {
        testBasket = await CreateMinecraftBasket(username, url, url, custom, true, ip);
        
        expect(testBasket).toBeDefined()
        expect(testBasket.username).toEqual(username.charAt(0).toUpperCase() + username.slice(1))
    })

    test("testBasketAddPackageToBasket", async () => {
        testBasket = await AddPackageToBasket(testBasket.ident, package_id, quantity, "single")

        expect(testBasket.packages[0]).toBeDefined()
        expect(testBasket.packages[0]!.id).toEqual(package_id)
        expect(testBasket.packages[0]!.in_basket.quantity).toEqual(quantity)
    })

    test("testBasketUpdateQuantity", async () => {
        testBasket = await UpdateQuantity(testBasket.ident, package_id, quantity * 2)

        expect(testBasket.packages[0]).toBeDefined()
        expect(testBasket.packages[0]!.in_basket.quantity).toEqual(quantity * 2)
    })

    test("testBasketApplyCoupon", async () => {
        const response = await Apply(testBasket.ident, "coupons", {
            coupon_code: "test"
        })

        expect(response.success).toEqual(true)
        expect(response.message).toEqual("Coupon applied successfully")
    })

    test("testBasketRemoveCoupon", async () => {
        const response = await Remove(testBasket.ident, "coupons", {
            coupon_code: "test"
        })

        expect(response.success).toEqual(true)
        expect(response.message).toEqual("Coupon removed successfully")
    })

    test("testBasketRemovePackage", async () => {
        testBasket = await RemovePackage(testBasket.ident, package_id)

        expect(testBasket.packages[0]).toBeUndefined()
    })

    test("testBasketGiftPackage", async () => {
        testBasket = await GiftPackage(testBasket.ident, package_id, username_id)

        expect(testBasket.packages[0]).toBeDefined()
        expect(testBasket.packages[0]!.in_basket.gift_username_id).toEqual(username_id)
    })

    test("testBasketAppyCreatorCode", async () => {
        const response = await Apply(testBasket.ident, "creator-codes", {
            creator_code: "test"
        })

        expect(response.success).toEqual(true)
        expect(response.message).toEqual("Creator code applied successfully")
    })

    test("testBasketRemoveCreatorCode", async () => {
        const response = await Remove(testBasket.ident, "creator-codes", {
            creator_code: "test"
        })

        expect(response.success).toEqual(true)
        expect(response.message).toEqual("Creator code removed successfully")
    })

    test("testBasketApplyGiftCard", async () => {
        const response = await Apply(testBasket.ident, "giftcards", {
            card_number: card_number
        })

        expect(response.success).toEqual(true)
        expect(response.message).toEqual("Gift card applied successfully")
    })

    test("testBasketRemoveGiftCard", async () => {
        const response = await Remove(testBasket.ident, "giftcards", {
            card_number: card_number
        })

        expect(response.success).toEqual(true)
        expect(response.message).toEqual("Gift card removed successfully")
    })
})