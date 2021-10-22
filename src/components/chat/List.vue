<template>
  <div>
    <v-text-field
      prepend-inner-icon="mdi-magnify"
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
import { createNamespacedHelpers } from "vuex";
const { mapState: State_auth } = createNamespacedHelpers("auth");
const { mapActions: Actions_alerts } = createNamespacedHelpers("alerts");
const { mapActions: Actions_chats } = createNamespacedHelpers("chats");
const { mapState: State_doctors } = createNamespacedHelpers("doctors");
import ChatList from "./ChatList.vue";
export default {
  name: "List",
  components: {
    ChatList,
  },
  data() {
    return {
      createGroupChatDialog: false,
      selectedGroupMembers: [],
      groupName: "",
    };
  },
  computed: {
    ...State_doctors(["doctors"]),
    ...State_auth(["userProfile"]),
    getDoctors() {
      return (
        this.doctors &&
        this.doctors.filter((doc) => this.userProfile.id !== doc.user_id)
      );
    },
  },
  methods: {
    ...Actions_alerts(["addAlert"]),
    ...Actions_chats([
      "createNewGroupChat",
      "addUserToGroupChat",
      "fetchChats",
    ]),
    remove(item) {
      this.selectedGroupMembers = this.selectedGroupMembers.filter(
        (id) => id !== item.user_id
      );
    },
  },
};
</script>

<style></style>
