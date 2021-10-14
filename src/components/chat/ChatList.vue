<template>
  <div>
    <ChatItem
      v-for="(item, index) in chats"
      :key="index"
      :active="activeItem === item.id"
      @click.native="chooseChat(item.id)"
      :group="item.type === 2"
      :name="
        item.type === 1 && item.user_name
          ? item.user_name
          : item.type !== 1 && item.name
          ? item.name
          : 'Unknown contact'
      "
      :avatarUrl="
        (item.user_image &&
          `${imageSrc(item.user_image)}?width=100&height=100`) ||
          '/images/patient-placeholder.jpeg'
      "
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers("chats");
const { mapGetters: Getters_doctors } = createNamespacedHelpers("doctors");
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
  },
};
</script>

<style></style>
