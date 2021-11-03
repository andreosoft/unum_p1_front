<template>
  <div class="d-flex flex-column position-relative">
    <Message
      v-for="(item, index) in messages"
      :key="item.id"
      :me="item.user_id === currentUserId"
      :message="item.message"
      :date="item.createdon"
      :attachments="item.attachments"
      :class="{ 'mb-2': index !== messages.length }"
      class="messages__item"
      :showMsgAuthor="
        item.user_id !== currentUserId &&
          selectedChat &&
          selectedChat.type !== 1
      "
      :msgAuthor="item.user_name"
    >
      <template v-if="item.showDate" #message-date="{ date }">
        <div class="align-self-center my-4">
          <v-chip>{{ date | formatDate }}</v-chip>
        </div>
      </template>
      <template #user-image>
        <v-avatar class="align-self-end mr-2">
          <v-img
            v-if="item.user_id !== currentUserId"
            :src="
              item.user_image
                ? `${imageSrc(item.user_image)}?width=250&height=250`
                : '/images/patient-placeholder.jpeg'
            "
          ></v-img>
        </v-avatar>
      </template>
    </Message>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import dayjs from "dayjs";
const { mapState } = createNamespacedHelpers("auth");
const { mapState: State_chats } = createNamespacedHelpers("chats");
const { mapGetters: Getters_doctors } = createNamespacedHelpers("doctors");
import Message from "./Message.vue";

export default {
  name: "MessagesList",
  components: {
    Message,
  },
  filters: {
    formatDate(v) {
      return dayjs(v).format("YYYY MMM DD");
    },
  },
  computed: {
    ...mapState(["userProfile"]),
    ...State_chats(["messages", "selectedChat"]),
    ...Getters_doctors(["imageSrc"]),
    currentUserId() {
      return this.userProfile && this.userProfile.user_id;
    },
    getSelectedChatImageId() {
      return this.selectedChat && this.selectedChat.user_image;
    },
  },
};
</script>

<style lang="scss" scoped>
.messages__item {
  width: 100%;
}
</style>
