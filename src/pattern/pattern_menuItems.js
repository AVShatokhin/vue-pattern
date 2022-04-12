/* eslint-disable */
import app_menuItems from "@/app/app_menuItems.js";

export default [
  {
    name: "Пользователи",
    icon: "supervisor_account",
    path: "/users",
    roles: ["admin"],
  },
]
  .concat(app_menuItems)
  .reverse();
