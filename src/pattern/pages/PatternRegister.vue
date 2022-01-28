<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <div align="center" v-if="isRegistered">
        <md-button href="/#/login/" class="md-success md-round mt-4"
          >Вернуться на главную</md-button
        >
      </div>

      <pattern-signup-card v-else>
        <h2 class="title text-center" slot="title">Регистрация</h2>
        <div
          class="
            md-layout-item md-size-50 md-medium-size-50 md-small-size-100
            ml-auto
          "
          slot="content-left"
        >
          <div
            class="info info-horizontal"
            v-for="item in contentLeft"
            :key="item.title"
          >
            <div :class="`icon ${item.colorIcon}`">
              <md-icon>{{ item.icon }}</md-icon>
            </div>
            <div class="description">
              <h4 class="info-title">{{ item.title }}</h4>
              <p class="description">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="
            md-layout-item md-size-50 md-medium-size-50 md-small-size-100
            mr-auto
          "
          slot="content-right"
        >
          <md-field class="md-form-group">
            <md-icon>face</md-icon>
            <label>Имя...</label>
            <md-input v-model="name" type="text"></md-input>
          </md-field>

          <md-field class="md-form-group">
            <md-icon>email</md-icon>
            <label>Email...</label>
            <md-input v-model="email" type="text"></md-input>
          </md-field>

          <md-field class="md-form-group">
            <md-icon>lock_outline</md-icon>
            <label>Пароль...</label>
            <md-input v-model="password" type="password"></md-input>
          </md-field>
        </div>
        <div slot="footer">
          <div align="center" v-if="isRegistering">
            <md-progress-spinner
              :md-diameter="62"
              :md-stroke="10"
              md-mode="indeterminate"
            ></md-progress-spinner>
          </div>

          <md-button
            href
            v-else
            class="md-success md-round mt-4"
            v-on:click="register"
            >Зарегистрировать меня</md-button
          >
          <div align="center">
            <a href="#/recover">забыл пароль?</a>
          </div>
        </div>
      </pattern-signup-card>
    </div>
  </div>
</template>
<script>
import { PatternSignupCard } from "@/pattern/components";
import { ajax } from "@/pattern/scripts/ajax.js";

export default {
  components: {
    PatternSignupCard,
  },
  data() {
    return {
      isRegistering: false,
      isRegistered: false,
      name: null,
      email: null,
      password: null,
      contentLeft: [
        {
          colorIcon: "icon-info",
          icon: "group",
          title: "Важная информация",
          description:
            "После регистрации обратитесь к администратору для получения соответствующих прав доступа к системе",
        },
      ],
    };
  },
  methods: {
    async register() {
      this.isRegistering = true;
      await ajax.register(
        this,
        {
          email: this.email,
          password: this.password,
          extended: { name: this.name },
        },
        (r) => {
          this.isRegistering = false;
          if (r.status === "ok") {
            this.isRegistered = true;
            this.$notify({
              message:
                "<h3>Регистрация выполнена!</h3>" +
                "<p>На Ваш e-mail направлена ссылка, перейдите по ней для подтверждения почтового ящика.</p>",
              icon: "add_alert",
              horizontalAlign: "center",
              verticalAlign: "top",
              type: "success",
            });
          } else {
            if (r.errorCode === "ER_DUP_ENTRY") {
              this.$notify({
                message:
                  "<h3>Пользователь уже зарегистрирован!</h3>" +
                  '<p>Воспользуйтесь ссылкой <a href="./#/recover/">"восстановление пароля"</a>.</p>',
                icon: "add_alert",
                horizontalAlign: "center",
                verticalAlign: "top",
                type: "warning",
              });
            }
          }
        },
        (err) => {
          this.$notify({
            message: `<h3>Ошибка ${err.code}!</h3>` + `<p>${err.message}.</p>`,
            icon: "add_alert",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "warning",
          });
          this.isRegistering = false;
          console.log(err);
        }
      );
    },
  },
};
</script>
<style></style>
