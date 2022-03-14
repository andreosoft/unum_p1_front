<template>
  <div>
    <v-treeview hoverable :items="records" :open="openRecord">
      <template v-slot:label="{ item }">
        <div @click.stop="clickOnNode(item)" class="text-wrap">
          {{ item.name }} <br />
          ({{ item.createdon | date }}
          -
          {{ getDoctorSpecialty(item.doctor_id).toLowerCase() }}
          {{ getDoctorName(item.doctor_id) | shortname }})&nbsp;
        </div>
        <v-divider class="mt-1 mb-2"></v-divider>
      </template>
      <template v-slot:append="{ item }">
        <div>
          <v-btn
            right
            @click.prevent="showVisitDialog(item)"
            outlined
            rounded
            small
          >
            {{ $t("View") }}
          </v-btn>
        </div>
      </template>
    </v-treeview>
    <ClinicalRecordView
      v-if="visitDialog"
      v-model="visitDialog"
      :record="selectedVisit"
      :titleArray="titleArray"
      :key="componentKey"
      @forceRerender="forceRerender"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import ClinicalRecordView from "./../dialog/ClinicalRecordView.vue";
const { mapGetters: Getters_doctors } = createNamespacedHelpers("doctors");

export default {
  name: "PatientTabClinicalRecords",
  components: {
    ClinicalRecordView,
  },
  props: {
    records: {
      type: Array,
      default: () => [],
    },
    titleArray: [],
  },
  data() {
    return {
      openRecord: [],
      visitDialog: false,
      selectedVisit: null,
      componentKey: 0,
    };
  },

  computed: {
    ...Getters_doctors(["getDoctorName", "getDoctorSpecialty"]),
  },
  methods: {
    forceRerender() {
      console.log("forceRerender", this.componentKey);
      this.componentKey += 1;
    },
    clickOnNode(item) {
      if (item.children) {
        if (this.openRecord.includes(item.id)) {
          this.openRecord = this.openRecord.filter((el) => {
            return el !== item.id;
          });
        } else {
          this.openRecord.push(item.id);
        }
      }
    },
    showVisitDialog(item) {
      this.visitDialog = true;
      this.selectedVisit = item;
    },
  },
};
</script>

<style>
.v-treeview-node__label {
  white-space: normal;
}
</style>
