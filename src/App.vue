<template>
  <v-app>
    <v-main>
      <router-view />
      <div class="alerts">
        <v-alert v-for="alert in alerts" :key="alert.id" :type="alert.type">
          {{ alert.text }}
        </v-alert>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("alerts");

import MainLayout from "./components/layout/MainLayout";
export default {
  name: "App",
  components: {
    MainLayout,
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapState(["alerts"]),
  },
};
</script>
<style lang="scss" scoped>
.form__title11 {
  font-size: 36px;
  font-weight: bold;
}
.alerts {
  position: fixed;
  right: 10px;
  bottom: 0;
  z-index: 99999;
}
</style>
<style lang="scss" >
@import url("https://fonts.googleapis.com/css2?family=Exo+2:wght@500;600&display=swap");

.alerts__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
<style lang="scss">
.justify-content-between {
  justify-content: space-between;
}
.justify-content-center {
  justify-content: center;
}
.align-items-center {
  align-items: center;
}
.align-items-start {
  align-items: start !important;
}
.align-items-end {
  align-items: flex-end !important;
}
.align-self-center {
  align-items: center !important;
}
.align-self-start {
  align-self: start !important;
}
.align-self-end {
  align-self: flex-end;
}
.cursor-pointer {
  cursor: pointer;
}
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute !important;
}
</style>
