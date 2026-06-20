import { request } from "./request.js";
import type {
  ApplyType,
  ApplyTypeToInterface,
  AuthUrl,
  Basket,
  Category,
  Data,
  Message,
  Module,
  Package,
  PackageType,
  Page,
  Webstore,
} from "./types.js";

export class TebexHeadless {
  constructor(
    readonly webstoreIdentifier: string,
    private readonly privateKey?: string
  ) {}

  async getWebstore(): Promise<Webstore> {
    const { data } = await request<Data<Webstore>>(
      this.webstoreIdentifier,
      this.privateKey,
      "GET",
      this.webstoreIdentifier,
      "accounts"
    );
    return data;
  }

  async getPages(): Promise<Page[]> {
    const { data } = await request<Data<Page[]>>(
      this.webstoreIdentifier,
      this.privateKey,
      "GET",
      this.webstoreIdentifier,
      "accounts",
      "/pages"
    );
    return data;
  }

  async getSidebar(): Promise<Module[]> {
    const { data } = await request<Data<Module[]>>(
      this.webstoreIdentifier,
      this.privateKey,
      "GET",
      this.webstoreIdentifier,
      "accounts",
      "/sidebar"
    );
    return data;
  }

  async getCategories(
    includePackages?: boolean,
    usernameId?: string,
    basketIdent?: string,
    ipAddress?: string
  ): Promise<Category[]> {
    const { data } = await request<Data<Category[]>>(
      this.webstoreIdentifier,
      this.privateKey,
      "GET",
      this.webstoreIdentifier,
      "accounts",
      "/categories",
      { includePackages, usernameId, basketIdent, ipAddress }
    );
    return data;
  }

  async getCategory(
    id: number,
    includePackages?: boolean,
    usernameId?: string,
    basketIdent?: string,
    ipAddress?: string
  ): Promise<Category> {
    const { data } = await request<Data<Category>>(
      this.webstoreIdentifier,
      this.privateKey,
      "GET",
      this.webstoreIdentifier,
      "accounts",
      `/categories/${id}`,
      { includePackages, usernameId, basketIdent, ipAddress }
    );
    return data;
  }

  async getPackages(basketIdent?: string, ipAddress?: string): Promise<Package[]> {
    const { data } = await request<Data<Package[]>>(
      this.webstoreIdentifier,
      this.privateKey,
      "GET",
      this.webstoreIdentifier,
      "accounts",
      "/packages",
      { basketIdent, ipAddress }
    );
    return data;
  }

  async getPackage(id: number, basketIdent?: string, ipAddress?: string): Promise<Package> {
    const { data } = await request<Data<Package>>(
      this.webstoreIdentifier,
      this.privateKey,
      "GET",
      this.webstoreIdentifier,
      "accounts",
      `/packages/${id}`,
      { basketIdent, ipAddress }
    );
    return data;
  }

  async getBasket(basketIdent: string): Promise<Basket> {
    const { data } = await request<Data<Basket>>(
      this.webstoreIdentifier,
      this.privateKey,
      "GET",
      this.webstoreIdentifier,
      "accounts",
      `/baskets/${basketIdent}`
    );
    return data;
  }

  async createBasket(
    complete_url: string,
    cancel_url: string,
    custom?: Record<string, unknown>,
    complete_auto_redirect?: boolean,
    ip_address?: string
  ): Promise<Basket> {
    const { data } = await request<Data<Basket>>(
      this.webstoreIdentifier,
      this.privateKey,
      "POST",
      this.webstoreIdentifier,
      "accounts",
      "/baskets",
      { ip_address },
      { complete_url, cancel_url, custom, complete_auto_redirect }
    );
    return data;
  }

  async createMinecraftBasket(
    username: string,
    complete_url: string,
    cancel_url: string,
    custom?: Record<string, unknown>,
    complete_auto_redirect?: boolean,
    ip_address?: string
  ): Promise<Basket> {
    const { data } = await request<Data<Basket>>(
      this.webstoreIdentifier,
      this.privateKey,
      "POST",
      this.webstoreIdentifier,
      "accounts",
      "/baskets",
      { ip_address },
      { username, complete_url, cancel_url, custom, complete_auto_redirect }
    );
    return data;
  }

  async getBasketAuthUrl(basketIdent: string, returnUrl: string): Promise<AuthUrl[]> {
    return request<AuthUrl[]>(
      this.webstoreIdentifier,
      this.privateKey,
      "GET",
      this.webstoreIdentifier,
      "accounts",
      `/baskets/${basketIdent}/auth`,
      { returnUrl }
    );
  }

  async addPackageToBasket(
    basketIdent: string,
    package_id: number,
    quantity: number,
    type?: PackageType,
    variable_data?: Record<string, unknown>
  ): Promise<Basket> {
    const { data } = await request<Data<Basket>>(
      this.webstoreIdentifier,
      this.privateKey,
      "POST",
      basketIdent,
      "baskets",
      "/packages",
      {},
      { package_id, quantity, type, variable_data }
    );
    return data;
  }

  async giftPackage(
    basketIdent: string,
    package_id: number,
    target_username_id: string
  ): Promise<Basket> {
    const { data } = await request<Data<Basket>>(
      this.webstoreIdentifier,
      this.privateKey,
      "POST",
      basketIdent,
      "baskets",
      "/packages",
      {},
      { package_id, target_username_id }
    );
    return data;
  }

  async removePackage(basketIdent: string, package_id: number): Promise<Basket> {
    const { data } = await request<Data<Basket>>(
      this.webstoreIdentifier,
      this.privateKey,
      "POST",
      basketIdent,
      "baskets",
      "/packages/remove",
      {},
      { package_id }
    );
    return data;
  }

  async updateQuantity(basketIdent: string, package_id: number, quantity: number): Promise<Basket> {
    const { data } = await request<Data<Basket>>(
      this.webstoreIdentifier,
      this.privateKey,
      "PUT",
      basketIdent,
      "baskets",
      `/packages/${package_id}`,
      {},
      { quantity }
    );
    return data;
  }

  async apply<T extends ApplyType, A extends ApplyTypeToInterface<T>>(
    basketIdent: string,
    type: T,
    body: A
  ): Promise<Message> {
    return request<Message, A>(
      this.webstoreIdentifier,
      this.privateKey,
      "POST",
      this.webstoreIdentifier,
      "accounts",
      `/baskets/${basketIdent}/${type}`,
      {},
      body
    );
  }

  async remove<T extends ApplyType, A extends ApplyTypeToInterface<T>>(
    basketIdent: string,
    type: T,
    body: A
  ): Promise<Message> {
    return request<Message, A>(
      this.webstoreIdentifier,
      this.privateKey,
      "POST",
      this.webstoreIdentifier,
      "accounts",
      `/baskets/${basketIdent}/${type}/remove`,
      {},
      body
    );
  }

  async updateTier(tierId: number | string, package_id: number): Promise<Message> {
    return request<Message>(
      this.webstoreIdentifier,
      this.privateKey,
      "PATCH",
      this.webstoreIdentifier,
      "accounts",
      `/tiers/${tierId}`,
      {},
      { package_id }
    );
  }
}
