// Layouts
import PatternAuthLayout from "@/pattern/layouts/PatternAuthLayout.vue";

// Pages
import Login from "@/pattern/pages/PatternLogin.vue";
import Recover from "@/pattern/pages/PatternRecover.vue";
import Register from "@/pattern/pages/PatternRegister.vue";
import Lock from "@/pages/Dashboard/Pages/Lock.vue";

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
  ],
};

const routes = [authPages];

export default routes;
