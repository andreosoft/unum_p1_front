<template>
  <div class="loader">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style scoped>
.loader {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
