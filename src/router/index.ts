import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser } from "vuefire";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/auth" },
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/pages/auth/index.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/resident",
      name: "resident",
      component: () => import("@/pages/resident/index.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "resident-home",
          component: () => import("@/pages/resident/home/index.vue"),
        },
        {
          path: "bills",
          name: "resident-bills",
          component: () => import("@/pages/resident/billing/index.vue"),
        },
        {
          path: "collection",
          name: "resident-collection",
          component: () => import("@/pages/resident/collection/index.vue"),
        },
        {
          path: "ledger",
          name: "resident-ledger",
          component: () => import("@/pages/resident/ledger/index.vue"),
        },
        {
          path: "concern",
          name: "resident-concern",
          component: () => import("@/pages/resident/concern/index.vue"),
        },
      ],
    },
    {
      path: "/auth/admin",
      name: "admin-auth",
      component: () => import("@/pages/admin/Auth.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/pages/admin/index.vue"),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: "dashboard",
          name: "admin-dashboard",
          component: () => import("@/pages/admin/dashboard/index.vue"),
        },
        {
          path: "users",
          name: "admin-users",
          component: () => import("@/pages/admin/user/index.vue"),
        },
        {
          path: "user/:uid",
          name: "admin-user",
          component: () => import("@/pages/admin/user/profile/index.vue"),
        },
        {
          path: "billings",
          name: "admin-billings",
          component: () => import("@/pages/admin/billing/index.vue"),
        },
        {
          path: "billing/create",
          name: "admin-billing-create",
          component: () => import("@/pages/admin/billing/create/index.vue"),
        },
        {
          path: "billing/update/:uid",
          name: "admin-billing-update",
          component: () => import("@/pages/admin/billing/update/index.vue"),
        },
        {
          path: "readers",
          name: "admin-readers",
          component: () => import("@/pages/admin/reader/index.vue"),
        },
        {
          path: "concerns",
          name: "admin-concerns",
          component: () => import("@/pages/admin/concern/index.vue"),
        },
        {
          path: "ledger",
          name: "admin-ledger",
          component: () => import("@/pages/admin/ledger/index.vue"),
        },
        {
          path: "collection",
          name: "admin-collection",
          component: () => import("@/pages/admin/collection/index.vue"),
        },
        {
          path: "setting",
          name: "admin-setting",
          component: () => import("@/pages/admin/setting/index.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/pages/error.vue"),
    },
  ],
});

const ADMIN_USER_ID = "awnGZJTd5QhwOADQAVohEkLQqwI3";

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();
  const isAuthenticated = !!user;
  const isAdmin = user?.uid === ADMIN_USER_ID;

  // Handle authenticated users trying to access guest-only routes
  if (isAuthenticated && to.meta.requiresGuest) {
    return next(
      isAdmin ? { name: "admin-dashboard" } : { name: "resident-home" }
    );
  }

  // Handle unauthenticated users trying to access protected routes
  if (!isAuthenticated && to.meta.requiresAuth) {
    return next(
      to.meta.requiresAdmin ? { name: "admin-auth" } : { name: "auth" }
    );
  }

  // Handle non-admin users trying to access admin routes
  if (to.meta.requiresAdmin && isAuthenticated && !isAdmin) {
    return next({ name: "resident-home" });
  }

  // Allow navigation if all checks pass
  next();
});

export default router;
