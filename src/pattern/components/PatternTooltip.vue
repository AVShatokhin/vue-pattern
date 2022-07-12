<template>
  <div class="tooltip">
    <span class="tooltiptext">{{ text }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "pattern-tooltip",
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    getClass: function (headerColor) {
      return "md-card-header-" + headerColor + "";
    },
  },
};
</script>

<style lang="css">
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
  margin-left: -100px;
  margin-top: -50px;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
