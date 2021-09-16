<template>
  <v-container fluid style="height: 100%;" class="pa-0">
    <v-row style="height: 100%; flex-wrap: nowrap" no-gutters class="d-flex">
      <v-col
        class="list"
        cols="12"
        md="4"
        style="border-right: 1px solid #EDECEF;"
        v-if="
          $vuetify.breakpoint.smAndDown ? !$route.meta.hideMobileList : true
        "
      >
        <transition mode="out-in" name="slide-fade">
          <router-view name="list"></router-view>
        </transition>
      </v-col>
      <v-col
        v-if="$vuetify.breakpoint.smAndDown ? $route.meta.hideMobileList : true"
        cols="12"
        md="8"
        class="position-relative messages"
      >
        <transition mode="out-in" name="slide-fade">
          <router-view :key="$route.fullPath" name="messages"></router-view>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChatList from "./../components/chat/ChatList.vue";
import ChatWindow from "./../components/chat/ChatWindow.vue";
export default {
  name: "Chats",
  components: {
    ChatList,
    ChatWindow,
  },
  mounted() {
    console.group("list");
    console.log(
      this.$vuetify.breakpoint.smAndDown
        ? !this.$route.meta.hideMobileList
        : true
    );
    console.groupEnd();

    console.group("messages");
    console.log(
      this.$vuetify.breakpoint.smAndDown
        ? this.$route.meta.hideMobileList
        : false
    );
    console.groupEnd();
  },
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables";

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.1s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
