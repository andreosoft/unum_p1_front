<template>
  <div>
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      append-icon="mdi-account-plus"
      dense
      solo
      flat
      placeholder="Поиск чатов, групп"
      hide-details
    ></v-text-field>
    <ChatList />
  </div>
</template>

<script>
import ChatList from "./ChatList.vue";
export default {
  name: "List",
  components: {
    ChatList,
  },
};
</script>

<style></style>
