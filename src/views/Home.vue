<template>
  <div>
    <Loader v-if="!dataFetched" />
    <div v-else class="pb-5 pt-2">
      <div class="px-5 events">
        <div v-if="events.length">
          <h2 class="mb-3">Ваши записи</h2>
          <EventCardList :events="events" />
        </div>
        <div v-else>
          <h2>У вас нет сделанных записей</h2>
        </div>
      </div>
      <v-divider class="my-4"></v-divider>
      <div class="px-5 my-doctors">
        <h2>4 моих случайных врача</h2>
        <DoctorCardList
          slug="all-doctors"
          :doctors="doctors.slice(0, 4)"
        />
      </div>
      <v-divider class="mt-4"></v-divider>
      <div class='px-5'>
        <h2 class="mb-3">Ваши записи</h2>
        <v-list class="px-5 pa-0 recommendations">
          <v-list-item
            v-for="(item, index) in sorted.slice(0, 3)"
            :key="index"
            class="pa-0"
          >
            {{ JSON.parse(item.data).diagnos }}
          </v-list-item>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import DoctorCardList from "../components/DoctorCardList.vue";
import EventCardList from "../components/EventCardList.vue";
import Loader from "../components/Loader";
const { mapState } = createNamespacedHelpers("events");
const {
  mapState: State_records,
} = createNamespacedHelpers("clinicalRecords");
const { mapState: State_doctors } = createNamespacedHelpers("doctors");
export default {
  name: "Home",
  components: { DoctorCardList, EventCardList, Loader },
  computed: {
    ...mapState(["events", "eventsFetched"]),
    ...State_doctors(["doctors", "doctorsFetched"]),
    ...State_records(["clinicalRecords"]),
    dataFetched() {
      return this.eventsFetched && this.doctorsFetched;
    },
    sorted() {
      const events = [];
      this.clinicalRecords.map((e) => {
        e.events.map((i) => {
          events.push(i);
        });
      });
      events.sort((a, b) => new Date(b.createdon) - new Date(a.createdon));
      return events;
    },
  },
};
</script>

<style>
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: none;
}
</style>
