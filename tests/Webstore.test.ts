import { GetWebstore, Webstore } from "..";

const keys: Array<keyof Webstore> = [
    "id",
    "name",
    "description",
    "webstore_url",
    "currency",
    "lang",
    "logo",
    "platform_type",
    "platform_type_id",
    "created_at"
]

test("testWebstoreStructure", async () => {
    const webstore = await GetWebstore();
    expect(Object.keys(webstore).sort()).toEqual(keys.sort())
})