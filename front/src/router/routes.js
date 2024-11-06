const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "", // Default path (Dashboard)
        component: () => import("pages/DashBoardPage.vue"),
      },
      {
        path: "login", // Login page
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "register", // Register page
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        path: "maps", // Maps page
        component: () => import("pages/MapsPage.vue"),
      },
      {
        path: "agent", // Agent page
        component: () => import("pages/AgentsPage.vue"),
      },
      {
        path: "camp", // Camp page
        component: () => import("pages/CampPage.vue"),
      },
      // {
      //   path: "estat", // Estat page
      //   component: () => import("pages/EstatsJogadorPage.vue"),
      // },
      {
        path: "jogadores", // Jogadores page
        component: () => import("pages/JogadoresTimesPage.vue"),
      },
      {
        path: "partida", // Partida page
        component: () => import("pages/PartidasPage.vue"),
      },
      {
        path: "time", // Partida page
        component: () => import("pages/TeamsPage.vue"),
      },
    ],
  },
  // Fallback for pages not found
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
