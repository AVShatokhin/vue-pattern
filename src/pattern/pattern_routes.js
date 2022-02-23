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
import ProfilePasswordChange from "@/pattern/pages/PatternRegister.vue";

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
  name: "Панель управления",
  children: [
    {
      path: "/users",
      component: Register,
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

const routes = [authPages, dashboard];

export default routes;
