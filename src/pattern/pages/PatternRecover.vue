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
        <p slot="description" class="description">введите E-mail</p>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>email</md-icon>
          <label>Email...</label>
          <md-input v-model="email" type="email"></md-input>
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
            v-on:click="recover"
            >Восстановить</md-button
          >
        </div>
      </pattern-login-card>
    </div>
  </div>
</template>
<script>
import { PatternLoginCard } from "@/pattern/components";
// import { ajax } from "@/pattern/pattern_ajax.js";

export default {
  components: {
    PatternLoginCard,
  },
  data() {
    return {
      isSending: false,
      isSent: false,
      email: "",
    };
  },
  methods: {
    recover() {
      if (this.email == "") {
        this.$notify({
          message: "<h3>Укажите e-mail!</h3>",
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return;
      }

      this.isSending = true;
      this.ajax.recover(
        this,
        { email: this.email },
        (r) => {
          if (r?.status == "ok") {
            this.$notify({
              message:
                "<h3>Запрос направлен!</h3>" +
                "<p>Если указанный e-mail соответствует какому-либо аккаунту, то на него будет направлена ссылка для восстановления пароля.</p>",
              icon: "add_alert",
              horizontalAlign: "center",
              verticalAlign: "top",
              type: "success",
            });
          } else {
            this.$notify({
              message: "<h3>Ошибка!</h3>" + `<p>${r.errorCode}</p>`,
              icon: "add_alert",
              horizontalAlign: "center",
              verticalAlign: "top",
              type: "warning",
            });
          }
          this.isSending = false;
          this.isSent = true;
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
