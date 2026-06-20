import type { Webstore } from "../src/index.js";

test("testWebstoreStructure", async () => {
  const webstore = await global.tebexHeadless.getWebstore();

  expect(webstore).toMatchObject<Partial<Webstore>>({
    id: expect.any(Number),
    name: expect.any(String),
    description: expect.any(String),
    webstore_url: expect.any(String),
    currency: expect.any(String),
    lang: expect.any(String),
    platform_type: expect.any(String),
    platform_type_id: expect.toSatisfy(
      (v: unknown) => typeof v === "string" || typeof v === "number"
    ),
    created_at: expect.any(String),
  });
  expect(
    typeof webstore.platform_type_id === "string" || typeof webstore.platform_type_id === "number"
  ).toBe(true);
});
