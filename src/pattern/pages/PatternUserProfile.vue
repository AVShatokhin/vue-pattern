<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form header-color="green"> </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card></user-card>
      </div>
    </div>
  </div>
</template>

<script>
import EditProfileForm from "@/pattern/components/cards/PatternEditProfileForm.vue";
import UserCard from "@/pattern/components/cards/PatternUserCard.vue";

export default {
  components: {
    EditProfileForm,
    UserCard,
  },
};
</script>
<style lang="scss">
.text-right {
  display: flex;
}
</style>
