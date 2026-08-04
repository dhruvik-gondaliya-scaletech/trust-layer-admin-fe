export const AdminPermissionResource = {
  DASHBOARD: 'dashboard',
  DEALS: 'deals',
  TRANSACTIONS: 'transactions',
  DISPUTES: 'disputes',
  USERS: 'users',
  ADMIN_USERS: 'admin_users',
  ROLES: 'roles',
} as const;
export type AdminPermissionResource = typeof AdminPermissionResource[keyof typeof AdminPermissionResource];

export const AdminPermission = {
  DashboardView: 'dashboard:view',

  DealsView: 'deals:view',
  DealsCreate: 'deals:create',
  DealsEdit: 'deals:edit',
  DealsDelete: 'deals:delete',
  DealsExport: 'deals:export',
  DealsRefund: 'deals:refund',

  TransactionsView: 'transactions:view',
  TransactionsExport: 'transactions:export',
  TransactionsRefund: 'transactions:refund',
  TransactionsReleaseFunds: 'transactions:release_funds',
  TransactionsCancel: 'transactions:cancel',

  DisputesView: 'disputes:view',
  DisputesReview: 'disputes:review',
  DisputesEscalate: 'disputes:escalate',
  DisputesResolve: 'disputes:resolve',
  DisputesRefund: 'disputes:refund',
  DisputesReject: 'disputes:reject',

  UsersView: 'users:view',
  UsersCreate: 'users:create',
  UsersEdit: 'users:edit',
  UsersSuspend: 'users:suspend',
  UsersVerify: 'users:verify',
  UsersDelete: 'users:delete',
  UsersExport: 'users:export',

  AdminUsersView: 'admin_users:view',
  AdminUsersCreate: 'admin_users:create',
  AdminUsersEdit: 'admin_users:edit',
  AdminUsersDelete: 'admin_users:delete',

  RolesView: 'roles:view',
  RolesCreate: 'roles:create',
  RolesEdit: 'roles:edit',
  RolesDelete: 'roles:delete',
} as const;
export type AdminPermission = typeof AdminPermission[keyof typeof AdminPermission];

export const DisputeStatus = {
  CREATED: 'created',
  SELLER_RESPONDED: 'seller_responded',
  ESCALATED: 'escalated',
  RESOLVED: 'resolved',
} as const;
export type DisputeStatus = typeof DisputeStatus[keyof typeof DisputeStatus];

export const DisputeAction = {
  REFUND: 'refund',
  RETURN: 'return',
  DECLINE: 'decline',
} as const;
export type DisputeAction = typeof DisputeAction[keyof typeof DisputeAction];

export const AdminDisputeResolution = {
  RELEASE_TO_SELLER: 'release_to_seller',
  REFUND_BUYER: 'refund_buyer',
} as const;
export type AdminDisputeResolution = typeof AdminDisputeResolution[keyof typeof AdminDisputeResolution];

export const DealStatus = {
  DRAFT: 'draft',
  OPEN: 'open',
  FUNDED: 'funded',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  DISPUTED: 'disputed',
  RETURN_APPROVED: 'return_approved',
  RETURN_SHIPPED: 'return_shipped',
  RETURN_DELIVERED: 'return_delivered',
  RETURN_COMPLETED: 'return_completed',
  CANCELLED: 'cancelled',
  CLOSED: 'closed',
} as const;
export type DealStatus = typeof DealStatus[keyof typeof DealStatus];

export const TransactionType = {
  DEAL_FUNDED_CARD: 'deal_funded_card',
  DEAL_FUNDED_WALLET: 'deal_funded_wallet',
  FUNDS_RELEASED: 'funds_released',
  DISPUTE_REFUND: 'dispute_refund',
  DISPUTE_RETURN_COMPLETED: 'dispute_return_completed',
  DISPUTE_DECLINE_ACCEPTED: 'dispute_decline_accepted',
  DISPUTE_FEE_CLAWBACK: 'dispute_fee_clawback',
  WALLET_TOPUP: 'wallet_topup',
  WALLET_WITHDRAWAL: 'wallet_withdrawal',
  WALLET_WITHDRAWAL_REVERSED: 'wallet_withdrawal_reversed',
} as const;
export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export const TransactionDirection = {
  CREDIT: 'credit',
  DEBIT: 'debit',
} as const;
export type TransactionDirection = typeof TransactionDirection[keyof typeof TransactionDirection];

export const WalletBalanceField = {
  PENDING: 'pending',
  AVAILABLE: 'available',
} as const;
export type WalletBalanceField = typeof WalletBalanceField[keyof typeof WalletBalanceField];

export const OrderType = {
  ONLINE: 'online',
  IN_PERSON: 'in_person',
} as const;
export type OrderType = typeof OrderType[keyof typeof OrderType];

export const HandlingTime = {
  ONE_TO_TWO_DAYS: '1-2',
  THREE_TO_FIVE_DAYS: '3-5',
} as const;
export type HandlingTime = typeof HandlingTime[keyof typeof HandlingTime];

export const ShippingType = {
  STANDARD: 'standard',
  PRIORITY: 'priority',
} as const;
export type ShippingType = typeof ShippingType[keyof typeof ShippingType];

export const FeePayer = {
  SELLER: 'seller',
  BUYER: 'buyer',
  SPLIT: 'split',
} as const;
export type FeePayer = typeof FeePayer[keyof typeof FeePayer];
