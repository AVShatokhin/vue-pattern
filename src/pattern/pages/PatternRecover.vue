<template>
  <div class="md-layout text-center">
    <div
      class="
        md-layout-item
        md-size-33
        md-medium-size-50
        md-small-size-70
        md-xsmall-size-100
      "
    >
      <pattern-login-card header-color="green">
        <h4 slot="title" class="title">Восстановление пароля</h4>
        <p slot="description" class="description">введите E-mail</p>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>email</md-icon>
          <label>Email...</label>
          <md-input v-model="email" type="email"></md-input>
        </md-field>
        <div slot="footer">
          <md-button class="md-simple md-success md-lg">Восстановить</md-button>
        </div>
      </pattern-login-card>
    </div>
  </div>
</template>
<script>
import { PatternLoginCard } from "@/pattern/components";
export default {
  components: {
    PatternLoginCard,
  },
  data() {
    return {
      firstname: null,
      email: null,
      password: null,
    };
  },
};
</script>

<style></style>
