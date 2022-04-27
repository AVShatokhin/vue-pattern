<template>
  <div class="md-layout">
    <div v-for="role in roles_" :key="role" class="md-layout-item md-size-100">
      {{ patternRoles[role] }}
      <badge type="info">{{ role }}</badge>
    </div>
    <div style="height: 41px; margin-top: 20px">
      <md-button
        class="md-primary"
        style="width: 230px; height: 100%"
        @click="showDialog = true"
      >
        <span class="material-icons">switch_account</span>
        Управление ролями
      </md-button>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Список ролей пользователя</md-dialog-title>
        <div class="my-dialog-content">
          <md-switch
            v-for="role in Object.keys(patternRoles)"
            :key="role"
            class="md-primary"
            v-model="rolesDialog"
            :value="role"
            ><div class="div__roles">
              {{ patternRoles[role] }}
              <badge type="info">{{ role }}</badge>
            </div></md-switch
          >
        </div>
        <md-dialog-actions>
          <md-button class="md-default" @click="showDialog = false"
            >Закрыть</md-button
          >
          <md-button class="md-primary" @click="applyNewRoles"
            >Принять изменения</md-button
          >
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>

<script>
import { Badge } from "@/components/";
import pattern_roles from "@/pattern/pattern_roles.js";

export default {
  components: {
    Badge,
  },
  name: "pattern-user-table-role",
  props: {
    uid: {
      type: Number,
      default: null,
    },
    roles: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      showDialog: false,
      roles_: [],
      rolesDialog: [],
      patternRoles: pattern_roles,
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

    applyNewRoles() {
      this.showDialog = false;
      this.ajax.applyNewRoles(
        this,
        { roles: this.rolesDialog, uid: this.uid },
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify({
              title: "ОК",
              message:
                "Новые роли пользователя применены! Вступят в действие при его последующей авторизации.",
            });
            this.roles_ = this.rolesDialog;
            this.$emit("applyNewRoles", {
              roles: this.rolesDialog,
              uid: this.uid,
            });
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {}
      );
    },
  },
  mounted() {
    // console.log(this.patternRolesArray);
    this.rolesDialog = Array.from(this.roles);
    this.roles_ = Array.from(this.roles);
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

.badge {
  margin: 1px;
}

.material-icons {
  margin-right: 15px;
}

.my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
}

.div__roles {
  color: brown;
  margin: 0px;
  padding: 0px;
}

.md-switch {
  margin: 5px;
}
</style>
