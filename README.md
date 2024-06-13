# Tebex Headless API Wrapper

![Tebex Headless](https://github.com/grp-gg/tebex_headless/assets/65678882/f9de08d5-aa6a-4cdf-a819-7d89d615c63b)

Welcome to the Tebex Headless API Wrapper! This Node.js TypeScript library allows you to seamlessly integrate Tebex into your projects and build a custom storefront without revealing your use of Tebex.

## Installation

```bash
npm install tebex_headless
```

## Getting Started

1. Obtain your Tebex Headless API public token from your Tebex account.
2. Install the `tebex_headless` library in your project.
3. Start using the Tebex Headless API in your Node.js TypeScript application!

```typescript
import { TebexHeadless } from "tebex_headless";

const tebexHeadless = new TebexHeadless(webstoreIdentifier);
```

## Functions

```typescript
// A function to get the categories from the Tebex Headless API
async TebexHeadless::getCategories(includePackages?: boolean, basketIdent?: string, ipAddress?: string)

// A function to get a category from the Tebex Headless API
async TebexHeadless::getCategory(id: number, includePackages?: boolean, basketIdent?: string, ipAddress?: string)

// A function to apply a coupon, giftcard or creator code to a basket
async TebexHeadless::apply<T extends ApplyType, A extends ApplyTypeToInterface<T>>(basketIdent: string, type: T, body: A)

// A function to remove a coupon, giftcard or creator code from a basket
async TebexHeadless::remove<T extends ApplyType, A extends ApplyTypeToInterface<T>>(basketIdent: string, type: T, body: A)

// A function to get a package from the Tebex Headless API
async TebexHeadless::getPackage(id: number, basketIdent?: string, ipAddress?: string)

// A function to get all packages from the Tebex Headless API
async TebexHeadless::getPackages(basketIdent?: string, ipAddress?: string)

// A function to get a basket from the Tebex Headless API
async TebexHeadless::getBasket(basketIdent: string)

// A function to create a basket from the Tebex Headless API
async TebexHeadless::createBasket(complete_url: string, cancel_url: string, custom?: KeyValuePair<string, any>, complete_auto_redirect?: boolean, ipAddress?: string)

// A function to create a minecraft basket from the Tebex Headless API
async TebexHeadless::createMinecraftBasket(username: string, complete_url: string, cancel_url: string, custom?: KeyValuePair<string, any>, complete_auto_redirect?: boolean, ipAddress?: string)

// A function to get the auth url of a basket from the Tebex Headless API
async TebexHeadless::getBasketAuthUrl(basketIdent: string, returnUrl: string)

// A function to add a package to a basket from the Tebex Headless API
TebexHeadless::addPackageToBasket(basketIdent: string, package_id: number, quantity: number, type?: PackageType, variable_data?: KeyValuePair<string, any>)

// A function to gift a package to a user from the Tebex Headless API
async TebexHeadless::giftPackage(basketIdent: string, package_id: number, target_username_id: string)

// A function to remove a package from a basket from the Tebex Headless API
async TebexHeadless::removePackage(basketIdent: string, package_id: number)

// A function to update the quantity of a package in a basket from the Tebex Headless API
async TebexHeadless::updateQuantity(basketIdent: string, package_id: number, quantity: number)

// A function to get the webstore from the Tebex Headless API
async TebexHeadless::getWebstore()
```

## Features

- **Seamless Integration:** Use Tebex functionalities in your project without exposing the fact that you are using Tebex.
- **Custom Storefront:** Build your custom storefront by leveraging Tebex Headless API.


## IP forwarding

If a store uses its own backend but wants to use the IP addresses of the users instead of the server, Tebex requires a basic [authentication](https://documenter.getpostman.com/view/10912536/2s9XxvTEmh#intro).

[Check our following Link to generate a private key](https://creator.tebex.io/developers/api-keys)

```typescript
import { TebexHeadless } from "tebex_headless";

const tebexHeadless = new TebexHeadless(webstoreIdentifier, privateKey);
```

## Contributing

We welcome contributions from the community! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure tests pass.
4. Submit a pull request with a clear description of your changes.

## Documentation

Check out the [official Tebex documentation](https://docs.tebex.io/) for detailed information about the Tebex Headless API and its features.

## Support

If you have questions or need assistance, feel free to [open an issue](https://github.com/grp-gg/tebex_headless/issues) on the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy coding! 🚀
