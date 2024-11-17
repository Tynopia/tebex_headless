import { Category } from "@custom-types/Category";

const keys: Array<keyof Category> = [
    "id",
    "name",
    "description",
    "parent",
    "order",
    "packages",
    "display_type",
    "slug"
]

test("testCategoriesStructure", async () => {
    const categories = await global.tebexHeadless.getCategories();
    const category = categories[0];

    expect(category).toBeDefined()

    if (category) {
        expect(Object.keys(category).sort()).toEqual(keys.sort())
    }
})