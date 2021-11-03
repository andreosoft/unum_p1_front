<template>
  <div class="chat-window">
    <div class="chat-window__container">
      <ChatWindowToolbar @click="openCompanionDialog" />
      <div class="chat-window__messages pa-3" ref="container">
        <MessagesList :messages="formattedMessages" class="messages__list" />
      </div>
      <UserInput
        @sendMessage="sendMessage"
        @attachFile="attachFile"
        @chooseEmoji="chooseEmoji"
      />
    </div>
    <v-dialog
      v-model="companionDialog"
      :max-width="580"
      content-class="rounded-0 dialog"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card color="#EEEEEE" tile :min-height="680">
        <CompanionInfo
          @close="companionDialog = false"
          :showPhone="selectedChat && selectedChat.type === 1"
        />
        <CompanionEducation
          v-if="selectedChat && selectedChat.type === 1"
          specialty="специальность врача"
          country="страна врача"
          lang="язык врача"
          uni="универститет врача"
        />

        <CompanionMedia
          :photos="getPhotos"
          :videos="getVideos"
          :files="getFiles"
        />

        <CompanionActions
          @removeChat="removeChat"
          @clearHistory="clearHistory"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import dayjs from "dayjs";
const { mapState, mapActions } = createNamespacedHelpers("chats");
const { mapState: State_auth } = createNamespacedHelpers("auth");
const { mapActions: Actions_alerts } = createNamespacedHelpers("alerts");
import ChatWindowToolbar from "./ChatWindowToolbar";
import MessagesList from "./MessagesList";
import CompanionInfo from "./CompanionInfo";
import CompanionEducation from "./CompanionEducation";
import CompanionMedia from "./CompanionMedia";
import CompanionActions from "./CompanionActions";
import UserInput from "./UserInput";
import ImagePreview from "./ImagePreview";
export default {
  name: "ChatWindow",
  components: {
    ChatWindowToolbar,
    MessagesList,
    CompanionInfo,
    CompanionEducation,
    CompanionMedia,
    CompanionActions,
    UserInput,
    ImagePreview,
  },
  data() {
    return {
      companionDialog: false,
    };
  },
  computed: {
    ...mapState(["messages", "messagesFetched", "selectedChat"]),
    ...State_auth(["userProfile"]),
    formattedMessages() {
      const messages = [...this.messages];
      const result = messages.reduce((prev, item, index, arr) => {
        item.showDate = false;
        // if (arr[index + 1]) {
        //   if (
        //     dayjs(arr[index].createdon).format("YYYY-MM-DD") !==
        //     dayjs(arr[index + 1].createdon).format("YYYY-MM-DD")
        //   ) {
        //     item.showDate = true;
        //   }
        // }
        if (item.user_id !== this.getUserId) {
          item.showAvatar = true;
          if (this.selectedChat && this.selectedChat.type === 1) {
            if (arr[index + 1] && arr[index + 1].user_id !== this.getUserId) {
              arr[index + 1].show = true;
              item.showAvatar = undefined;
              // return;
            }
          }
        }
        prev.push(item);
        return prev;
      }, []);
      return messages;
    },
    getUserId() {
      return this.userProfile && this.userProfile.id;
    },
    getPhotos() {
      const media = [];
      this.messages.map((message) => {
        if (
          message.attachments.length &&
          message.attachments[0].type === "image"
        ) {
          message.attachments[0].value =
            "http://api.neomedy.com/api/image/download/" +
            message.attachments[0].value;
          media.push(message.attachments[0]);
        }
      });
      return media;
    },
    getVideos() {
      const media = [];
      this.messages.map((message) => {
        if (
          message.attachments.length &&
          message.attachments[0].type === "video"
        ) {
          // message.attachments[0].value =
          //   "http://api.neomedy.com/api/file/download/" +
          //   message.attachments[0].value;
          media.push(message.attachments[0]);
        }
      });
      return media;
    },
    getFiles() {
      return this.messages.filter(
        (message) =>
          message.attachments.length && message.attachments[0].type === "file"
      );
    },
    getChatId() {
      return this.selectedChat && this.selectedChat.id;
    },
  },
  methods: {
    ...mapActions([
      "fetchCurrentUserMessages",
      "postMessage",
      "postImage",
      "postFile",
      "deleteChat",
      "clearChatHistory",
    ]),
    ...Actions_alerts(["addAlert"]),
    openCompanionDialog() {
      this.companionDialog = true;
    },
    async sendMessage({ message, file }) {
      let attachments = [];
      if (file) {
        if (file.type.includes("image/")) {
          console.log("image");
          const fileId = await this.postImage(file);
          attachments.push({ type: "image", value: fileId, name: file.name });
        } else if (file.type.includes("video/")) {
          console.log("video");
          const fileId = await this.postFile(file);
          attachments.push({ type: "video", value: fileId, name: file.name });
        } else if (file.type.includes("audio/")) {
          console.log("audio");
          const fileId = await this.postFile(file);
          attachments.push({ type: "audio", value: fileId, name: file.name });
        } else {
          console.log("file");
          const fileId = await this.postFile(file);
          attachments.push({ type: "file", value: fileId, name: file.name });
        }
      }
      const params = {
        chat_id: this.$route.params.id,
        message,
        attachments: JSON.stringify(attachments),
      };
      this.$root.ws.send(
        JSON.stringify({
          e: "send_message",
          params,
        })
      );
      await this.fetchCurrentUserMessages(params.chat_id);
      this.scrollDown();
    },
    attachFile(e) {
      console.log(e);
      console.log("attaching file");
    },
    chooseEmoji() {
      console.log("choosing emoji");
    },
    scrollDown() {
      const content = this.$refs.container;
      content.scrollTop = content.scrollHeight;
    },

    removeChat() {
      this.deleteChat(this.getChatId);
    },
    clearHistory() {
      this.clearChatHistory(this.getChatId);
    },
  },
  async mounted() {
    await this.fetchCurrentUserMessages(this.$route.params.id);
    this.scrollDown();
  },
};
</script>

<style lang="scss" scoped>
.chat-window ::v-deep .v-toolbar__content {
  padding: 0 !important;
}
.chat-window {
  position: absolute;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}
.chat-window__container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.chat-window__messages {
  flex-grow: 1;
  overflow: auto;
  min-height: 0;
}

// .v-list-item:after {
//   content: unset;
// }
</style>
