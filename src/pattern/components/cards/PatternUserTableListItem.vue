<template>
  <div>
    <div class="my-user-item-container">
      <div class="my-row">
        <div>Имя:</div>
        <div class="tooltip">
          <span class="tooltiptext">Редактировать</span>
          <md-button
            class="md-just-icon md-info md-simple my-button"
            @click="editData()"
          >
            <md-icon>edit</md-icon>
          </md-button>
        </div>
      </div>
      <div>
        <b>{{ secondName_ + " " + name_ }}</b>
      </div>
    </div>

    <div class="my-user-item-container">
      <div class="my-row">
        <div>E-mail:</div>
        <div class="tooltip">
          <span class="tooltiptext">Редактировать</span>
          <md-button
            class="md-just-icon md-info md-simple my-button"
            @click="editData()"
          >
            <md-icon>edit</md-icon>
          </md-button>
        </div>
      </div>
      <div>
        <b>{{ email_ }}</b>
      </div>
    </div>

    <div class="my-user-item-container">
      <div class="my-row">
        <div>Должность:</div>
        <div class="tooltip">
          <span class="tooltiptext">Редактировать</span>
          <md-button
            class="md-just-icon md-info md-simple my-button"
            @click="editData()"
          >
            <md-icon>edit</md-icon>
          </md-button>
        </div>
      </div>
      <div>
        <b>{{ position_ }}</b>
      </div>
    </div>

    <div class="my-user-item-container">
      <div class="my-row">
        <div>Телефон:</div>
        <div class="tooltip">
          <span class="tooltiptext">Редактировать</span>
          <md-button
            class="md-just-icon md-info md-simple my-button"
            @click="editData()"
          >
            <md-icon>edit</md-icon>
          </md-button>
        </div>
      </div>
      <div>
        <b>{{ phone_ }}</b>
      </div>
    </div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Изменение данных пользователя</md-dialog-title>
      <div class="my-dialog-content">
        <md-field>
          <label>Имя</label>
          <md-input v-model="name__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Фамилия</label>
          <md-input v-model="secondName__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Должность</label>
          <md-input v-model="position__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>E-mail</label>
          <md-input v-model="email__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Телефон</label>
          <md-input v-model="phone__" type="text"></md-input>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-default" @click="showDialog = false"
          >Закрыть</md-button
        >
        <md-button class="md-primary" @click="submitChanges()"
          >Принять изменения</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "pattern-user-table-list-item",
  props: {
    uid: {
      type: Number,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    position: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    secondName: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showDialog: false,
      email_: null,
      position_: null,
      name_: null,
      secondName_: null,
      phone_: null,

      email__: null,
      position__: null,
      name__: null,
      secondName__: null,
      phone__: null,
    };
  },
  methods: {
    showErrorNotify(r) {
      this.$notify({
        message: `<h3>${r.errorCode}</h3>` + `<p>${r.errorMessage}</p>`,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: "warning",
      });
    },
    showSuccessNotify(r) {
      this.$notify({
        message: `<h3>${r.title}</h3>` + `<p>${r.message}</p>`,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: "success",
      });
    },
    editData() {
      this.email__ = this.email_;
      this.postion__ = this.position_;
      this.name__ = this.name_;
      this.secondName__ = this.secondName_;
      this.position__ = this.position_;
      this.phone__ = this.phone_;
      this.showDialog = true;
    },
    submitChanges() {
      let data = {
        uid: this.uid,
        email: this.email__,
        extended: {
          name: this.name__,
          position: this.position__,
          phone: this.phone__,
          secondName: this.secondName__,
        },
      };

      this.ajax.adminUpdateUserInfo(
        this,
        data,
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify({
              title: "OK",
              message: "Изменены данные пользователя",
            });
            this.email_ = this.email__;
            this.postion_ = this.position__;
            this.name_ = this.name__;
            this.secondName_ = this.secondName__;
            this.position_ = this.position__;
            this.phone_ = this.phone__;

            this.$emit("userInfoChanged", data);
            this.showDialog = false;
          } else if (r.status == "failed") {
            this.showErrorNotify(r);
          }
        },
        (err) => {}
      );
    },
  },
  mounted() {
    this.email_ = this.email;
    this.postion_ = this.position;
    this.name_ = this.name;
    this.secondName_ = this.secondName;
    this.position_ = this.position;
    this.phone_ = this.phone;
  },
  watch: {},
  computed: {},
};
</script>

<style lang="css" scoped>
.my-row {
  display: flex;
  flex-direction: row;
}

.my-user-item-container {
  margin-top: 15px;
  margin-bottom: 15px;
}

.my-button {
  margin: 0px;
  padding: 0px;
  height: 16px;
}

.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  background-color: rgb(55, 172, 80);
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  width: 120px;
  top: 100%;
  left: 100%;
  margin-left: -60px;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
}
</style>
