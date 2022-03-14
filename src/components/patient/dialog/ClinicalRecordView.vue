<template>
  <div>
    <v-dialog :value="value" @input="$emit('input')" fullscreen hide-overlay>
      <v-card class="pa11-4 rounded11-0" :elevation="0">
        <v-toolbar dark color="primary" dense>
          <v-toolbar-title>
            {{ $t("Clinical record view") }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="$emit('input')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-layout column class="fill-height" style="height: 90vh !important">
          <v-flex class="flex overflow-auto">
            <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td style="width: 100px">{{ $t("Doctor") }}</td>
                    <td>
                      {{ getDoctorName(record.doctor_id) | shortname }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {{ $t("Therapist specialty") }}
                    </td>
                    <td>
                      {{ getDoctorSpecialty(record.doctor_id) }}
                    </td>
                  </tr>
                  <tr v-show="selectedVisitCreatedDate">
                    <td>
                      {{ $t("Created date") }}
                    </td>
                    <td>{{ selectedVisitCreatedDate | date }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("Diagnosis") }}</td>
                    <td>
                      <ClinicalRecordElement
                        :element="diagnosis"
                        :titleArray="titleArray"
                      />
                    </td>
                  </tr>
                  <tr v-for="item in items" :key="item">
                    <td>{{ $t(item) }}</td>
                    <td>
                      <ClinicalRecordElement
                        :element="getData(item) && getData(item)"
                        :files="files"
                        :titleArray="titleArray"
                      />
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import api from "../../../config/api";
import ClinicalRecordElement from "./ClinicalRecordElement.vue";
const { mapGetters: Getters_doctors } = createNamespacedHelpers("doctors");

export default {
  components: {
    ClinicalRecordElement,
  },
  name: "ClinicalRecordView",
  props: {
    value: Boolean,
    record: {
      type: Object,
      default: () => {},
    },
    titleArray: [],
  },
  data() {
    return {
      items: ["anamnesis", "surveys", "appointments", "recomendations"],
      EditVisitDialog: false,
    };
  },
  methods: {
    forceRerender() {
      this.$emit("forceRerender");
    },
    download(id) {
      return `http://api.neomedy.com${api.getFile}/${id}`;
    },
    getData(item) {
      return this[item];
    },
    edit() {
      this.EditVisitDialog = true;
    },
  },
  computed: {
    ...Getters_doctors(["getDoctorName", "getDoctorSpecialty"]),
    data() {
      return JSON.parse(this.record.data);
    },
    recordId() {
      return this.record.id;
    },
    diagnosis() {
      let data = this.data;
      if (data && data.diagnosis) return data.diagnosis;
      return { diagnosis: data.diagnos };
    },
    surveys() {
      let data = this.data;
      let res = {};
      if (data && data.surveys) res = data.surveys;
      return res;
    },
    recomendations() {
      let data = this.data;
      let res = {};
      if (data && data.surveys) res = data.recomendations;
      return res;
    },
    appointments() {
      let data = this.data;
      let res = {};
      if (data && data.appointments) res = data.appointments;
      return res;
    },
    attachedFiles() {
      let data = this.data;
      let res = {};
      if (data && data.files) res = data.files;
      return res;
    },
    anamnesis() {
      let res;
      res = JSON.parse(this.record.anamnesis);
      return res;
    },
    files() {
      let res = JSON.parse(this.record.files);
      return res;
    },
    selectedVisitCreatedDate() {
      return this.record && this.record.createdon;
    },
    dataEdit() {
      return {
        record: this.record,
        anamnesis: JSON.stringify(this.anamnesis),
        diagnosis: JSON.stringify(this.diagnosis),
        surveys: JSON.stringify(this.surveys),
        recomendations: JSON.stringify(this.recomendations),
        appointments: JSON.stringify(this.appointments),
        attachedFiles: JSON.stringify(this.files),
      };
    },
  },
};
</script>