<template>
  <div class="main-layout__wrap">
    <v-app-bar :color="'lighten-2'" id="app-bar" fixed app flat height="60">
      <v-btn
        v-show="$vuetify.breakpoint.mdAndUp"
        class="mr-3"
        elevation="0"
        fab
        small
        @click="$router.go(-1)"
      >
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-btn
        v-show="$vuetify.breakpoint.smAndDown"
        class="mr-3"
        elevation="0"
        fab
        small
        @click="drawer = true"
      >
        <v-icon> mdi-arrow-left </v-icon>
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
      <v-list class="d-flex pa-4">
        <v-list-item-avatar color="rgb(80, 49, 101)">
          <v-icon>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ userProfile && userProfile.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ userProfile && userProfile.login }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list>

      <v-divider></v-divider>

      <v-list class="py-5">
        <v-list-item
          v-for="(link, index) in navLinks"
          :key="index"
          link
          :to="{ name: link.name }"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-btn color="primary" @click="logout">
              log out
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("auth");
const { mapActions: Action_doctors } = createNamespacedHelpers("doctors");
const { mapActions: Action_events } = createNamespacedHelpers("events");
const { mapActions: Acition_clinicalRecords } = createNamespacedHelpers(
  "clinicalRecords"
);
export default {
  data() {
    return {
      drawer: true,
      navLinks: [
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
          name: "My Doctors",
          title: "Мои врачи",
          icon: "mdi-doctor",
        },
        {
          name: "All Doctors",
          title: "Все врачи",
          icon: "mdi-account-group",
        },
      ],
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    ...mapActions(["logout"]),
    ...Action_doctors(["fetchDoctors"]),
    ...Action_events(["fetchEvents"]),
    ...Acition_clinicalRecords(["fetchClinicalRecords"]),
  },
  created() {
    this.fetchEvents();
    this.fetchDoctors();
    this.fetchClinicalRecords();
  },
};
</script>

<style lang="scss" scoped>
.main-layout__wrap {
  height: 100%;
  position: relative;
}
</style>
