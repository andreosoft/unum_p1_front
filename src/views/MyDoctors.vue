<template>
  <div>
    <Loader v-if="!myDoctorsFetched" />
    <DoctorCardList
      v-if="myDoctorsFetched && myDoctors.length"
      slug="my-doctors"
      :doctors="myDoctors"
    />
    <h1 v-else class="pl-4">Вы не записаны ни к одному врачу</h1>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import DoctorCardList from "./../components/DoctorCardList";
import Loader from "./../components/Loader";
const { mapState } = createNamespacedHelpers("doctors");
export default {
  name: "MyDoctors",
  components: {
    DoctorCardList,
    Loader,
  },
  computed: {
    ...mapState(["myDoctors", "myDoctorsFetched"]),
  },
};
</script>
