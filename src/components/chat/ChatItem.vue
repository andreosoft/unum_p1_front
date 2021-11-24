<template>
  <div
    class="cursor-pointer position-relative pa-0 d-flex align-items-center chat-item"
    :class="{ active: active }"
  >
    <UserAvatarAndName :name="name" :group="group" :avatarUrl="avatarUrl">
      <template #subtitle>
        <v-list-item-subtitle>
          {{ lastMessage }}
        </v-list-item-subtitle>
      </template>
    </UserAvatarAndName>
  </div>
</template>

<script>
import UserAvatarAndName from "./UserAvatarAndName";
export default {
  name: "ChatItem",
  components: {
    UserAvatarAndName,
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    notifications: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    lastMessage: {
      type: String,
      default: "",
    },
    group: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-item {
  background-color: #f9f8ff;
  width: 100%;
  border-bottom: 1px solid #edecef;
  color: white;
}
.notification {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
}

.active {
  background-color: #4d6d81;
  ::v-deep .v-list-item__title, .v-list-item__subtitle {
    color: #fff !important;
  }
}
</style>
