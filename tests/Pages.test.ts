import { Page } from "@custom-types/Page";

const keys: Array<keyof Page> = [
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
    "content"
]

test("testWebstorePagesStructure", async () => {
    const pages = await global.tebexHeadless.getPages() as [Page];
    const [ page ] = pages;

    expect(pages.length).toBe(1)
    expect(Object.keys(page).sort()).toEqual(keys.sort())
})