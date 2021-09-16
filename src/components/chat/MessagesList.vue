<template>
  <div class="d-flex flex-column position-relative">
    <Message
      v-for="(item, index) in messages"
      :key="item.id"
      :messageObj="item"
      :class="{ me: item.me, 'mb-5': index !== messages.length - 1 }"
      class="messages__item"
    >
      <template #user-image>
        <v-avatar class="align-self-end mr-2">
          <v-img
            v-if="item.showAvatar"
            style="background-color: purple;"
          ></v-img>
        </v-avatar>
      </template>
    </Message>
  </div>
</template>

<script>
import Message from "./Message.vue";
export default {
  name: "MessagesList",
  components: {
    Message,
  },
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.messages__item {
  max-width: 80%;
}
.me {
  align-self: flex-end;
}
</style>
