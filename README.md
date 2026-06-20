<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/assets/tebex-primary-wordmark-light.svg">
  <source media="(prefers-color-scheme: light)" srcset=".github/assets/tebex-primary-wordmark-dark.svg">
  <img alt="Tebex" src=".github/assets/tebex-primary-wordmark-dark.svg" width="200">
</picture>

# tebex_headless

TypeScript SDK for the [Tebex Headless API](https://docs.tebex.io/developers/headless-api/overview). Build a fully custom storefront on top of your Tebex webstore. Works in Node.js and the browser.

[![npm](https://img.shields.io/npm/v/tebex_headless)](https://www.npmjs.com/package/tebex_headless)
[![CI](https://github.com/Tynopia/tebex_headless/actions/workflows/release.yml/badge.svg)](https://github.com/Tynopia/tebex_headless/actions/workflows/release.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Features

- **Zero dependencies:** uses native `fetch`, no axios or other HTTP libraries
- **Fully typed:** hand-written TypeScript types that match the real API responses
- **ESM + CJS:** tree-shakeable ESM and CommonJS builds included
- **Error handling:** throws `TebexApiError` with status code and response body on failure

## Installation

```bash
npm install tebex_headless
```

Requires Node.js 18+ or any modern browser.

## Quick Start

```typescript
import { TebexHeadless } from "tebex_headless";

const tebex = new TebexHeadless("your-webstore-identifier");

// Fetch webstore info
const webstore = await tebex.getWebstore();

// Fetch all packages
const packages = await tebex.getPackages();

// Create a basket
const basket = await tebex.createBasket("https://example.com/complete", "https://example.com/cancel");
```

## IP Forwarding

If your storefront runs on a backend server, pass your [private API key](https://creator.tebex.io/developers/api-keys) to forward the user's IP address to Tebex for accurate pricing and tax calculation:

```typescript
const tebex = new TebexHeadless("your-webstore-identifier", "your-private-key");
```

## API Reference

### Webstore

```typescript
tebex.getWebstore()
// → Promise<Webstore>

tebex.getPages()
// → Promise<Page[]>

tebex.getSidebar()
// → Promise<Module[]>
```

### Categories

```typescript
tebex.getCategories(includePackages?, usernameId?, basketIdent?, ipAddress?)
// → Promise<Category[]>

tebex.getCategory(id, includePackages?, usernameId?, basketIdent?, ipAddress?)
// → Promise<Category>
```

### Packages

```typescript
tebex.getPackages(basketIdent?, ipAddress?)
// → Promise<Package[]>

tebex.getPackage(id, basketIdent?, ipAddress?)
// → Promise<Package>
```

### Basket

```typescript
tebex.createBasket(complete_url, cancel_url, custom?, complete_auto_redirect?, ip_address?)
// → Promise<Basket>

tebex.createMinecraftBasket(username, complete_url, cancel_url, custom?, complete_auto_redirect?, ip_address?)
// → Promise<Basket>

tebex.getBasket(basketIdent)
// → Promise<Basket>

tebex.getBasketAuthUrl(basketIdent, returnUrl)
// → Promise<AuthUrl[]>
```

### Basket Packages

```typescript
tebex.addPackageToBasket(basketIdent, package_id, quantity, type?, variable_data?)
// → Promise<Basket>

tebex.removePackage(basketIdent, package_id)
// → Promise<Basket>

tebex.updateQuantity(basketIdent, package_id, quantity)
// → Promise<Basket>

tebex.giftPackage(basketIdent, package_id, target_username_id)
// → Promise<Basket>
```

### Coupons, Gift Cards & Creator Codes

```typescript
tebex.apply(basketIdent, "coupons", { coupon_code: "SAVE10" })
tebex.apply(basketIdent, "giftcards", { card_number: "1234-5678-9012-3456" })
tebex.apply(basketIdent, "creator-codes", { creator_code: "mycode" })
// → Promise<Message>

tebex.remove(basketIdent, "coupons", { coupon_code: "SAVE10" })
tebex.remove(basketIdent, "giftcards", { card_number: "1234-5678-9012-3456" })
tebex.remove(basketIdent, "creator-codes", { creator_code: "mycode" })
// → Promise<Message>
```

### Tiers

```typescript
tebex.updateTier(tierId, package_id)
// → Promise<Message>
```

## Error Handling

All methods throw `TebexApiError` on a non-2xx response:

```typescript
import { TebexApiError } from "tebex_headless";

try {
  const basket = await tebex.getBasket("invalid-ident");
} catch (err) {
  if (err instanceof TebexApiError) {
    console.error(err.status); // e.g. 404
    console.error(err.body);   // parsed JSON response body
  }
}
```

## Contributing

1. Fork the repository and create a branch for your change.
2. Install dependencies: `npm install`
3. Make your changes, run `npm run lint` and `npm test`.
4. Open a pull request with a clear description.

## License

MIT, see [LICENSE](LICENSE) for details.
