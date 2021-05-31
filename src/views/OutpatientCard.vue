<template>
  <div class="px-2">
    <h1>История посещений</h1>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="(item, index) in formattedClinicalRecords"
        :key="index"
        class="mb-2"
      >
        <v-expansion-panel-header>
          {{ JSON.parse(item.data).diagnos }}
        </v-expansion-panel-header>
        <v-expansion-panel-content v-if="item.second_appointments.length">
          <v-card>
            <v-hover
              v-for="(event, index) in item.second_appointments"
              :key="index"
            >
              <template v-slot="{ hover }">
                <v-card-text
                  :class="{'record__card': hover}"
                  @click="showAppointmentDialog(event)"
                >
                  {{ JSON.parse(event.data).diagnos }}
                </v-card-text>
              </template>
            </v-hover>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog
      v-model="appointmentDetailsDialog"
      v-if="selectedAppointment"
      :max-width="600"
    >
      <v-card class="pa-4">
        <v-card-title class="pa-0">
          Лечащий врач -
          {{ getDoctorName(selectedAppointment.doctor_id) }}
        </v-card-title>
        <v-card-title class="pa-0">
          Диагноз -
          {{ JSON.parse(selectedAppointment.data).diagnos }}
        </v-card-title>
        <v-card-title class="pa-0">
          Дата записи - {{ selectedAppointment.createdon | formatDate }}
        </v-card-title>
        <v-card-title class="pa-0">
          Время записи - {{ selectedAppointment.createdon | formatTime }}
        </v-card-title>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("clinicalRecords");
const { mapGetters: Getters_doctors } = createNamespacedHelpers("doctors");
import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");
export default {
  name: "OutpatientCard",
  data() {
    return {
      appointmentDetailsDialog: false,
      selectedAppointment: null,
    };
  },
  computed: {
    ...mapState(["clinicalRecords"]),
    ...Getters_doctors(["getDoctorName"]),
    formattedClinicalRecords() {
      const first_appointments = [];
      const second_appointments = [];

      this.clinicalRecords.map((event) => {
        if (event.type_id === 1) {
          first_appointments.push(event);
        } else if (event.type_id === 2) {
          second_appointments.push(event);
        }
      });

      const result_array = [];

      first_appointments.map((event) => {
        event.second_appointments = [];
        second_appointments.map((event2) => {
          if (event.doctor_id === event2.doctor_id) {
            event.second_appointments.push(event2);
          }
        });
        result_array.push(event);
      });
      return result_array;
    },
  },
  filters: {
    formatDate(value) {
      return dayjs(value).format("D MMMM YYYY");
    },
    formatTime(value) {
      return dayjs(value).format("HH:mm");
    },
  },
  methods: {
    showAppointmentDialog(event) {
      this.appointmentDetailsDialog = true;
      this.selectedAppointment = event;
    },
  },
};
</script>

<style lang="scss" scoped>
.record__card {
  cursor: pointer;
  background-color: rgb(220, 220, 220);
}
</style>
