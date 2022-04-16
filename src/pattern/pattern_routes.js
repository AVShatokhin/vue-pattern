// Layouts
import PatternAuthLayout from "@/pattern/layouts/PatternAuthLayout.vue";
import PatternDashboardLayout from "@/pattern/layouts/PatternDashboardLayout.vue";

// Pages
import Login from "@/pattern/pages/PatternLogin.vue";
import Recover from "@/pattern/pages/PatternRecover.vue";
import NewPassword from "@/pattern/pages/PatternNewPassword.vue";
import Register from "@/pattern/pages/PatternRegister.vue";
import Confirmed from "@/pattern/pages/PatternConfirmed.vue";
import Profile from "@/pattern/pages/PatternUserProfile.vue";
import ProfilePasswordChange from "@/pattern/pages/PatternChangePassword.vue";
import Users from "@/pattern/pages/PatternUsers.vue";

import app_routes from "@/app/app_routes.js";

let authPages = {
  path: "/",
  redirect: "/login",
  component: PatternAuthLayout,
  name: "Authentication",
  children: [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/recover",
      name: "Recover",
      component: Recover,
    },
    {
      path: "/confirmed",
      name: "Confirmed",
      component: Confirmed,
    },
    {
      path: "/new_password/:token",
      name: "New password",
      component: NewPassword,
    },
  ],
};

let dashboard = {
  path: "/dashboard",
  component: PatternDashboardLayout,
  name: "",
  children: [
    {
      path: "/users",
      component: Users,
      name: "Пользователи",
    },
    {
      path: "/profile",
      component: Profile,
      name: "Профиль пользователя",
    },
    {
      path: "/passwordChange",
      component: ProfilePasswordChange,
      name: "Смена пароля",
    },
  ],
};

dashboard.children = dashboard.children.concat(app_routes);

const routes = [authPages, dashboard];

export default routes;
