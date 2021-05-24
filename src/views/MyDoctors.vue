<template>
  <div>
    <Loader v-if="!doctorsFetched" />
    <DoctorCardList v-if="doctorsFetched && myDoctors.length" slug="my-doctors" :doctors="myDoctors" />
    <h1 v-else class='pl-4'>Вы не записаны ни к одному врачу</h1>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import DoctorCardList from "./../components/DoctorCardList";
import Loader from "./../components/Loader";
const { mapState } = createNamespacedHelpers("doctors");
const { mapState: State_events } = createNamespacedHelpers("events");
export default {
  name: "MyDoctors",
  components: {
    DoctorCardList,
    Loader,
  },
  computed: {
    ...mapState(["doctors", 'doctorsFetched']),
    ...State_events(["events"]),
    myDoctors() {
      let myDoctors = [];
      this.events.map((ev) => {
        this.doctors.map((doctor) => {
          if (ev.doctor_id === doctor.id) {
            myDoctors.push(doctor);
          }
        });
      });
      myDoctors = [...new Set(myDoctors)];
      return myDoctors;
    },
  },
};
</script>
