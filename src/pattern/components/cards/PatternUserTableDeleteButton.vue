<template>
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
      @md-confirm="adminDeleteUser()"
    />
  </md-button>
</template>

<script>
export default {
  components: {},
  props: {
    uid: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      showConfirmUserDelete: false,
    };
  },
  methods: {
    adminDeleteUser() {
      this.$emit("adminDeleteUser", {
        uid: this.uid,
      });
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style lang="css" scoped>
/* .my-row {
  display: flex;
  flex-direction: row;
  padding-top: 15px;
  padding-bottom: 15px;
}

.badge {
  margin: 1px;
} */

.material-icons {
  margin-right: 15px;
}

/* .my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
} */

/* .div__roles {
  color: brown;
  margin: 0px;
  padding: 0px;
}

.md-switch {
  margin: 5px;
} */
</style>
