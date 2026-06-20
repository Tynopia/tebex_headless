import type { Category } from "../src/index.js";

test("testCategoriesStructure", async () => {
  const categories = await global.tebexHeadless.getCategories();
  const category = categories[0];

  expect(category).toBeDefined();

  if (category) {
    expect(category).toMatchObject<Partial<Category>>({
      id: expect.any(Number),
      name: expect.any(String),
      order: expect.any(Number),
      display_type: expect.stringMatching(/^(grid|list)$/),
    });
    expect("packages" in category).toBe(true);
    expect("parent" in category).toBe(true);
  }
});

test("testCategoriesIncludePackages", async () => {
  const categories = await global.tebexHeadless.getCategories(true);

  for (const category of categories) {
    if (category.packages !== null) {
      expect(Array.isArray(category.packages)).toBe(true);
    }
  }
});
