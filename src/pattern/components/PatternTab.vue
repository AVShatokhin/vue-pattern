<template>
  <div>
    <div class="my-row">
      <md-button
        v-for="(name, index) in tabNames"
        :key="index"
        @click="changePanel(index)"
        :class="buttonClass(index)"
        >{{ name }}</md-button
      >
    </div>
    <slot name="header"></slot>
    <div
      v-for="(name, index) in tabNames"
      :key="index"
      :class="isActive(index)"
    >
      <slot :name="getSlotName(index)">{{ name }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "pattern-tab",
  props: {
    tabNames: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    getSlotName(index) {
      return `tab-${index}`;
    },
    changePanel(index) {
      this.activeIndex = index;
    },
    isActive(index) {
      if (this.activeIndex == index) {
        return "is-active";
      } else {
        return "is-not-active";
      }
    },
    buttonClass(index) {
      if (this.activeIndex == index) {
        return "md-success";
      } else {
        return "md-default md-simple";
      }
    },
  },
};
</script>

<style lang="css">
.is-active {
  display: block;
}

.is-not-active {
  display: none;
}
</style>
