<template>
  <div class="wrapper" :class="[{ 'nav-open': $sidebar.showSidebar }]">
    <notifications></notifications>
    <side-bar
      :active-color="sidebarBackground"
      :background-image="sidebarBackgroundImage"
      :data-background-color="sidebarBackgroundColor"
      :title="appName"
      :link="appLink"
      :logo="appLogo"
    >
      <user-menu
        :title="userData.extended.name"
        :avatar="$store.getters.ava_url"
      ></user-menu>

      <!-- <mobile-menu></mobile-menu> -->
      <template slot="links">
        <div v-for="dir in $store.getters.menuDirs" :key="dir.name">
          <sidebar-item :link="{ name: dir.name, icon: dir.icon }">
            <sidebar-item
              v-for="item in dir.items"
              :key="item.path"
              :link="{
                name: item.name,
                icon: item.icon,
                path: item.path,
              }"
            >
            </sidebar-item>
          </sidebar-item>
        </div>
        <sidebar-item
          v-for="item in $store.getters.menuItems"
          :key="item.path"
          :link="{
            name: item.name,
            icon: item.icon,
            path: item.path,
          }"
        >
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <div
        :class="{ content: !$route.meta.hideContent }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
    document.getElementsByClassName(className)[0].scrollTop = 0;
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

function reinitScrollbar() {
  let docClasses = document.body.classList;
  let isWindows = navigator.platform.startsWith("Win");
  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    initScrollbar("sidebar");
    initScrollbar("sidebar-wrapper");
    initScrollbar("main-panel");

    docClasses.add("perfect-scrollbar-on");
  } else {
    docClasses.add("perfect-scrollbar-off");
  }
}

import TopNavbar from "@/pattern/components/PatternTopNavBar.vue";
import ContentFooter from "@/app/components/PatternContentFooter.vue";
// import MobileMenu from "@/pattern/components/PatternMobileMenu.vue";
import UserMenu from "@/pattern/components/PatternUserMenu.vue";
import { ZoomCenterTransition } from "vue2-transitions";
//import SideBar from "../../components/SidebarPlugin/SideBar.vue";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    ZoomCenterTransition,
    //MobileMenu
    UserMenu,
    //SideBar,
  },
  data() {
    return {
      sidebarBackgroundColor: "black",
      sidebarBackground: "green",
      sidebarBackgroundImage: "./pattern_img/sidebar.png",
      sidebarMini: true,
      sidebarImg: true,
      // name: "Имя пользователя",
    };
  },
  computed: {
    userData() {
      return this.$store.state.userData;
    },
    appName() {
      return this.appConfig.appName;
    },
    appLink() {
      return this.appConfig.appLink;
    },
    appLogo() {
      return this.appConfig.appLogo;
    },
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },
  },
  updated() {
    reinitScrollbar();
  },
  mounted() {
    reinitScrollbar();
    let userData = JSON.parse(localStorage.getItem("userData"));
    let frontConfig = JSON.parse(localStorage.getItem("frontConfig"));
    let menuItems = JSON.parse(localStorage.getItem("menuItems"));
    this.$store.commit("updateMenuItems", menuItems);
    this.$store.commit("updateUserData", userData);
    this.$store.commit("updateFrontConfig", frontConfig);
  },
  watch: {
    sidebarMini() {
      this.minimizeSidebar();
    },
  },
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}
.main-panel .zoomIn {
  animation-name: zoomIn95;
}
@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}
.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
