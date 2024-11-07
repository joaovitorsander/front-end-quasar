const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "register",
        component: () => import("pages/RegisterPage.vue"),
      },
    ],
  },
  {
    path: "/app",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("pages/DashBoardPage.vue"),
      },
      {
        path: "maps",
        component: () => import("pages/MapsPage.vue"),
      },
      {
        path: "agent",
        component: () => import("pages/AgentsPage.vue"),
      },
      {
        path: "camp",
        component: () => import("pages/CampPage.vue"),
      },
      {
        path: "jogadores",
        component: () => import("pages/JogadoresTimesPage.vue"),
      },
      {
        path: "partida",
        component: () => import("pages/PartidasPage.vue"),
      },
      {
        path: "time",
        component: () => import("pages/TeamsPage.vue"),
      },
    ],
  },
  // Fallback para páginas não encontradas
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
