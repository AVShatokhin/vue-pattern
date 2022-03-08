<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" id="ava" :src="$store.getters.ava_url" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">{{ userData.role }}</h6>

      <md-button class="md-info">
        <i class="material-icons">photo_camera_front</i
        ><label>
          <input
            id="avaFile"
            type="file"
            form="upload_ava"
            name="new_ava"
            @change="handleFileUpload"
            hidden
          />
          Загрузить
        </label>
      </md-button>

      <md-button class="md-success" :disabled="avaNotChanged" @click="sendAva">
        <i class="material-icons">check_circle</i>Сохранить</md-button
      >

      <md-button
        class="md-danger"
        :disabled="$store.getters.no_ava"
        @click="deleteAva"
      >
        <i class="material-icons">delete</i>Удалить</md-button
      >
    </md-card-content>
  </md-card>
</template>
<script>
import { ajax } from "@/pattern/scripts/pattern_ajax.js";

export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: "./pattern_img/noava.png",
    },
  },
  data() {
    return {
      avaNotChanged: true,
    };
  },
  computed: {
    userData() {
      return this.$store.state.userData;
    },
  },
  methods: {
    deleteAva: function () {
      ajax.deleteAva(
        this,
        {},
        (r) => {
          if (r.status == "ok") {
            localStorage.setItem("userData", JSON.stringify(r.userData));
            this.$store.commit("deleteAva");
            this.avaNotChanged = true;
            this.$notify({
              message: `<h3>Фото удалено!</h3>`,
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
    sendAva: function () {
      var formData = new FormData();
      var imagefile = document.querySelector("#avaFile");
      formData.append("new_ava", imagefile.files[0]);
      ajax.uploadAva(
        this,
        formData,
        (r) => {
          if (r.status == "ok") {
            localStorage.setItem("userData", JSON.stringify(r.userData));
            this.avaNotChanged = true;
            this.$notify({
              message: `<h3>Фото сохранено!</h3>`,
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
    handleFileUpload: function (event) {
      var reader = new FileReader();
      reader.onloadend = () => {
        this.$store.commit("updateAva", reader.result);
        this.avaNotChanged = false;
      };
      reader.readAsDataURL(event.target.files[0]);
    },
  },
};
</script>
<style></style>
