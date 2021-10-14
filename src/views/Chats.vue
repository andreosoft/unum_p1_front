<template>
  <v-container fluid class="pa-0" style="height: 100%;">
    <v-row
      style="height: 100%; flex-wrap: nowrap;"
      :class="{ desktop: $vuetify.breakpoint.mdAndUp }"
      no-gutters
      class="d-flex"
    >
      <v-col
        class="list"
        cols="12"
        md="4"
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
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables";
.list {
  border-right: 1px solid #edecef;
  overflow-y: scroll;
}
.desktop {
  max-height: calc(100vh - 60px);
}
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
