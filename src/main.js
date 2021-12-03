import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import { messaging, getToken } from './firebase'
import './libs/registerComponents';
import './libs/translations';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import './registerServiceWorker'
import { createNamespacedHelpers } from "vuex";
const {
  mapState: State_chats,
  mapActions: Actions_chats,
} = createNamespacedHelpers("chats");
const { mapActions: Actions_alerts } = createNamespacedHelpers("alerts");
const { mapState: State_auth } = createNamespacedHelpers("auth");


Vue.use(Vuelidate)
Vue.component('vue-phone-number-input', VuePhoneNumberInput);

Vue.config.productionTip = false

new Vue({
  data() {
    return {
      ws: null,
      chatsNotification: false
    }
  },
  computed: {
    ...State_auth(["userProfile"]),
    ...State_chats(["chats"]),
  },
  watch: {
    '$route'(val) {
      if (val.name === 'Chats') {
        this.chatsNotification = false
      }
    }
  },
  methods: {
    ...Actions_chats(["addMessage", "fetchCurrentUserMessages", "fetchChats"]),
    ...Actions_alerts(["addAlert"]),
    webSocket() {
      let usertoken = JSON.parse(localStorage.getItem("neomedy")).token;
      let socketUrl = "wss://api.neomedy.com/messages";
      if ("WebSocket" in window) {
        this.ws = new WebSocket(socketUrl);
        let timer;
        this.ws.onopen = () => {
          console.log('socket connected')
          this.ws.send(JSON.stringify({ e: "auth", d: usertoken }));
          getToken(messaging, { vapidKey: "BLPcjvIYgCpYwdhZe-b9toT-BvwulE48yPwF2IbzEh0PzPoX3pU_KAurTKA76XOqtdrXP3eJAxssbgRH-Fgv9Vc" }).then((currentToken) => {
            if (currentToken) {
                console.log('currentToken ', currentToken);
                this.ws.send(
                  JSON.stringify({
                    e: "register_firebase",
                    params: {
                      token: currentToken,
                    },
                  })
                );
                // window.localStorage.setItem('FCM token', currentToken)
                // Send the token to your server and update the UI if necessary
                // ...
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
            }
          }).catch((err) => {
              console.log('An error occurred while retrieving token. ', err);
              // ...
          });
          timer = setInterval(() => {
            let d = { e: "h" };
            this.ws.send(JSON.stringify(d));
          }, 30000);
        };
        this.ws.onmessage = (evt) => {
          const parsedMessage = JSON.parse(evt.data);
          const currentChatId = this.$route.params.id;
          if (parsedMessage.event && parsedMessage.event === "new_message") {
            parsedMessage.attachments = JSON.parse(parsedMessage.attachments);
            if (!currentChatId && this.$route.name !== "Chats") {
              this.chatsNotification = true
            }

            this.addMessage(parsedMessage);
            if (currentChatId) {
              this.fetchCurrentUserMessages(currentChatId);
            }
            return;
          }
          if (parsedMessage.event && parsedMessage.event === "new_chat") {
            const ifCurrentUserMemberOfNewChat = parsedMessage.participants.findIndex(
              (item) => item.user_id === this.userProfile.id
            );

            if (ifCurrentUserMemberOfNewChat) {
              this.fetchChats();
            }
          }

          if (parsedMessage.event && parsedMessage.event === "remove_user_from_chat") {
            this.fetchChats()
            if (Number(parsedMessage.chat_id) === Number(currentChatId)) {
              this.$router.push({ name: "Chats" })
            }
          }
        };
        this.ws.onclose = () => {
          console.log("Connection is closed...");
          clearInterval(timer);
          setTimeout(this.webSocket, 1000);
        };
        this.ws.onerror = (err) => {
          console.error(
            "Socket encountered error: ",
            err.message,
            "Closing socket"
          );
          this.ws.close();
        };
      } else {
        console.log("WebSocket NOT supported by your Browser!");
      }
    },
  },
  created() {
    this.webSocket()
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
