import type { Page } from "../src/index.js";

const pageKeys: Array<keyof Page> = [
  "id",
  "created_at",
  "updated_at",
  "account_id",
  "title",
  "slug",
  "private",
  "hidden",
  "disabled",
  "sequence",
  "content",
];

test("testWebstorePagesStructure", async () => {
  const pages = await global.tebexHeadless.getPages();

  expect(Array.isArray(pages)).toBe(true);
  expect(pages.length).toBeGreaterThan(0);

  const page = pages[0]!;
  expect(Object.keys(page).sort()).toEqual(pageKeys.sort());
  expect(typeof page.content).toBe("string");
});
