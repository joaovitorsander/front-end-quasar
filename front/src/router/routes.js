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
        component: () => import("pages/AgentPage.vue"),
      },
      {
        path: "camp", // Camp page
        component: () => import("pages/CampPage.vue"),
      },
      {
        path: "estat", // Estat page
        component: () => import("pages/EstatPage.vue"),
      },
      {
        path: "jogadores", // Jogadores page
        component: () => import("pages/JogadoresPage.vue"),
      },
      {
        path: "partida", // Partida page
        component: () => import("pages/PartidaPage.vue"),
      }
    ],
  },
  // Fallback for pages not found
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
