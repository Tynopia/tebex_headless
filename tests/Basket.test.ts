import type { Basket } from "../src/index.js";

const ip = process.env["IP_ADDRESS"];
const url = "https://grp.plus/";
const custom = { check: true };

const username = "test";
const username_id = "c53db9316d2d489996d183975a99eb6d";

const card_number = process.env["CARD_NUMBER"];
const package_id = parseInt(process.env["PACKAGE_ID"]!);
const quantity = 7;

let testBasket: Basket;

beforeAll(async () => {
  testBasket = await global.tebexHeadless.createBasket(url, url, custom, true, ip);
});

describe("Basket Tests", () => {
  test("testBasketStructure", async () => {
    expect(testBasket).toBeDefined();
    expect(testBasket).toMatchObject({
      ident: expect.any(String),
      complete: expect.any(Boolean),
      ip: ip,
      custom: custom,
    });
    expect(Array.isArray(testBasket.packages)).toBe(true);
    expect(Array.isArray(testBasket.coupons)).toBe(true);
    expect(Array.isArray(testBasket.giftcards)).toBe(true);
  });

  test("testMinecraftBasket", async () => {
    testBasket = await global.tebexHeadless.createMinecraftBasket(
      username,
      url,
      url,
      custom,
      true,
      ip
    );

    expect(testBasket).toBeDefined();
    expect(testBasket.username).toEqual(username.charAt(0).toUpperCase() + username.slice(1));
  });

  test("testBasketAddPackageToBasket", async () => {
    testBasket = await global.tebexHeadless.addPackageToBasket(
      testBasket.ident,
      package_id,
      quantity,
      "single"
    );

    expect(testBasket.packages[0]).toBeDefined();
    expect(testBasket.packages[0]!.in_basket.quantity).toEqual(quantity);
  });

  test("testBasketUpdateQuantity", async () => {
    testBasket = await global.tebexHeadless.updateQuantity(
      testBasket.ident,
      package_id,
      quantity * 2
    );

    expect(testBasket.packages[0]).toBeDefined();
    expect(testBasket.packages[0]!.in_basket.quantity).toEqual(quantity * 2);
  });

  test("testBasketRemovePackage", async () => {
    testBasket = await global.tebexHeadless.removePackage(testBasket.ident, package_id);

    expect(testBasket.packages[0]).toBeUndefined();
  });

  test("testBasketGiftPackage", async () => {
    testBasket = await global.tebexHeadless.giftPackage(testBasket.ident, package_id, username_id);

    expect(testBasket.packages[0]).toBeDefined();
  });

  test("testBasketApplyCoupon", async () => {
    const response = await global.tebexHeadless.apply(testBasket.ident, "coupons", {
      coupon_code: "test",
    });

    expect(response.success).toEqual(true);
    expect(response.message).toEqual("Coupon applied successfully");
  });

  test("testBasketApplyCreatorCode", async () => {
    const response = await global.tebexHeadless.apply(testBasket.ident, "creator-codes", {
      creator_code: "test",
    });

    expect(response.success).toEqual(true);
    expect(response.message).toEqual("Creator code applied successfully");
  });

  test("testBasketRemoveCreatorCode", async () => {
    const response = await global.tebexHeadless.remove(testBasket.ident, "creator-codes", {
      creator_code: "test",
    });

    expect(response.success).toEqual(true);
    expect(response.message).toEqual("Creator code removed successfully");
  });

  test("testBasketApplyGiftCard", async () => {
    const response = await global.tebexHeadless.apply(testBasket.ident, "giftcards", {
      card_number: card_number!,
    });

    expect(response.success).toEqual(true);
    expect(response.message).toEqual("Gift card applied successfully");
  });

  test("testBasketRemoveGiftCard", async () => {
    const response = await global.tebexHeadless.remove(testBasket.ident, "giftcards", {
      card_number: card_number!,
    });

    expect(response.success).toEqual(true);
    expect(response.message).toEqual("Gift card removed successfully");
  });
});
