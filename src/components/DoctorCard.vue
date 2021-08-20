<template>
  <v-card class="doctor__card" :elevation="hover ? 5 : 2">
    <v-responsive :aspect-ratio="4 / 3">
      <v-avatar tile class="doctor__card-avatar">
        <img
          :src="
            doctor.photo
              ? `${getPhotoURL(this.doctor.photo)}?width=250&height=250`
              : '/images/doctor-placeholder.jpeg'
          "
        />
      </v-avatar>
    </v-responsive>
    <v-card-text>
      {{ doctor.name }}
    </v-card-text>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("doctors");
export default {
  name: "DoctorCard",
  props: {
    doctor: {
      type: Object,
      default: () => {},
    },
    hover: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["getPhotoURL"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables";
.doctor__card {
  cursor: pointer;
  width: 100%;
  &-avatar {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
