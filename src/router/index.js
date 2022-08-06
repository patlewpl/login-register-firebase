import { createRouter, createWebHistory } from "vue-router";
import FormLinks from "../components/FormLinks.vue";
import LoginForm from "../components/auth/LoginForm.vue";
import RegisterForm from "../components/auth/RegisterForm.vue";
import TheWelcome from "../components/TheWelcome.vue";
import TheStart from "../components/TheStart.vue";
import TheProfile from "../components/TheProfile.vue";

const routes = [
  {
    path: "/",
    component: FormLinks,
  },
  {
    path: "/login",
    component: LoginForm,
    meta: {
      requiresUnauth: true,
    },
  },
  {
    path: "/register",
    component: RegisterForm,
    meta: {
      requiresUnauth: true,
    },
  },
  {
    path: "/welcome",
    component: TheWelcome,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/start",
    component: TheStart,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    component: TheProfile,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(function (to, _, next) {
  const isAuthenticated = localStorage.getItem("Authenticated") === "true";
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresUnauth && isAuthenticated) {
    next("/welcome");
  } else {
    next();
  }
});

export default router;
