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

        <md-card-content>
          <md-table
            :value="myModel"
            class="paginated-table table-striped table-hover"
          >
            <md-table-toolbar>
              <md-field>
                <label for="pages">Количество на странице</label>
                <md-select v-model="pagination.perPage" name="pages">
                  <md-option
                    v-for="item in pagination.perPageOptions"
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
                >
                </pattern-user-table-list-item>
              </md-table-cell>
              <md-table-cell md-label="Статус">
                <pattern-user-table-status
                  @userBlocked="changeBlocked(item.uid, true)"
                  @userUnBlocked="changeBlocked(item.uid, false)"
                  @emailConfirmationSent="changeConfirmed(item.uid, false)"
                  @emailConfirmedByAdmin="changeConfirmed(item.uid, true)"
                  :uid="item.uid"
                  :confirmed="item.confirmed"
                  :blocked="item.blocked"
                  :session_count="item.sessions"
                ></pattern-user-table-status>
              </md-table-cell>
              <md-table-cell md-label="Роли">
                <pattern-user-table-roles
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
                    md-content="Эта опреация приведёт к полному
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
      </md-card>

      <!-- <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>supervisor_account</md-icon>
          </div>
          <h4 class="title">Пользователи</h4>
        </md-card-header>
        <md-card-content>
          <md-table
            :value="queriedData"
            :md-sort.sync="currentSort"
            :md-sort-order.sync="currentSortOrder"
            :md-sort-fn="customSort"
            class="paginated-table table-striped table-hover"
          >
            <md-table-toolbar>
              <md-field>
                <label for="pages">Per page</label>
                <md-select v-model="pagination.perPage" name="pages">
                  <md-option
                    v-for="item in pagination.perPageOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                    {{ item }}
                  </md-option>
                </md-select>
              </md-field>

              <md-field>
                <md-input
                  type="search"
                  class="mb-3"
                  clearable
                  style="width: 200px"
                  placeholder="Search records"
                  v-model="searchQuery"
                >
                </md-input>
              </md-field>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Name" md-sort-by="name">{{
                item.name
              }}</md-table-cell>
              <md-table-cell md-label="Email" md-sort-by="email">{{
                item.email
              }}</md-table-cell>
              <md-table-cell md-label="Age">{{ item.age }}</md-table-cell>
              <md-table-cell md-label="Salary">{{ item.salary }}</md-table-cell>
              <md-table-cell md-label="Actions">
                <md-button
                  class="md-just-icon md-info md-simple"
                  @click.native="handleLike(item)"
                >
                  <md-icon>favorite</md-icon>
                </md-button>
                <md-button
                  class="md-just-icon md-warning md-simple"
                  @click.native="handleEdit(item)"
                >
                  <md-icon>dvr</md-icon>
                </md-button>
                <md-button
                  class="md-just-icon md-danger md-simple"
                  @click.native="handleDelete(item)"
                >
                  <md-icon>close</md-icon>
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
          <div class="">
            <p class="card-category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
            </p>
          </div>
          <pagination
            class="pagination-no-border pagination-success"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
          >
          </pagination>
        </md-card-actions>
      </md-card> -->
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
// import { Pagination } from "@/components";
import users from "./users";
import Fuse from "fuse.js";
import Swal from "sweetalert2";

//import { PatternUserTableListItem } from "@/pattern/components/cards/PatternUserTableListItem.vue";
import PatternUserTableListItem from "../components/cards/PatternUserTableListItem.vue";
import PatternUserTableStatus from "../components/cards/PatternUserTableStatus.vue";
import PatternUserTableRoles from "../components/cards/PatternUserTableRoles.vue";

export default {
  components: {
    // Pagination,
    PatternUserTableListItem,
    PatternUserTableStatus,
    PatternUserTableRoles,
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
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
      usersModel: {},
      myModel: [],

      // ниже не моё
      currentSort: "name",
      currentSortOrder: "asc",
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      footerTable: ["Данные", "Статус", "Роли", ""],
      searchQuery: "",
      propsToSearch: ["name", "email", "age"],
      tableData: users,
      searchedData: [],
      fuseSearch: null,
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
        {},
        (r) => {
          if (r.status == "ok") {
            this.usersModel = r.data;
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
            delete this.usersModel[uid];
            this.myModel = this.recomputeModel();
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

    // не моё
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },
    handleLike(item) {
      Swal.fire({
        title: `You liked ${item.name}`,
        buttonsStyling: false,
        type: "success",
        confirmButtonClass: "md-button md-success",
      });
    },
    handleEdit(item) {
      Swal.fire({
        title: `You want to edit ${item.name}`,
        buttonsStyling: false,
        confirmButtonClass: "md-button md-info",
      });
    },
    handleDelete(item) {
      Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this!`,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "md-button md-success btn-fill",
        cancelButtonClass: "md-button md-danger btn-fill",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.deleteRow(item);
          Swal.fire({
            title: "Deleted!",
            text: `You deleted ${item.name}`,
            type: "success",
            confirmButtonClass: "md-button md-success btn-fill",
            buttonsStyling: false,
          });
        }
      });
    },
    deleteRow(item) {
      let indexToDelete = this.tableData.findIndex(
        (tableRow) => tableRow.id === item.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    },
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["name", "email"],
      threshold: 0.3,
    });

    // выше не моё
    this.loadUsers();
  },

  // ниже не моё
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    },
  },
  computed: {},
};
</script>

<style lang="css" scoped>
.md-card .md-card-actions {
  border: 0;
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
