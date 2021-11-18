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
const { mapState: State_auth } = createNamespacedHelpers("auth");
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
    ...State_auth(['userProfile']),
    getChatTitle() {
      if (this.selectedChat?.type !== 1) {
        return this.selectedChat?.name;
      }
      for (let i = 0; i < this.selectedChat?.participants.length; i++) {
        if (this.selectedChat.participants[i].user_id !== this.userProfile.user_id) {
          if (!this.selectedChat.participants[i].user_name) {
            return "имя не указано";
          }
          return this.selectedChat.participants[i].user_name;
        }
      }
    },
    getChatAvatar() {
      if (this.selectedChat?.type !== 1) {
        return;
      }
      for (let i = 0; i < this.selectedChat?.participants.length; i++) {
        if (
          this.selectedChat?.participants[i].user_id !== this.userProfile.user_id
        ) {
          if (!this.selectedChat?.participants[i].user_image) {
            return "/images/patient-placeholder.jpeg";
          }
          return `${this.imageSrc(
            this.selectedChat?.participants[i].user_image
          )}?width=100&height=100`;
        }
      }
    },
  },
};
</script>
