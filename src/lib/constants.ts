export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1",

    // ─── Auth Endpoints ───────────────────────────────────────────────────────
    AUTH: {
        LOGIN: "/admin/auth/login",
    },

    // ─── Staff/Admin User Endpoints ──────────────────────────────────────────
    ADMIN_USERS: {
        CREATE: "/admin/admin-users",
        LIST: "/admin/admin-users",
        BY_ID: (id: string) => `/admin/admin-users/${id}`,
        UPDATE: (id: string) => `/admin/admin-users/${id}`,
        DELETE: (id: string) => `/admin/admin-users/${id}`,
    },

    // ─── Role Endpoints ───────────────────────────────────────────────────────
    ADMIN_ROLES: {
        CREATE: "/admin/roles",
        LIST: "/admin/roles",
        BY_ID: (id: string) => `/admin/roles/${id}`,
        UPDATE: (id: string) => `/admin/roles/${id}`,
        DELETE: (id: string) => `/admin/roles/${id}`,
    },

    // ─── Permissions Endpoints ───────────────────────────────────────────────
    ADMIN_PERMISSIONS: {
        LIST: "/admin/permissions",
    },

    // ─── Dashboard Endpoints ─────────────────────────────────────────────────
    DASHBOARD: {
        STATS: "/admin/dashboard/stats",
        RECENT_ACTIVITY: "/admin/dashboard/recent-activity",
    },

    // ─── Buyer/Seller User Endpoints ─────────────────────────────────────────
    CUSTOMERS: {
        LIST: "/admin/users",
        BY_ID: (id: string) => `/admin/users/${id}`,
        DEACTIVATE: (id: string) => `/admin/users/${id}/deactivate`,
        ACTIVATE: (id: string) => `/admin/users/${id}/activate`,
    },

    // ─── Deal Endpoints ──────────────────────────────────────────────────────
    DEALS: {
        LIST: "/admin/deals",
        BY_ID: (id: string) => `/admin/deals/${id}`,
    },

    // ─── Transaction Endpoints ───────────────────────────────────────────────
    TRANSACTIONS: {
        LIST: "/admin/transactions",
        BY_ID: (id: string) => `/admin/transactions/${id}`,
    },

    // ─── Dispute Endpoints ───────────────────────────────────────────────────
    DISPUTES: {
        LIST: "/admin/disputes",
        BY_ID: (id: string) => `/admin/disputes/${id}`,
        RESOLVE: (id: string) => `/admin/disputes/${id}/resolve`,
    },
};

export const FRONTEND_ROUTES = {
    LOGIN: "/login",
    DASHBOARD: "/",
    USERS: "/users",
    USER_DETAILS: (id: string) => `/users/${id}`,
    DEALS: "/deals",
    DEAL_DETAILS: (id: string) => `/deals/${id}`,
    TRANSACTIONS: "/transactions",
    TRANSACTION_DETAILS: (id: string) => `/transactions/${id}`,
    DISPUTES: "/disputes",
    DISPUTE_DETAILS: (id: string) => `/disputes/${id}`,
    SETTINGS: "/settings",
    PROFILE: "/profile",
    ADMIN_USERS: "/admin-users",
};