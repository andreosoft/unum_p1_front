<template>
  <div class="px-2">
    <h1>История посещений</h1>
    <v-expansion-panels v-model="panels">
      <v-expansion-panel
        v-for="(item, index) in formattedClinicalRecords"
        :key="index"
        class="mb-2"
        :disabled="!item.second_appointments.length"
      >
        <div
          v-show="!item.second_appointments.length"
          @click="showAppointmentDialog(item)"
          class="records__overlay"
        ></div>
        <v-expansion-panel-header>
          {{ item.data | getDiagnos }} ({{ item.data | getCreatedDate }} -
          {{ getDoctorSpecialty(item.doctor_id).toLowerCase() }}
          {{ getDoctorName(item.doctor_id) }})
          <span
            v-show="index === panels"
            @click="showAppointmentDialog(item)"
            class="ml-4 grey--text"
            >(показать первичную запись)</span
          >
        </v-expansion-panel-header>
        <v-expansion-panel-content v-if="item.second_appointments.length">
          <v-card>
            <v-hover
              v-for="(event, index) in item.second_appointments"
              :key="index"
            >
              <template v-slot="{ hover }">
                <v-card-text
                  :class="{ record__card: hover }"
                  @click="showAppointmentDialog(event)"
                >
                  {{ event.data | getDiagnos }} ({{
                    event.data | getCreatedDate
                  }}
                  -
                  {{ getDoctorSpecialty(event.doctor_id).toLowerCase() }}
                  {{ getDoctorName(event.doctor_id) }})
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
      fullscreen
      content-class="outpatient-dialog"
    >
      <v-toolbar dark color="primary" class="d-flex justify-content-between">
        <v-toolbar-title>Просмотр записи</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="appointmentDetailsDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card class="pa-4 rounded-0" style="width: 100%;">
        <v-simple-table>
          <template #default>
            <tbody>
              <tr>
                <td>Лечащий врач</td>
                <td>{{ getDoctorName(selectedAppointment.doctor_id) }}</td>
              </tr>
              <tr>
                <td>Диагноз</td>
                <td>{{ JSON.parse(selectedAppointment.data).diagnos }}</td>
              </tr>
              <tr v-show="getDescription.length">
                <td>Описание</td>
                <td>{{ getDescription }}</td>
              </tr>
              <tr v-show="getRecommendations.length">
                <td>Рекомендации</td>
                <td>{{ getRecommendations }}</td>
              </tr>
              <tr>
                <td>Дата записи</td>
                <td>{{ selectedAppointment.createdon | formatDate }}</td>
              </tr>
              <tr>
                <td>Время записи</td>
                <td>{{ selectedAppointment.createdon | $_formatTime }}</td>
              </tr>
              <tr v-for="(item, index) in getFiles" :key="index">
                <td>
                  <a :href="download(item.file)" target="_blank">
                    Скачать прикрепленный файл
                  </a>
                </td>
                <td>
                  {{ item.name }}
                </td>
                <td></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import api from "./../config/api";
import filters from "./../mixins/filters";
const { mapState } = createNamespacedHelpers("clinicalRecords");
const { mapGetters: Getters_doctors } = createNamespacedHelpers("doctors");
import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");
export default {
  mixins: [filters],
  name: "OutpatientCard",
  data() {
    return {
      appointmentDetailsDialog: false,
      selectedAppointment: null,
      panels: null,
    };
  },
  computed: {
    ...mapState(["clinicalRecords"]),
    ...Getters_doctors([
      "getDoctorName",
      "getDoctorName",
      "getDoctorSpecialty",
    ]),
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
          if (event.id === JSON.parse(event2.data).initialVisitId) {
            event.second_appointments.push(event2);
          }
        });
        result_array.push(event);
      });
      return result_array;
    },
    getRecommendations() {
      try {
        const recomendations =
          this.selectedAppointment &&
          JSON.parse(this.selectedAppointment.data).recomendations;
        return recomendations;
      } catch (err) {
        return "";
      }
    },
    getDescription() {
      try {
        const description =
          this.selectedAppointment &&
          JSON.parse(this.selectedAppointment.data).description;
        return description;
      } catch (err) {
        return "";
      }
    },
    getFiles() {
      try {
        const files =
          this.selectedAppointment &&
          JSON.parse(this.selectedAppointment.data).files;
        return files;
      } catch (err) {
        return [];
      }
    },
  },
  filters: {
    formatDate(value) {
      return dayjs(value).format("DD MMMM YYYY");
    },
    getCreatedDate(val) {
      try {
        const date = JSON.parse(val).createdAt;
        return dayjs(date).format("DD.MM.YYYY");
      } catch (err) {
        return "";
      }
    },
    getDiagnos(val) {
      return JSON.parse(val).diagnos;
    },
  },
  watch: {
    selectedAppointment(val) {
      console.log(val);
    },
  },
  methods: {
    showAppointmentDialog(event) {
      this.appointmentDetailsDialog = true;
      this.selectedAppointment = event;
    },
    download(id) {
      return `http://api.neomedy.com/api${api.get_file}/${id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.record__card {
  cursor: pointer;
  background-color: rgb(220, 220, 220);
}
.v-expansion-panel--disabled {
  button {
    color: #000;
  }
}
.v-expansion-panel-header {
  span {
    text-decoration: underline;
  }
}
.records__overlay {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.v-card__text {
  color: #000 !important;
}
</style>
<style lang="scss">
.outpatient-dialog {
  .v-toolbar__content {
    width: 100%;
  }
}
</style>
