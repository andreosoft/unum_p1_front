<template>
  <div
    class="cursor-pointer position-relative pa-0 d-flex align-items-center chat-item"
    :class="{ active: active }"
  >
    <UserAvatarAndName>
      <template #subtitle>
        <v-list-item-subtitle
          class="grey--text text-truncate"
          :class="[active ? 'text--lighten-3' : 'text--darken-1']"
        >
          текст последнего сообщенияывфывфывфы
        </v-list-item-subtitle>
      </template>
      <template #badge>
        <div v-if="notifications" class="notifications">
          <v-chip
            class="rounded-xl pa-2"
            small
            :color="active ? 'white' : ''"
            :light="active"
            >{{ notifications }}</v-chip
          >
        </div>
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
  },
  methods: {
    chooseConversation() {
      console.log("choosen");
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
  ::v-deep .v-list-item__title {
    color: #fff;
  }
}
</style>
