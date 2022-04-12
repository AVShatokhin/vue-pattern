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
      <div align="center" v-if="isSent">
        <md-button href="/#/login/" class="md-success md-round mt-4"
          >Вернуться на главную</md-button
        >
      </div>

      <pattern-login-card v-else header-color="green">
        <h4 slot="title" class="title">Восстановление пароля</h4>
        <p slot="description" class="description">введите новый пароль</p>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>lock_outline</md-icon>
          <label>Новый пароль...</label>
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
            v-else
            class="md-simple md-success md-lg"
            v-on:click="setNewPassword"
            >Установить</md-button
          >
        </div>
      </pattern-login-card>
    </div>
  </div>
</template>
<script>
import { PatternLoginCard } from "@/pattern/components";
//import { ajax } from "@/pattern/pattern_ajax.js";

export default {
  components: {
    PatternLoginCard,
  },
  data() {
    return {
      isSending: false,
      isSent: false,
      password: "",
    };
  },
  methods: {
    setNewPassword() {
      if (this.$route.params?.token == null) return;
      if (this.password == "") {
        this.$notify({
          message: "<h3>Укажите новый пароль!</h3>",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return;
      }

      this.isSending = true;

      this.ajax.setPassword(
        this,
        { password: this.password, token: this.$route.params.token },
        (r) => {
          if (r?.status == "ok") {
            this.$notify({
              message: "<h3>Новый пароль установлен!</h3>",
              icon: "add_alert",
              horizontalAlign: "center",
              verticalAlign: "top",
              type: "success",
            });
            this.isSent = true;
          } else {
            this.$notify({
              message:
                `<h3>Ошибка ${r.errorCode}!</h3>` + `<p>${r.errorMessage}</p>`,
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
