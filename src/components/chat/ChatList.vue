<template>
  <div>
    <ChatItem
      v-for="(item, index) in chats"
      :key="index"
      :active="activeItem === item.id"
      @click.native="chooseChat(item.id)"
      :group="item.type === 2"
      :name="getChatTitle(item)"
      :avatarUrl="getChatAvatar(item)"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers("chats");
const { mapGetters: Getters_doctors } = createNamespacedHelpers("doctors");
const { mapState: State_auth } = createNamespacedHelpers("auth");
import ChatItem from "./ChatItem.vue";
export default {
  name: "ChatList",
  components: {
    ChatItem,
  },
  data() {
    return {
      activeItem: 1,
    };
  },
  computed: {
    ...mapState(["chats"]),
    ...mapGetters(["getSelectChatById"]),
    ...Getters_doctors(["imageSrc"]),
    ...State_auth(['userProfile'])
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler(id) {
        if (id) {
          const numID = Number(id);
          this.chooseChat(numID);
        }
      },
    },
    chats: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val.length) {
          const selectedChat = this.getSelectChatById(
            Number(this.$route.params.id)
          );
          this.setSelectedChat(selectedChat);
        }
      },
    },
  },
  methods: {
    ...mapActions(["setSelectedChat"]),
    chooseChat(id) {
      const selectedChat = this.getSelectChatById(id);
      this.setSelectedChat(selectedChat);
      this.activeItem = id;
      this.$router.push({ name: "Chat", params: { id } }).catch(() => {});
    },
    getChatTitle(item) {
      if (item?.type !== 1) {
        return item?.name;
      }
      for (let i = 0; i < item?.participants.length; i++) {
        if (item.participants[i].user_id !== this.userProfile.user_id) {
          if (!item.participants[i].user_name) {
            return "имя не указано";
          }
          return item.participants[i].user_name;
        }
      }
    },
    getChatAvatar(item) {
      if (item?.type !== 1) {
        return;
      }
      for (let i = 0; i < item?.participants.length; i++) {
        if (
          item?.participants[i].user_id !== this.userProfile.user_id
        ) {
          if (!item?.participants[i].user_image) {
            return "/images/patient-placeholder.jpeg";
          }
          return `${this.imageSrc(
            item?.participants[i].user_image
          )}?width=100&height=100`;
        }
      }
    },
  },
};
</script>

<style></style>
