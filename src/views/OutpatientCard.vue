<template>
  <div class="px-2">
    <h1>История посещений</h1>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="(recordGroup, index) in clinicalRecords"
        :key="index"
        class="mb-1"
      >
        <v-expansion-panel-header>
          {{ getDoctorName(recordGroup.doctor_id) }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card
            v-for="event in recordGroup.events"
            :key="event.id"
            class="mb-3"
          >
            <v-card-text class="pa-2">
              Диагноз - {{ JSON.parse(event.data).diagnos }}
            </v-card-text>
            <v-card-text class="pa-2">
              Описание - {{ JSON.parse(event.data).description }}
            </v-card-text>
            <v-card-text class="pa-2">
              Рекомендации - {{ JSON.parse(event.data).recomendations }}
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("clinicalRecords");
const { mapGetters: Getters_doctors } = createNamespacedHelpers("doctors");
import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");
const fakeAppointmentsData = [
  {
    diagnosis: "Простуда",
    doctor: "Быков",
    doctorPosition: "Терапевт",
    appointmentDate: "2021-04-16",
  },
  {
    diagnosis: "Артрит",
    doctor: "Костоломов Илья Владимирович",
    doctorPosition: "Травматолог",
    appointmentDate: "2021-04-16",
  },
  {
    diagnosis: "Кариес",
    doctor: "Дуболом Раиса Витальевна",
    doctorPosition: "Стоматолог",
    appointmentDate: "2021-04-16",
  },
  {
    diagnosis: "Пульпа",
    doctor: "Дуболом Раиса Витальевна",
    doctorPosition: "Стоматолог",
    appointmentDate: "2021-04-16",
  },
  {
    diagnosis: "ОРВ",
    doctor: "Ольга Николаевна",
    doctorPosition: "Семейный врач",
    appointmentDate: "2021-04-16",
  },
  {
    diagnosis: "Воспаление хитрости в животе",
    doctor: "Наталья Петровна",
    doctorPosition: "учитель математики",
    appointmentDate: "2021-04-16",
  },
];
export default {
  name: "OutpatientCard",
  data() {
    return {
      events: fakeAppointmentsData,
    };
  },
  computed: {
    ...mapState(["clinicalRecords"]),
    ...Getters_doctors(["getDoctorName"]),
  },
  filters: {
    formatDate(value) {
      return dayjs(value).format("D MMMM");
    },
    formatTime(value) {
      return dayjs(value).format("HH:mm");
    },
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
.record__card {
  cursor: pointer;
}
</style>
