/* eslint-disable */
import { items } from "@/app/app_menuItems.js";
import { dirs } from "@/app/app_menuItems.js";

let patternItems = [
  {
    name: "Пользователи",
    icon: "supervisor_account",
    path: "/users",
    roles: ["admin"],
  },
]
  .concat(items)
  .reverse();

let patternDirs = dirs;

export { patternItems };
export { patternDirs };
