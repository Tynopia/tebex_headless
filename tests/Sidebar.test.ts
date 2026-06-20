test("testSidebarStructure", async () => {
  const modules = await global.tebexHeadless.getSidebar();

  expect(Array.isArray(modules)).toBe(true);

  if (modules.length > 0) {
    const mod = modules[0]!;
    expect(mod).toHaveProperty("id");
    expect(mod).toHaveProperty("type");
    expect(mod).toHaveProperty("data");
    expect(typeof mod.id).toBe("number");
    expect(typeof mod.type).toBe("string");
  }
});
