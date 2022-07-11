<template>
  <div class="md-layout text-center">
    <div
      class="
        md-layout-item
        md-size-33
        md-medium-size-50
        md-small-size-70
        md-xsmall-size-100
      "
    >
      <pattern-login-card header-color="green">
        <h4 slot="title" class="title">Вход в систему</h4>
        <p slot="description" class="description">введите E-mail и пароль</p>

        <md-field
          class="md-form-group"
          :class="{ 'md-focused': isNotMountedYet }"
          slot="inputs"
        >
          <md-icon>email</md-icon>
          <label>Email...</label>
          <md-input v-model="email" type="email"></md-input>
        </md-field>
        <md-field
          class="md-form-group"
          :class="{ 'md-focused': isNotMountedYet }"
          slot="inputs"
        >
          <md-icon>lock_outline</md-icon>
          <label>Пароль...</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
        <div slot="footer">
          <div align="center" v-if="isSending">
            <md-progress-spinner
              :md-diameter="58"
              :md-stroke="10"
              md-mode="indeterminate"
            ></md-progress-spinner>
          </div>

          <md-button
            class="md-simple md-success md-lg"
            v-else
            v-on:click="login"
            >Войти</md-button
          >
          <div align="center">
            <a href="#/recover">забыл пароль?</a>
          </div>
        </div>
      </pattern-login-card>
    </div>
  </div>
</template>
<script>
import { PatternLoginCard } from "@/pattern/components";
//import app_menuItems from "@/app/app_menuItems.js";
import { patternItems } from "@/pattern/pattern_menuItems.js";
import { patternDirs } from "@/pattern/pattern_menuItems.js";

// import { ajax } from "@/pattern/pattern_ajax.js";

let check_roles = (item, roles, result) => {
  let __match = false;
  item.roles.forEach((__role) => {
    if (roles.filter((r) => r == __role).length > 0) {
      __match = true;
    }
  });
  if (__match) {
    result.push(item);
  }

  return __match;
};

let calcMenuItems = (roles) => {
  let __newMenu = [];

  patternItems.forEach((__item) => {
    check_roles(__item, roles, __newMenu);
  });

  return __newMenu;
};

let calcMenuDirs = (roles) => {
  patternDirs.forEach((__dir) => {
    let __newDirItemsArray = [];
    __dir.items.forEach((__item) => {
      check_roles(__item, roles, __newDirItemsArray);
    });
    __dir.items = __newDirItemsArray;
  });

  return patternDirs;
};

let initLogin = (component, r) => {
  let __menuItems = {
    dirs: calcMenuDirs(r.userData.roles),
    items: calcMenuItems(r.userData.roles),
  };

  localStorage.setItem("userData", JSON.stringify(r.userData));
  localStorage.setItem("menuItems", JSON.stringify(__menuItems));
  localStorage.setItem("frontConfig", JSON.stringify(r.frontConfig));
  component.$store.commit("updateUserData", r.userData);
  component.$store.commit("updateFrontConfig", r.frontConfig);
  component.$store.commit("updateMenuItems", __menuItems);
  component.$router.push("/dashboard");
};

export default {
  components: {
    PatternLoginCard,
  },
  data() {
    return {
      email: "",
      password: "",
      isSending: false,
      isNotMountedYet: true,
    };
  },
  mounted() {
    // для визуального эффекта
    this.isNotMountedYet = false;

    let userData = localStorage.getItem("userData");
    if (userData) {
      this.isSending = true;
      this.ajax.checkToken(
        this,
        { token: JSON.parse(userData).token },
        (r) => {
          if (r.status == "ok") {
            initLogin(this, r);
          } else {
            localStorage.removeItem("userData");
            this.$notify({
              message:
                `<h3>Ошибка ${r?.errorCode}!</h3>` +
                `<p>${r?.errorMessage}.</p>`,
              icon: "add_alert",
              horizontalAlign: "center",
              verticalAlign: "top",
              type: "warning",
            });
          }
          this.isSending = false;
        },
        () => {
          this.isSending = false;
        }
      );
    }
  },

  methods: {
    login() {
      if (!(this.email || this.password)) {
        this.$notify({
          message: "<h3>Укажите e-mail и пароль!</h3>",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return;
      }

      this.isSending = true;
      this.ajax.login(
        this,
        { email: this.email, password: this.password },
        (r) => {
          if (r.status == "ok") {
            initLogin(this, r);
          } else {
            this.$notify({
              message:
                `<h3>Ошибка ${r?.errorCode}!</h3>` +
                `<p>${r?.errorMessage}.</p>`,
              icon: "add_alert",
              horizontalAlign: "center",
              verticalAlign: "top",
              type: "warning",
            });
          }
          this.isSending = false;
        },
        (err) => {
          this.isSending = false;
        }
      );
    },
  },
};
</script>

<style></style>
