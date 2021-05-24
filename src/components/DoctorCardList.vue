<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="doctor in doctors" :key="doctor.id" cols="6" sm="4" lg="3">
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
