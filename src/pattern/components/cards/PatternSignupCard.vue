<template>
  <md-card class="md-card-signup">
    <slot name="title"></slot>

    <md-card-content>
      <div class="md-layout">
        <slot name="content-left"></slot>
        <slot name="content-right"></slot>
      </div>
    </md-card-content>

    <md-card-actions style="justify-content: center">
      <slot name="footer"></slot>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: "pattern-signup-card",
};
</script>

<style lang="css"></style>
