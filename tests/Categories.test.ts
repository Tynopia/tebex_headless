import { Category, GetCategories } from "..";

const keys: Array<keyof Category> = [
    "id",
    "name",
    "description",
    "parent",
    "order",
    "packages",
    "display_type"
]

test("testCategoriesStructure", async () => {
    const categories = await GetCategories();
    const category = categories[0];

    expect(category).toBeDefined()

    if (category) {
        expect(Object.keys(category).sort()).toEqual(keys.sort())
    }
})