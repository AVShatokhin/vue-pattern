import app_roles from "@/app/app_roles.js";

let pattern_roles = {
  admin: "Администратор",
  default: "Базовая роль",
};

for (let role in app_roles) {
  pattern_roles[role] = app_roles[role];
}

export default pattern_roles;
