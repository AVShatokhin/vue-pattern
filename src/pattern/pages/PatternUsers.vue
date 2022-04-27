<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>supervisor_account</md-icon>
          </div>
          <h4 class="title">Пользователи</h4>
        </md-card-header>

        <div class="my-row" md-alignment="space-between">
          <div>
            <p class="card-category">
              Показано с {{ from + 1 }} по {{ to }} из {{ queryLength }} записей
            </p>
          </div>
          <pagination
            class="pagination-no-border pagination-success"
            v-model="currentPage"
            :per-page="perPage"
            :total="queryLength"
          >
          </pagination>
        </div>

        <md-card-content>
          <md-table
            :value="myModel"
            class="paginated-table table-striped table-hover"
          >
            <md-table-toolbar>
              <md-field>
                <label for="pages">Количество на странице</label>
                <md-select v-model="perPage" name="pages">
                  <md-option
                    v-for="item in perPageOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                    {{ item }}
                  </md-option>
                </md-select>
              </md-field>
              <div class="div__toolbar_right">
                <md-field>
                  <md-input
                    @keyup.enter="searchRequest()"
                    type="search"
                    class="mb-3"
                    clearable
                    style="width: 200px"
                    placeholder="Поиск пользователя"
                    v-model="searchQuery"
                  >
                  </md-input>
                </md-field>

                <md-button
                  style="width: 230px; height: 41px; margin-right: 15px"
                  class="md-success button__add_user"
                  @click="showUserAdd()"
                >
                  <span class="material-icons"> person_add </span>
                  Добавить пользователя
                </md-button>
              </div>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Данные">
                <pattern-user-table-list-item
                  @userInfoChanged="userInfoChanged"
                  :uid="item.uid"
                  :name="item.extended.name"
                  :secondName="item.extended.secondName"
                  :position="item.extended.position"
                  :phone="item.extended.phone"
                  :email="item.email"
                  :searchQuery="searchQuery"
                >
                </pattern-user-table-list-item>
              </md-table-cell>
              <md-table-cell md-label="Статус">
                <pattern-user-table-status
                  @userBlocked="changeBlocked(item.uid, true)"
                  @userUnBlocked="changeBlocked(item.uid, false)"
                  @emailConfirmationSent="changeConfirmed(item.uid, false)"
                  @emailConfirmedByAdmin="changeConfirmed(item.uid, true)"
                  @newSessionsCount="newSessionsCount"
                  :uid="item.uid"
                  :confirmed="item.confirmed"
                  :blocked="item.blocked"
                  :session_count="item.sessions"
                ></pattern-user-table-status>
              </md-table-cell>
              <md-table-cell md-label="Роли">
                <pattern-user-table-roles
                  @applyNewRoles="applyNewRoles"
                  :uid="item.uid"
                  :roles="item.roles"
                ></pattern-user-table-roles>
              </md-table-cell>
              <md-table-cell md-label="">
                <md-button
                  @click.native="showConfirmUserDelete = true"
                  style="width: 230px; height: 41px; margin-right: 15px"
                  class="md-danger"
                >
                  <span class="material-icons"> no_accounts </span>
                  Удалить пользователя
                  <md-dialog-confirm
                    :md-active.sync="showConfirmUserDelete"
                    md-title="Удалить пользователя?"
                    md-content="Эта операция приведёт к полному
                  удалению пользователя.<br />Отменить операцию нельзя."
                    md-confirm-text="Удалить"
                    md-cancel-text="Отмена"
                    @md-cancel="showConfirmUserDelete = false"
                    @md-confirm="adminDeleteUser(item.uid)"
                  />
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
          <div class="footer-table md-table">
            <table>
              <tfoot>
                <tr>
                  <th
                    v-for="item in footerTable"
                    :key="item.name"
                    class="md-table-head"
                  >
                    <div class="md-table-head-container md-ripple md-disabled">
                      <div class="md-table-head-label">
                        {{ item }}
                      </div>
                    </div>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </md-card-content>

        <md-card-actions md-alignment="space-between">
          <div>
            <p class="card-category">
              Показано с {{ from + 1 }} по {{ to }} из {{ queryLength }} записей
            </p>
          </div>
          <pagination
            class="pagination-no-border pagination-success"
            v-model="currentPage"
            :per-page="perPage"
            :total="queryLength"
          >
          </pagination>
        </md-card-actions>
      </md-card>
    </div>

    <md-dialog :md-active.sync="showDialogUserAdd">
      <md-dialog-title>Добавление пользователя</md-dialog-title>
      <div class="div__my-dialog-content">
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
          <md-input clearable v-model="email__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Телефон</label>
          <md-input v-model="phone__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Пароль</label>
          <md-input v-model="password__" type="password"></md-input>
        </md-field>
        <md-field>
          <label>Подтверждение пароль</label>
          <md-input v-model="passwordConfirm__" type="password"></md-input>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-default" @click="hideUserAdd()">Закрыть</md-button>
        <md-button class="md-primary" @click="adminAddUser()"
          >Добавить пользователя</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { Pagination } from "@/components";
import PatternUserTableListItem from "../components/cards/PatternUserTableListItem.vue";
import PatternUserTableStatus from "../components/cards/PatternUserTableStatus.vue";
import PatternUserTableRoles from "../components/cards/PatternUserTableRoles.vue";

export default {
  components: {
    Pagination,
    PatternUserTableListItem,
    PatternUserTableStatus,
    PatternUserTableRoles,
  },
  computed: {
    to() {
      let highBound = this.from + this.perPage;
      if (this.queryLength < highBound) {
        highBound = this.queryLength;
      }
      return highBound;
    },
    from() {
      return this.perPage * (this.currentPage - 1);
    },
  },
  data() {
    return {
      showConfirmUserDelete: false,
      showDialogUserAdd: false,
      name__: "",
      secondName__: "",
      email__: "",
      phone__: "",
      position__: "",
      password__: "123456",
      passwordConfirm__: "123456",

      // модель данных
      usersModel: {},
      myModel: [],
      queryLength: 0,
      // модель данных

      // pagination params
      currentPage: 1,
      perPage: 10,
      perPageOptions: [5, 10, 25, 50],
      // pagination params

      footerTable: ["Данные", "Статус", "Роли", ""],

      searchQuery: "",
    };
  },
  methods: {
    recomputeModel() {
      let __temp = [];
      for (let uid in this.usersModel) {
        __temp.push(this.usersModel[uid]);
      }
      return __temp;
    },
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
    showUserAdd() {
      this.showDialogUserAdd = true;
    },
    hideUserAdd() {
      this.showDialogUserAdd = false;
    },
    adminAddUser() {
      if (this.password__ != this.passwordConfirm__) {
        this.showErrorNotify({
          errorCode: "PASSWORD_ERROR",
          errorMessage: "Пароли не совпадают",
        });
        return;
      }
      this.hideUserAdd();

      this.ajax.adminAddUser(
        this,
        {
          email: this.email__,
          password: this.password__,
          extended: {
            name: this.name__,
            secondName: this.secondName__,
            phone: this.phone__,
            position: this.position__,
          },
        },
        (r) => {
          if (r.status == "ok") {
            this.loadUsers();
            this.showSuccessNotify({
              title: "OK",
              message: "Пользователь добавлен",
            });
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    loadUsers() {
      this.ajax.getUsers(
        this,
        {
          perPage: this.perPage,
          currentPage: this.currentPage - 1,
          searchQuery: this.searchQuery,
        },
        (r) => {
          if (r.status == "ok") {
            this.usersModel = r.data.items;
            this.queryLength = r.data.queryLength;
            this.myModel = this.recomputeModel();
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    adminDeleteUser(uid) {
      this.ajax.adminDeleteUser(
        this,
        { uid },
        (r) => {
          if (r.status == "ok") {
            this.loadUsers();
            this.showSuccessNotify({
              title: "OK",
              message: "Пользователь удалён!",
            });
          } else if (r.status == "failed") {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    userInfoChanged(data) {
      this.usersModel[data.uid].extended = data.extended;
      this.usersModel[data.uid].email = data.email;
      this.myModel = this.recomputeModel();
    },
    changeBlocked(uid, state) {
      this.usersModel[uid].blocked = state;
      this.myModel = this.recomputeModel();
    },
    changeConfirmed(uid, state) {
      this.usersModel[uid].confirmed = state;
      this.myModel = this.recomputeModel();
    },
    newSessionsCount(data) {
      this.usersModel[data.uid].sessions = data.sessionsCount;
      this.myModel = this.recomputeModel();
    },
    applyNewRoles(data) {
      this.usersModel[data.uid].roles = data.roles;
      this.myModel = this.recomputeModel();
    },
    searchRequest() {
      if ((this.searchQuery.length >= 3) | (this.searchQuery.length == 0)) {
        this.loadUsers();
      }
    },
  },
  mounted() {
    this.loadUsers();
  },

  watch: {
    perPage() {
      this.loadUsers();
    },
    currentPage() {
      this.loadUsers();
    },
  },
};
</script>

<style lang="css" scoped>
.md-card .md-card-actions {
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
}

.my-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
}

.material-icons {
  margin-right: 15px;
}

.div__toolbar_right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.button__add_user {
  margin-left: 15px;
}

.div__my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
}
</style>
