<template>
  <v-card
    tile
    style="box-shadow: 0px 4px 8px rgba(186, 186, 186, 0.25);"
    class="mb-3"
  >
    <div class="d-flex justify-content-between">
      <v-card-title>Информация</v-card-title>
      <v-card-actions>
        <!-- <v-icon v-if="showPhone" class="mr-4">mdi-phone</v-icon> -->
        <v-icon @click="$emit('close')">mdi-close</v-icon>
      </v-card-actions>
    </div>
    <v-list-item class="pa-0">
      <UserAvatarAndName
        :avatarSize="65"
        disabled
        :name="getChatTitle"
        :avatarUrl="getChatAvatar"
        @click="$emit('click')"
        :consilium="selectedChat && selectedChat.type === 3"
        :group="selectedChat && selectedChat.type === 2"
      />
    </v-list-item>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("chats");
const { mapGetters: Getters_doctors } = createNamespacedHelpers("doctors");
import UserAvatarAndName from "./UserAvatarAndName";
export default {
  name: "CompanionInfo",
  props: {
    showPhone: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    UserAvatarAndName,
  },
  computed: {
    ...mapState(["selectedChat"]),
    ...Getters_doctors(["imageSrc"]),
    getChatTitle() {
      return (
        (this.selectedChat &&
          this.selectedChat.type === 1 &&
          this.selectedChat.user_name) ||
        (this.selectedChat &&
          this.selectedChat.type !== 1 &&
          this.selectedChat.name) ||
        "Unknown contact"
      );
    },
    getChatAvatar() {
      return (
        (this.selectedChat &&
          this.selectedChat.type === 1 &&
          this.selectedChat.user_image &&
          `${this.imageSrc(
            this.selectedChat.user_image
          )}?width=100&height=100`) ||
        "/images/patient-placeholder.jpeg"
      );
    },
  },
};
</script>
