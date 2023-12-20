import { GetWebstore } from "..";

const keys = [
    "id",
    "name",
    "description",
    "webstore_url",
    "currency",
    "lang",
    "logo",
    "platform_type",
    "created_at"
]

test("testWebstoreStructure", async () => {
    const webstore = await GetWebstore();
    expect(Object.keys(webstore).sort()).toEqual(keys.sort())
})