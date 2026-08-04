export * from "./enums";

import {
  AdminPermission,
  AdminPermissionResource,
  DisputeStatus,
  DisputeAction,
  AdminDisputeResolution,
  DealStatus,
  TransactionType,
  TransactionDirection,
  WalletBalanceField,
  OrderType,
  HandlingTime,
  ShippingType,
  FeePayer,
} from "./enums";

// ─── Base Entity ─────────────────────────────────────────────────────────────
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// ─── Pagination Wrapper ──────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── System / Admin Models ───────────────────────────────────────────────────
export interface Permission extends BaseEntity {
  name: AdminPermission;
  resource: AdminPermissionResource;
}

export interface RolePermission extends BaseEntity {
  roleId: string;
  permissionId: string;
  permission?: Permission;
}

export interface AdminRole extends BaseEntity {
  name: string;
  description: string | null;
  isFullAccess: boolean;
  rolePermissions?: RolePermission[];
}

export interface AdminUser extends BaseEntity {
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  isActive: boolean;
  adminRoleId: string;
  adminRole?: AdminRole;
  lastLoginAt: string | null;
}

// ─── Buyer/Seller User (Customer) Models ─────────────────────────────────────
export interface User extends BaseEntity {
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  username: string | null;
  profilePhotoUrl: string | null;
  bio: string | null;
  location: string | null;
  emailVerifiedAt: string | null;
  phoneVerifiedAt: string | null;
  isActive: boolean;
  stripeCustomerId: string | null;
  stripeConnectAccountId: string | null;
  avgSellerRating: number;
  sellerRatingCount: number;
  avgBuyerRating: number;
  buyerRatingCount: number;
  wallet?: Wallet;
}

export interface Wallet extends BaseEntity {
  userId: string;
  pendingBalance: number;
  availableBalance: number;
}

// ─── Deal Models ─────────────────────────────────────────────────────────────
export interface Deal extends BaseEntity {
  dealNumber: string;
  sellerId: string;
  buyerId: string | null;
  pendingBuyerId: string | null;
  lockExpiresAt: string | null;
  title: string;
  price: number;
  productType: string;
  orderType: OrderType;
  isGraded: boolean;
  serialNumber: string | null;
  description: string | null;
  condition: string | null;
  notes: string | null;
  handlingTime: HandlingTime | null;
  carrier: string | null;
  shippingType: ShippingType | null;
  shippingCost: number;
  isInsured: boolean;
  requireSignatureDelivery: boolean;
  requireBuyerPackagingPhotos: boolean;
  feePayer: FeePayer;
  platformFeeAmount: number;
  buyerPaysAmount: number;
  sellerReceivesAmount: number;
  stripeCheckoutSessionId: string | null;
  stripePaymentIntentId: string | null;
  shippingAddressId: string | null;
  shippingContactName: string | null;
  shippingLine1: string | null;
  shippingLine2: string | null;
  shippingCity: string | null;
  shippingState: string | null;
  shippingZip: string | null;
  shippingCountry: string | null;
  shippingPhone: string | null;
  shippingAlternatePhone: string | null;
  trustScore: number;
  status: DealStatus;
  fundedAt: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
  closedAt: string | null;
  cancelledAt: string | null;
  seller?: User;
  buyer?: User;
}

// ─── Transaction Models ──────────────────────────────────────────────────────
export interface Transaction extends BaseEntity {
  userId: string;
  dealId: string | null;
  disputeId: string | null;
  type: TransactionType;
  direction: TransactionDirection;
  balanceField: WalletBalanceField | null;
  amount: number;
  balanceAfter: number | null;
  stripeObjectId: string | null;
  user?: User;
  deal?: Deal | null;
  dispute?: Dispute | null;
}

// ─── Dispute Models ──────────────────────────────────────────────────────────
export interface Dispute extends BaseEntity {
  dealId: string;
  buyerId: string;
  reason: string;
  explanation: string;
  status: DisputeStatus;
  sellerExplanation: string | null;
  actionTaken: DisputeAction | null;
  returnAddressContactName: string | null;
  returnAddressLine1: string | null;
  returnAddressLine2: string | null;
  returnAddressCity: string | null;
  returnAddressState: string | null;
  returnAddressZip: string | null;
  returnAddressCountry: string | null;
  returnAddressPhone: string | null;
  returnCarrier: string | null;
  returnShippingType: ShippingType | null;
  returnTrackingNumber: string | null;
  returnTrackingUrl: string | null;
  returnEstimatedDeliveryAt: string | null;
  returnNotes: string | null;
  returnShippedAt: string | null;
  returnDeliveredAt: string | null;
  buyerEscalated: boolean;
  resolvedAt: string | null;
  deal?: Deal;
  buyer?: User;
}

// ─── Auth DTOs ───────────────────────────────────────────────────────────────
export interface AdminLoginDto {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  accessToken: string;
}

// ─── Admin User DTOs ─────────────────────────────────────────────────────────
export interface CreateAdminUserDto {
  email: string;
  password?: string; // Optional if backend has defaults, but create dto in backend has it as string
  firstName?: string;
  lastName?: string;
  phone?: string;
  adminRoleId: string;
}

export interface UpdateAdminUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  adminRoleId?: string;
  isActive?: boolean;
}

// ─── Admin Role DTOs ─────────────────────────────────────────────────────────
export interface CreateAdminRoleDto {
  name: string;
  description?: string;
  permissions: AdminPermission[];
}

export interface UpdateAdminRoleDto {
  name?: string;
  description?: string;
  permissions?: AdminPermission[];
}

// ─── Dispute DTOs ────────────────────────────────────────────────────────────
export interface ResolveDisputeDto {
  resolution: AdminDisputeResolution;
  reason: string;
}

// ─── Dashboard DTOs ──────────────────────────────────────────────────────────
export interface GetStatsResponse {
  totalRegisteredUsers: number;
  activeDeals: number;
  completedDeals: number;
  protectedFunds: number;
  fundsReleased: number;
  platformRevenue: number;
  openDisputes: number;
  activeWalletBalance: number;
}

export interface GetRecentActivityResponse {
  recentDeals: Deal[];
  recentTransactions: Transaction[];
  recentDisputes: Dispute[];
}
