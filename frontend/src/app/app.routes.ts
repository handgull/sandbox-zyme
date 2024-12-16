import { Routes } from "@angular/router";
import { authGuard } from "./auth/auth.guard";
import LoginPageComponent from "./auth/pages/login/login-page.component";
import HomePageComponent from "./pages/home/home-page.component";

export const routes: Routes = [
  { path: "", redirectTo: "auth/login", pathMatch: "full" },
  {
    path: "auth",
    children: [
      {
        path: "login",
        component: LoginPageComponent,
        title: "Login - ZYME Business",
      },
    ],
  },
  {
    path: "home",
    component: HomePageComponent,
    canMatch: [authGuard],
    title: "ZYME Business",
  },
  {
    path: "404",
    loadComponent: () => import("./pages/errors/e404-page.component"),
    title: "404 - ZYME Business",
  },
  { path: "**", pathMatch: "full", redirectTo: "404" },
];
