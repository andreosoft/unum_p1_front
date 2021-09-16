<template>
  <div class="chat-window">
    <div class="chat-window__container">
      <ChatWindowToolbar @click="openCompanionDialog" :online="online" />
      <div class="chat-window__messages pa-3">
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
        <CompanionInfo @close="companionDialog = false" :online="online" />

        <CompanionEducation />

        <CompanionMedia />

        <CompanionActions />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ChatWindowToolbar from "./ChatWindowToolbar";
import MessagesList from "./MessagesList";
import CompanionInfo from "./CompanionInfo";
import CompanionEducation from "./CompanionEducation";
import CompanionMedia from "./CompanionMedia";
import CompanionActions from "./CompanionActions";
import UserInput from "./UserInput";
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
  },
  data() {
    return {
      companionDialog: false,
      messages: [
        {
          id: 1,
          me: true,
          text:
            "Возлеsd здания МВД неспокойно. Там митинговали с требованием отправить в отставку министра внутренних дел из-за убийства Айзады Канатбековой. Но пришла группа примерно из 50 мужчин и оттеснила протестующих к проспекту Эркиндик. Неизвестные заявили, что против НПО и не хотят политизации этой проблемы.",
        },
        {
          id: 2,
          me: true,
          text:
            "Возле здания МВД неспокойно. Там митинговали с требованием отправить в отставку министра внутренних дел из-за убийства Айзады Канатбековой.",
        },
        {
          id: 3,
          me: false,
          text:
            "Возле здания МВД неспокойно. Там митинговали с требованием отправить в отставку министра внутренних дел из-за убийства Айзады Канатбековой. Но пришла группа примерно из 50 мужчин и оттеснила протестующих к проспекту Эркиндик. Неизвестные заявили, что против НПО и не хотят политизации этой проблемы.",
        },
        {
          id: 5,
          me: false,
          text:
            "Возле здания МВД неспокойно. Там митинговали с требованием отправить в отставку министра внутренних дел из-за убийства Айзады Канатбековой.",
        },
        {
          id: 6,
          me: true,
          text:
            "Возле здания МВД неспокойно. Там митинговали с требованием отправить в отставку министра внутренних дел из-за убийства Айзады Канатбековой.",
        },
        {
          id: 7,
          me: false,
          text:
            "Возле здания МВД неспокойно. Там митинговали с требованием отправить в отставку министра внутренних дел из-за убийства Айзады Канатбековой.",
        },
        {
          id: 8,
          me: true,
          text:
            "Возле здания МВД неспокойно. Там митинговали с требованием отправить в отставку министра внутренних дел из-за убийства Айзады Канатбековой.",
        },
        {
          id: 10,
          me: true,
          text:
            "Возле здания МВД неспокойно. Там митинговали с требованием отправить в отставку министра внутренних дел из-за убийства Айзады Канатбековой.",
        },
        {
          id: 4,
          me: false,
          text:
            "Возле здания МВД неспокойно. Там митинговали с требованием отправить в отставку министра внутренних дел из-за убийства Айзады Канатбековой.",
        },
        {
          id: 9,
          me: false,
          text:
            "Возле здания МВД неспокойно. Там митинговали с требованием отправить в отставку министра внутренних дел из-за убийства Айзады Канатбековой.",
        },
        {
          id: 11,
          me: true,
          text:
            "Возле здания МВД неспокойно. Там митинговали с требованием отправить в отставку министра внутренних дел из-за убийства Айзады Канатбековой.",
        },
        {
          id: 12,
          me: false,
          text:
            "Возле здания МВД неспокойно. Там митинговали с требованием отправить в отставку министра внутренних дел из-за убийства Айзады Канатбековой.",
        },
        {
          id: 13,
          me: false,
          text:
            "Возле здания МВД неспокойно. Там митинговали с требованием отправить в отставку министра внутренних дел из-за убийства Айзады Канатбековой.",
        },
      ],
      online: true,
    };
  },
  computed: {
    formattedMessages() {
      const messages = [...this.messages];
      messages.map((m, index) => {
        if (!m.me) {
          m.showAvatar = messages[index - 1].me !== messages[index].me;
        }
      });
      messages.sort((a, b) => (a.id > b.id ? 1 : -1));
      return messages.reverse();
    },
  },
  methods: {
    clickAppend() {
      console.log("append click");
    },
    openCompanionDialog() {
      this.companionDialog = true;
    },
    sendMessage(message) {
      this.messages.push({
        id: Date.now(),
        me: false,
        text: message,
      });
    },
    attachFile() {
      console.log("attaching file");
    },
    chooseEmoji() {
      console.log("choosing emoji");
    },
  },
  mounted() {
    setInterval(() => {
      this.online = !this.online;
    }, 10000);
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
