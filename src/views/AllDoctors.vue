<template>
  <div>
    <Loader v-if="!doctorsFetched" />
    <DoctorCardList v-else slug="all-doctors" :doctors="getDoctorsList"/>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import Loader from '../components/Loader.vue';
import DoctorCardList from "./../components/DoctorCardList";
const { mapState, mapGetters } = createNamespacedHelpers("doctors");
export default {
  name: "AllDoctors",
  components: {
    DoctorCardList,
    Loader
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState(["doctorsFetched"]),
    ...mapGetters(["getDoctorsList", "getDoctorName"]),
  },
};
</script>
