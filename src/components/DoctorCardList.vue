<template>
  <v-container fluid>
    <v-row :no-gutters="$vuetify.breakpoint.smAndDown">
      <v-col
        v-for="doctor in doctors"
        :key="doctor.id"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        :class="{
          'pa-1': $vuetify.breakpoint.smAndDown,
          'pa-2': !$vuetify.breakpoint.smAndDown,
        }"
      >
        <v-hover>
          <template v-slot="{ hover }">
            <DoctorCard
              :doctor="doctor"
              :hover="hover"
              @click.native="
                $router.push({
                  name: 'Doctor',
                  params: { slug, id: doctor.id },
                })
              "
            />
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DoctorCard from "./DoctorCard";
export default {
  name: "DoctorCardList",
  components: {
    DoctorCard,
  },
  props: {
    doctors: {
      type: Array,
      default: () => {},
    },
    slug: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100%;
}
</style>
