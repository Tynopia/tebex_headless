export type Data<T> = {
  data: T;
};

export type Message = {
  success: boolean;
  message: string;
};

export type ErrorResponse = {
  type?: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
};

export type GenericObject = string | number | boolean | null | undefined;

export type Route = "accounts" | "baskets";

export type ApplyType = "coupons" | "giftcards" | "creator-codes";

export type PackageType = "subscription" | "single" | "both" | (string & {});

export type BaseItem = {
  id: number;
  name: string;
};

export type CouponCode = {
  coupon_code: string;
};

export type GiftCardCode = {
  card_number: string;
};

export type CreatorCode = {
  creator_code: string;
};

export type ApplyTypeToInterface<T extends ApplyType> = T extends "coupons"
  ? CouponCode
  : T extends "giftcards"
    ? GiftCardCode
    : T extends "creator-codes"
      ? CreatorCode
      : never;

export type PackageMedia = {
  type: "video" | "image";
  name: string | null;
  url: string;
  featured: boolean;
};

export type RevenueShare = {
  wallet_ref: string;
  amount: number;
  gateway_fee_percent: number;
};

export type TierStatus = {
  id: number;
  description: string;
};

export type PendingDowngradePackage = {
  id: number;
  name: string;
};

export type Tier = {
  id: number;
  created_at: string;
  username_id: string;
  package: Package;
  active: boolean;
  recurring_payment_reference: string;
  next_payment_date: string;
  status: TierStatus;
  pending_downgrade_package: PendingDowngradePackage | null;
};

export type Package = BaseItem & {
  description: string;
  type: PackageType;
  disable_gifting: boolean;
  disable_quantity: boolean;
  expiration_date: string | null;
  currency: string;
  category: BaseItem;
  base_price: number;
  sales_tax: number;
  total_price: number;
  prorate_price?: number | null;
  discount: number;
  image: string | null;
  media: PackageMedia[];
  created_at: string;
  updated_at: string;
  order?: number;
  slug?: string | null;
  variables?: string[];
  user_limit?: number | null;
  options?: unknown;
  creator_meta_data?: unknown;
  [key: string]: unknown;
};

export type Category = BaseItem & {
  description: string;
  parent: Category | null;
  order: number;
  packages: Package[] | null;
  display_type: "grid" | "list";
  slug: string | null;
  tiered?: boolean;
  active_tier?: Tier | null;
  image_url?: string | null;
  dynamic?: boolean;
  [key: string]: unknown;
};

export type InBasket = {
  quantity: number;
  price: number;
  gift_username_id: string | null;
  gift_username: string | null;
};

export type BasketPackage = BaseItem & {
  description: string;
  in_basket: InBasket;
  image: string | null;
  qty?: number;
  type?: "single" | "subscription";
  revenue_share?: RevenueShare[];
  [key: string]: unknown;
};

export type BasketLinks = {
  payment?: string;
  checkout: string;
};

export type Basket = {
  ident: string;
  complete: boolean;
  id: string;
  country: string;
  ip: string;
  username_id: number | null;
  username: string | null;
  cancel_url: string;
  complete_url: string | null;
  complete_auto_redirect: boolean;
  base_price: number;
  sales_tax: number;
  total_price: number;
  email: string | null;
  currency: string;
  packages: BasketPackage[];
  coupons: CouponCode[];
  giftcards: GiftCardCode[];
  creator_code: string;
  links: BasketLinks;
  custom: Record<string, unknown> | null;
};

export type AuthUrl = {
  name: string;
  url: string;
};

export type Urls = {
  complete_url: string;
  cancel_url: string;
  custom?: Record<string, unknown>;
  complete_auto_redirect?: boolean;
};

export type Webstore = {
  id: number;
  description: string;
  name: string;
  webstore_url: string;
  currency: string;
  lang: string;
  logo: string | null;
  platform_type: string;
  platform_type_id: string | number;
  created_at: string;
  disabled?: boolean;
  [key: string]: unknown;
};

export type Page = {
  id: number;
  created_at: string;
  updated_at: string;
  account_id: number;
  title: string;
  slug: string;
  private: boolean;
  hidden: boolean;
  disabled: boolean;
  sequence: boolean;
  content: string;
};

// --- Sidebar Module Types ---

export type ModuleBase = {
  id: number;
  type: string;
  start_time: string;
  end_time: string | null;
  data: unknown;
};

export type TopCustomerData = {
  header: string;
  username: string;
  username_id: string;
  total?: number;
};

export type TopCustomerModule = ModuleBase & {
  type: "top_customer";
  data: TopCustomerData;
};

export type TextboxData = {
  header: string;
  text: string;
};

export type TextboxModule = ModuleBase & {
  type: "textbox";
  data: TextboxData;
};

export type RecentPayment = {
  username: string;
  username_id: string;
  amount: number;
  currency: string;
};

export type RecentPaymentsData = {
  header: string;
  payments: RecentPayment[];
};

export type RecentPaymentsModule = ModuleBase & {
  type: "recent_payments";
  data: RecentPaymentsData;
};

export type FeaturedPackageData = {
  header: string;
  package: Package;
};

export type FeaturedPackageModule = ModuleBase & {
  type: "featured_package";
  data: FeaturedPackageData;
};

export type GiftcardBalanceData = {
  header: string;
};

export type GiftcardBalanceModule = ModuleBase & {
  type: "giftcard_balance";
  data: GiftcardBalanceData;
};

export type Players = {
  online: number;
  max: number;
};

export type ServerStatusData = {
  header: string;
  address: string;
  players: Players;
};

export type ServerStatusModule = ModuleBase & {
  type: "server_status";
  data: ServerStatusData;
};

export type PaymentGoalData = {
  header: string;
  current: number;
  target: number;
  currency: string;
};

export type PaymentGoalModule = ModuleBase & {
  type: "payment_goal";
  data: PaymentGoalData;
};

export type CommunityGoalData = {
  header: string;
  current: number;
  target: number;
};

export type CommunityGoalModule = ModuleBase & {
  type: "community_goal";
  data: CommunityGoalData;
};

export type Module =
  | TopCustomerModule
  | TextboxModule
  | RecentPaymentsModule
  | FeaturedPackageModule
  | GiftcardBalanceModule
  | ServerStatusModule
  | PaymentGoalModule
  | CommunityGoalModule;
