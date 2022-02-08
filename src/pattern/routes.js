// Layouts
import PatternAuthLayout from "@/pattern/layouts/PatternAuthLayout.vue";

// Pages
import Login from "@/pattern/pages/PatternLogin.vue";
import Recover from "@/pattern/pages/PatternRecover.vue";
import NewPassword from "@/pattern/pages/PatternNewPassword.vue";
import Register from "@/pattern/pages/PatternRegister.vue";
import Lock from "@/pages/Dashboard/Pages/Lock.vue";
import Confirmed from "@/pattern/pages/PatternConfirmed.vue";

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
      path: "/lock",
      name: "Lock",
      component: Lock,
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

const routes = [authPages];

export default routes;
