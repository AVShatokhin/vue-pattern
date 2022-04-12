<template>
  <div class="user">
    <div class="photo">
      <img :src="avatar" alt="avatar" />
    </div>
    <div class="user-info">
      <a
        data-toggle="collapse"
        :aria-expanded="!isClosed"
        @click.stop="toggleMenu"
        @click.capture="clicked"
      >
        <span>
          <!-- {{ title }} -->
          {{ userName }}
          <b class="caret"></b>
        </span>
      </a>

      <collapse-transition>
        <div v-show="!isClosed">
          <ul class="nav">
            <slot>
              <li>
                <a v-on:click="profile">
                  <span class="sidebar-mini"
                    ><i class="material-icons">manage_accounts</i></span
                  >
                  <span class="sidebar-normal">Профиль</span>
                </a>
              </li>
              <li>
                <a v-on:click="passwordChange">
                  <span class="sidebar-mini"
                    ><i class="material-icons">lock</i></span
                  >
                  <span class="sidebar-normal">Пароль</span>
                </a>
              </li>
              <li>
                <a v-on:click="logout">
                  <span class="sidebar-mini"
                    ><i class="material-icons">logout</i></span
                  >
                  <span class="sidebar-normal">Выход</span>
                </a>
              </li>
            </slot>
          </ul>
        </div>
      </collapse-transition>
    </div>
  </div>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
// import { ajax } from "@/pattern/pattern_ajax.js";

export default {
  components: {
    CollapseTransition,
  },
  props: {
    title: {
      type: String,
      default: "Имя пользователя",
    },
    avatar: {
      type: String,
      default: "./pattern_img/noava.png",
    },
  },
  data() {
    return {
      isClosed: true,
    };
  },
  computed: {
    userName() {
      return this.title || "Имя пользователя";
    },
  },
  methods: {
    profile() {
      if (this.$router.history.current.fullPath != "/profile") {
        this.$router.push("profile");
      }
    },
    passwordChange() {
      if (this.$router.history.current.fullPath != "/passwordChange") {
        this.$router.push("passwordChange");
      }
    },

    logout() {
      this.$router.push("/");
      this.ajax.logout(
        this,
        { token: JSON.parse(localStorage.getItem("userData")).token },
        () => {},
        () => {}
      );
      localStorage.removeItem("userData");
    },
    clicked: function (e) {
      e.preventDefault();
    },
    toggleMenu: function () {
      this.isClosed = !this.isClosed;
    },
  },
};
</script>
<style>
.collapsed {
  transition: opacity 1s;
}
</style>
