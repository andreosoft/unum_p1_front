import Vue from "vue";
import VueRouter from "vue-router";
import store from "./../store";
import MainLayout from "../components/layout/MainLayout.vue";
import axios from "./../config/axios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("./../components/Login.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("./../components/SignUp.vue"),
  },
  {
    path: "/",
    component: MainLayout,
    redirect: { name: "Home" },
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("./../views/Home.vue"),
        meta: {
          requiresAuth: true,
          title: "Главная",
        },
      },
      {
        path: "outpatient-card",
        name: "Outpatient Card",
        component: () => import("./../views/OutpatientCard.vue"),
        meta: {
          requiresAuth: true,
          title: "Амбулаторная карта",
        },
      },
      {
        path: "/chats",
        component: () => import("./../views/Chats.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            name: "Chats",
            components: {
              list: () => import("./../components/chat/List.vue"),
              messages: () => import("./../components/chat/NoSelected.vue"),
            },
            meta: {
              hideMobileList: false,
              title: "Чаты",
            },
          },
          {
            path: ":id",
            name: "Chat",
            components: {
              list: () => import("./../components/chat/List.vue"),
              messages: () => import("./../components/chat/ChatWindow.vue"),
            },
            meta: {
              hideMobileList: true,
              hideMobileTopNavbar: true,
              title: "Чаты",
            },
          },
        ],
      },
      {
        path: "my-doctors",
        name: "My Doctors",
        component: () => import("./../views/MyDoctors.vue"),
        meta: {
          requiresAuth: true,
          title: "Мои врачи",
        },
      },
      {
        path: "all-doctors",
        name: "All Doctors",
        component: () => import("./../views/AllDoctors.vue"),
        meta: {
          requiresAuth: true,
          title: "Все врачи",
        },
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("./../views/Profile.vue"),
        meta: {
          requiresAuth: true,
          title: "Мой профиль",
        },
      },
      {
        path: "submit-access/:token",
        name: "Submit access",
        component: () => import("./../views/SubmitAccess.vue"),
        meta: {
          requiresAuth: true,
          title: "Предоставить доступ",
        },
      },
      {
        path: "/:slug/:id",
        name: "Doctor",
        component: () => import("./../views/Doctor.vue"),
        meta: {
          requiresAuth: true,
          title: "Информация о враче",
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  if (requiresAuth) {
    if (!store.state.auth.authStatus) {
      const data = window.localStorage.getItem("neomedy");
      if (!data) {
        return next({ name: "Login" });
      }
      const login = JSON.parse(data).login;
      store
        .dispatch("auth/confirmLogin", login, { root: true })
        .then((status) => {
          if (status) {
            axios.defaults.headers.common.Authorization = JSON.parse(
              data
            ).token;
            store.dispatch("auth/fetchUserProfile");
            return next();
          } else {
            return next({
              name: "Login",
            });
          }
        });
    } else {
      return next();
    }
  } else {
    next();
  }
});
export default router;
