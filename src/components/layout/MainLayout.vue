<template>
  <div class="main-layout__wrap">
    <v-app-bar
      v-if="
        $vuetify.breakpoint.smAndDown ? !$route.meta.hideMobileTopNavbar : true
      "
      :color="'lighten-2'"
      id="app-bar"
      fixed
      app
      flat
      height="60"
    >
      <v-btn class="mr-3" elevation="0" fab small @click="drawer = !drawer">
        <v-icon> mdi-menu </v-icon>
      </v-btn>
      <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      left
      mobile-breakpoint="960"
      color="rgb(4, 49, 78)"
      dark
      app
      width="260"
    >
      <v-list class="d-flex pa-2">
        <v-list-item
          class="pa-0 rounded-lg"
          style="overflow: hidden"
          link
          :to="{ name: 'Profile' }"
        >
          <v-list-item-avatar color="rgb(80, 49, 101)" class="mx-2">
            <v-img :src="getPhotoURL(userProfile.photo)"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ userName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ userEmail }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list class="py-5">
        <v-list-item
          v-for="(link, index) in navLinks"
          :key="index"
          link
          :to="{ name: link.name }"
        >
          <v-list-item-icon class="ml-0">
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-badge v-if="link.notification">
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-badge>
          <v-list-item-title v-else>{{ link.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-btn color="primary" @click="logout">{{ $t("Sign out") }}</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view />
  </div>
</template>

<script>
import { createNamespacedHelpers, mapState } from "vuex";
const { mapActions } = createNamespacedHelpers("auth");
const { mapActions: Action_doctors, mapGetters: Getters_doctors } =
  createNamespacedHelpers("doctors");
const { mapActions: Action_events } = createNamespacedHelpers("events");
const { mapActions: Action_chats } = createNamespacedHelpers("chats");
const { mapActions: Acition_clinicalRecords } =
  createNamespacedHelpers("clinicalRecords");
export default {
  data() {
    return {
      drawer: true,
      userName: "",
      userEmail: "",
    };
  },
  computed: {
    ...mapState("auth", ["userProfile"]),
    ...Getters_doctors(["getPhotoURL"]),
    navLinks() {
      return [
        {
          name: "Home",
          title: "Главная",
          icon: "mdi-home",
        },
        {
          name: "Outpatient Card",
          title: "Амбулаторная карта",
          icon: "mdi-chart-bar",
        },
        {
          name: "Chats",
          title: "Чаты",
          icon: "mdi-message-text",
          notification: this.$root.chatsNotification,
        },
        {
          name: "My Doctors",
          title: "Мои врачи",
          icon: "mdi-doctor",
        },
        {
          name: "All Doctors",
          title: "Все врачи",
          icon: "mdi-account-group",
        },
      ];
    },
  },
  methods: {
    ...mapActions(["logout"]),
    ...Action_doctors(["fetchDoctors", "fetchMyDoctors"]),
    ...Action_events(["fetchEvents"]),
    ...Acition_clinicalRecords(["fetchClinicalRecords"]),
    ...Action_chats(["fetchChats"]),
  },
  created() {
    this.fetchEvents();
    this.fetchDoctors();
    this.fetchMyDoctors();
    this.fetchClinicalRecords();
    this.fetchChats();
  },
  watch: {
    userProfile: {
      immediate: true,
      handler(val) {
        if (val) {
          this.userName = val.name;
          this.userEmail = val.email;
        }
      },
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.main-layout__wrap {
  height: 100%;
  position: relative;
}
</style>
