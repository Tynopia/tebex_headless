import type { Package } from "../src/index.js";

const ip = process.env["IP_ADDRESS"];
const package_id = parseInt(process.env["PACKAGE_ID"]!);

test("testPackageStructure", async () => {
  const pkg = await global.tebexHeadless.getPackage(package_id, undefined, ip);

  expect(pkg).toMatchObject<Partial<Package>>({
    id: expect.any(Number),
    name: expect.any(String),
    description: expect.any(String),
    currency: expect.any(String),
    base_price: expect.any(Number),
    sales_tax: expect.any(Number),
    total_price: expect.any(Number),
    discount: expect.any(Number),
    disable_gifting: expect.any(Boolean),
    disable_quantity: expect.any(Boolean),
    created_at: expect.any(String),
    updated_at: expect.any(String),
  });
  expect(Array.isArray(pkg.media)).toBe(true);
});

test("testPackageMediaArray", async () => {
  const pkg = await global.tebexHeadless.getPackage(package_id, undefined, ip);
  expect(Array.isArray(pkg.media)).toBe(true);
});

test("testPackagesAll", async () => {
  const packages = await global.tebexHeadless.getPackages(undefined, ip);
  expect(Array.isArray(packages)).toBe(true);
  expect(packages.length).toBeGreaterThan(0);
});
