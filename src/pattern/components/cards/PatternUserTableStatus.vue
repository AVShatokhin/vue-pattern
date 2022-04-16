<template>
  <div class="md-layout" style="justify-content: left">
    <div v-if="confirmed_" class="md-layout-item md-size-100">
      <badge type="success">E-mail подтверждён</badge>
      <div v-if="blocked_">
        <badge type="warning">Аккаунт заблокирован</badge>
      </div>
      <div v-if="!blocked_">
        <badge type="success">Аккаунт активен</badge>
      </div>
      <div class="my-row">
        <div>Количество сеансов:</div>
        <div style="padding-left: 10px">
          <b>{{ session_count }}</b>
        </div>
      </div>
    </div>
    <div v-if="!confirmed_">
      <badge style="margin-bottom: 15px" type="warning"
        >E-mail не подтверждён</badge
      >
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
            newPassword = '';
            newPasswordConfirm = '';
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
            md-confirm-text="ОК"
            md-cancel-text="Отмена"
            @md-cancel="showDialog = false"
            @md-confirm="showDialog = false"
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
            md-content="Эта операция приведёт к блокировке пользователя.<br>
            Для подтверждения почтового ящика пользователю будет выслана ссылка, по которой ему потребуется перейти.<br>
            Пока он не подтвердит свой почтовый ящик, он не сможет авторизоваться в системе."
            md-confirm-text="ОК"
            md-cancel-text="Отмена"
            @md-cancel="showDialog = false"
            @md-confirm="
              showDialog = false;
              confirmed_ = false;
            "
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
            md-confirm-text="ОК"
            md-cancel-text="Отмена"
            @md-cancel="showDialog = false"
            @md-confirm="
              showDialog = false;
              confirmed_ = true;
            "
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
            md-confirm-text="ОК"
            md-cancel-text="Отмена"
            @md-cancel="showDialog = false"
            @md-confirm="
              showDialog = false;
              blocked_ = true;
            "
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
            md-confirm-text="ОК"
            md-cancel-text="Отмена"
            @md-cancel="showDialog = false"
            @md-confirm="
              showDialog = false;
              blocked_ = false;
            "
          />
        </md-button>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
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
        <md-button class="md-info" @click="showDialogChangePassword = false"
          >Установить новый пароль</md-button
        >
        <md-button class="md-primary" @click="showDialogChangePassword = false"
          >Закрыть</md-button
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
    changeAcount() {
      this.showDialog = true;
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
.my-row {
  display: flex;
  flex-direction: row;
  padding-top: 15px;
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
