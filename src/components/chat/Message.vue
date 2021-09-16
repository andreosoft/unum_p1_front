<template>
  <div class="d-flex">
    <slot name="user-image"></slot>
    <!--  -->
    <!-- <span class="mr-2">{{ messageObj.id }}</span> -->
    <!--  -->
    <v-card
      class="pa-3 rounded-br-0 rounded-lg"
      :color="messageObj.me ? '#bed5ec' : ''"
    >
      <v-card-text class="pa-0">
        {{ messageObj.text }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    messageObj: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style></style>
