<template>
  <div>
    <ChatItem
      v-for="(item, index) in chatItems"
      :key="index"
      :active="activeItem === item.id"
      @click.native="chooseChat(item.id)"
      :notifications="item.notification"
    />
  </div>
</template>

<script>
import ChatItem from "./ChatItem.vue";
export default {
  name: "ChatList",
  components: {
    ChatItem,
  },
  data() {
    return {
      activeItem: 1,
      chatItems: [
        {
          notification: 1,
          id: 212313,
        },
        {
          notification: 323,
          id: 124123,
        },
        {
          notification: 4,
          id: 4123513,
        },
        {
          notification: 2,
          id: 1241323,
        },
        {
          notification: 312312,
          id: 1515123,
        },
      ],
    };
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler(id) {
        if (id) {
          this.chooseChat(Number(id));
        }
      },
    },
  },
  methods: {
    chooseChat(id) {
      this.activeItem = id;
      this.$router.push({ name: "Chat", params: { id } }).catch(() => {});
      setTimeout(() => {
        this.chatItems.map((chat) => {
          if (chat.id === id) {
            chat.notification = 0;
          }
        });
      }, 1000);
    },
  },
};
</script>

<style></style>
