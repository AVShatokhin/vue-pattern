<template>
  <form>
    <md-card>
      <md-card-header
        class="md-card-header-icon"
        :class="getClass(headerColor)"
      >
        <div class="card-icon">
          <md-icon>perm_identity</md-icon>
        </div>
        <h4 class="title">
          {{ email }}
        </h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Имя</label>
              <md-input v-model="name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Фамилия</label>
              <md-input v-model="secondName" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Должность</label>
              <md-input v-model="position" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Телефон</label>
              <md-input v-model="phone" type="text"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success mt-4" @click="saveProfile"
              ><i class="material-icons">check_circle</i>Сохранить
              изменения</md-button
            >
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { ajax } from "@/pattern/scripts/pattern_ajax.js";

export default {
  name: "edit-profile-form",
  props: {
    headerColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      name: "",
      email: "",
      secondName: "",
      position: "",
      phone: "",
    };
  },
  mounted() {
    let userData = localStorage.getItem("userData");
    this.name = JSON.parse(userData)?.extended?.name;
    this.secondName = JSON.parse(userData)?.extended?.secondName;
    this.position = JSON.parse(userData)?.extended?.position;
    this.phone = JSON.parse(userData)?.extended?.phone;
    this.email = JSON.parse(userData).email;
  },
  methods: {
    getClass: function (headerColor) {
      return "md-card-header-" + headerColor + "";
    },
    saveProfile: function () {
      ajax.saveProfile(
        this,
        {
          name: this.name,
          secondName: this.secondName,
          position: this.position,
          phone: this.phone,
        },
        (r) => {
          if (r.status == "ok") {
            localStorage.setItem("userData", JSON.stringify(r.userData));
            this.$notify({
              message: `<h3>Настройки сохранены!</h3>`,
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
<style></style>
