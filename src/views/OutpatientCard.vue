<template>
  <div class="px-2">
    <h1>История посещений</h1>
    <v-divider class="mt-1 mb-3"></v-divider>
    <PatientTabClinicalRecords
      :records="formattedClinicalRecords2"
      :titleArray="titleArray"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import PatientTabClinicalRecords from "@/components/patient/tab/PatientTabClinicalRecords";
import api from "./../config/api";
import filters from "./../mixins/filters";
import { models, buildObjects } from "@/components/patient/mixings";
const { mapState } = createNamespacedHelpers("clinicalRecords");
const { mapGetters: Getters_doctors } = createNamespacedHelpers("doctors");
import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");
export default {
  mixins: [filters, models, buildObjects],
  name: "OutpatientCard",
  components: { PatientTabClinicalRecords },
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
    formattedClinicalRecords2() {
      const first_appointments = [];
      const second_appointments = [];
      const result_array = [];
      let records = JSON.parse(JSON.stringify(this.clinicalRecords));
      records &&
        records.map((event) => {
          if (event.type_id === 1) {
            first_appointments.push(event);
          } else if (event.type_id === 2) {
            second_appointments.push(event);
          }
        });
      first_appointments.map((event) => {
        event.second_appointments = [];
        event.name =
          JSON.parse(event.data)?.diagnosis?.diagnos ||
          JSON.parse(event.data)?.diagnos ||
          "";
        event.children = [];
        second_appointments.map((event2) => {
          let parent_id = event2.parent_id;
          let objDiagnos = JSON.parse(event2.data);
          if (event.id === parent_id) {
            event2.name =
              objDiagnos?.diagnosis?.diagnos ||
              objDiagnos?.diagnos ||
              event.name;
            event.children.push(event2);
          }
        });
        result_array.push(event);
      });
      return result_array;
    },

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
  methods: {
    showAppointmentDialog(event) {
      this.appointmentDetailsDialog = true;
      this.selectedAppointment = event;
    },
    download(id) {
      return `http://api.neomedy.com${api.getFile}/${id}`;
    },
  },
  async created() {
    this.loading = true;
    //await this.fetchSelectedPatient(this.$route.params.id);
    //await this.fetchPatientClinicalRecordsById(this.$route.params.id);
    this.loading = false;
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
