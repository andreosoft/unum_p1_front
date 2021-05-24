<template>
  <v-card
    class="doctor__card"
    :height="300"
    :elevation="hover ? 5 : 2"
  >
    <v-avatar tile class="doctor__card-avatar">
      <img
        :src="
          doctor.photo && doctor.photo.includes('http')
            ? doctor.photo
            : '/images/doctor-placeholder.jpeg'
        "
      />
    </v-avatar>
    <v-card-text>
      {{ doctor.name }}
    </v-card-text>
  </v-card>
</template>

<script>
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
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables";
.doctor__card {
  cursor: pointer;
  width: 100%;
  &-avatar {
    width: 100% !important;
    height: 200px !important;
    // @media #{map-get($display-breakpoints, 'sm-and-down')} {
    //   height: 150px !important;
    // }
  }
}
</style>
