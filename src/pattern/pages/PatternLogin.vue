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
        <md-field class="md-form-group" slot="inputs">
          <md-icon>email</md-icon>
          <label>Email...</label>
          <md-input v-model="email" type="email"></md-input>
        </md-field>
        <md-field class="md-form-group" slot="inputs">
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
import { ajax } from "@/pattern/scripts/pattern_ajax.js";

export default {
  components: {
    PatternLoginCard,
  },
  data() {
    return {
      email: "",
      password: "",
      isSending: false,
    };
  },
  mounted() {
    let userData = localStorage.getItem("userData");
    if (userData) {
      this.isSending = true;
      ajax.checkToken(
        this,
        { token: JSON.parse(userData).token },
        (r) => {
          if (r.status == "ok") {
            this.$router.push("/dashboard");
          } else {
            localStorage.removeItem("userData");
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
      ajax.login(
        this,
        { email: this.email, password: this.password },
        (r) => {
          if (r.status == "ok") {
            localStorage.setItem("userData", JSON.stringify(r.userData));
            this.$router.push("dashboard");
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
