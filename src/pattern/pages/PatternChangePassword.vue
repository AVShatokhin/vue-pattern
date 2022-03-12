<template>
  <div class="md-layout">
    <div class="md-layout-item md-small-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>lock</md-icon>
          </div>
          <h4 class="title">Введите пароль</h4>
        </md-card-header>

        <md-card-content>
          <md-field>
            <label>Старый пароль</label>
            <md-input v-model="oldPassword" type="password" value=""></md-input>
          </md-field>

          <md-field>
            <label>Новый пароль</label>
            <md-input v-model="newPassword" type="password"></md-input>
          </md-field>

          <md-field>
            <label>Подтверждение нового пароля</label>
            <md-input v-model="newPasswordConfirm" type="password"></md-input>
          </md-field>
        </md-card-content>

        <md-card-actions md-alignment="left">
          <md-button class="md-success" @click="changePassword"
            >Сохранить</md-button
          >
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>
<script>
import { ajax } from "@/pattern/scripts/pattern_ajax.js";

export default {
  components: {},
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    };
  },
  methods: {
    changePassword() {
      if (this.newPassword != this.newPasswordConfirm) {
        // console.log("Новый пароль не совпадает с подтверждением пароля");
        this.$notify({
          message: `<h3>Новый пароль не совпадает с подтверждением пароля!</h3>`,
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return;
      }

      if (this.newPassword.length < 6) {
        // console.log("Слишком короткий пароль");
        this.$notify({
          message: `<h3>Слишком короткий пароль!</h3>`,
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return;
      }

      ajax.changePassword(
        this,
        { oldPassword: this.oldPassword, newPassword: this.newPassword },
        (r) => {
          if (r.status == "ok") {
            this.$notify({
              message: `<h3>Пароль изменён!</h3>`,
              icon: "add_alert",
              horizontalAlign: "center",
              verticalAlign: "top",
              type: "success",
            });
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
        },
        (err) => {}
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}

.md-inline-checkboxes {
  display: inline-flex;

  .md-checkbox {
    margin-top: 15px !important;
  }
}

.md-checkbox,
.md-radio {
  margin-top: 15px;
  margin-bottom: 0.5rem;
}

.md-checkbox,
.md-radio {
  display: flex;
}

.md-radio .md-radio-container {
  margin-left: 5px;
  position: relative;
  left: -3px;
}

.md-form-label + .md-layout-item .md-checkbox:not(:first-child),
.md-form-label + .md-layout-item + .md-layout-item .md-radio:not(:first-child),
.md-form-label + .md-layout-item .md-radio {
  margin-top: 0;
}

.form-control-static {
  margin-top: 6px;
}
</style>
