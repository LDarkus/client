import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",

      component: () => import("./views/main/HomePage.vue"),
      children: [
        {
          path: "/",
          name: "main",
          component: () => import("./views/main/MainWindowPage.vue"),
        },
        {
          path: "/schedules",
          name: "schedules",
          component: () => import("./views/main/Schedule.vue"),
        },
        {
          path: "/disciplines",
          name: "disciplines",
          component: () => import("./views/main/DisciplinePage.vue"),
        },
        {
          path: "/groups",
          name: "groups",
          component: () => import("./views/main/GroupPage.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/LoginAndRegistration.vue"),
    }
    ,
    //Если такого пути нет то пересылать сюда
    {
      path: "/:catchAll(.*)",
      component: () => import("./views/main/HomePage.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const accesstToken = localStorage.getItem("access_token");

  if (!accesstToken) {
    if (to.name === "login") {
      return next();
    }
  }
  if (to.name === "login" && accesstToken) {
    return next(from);
  }
  return next();
});

export default router;
