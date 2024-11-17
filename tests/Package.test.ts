import { Package } from "@custom-types/Package/Package";

const keys: Array<keyof Package> = [
    "id",
    "name",
    "description",
    "type",
    "disable_gifting",
    "disable_quantity",
    "expiration_date",
    "currency",
    "category",
    "base_price",
    "sales_tax",
    "total_price",
    "discount",
    "image",
    "created_at",
    "updated_at",
    "order"
]

const ip = process.env.IP_ADDRESS;
const package_id = parseInt(process.env.PACKAGE_ID!);

test("testPackageStructure", async () => {
    const _package = await global.tebexHeadless.getPackage(package_id, undefined, ip);
    expect(Object.keys(_package).sort()).toEqual(keys.sort())
})