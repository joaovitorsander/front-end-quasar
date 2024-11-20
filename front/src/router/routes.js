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
        path: "mapas",
        component: () => import("pages/MapsPage.vue"),
      },
      {
        path: "agentes",
        component: () => import("pages/AgentsPage.vue"),
      },
      {
        path: "campeonatos",
        component: () => import("pages/TournamentsPage.vue"),
      },
      {
        path: "jogadores",
        component: () => import("pages/PlayersTeamsPage.vue"),
      },
      {
        path: "partidas",
        component: () => import("pages/MatchesPage.vue"),
      },
      {
        path: "times",
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
