<template>
  <v-card
    tile
    style="box-shadow: 0px 4px 8px rgba(186, 186, 186, 0.25);"
    class="mb-3"
  >
    <div class="d-flex justify-content-between">
      <v-card-title>Информация</v-card-title>
      <v-card-actions>
        <v-icon class="mr-4">mdi-phone</v-icon>
        <v-icon @click="$emit('close')">mdi-close</v-icon>
      </v-card-actions>
    </div>
    <v-list-item class="pa-0">
      <UserAvatarAndName :avatarSize="65" :online="online" disabled>
        <template #subtitle>
          <v-list-item-subtitle :class="[online ? 'online' : 'offline']">
            {{ online ? "Online" : "Offline" }}
          </v-list-item-subtitle>
        </template>
      </UserAvatarAndName>
    </v-list-item>
  </v-card>
</template>

<script>
import UserAvatarAndName from "./UserAvatarAndName";
export default {
  name: "CompanionInfo",
  props: {
    online: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    UserAvatarAndName,
  },
};
</script>

<style lang="scss" scoped>
.online {
  &:before {
    content: "●";
    color: #35d11b;
  }
}
.offline {
  &:before {
    content: "●";
  }
}
</style>
