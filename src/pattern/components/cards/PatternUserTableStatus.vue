<template>
  <div class="md-layout" style="justify-content: left">
    <div v-if="confirmed_" class="md-layout-item md-size-100">
      <badge type="success">E-mail подтверждён</badge>
    </div>
    <div v-if="!confirmed_" class="md-layout-item md-size-100">
      <badge type="warning">E-mail не подтверждён</badge>
    </div>
    <div v-if="blocked_" class="md-layout-item md-size-100">
      <badge type="warning">Аккаунт заблокирован</badge>
    </div>
    <div v-if="!blocked_" class="md-layout-item md-size-100">
      <badge type="success">Аккаунт не заблокирован</badge>
    </div>

    <div class="my-row-first md-layout-item md-size-100">
      <div>Количество сеансов:</div>
      <div style="padding-left: 10px">
        <b>{{ session_count }}</b>
      </div>
    </div>
    <div class="my-row-last md-layout-item md-size-100">
      <div>UID:</div>
      <div style="padding-left: 10px">
        <b>{{ uid }}</b>
      </div>
    </div>
    <md-button
      @click.native="changeAcount()"
      class="md-info"
      style="width: 230px; height: 41px"
    >
      <span class="material-icons">manage_accounts</span>
      Управление доступом
    </md-button>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Управление доступом</md-dialog-title>

      <div class="my-dialog-content">
        <!-- Установить новый пароль -->
        <md-button
          class="md-info"
          @click="
            newPassword = '123456';
            newPasswordConfirm = '123456';
            showDialogChangePassword = true;
            showDialog = false;
          "
        >
          <span class="material-icons"> gpp_good </span>Установить новый
          пароль</md-button
        >

        <!-- Закрыть все сеансы -->
        <md-button
          class="md-warning"
          @click="showConfirmCloseAllSessions = true"
        >
          <span class="material-icons"> remove_circle </span>
          Закрыть все сеансы
          <md-dialog-confirm
            :md-active.sync="showConfirmCloseAllSessions"
            md-title="Закрыть все сеансы пользователя?"
            md-content="Эта опреация не приводит к блокировке пользователя.<br>После закрытия всех сеансов пользователя, ему потребуется заново авторизоваться."
            md-confirm-text="Выполнить операцию"
            md-cancel-text="Отмена"
            @md-cancel="showDialog = false"
            @md-confirm="adminCloseAllSessionsByUID"
          />
        </md-button>

        <!-- Запросить подтверждение e-mail -->
        <md-button
          class="md-warning"
          @click="showConfirmSendEmailConfirmRequest = true"
        >
          <span class="material-icons"> contact_mail </span>
          Запросить подтверждение e-mail
          <md-dialog-confirm
            :md-active.sync="showConfirmSendEmailConfirmRequest"
            md-title="Запросить подтверждение e-mail?"
            md-content="Для подтверждения почтового ящика пользователю будет выслана ссылка, по которой ему потребуется перейти.<br>
            Эта операция не приведёт блокировке пользователя. Если у него открыт сеанс, то сеанс продолжится до выхода из системы.<br>
            Но пока он не подтвердит свой почтовый ящик, он не сможет авторизоваться в системе снова."
            md-confirm-text="Выполнить операцию"
            md-cancel-text="Отмена"
            @md-cancel="showDialog = false"
            @md-confirm="adminRequestConfirmation()"
          />
        </md-button>

        <!-- Подтвердить e-mail вручную -->
        <md-button
          v-if="!confirmed_"
          class="md-success"
          @click="showConfirmManualEmailConfirm = true"
        >
          <span class="material-icons"> mark_email_read </span>Подтвердить
          e-mail вручную
          <md-dialog-confirm
            :md-active.sync="showConfirmManualEmailConfirm"
            md-title="Подтвердить e-mail вручную?"
            md-content="Эта операция приведёт тому, что пользователь, не подтвердивший свой адрес электронной почты, сможет иметь доступ к системе."
            md-confirm-text="Выполнить операцию"
            md-cancel-text="Отмена"
            @md-cancel="showDialog = false"
            @md-confirm="adminConfirmEmail()"
          />
        </md-button>

        <!-- Заблокировать аккаунт -->
        <md-button
          v-if="!blocked_"
          class="md-danger"
          @click="showConfirmBlock = true"
        >
          <span class="material-icons"> block </span>Заблокировать аккаунт
          <md-dialog-confirm
            :md-active.sync="showConfirmBlock"
            md-title="Заблокировать аккаунт?"
            md-content="Эта операция приведёт к тому, что все сеансы пользователя будут закрыты и пользователь не сможет авторизоваться в системе."
            md-confirm-text="Выполнить операцию"
            md-cancel-text="Закрыть"
            @md-cancel="showDialog = false"
            @md-confirm="adminBlockUser()"
          />
        </md-button>

        <!-- Разблокировать аккаунт -->
        <md-button
          v-if="blocked_"
          class="md-success"
          @click="showConfirmUnBlock = true"
        >
          <span class="material-icons"> settings_backup_restore </span>
          Разблокировать аккаунт
          <md-dialog-confirm
            :md-active.sync="showConfirmUnBlock"
            md-title="Разблокировать аккаунт?"
            md-content="Эта операция приведёт к тому, что пользователь вновь сможет авторизовываться и работать в системе."
            md-confirm-text="Выполнить операцию"
            md-cancel-text="Закрыть"
            @md-cancel="showDialog = false"
            @md-confirm="adminUnBlockUser()"
          />
        </md-button>

        <!-- Использовать аккаунт -->
        <md-button
          v-if="!blocked_"
          class="md-info"
          @click="showConfirmUnBlock = true"
        >
          <span class="material-icons"> account_circle </span>
          Использовать аккаунт
          <md-dialog-confirm
            :md-active.sync="showConfirmUnBlock"
            md-title="Использовать этот аккаунт?"
            md-content="Эта операция приведёт к тому, что текущий пользователь утеряет авторизацию и зайдёт в систему с правами данного пользователя."
            md-confirm-text="Выполнить операцию"
            md-cancel-text="Закрыть"
            @md-cancel="showDialog = false"
            @md-confirm="adminUseAccount()"
          />
        </md-button>
      </div>

      <md-dialog-actions>
        <md-button class="md-default" @click="showDialog = false"
          >Закрыть</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="showDialogChangePassword">
      <md-dialog-title>Смена пароля</md-dialog-title>
      <div class="my-dialog-content">
        <md-field>
          <label>Новый пароль</label>
          <md-input v-model="newPassword" type="password" value=""></md-input>
        </md-field>
        <md-field>
          <label>Подтверждение пароля</label>
          <md-input
            v-model="newPasswordConfirm"
            type="password"
            value=""
          ></md-input>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-default" @click="showDialogChangePassword = false"
          >Закрыть</md-button
        >
        <md-button class="md-primary" @click="adminUpdateUserPassword()"
          >Установить новый пароль</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { Badge } from "@/components/";

export default {
  components: {
    Badge,
  },
  name: "pattern-user-table-status",
  props: {
    uid: {
      type: Number,
      default: null,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    session_count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showDialog: false,
      showDialogChangePassword: false,
      showConfirmCloseAllSessions: false,
      showConfirmSendEmailConfirmRequest: false,
      showConfirmManualEmailConfirm: false,
      showConfirmBlock: false,
      showConfirmUnBlock: false,
      blocked_: false,
      confirmed_: false,
      newPassword: "",
      newPasswordConfirm: "",
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
    changeAcount() {
      this.showDialog = true;
    },
    adminUpdateUserPassword() {
      if (this.newPasswordConfirm != this.newPassword) {
        this.showErrorNotify({
          errorCode: "Ошибка!",
          errorMessage: "Пароли не совпадают",
        });
        return;
      }
      this.showDialogChangePassword = false;

      this.ajax.adminUpdateUserPassword(
        this,
        {
          password: this.newPassword,
          uid: this.uid,
        },
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify({ title: "ОК", message: "Пароль изменён!" });
          } else if (r.status == "failed") {
            this.showErrorNotify(r);
          }
        },
        (err) => {}
      );
    },
    adminConfirmEmail() {
      this.showDialog = false;

      this.ajax.adminConfirmEmail(
        this,
        {
          uid: this.uid,
        },
        (r) => {
          if (r.status == "ok") {
            this.confirmed_ = true;
            this.$emit("emailConfirmedByAdmin");
            this.showSuccessNotify({
              title: "ОК",
              message: "Адрес электронной почты подтверждён!",
            });
          } else if (r.status == "failed") {
            this.showErrorNotify(r);
          }
        },
        (err) => {}
      );
    },
    adminRequestConfirmation() {
      this.showDialog = false;

      this.ajax.adminRequestConfirmation(
        this,
        {
          uid: this.uid,
        },
        (r) => {
          if (r.status == "ok") {
            this.confirmed_ = false;
            this.$emit("emailConfirmationSent");
            this.showSuccessNotify({
              title: "ОК",
              message:
                "Отправлен запрос подтверждения адреса электронной почты!",
            });
          } else if (r.status == "failed") {
            this.showErrorNotify(r);
          }
        },
        (err) => {}
      );
    },
    adminBlockUser() {
      this.showDialog = false;

      this.adminCloseAllSessionsByUID();

      this.ajax.adminBlockUser(
        this,
        {
          uid: this.uid,
        },
        (r) => {
          if (r.status == "ok") {
            this.blocked_ = true;
            this.$emit("userBlocked");
            this.showSuccessNotify({
              title: "ОК",
              message: "Пользователь заблокирован!",
            });
          } else if (r.status == "failed") {
            this.showErrorNotify(r);
          }
        },
        (err) => {}
      );
    },
    adminUnBlockUser() {
      this.showDialog = false;

      this.ajax.adminUnBlockUser(
        this,
        {
          uid: this.uid,
        },
        (r) => {
          if (r.status == "ok") {
            this.blocked_ = false;
            this.$emit("userUnBlocked");
            this.showSuccessNotify({
              title: "ОК",
              message: "Пользователь разблокирован!",
            });
          } else if (r.status == "failed") {
            this.showErrorNotify(r);
          }
        },
        (err) => {}
      );
    },
    adminCloseAllSessionsByUID() {
      this.showDialog = false;

      this.ajax.adminCloseAllSessionsByUID(
        this,
        {
          uid: this.uid,
        },
        (r) => {
          if (r.status == "ok") {
            this.$emit("newSessionsCount", {
              sessionsCount: r.sessionsCount,
              uid: this.uid,
            });
            this.showSuccessNotify({
              title: "ОК",
              message: "Сеансы закрыты!",
            });
          } else if (r.status == "failed") {
            this.showErrorNotify(r);
          }
        },
        (err) => {}
      );
    },
    adminUseAccount() {
      this.ajax.useAccount(
        this,
        {
          changeToUID: this.uid,
        },
        (r) => {
          if (r.status == "ok") {
            localStorage.removeItem("userData");
            let userData = { token: r.token };
            localStorage.setItem("userData", JSON.stringify(userData));
            this.$router.push("/login");
          } else {
            this.showErrorNotify(r);
          }
        },
        () => {}
      );
    },
  },
  mounted() {
    this.blocked_ = this.blocked;
    this.confirmed_ = this.confirmed;
  },
  watch: {},
  computed: {},
};
</script>

<style lang="css" scoped>
.my-row-first {
  display: flex;
  flex-direction: row;
  padding-top: 15px;
  padding-bottom: 5px;
}
.my-row-last {
  display: flex;
  flex-direction: row;
  padding-top: 5px;
  padding-bottom: 15px;
}

.my-button {
  margin: 0px;
  padding: 0px;
  height: 41px;
}

.badge {
  margin: 1px;
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

.account_blocked {
  color: red;
}

.account_active {
  color: green;
}

.material-icons {
  margin-right: 15px;
}
</style>
