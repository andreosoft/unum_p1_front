<template>
  <div
    class="rounded-circle d-flex justify-content-center align-items-center"
    style="width: 48px; height: 48px;"
    :style="`background-color: ${action.bgColor && action.bgColor};`"
  >
    <v-icon :color="action.color && action.color">{{
      action.icon && action.icon
    }}</v-icon>
  </div>
</template>

<script>
export default {
  name: "ChatWindowToolbarActions",
  props: {
    action: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style></style>
