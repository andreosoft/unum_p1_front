<template>
  <v-card :elevation="hover ? 5 : 2" :ripple="false" class="pa-2 record-card">
    <v-card-title class="pa-0 mb-3">
      Запись к врачу
    </v-card-title>
    <v-card :elevation="0" outlined>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td>Запись №</td>
              <td>{{ event.id }}</td>
            </tr>
            <tr>
              <td>Дата</td>
              <td>{{ event.start | formatDate }}</td>
            </tr>
            <tr>
              <td>Время</td>
              <td>{{ event.start | formatTime }}</td>
            </tr>
            <tr>
              <td>ФИО врача</td>
              <td>{{ getDoctorName(event.doctor_id) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("doctors");
import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");
export default {
  name: "EventCard",
  props: {
    event: {
      type: Object,
      default: () => {},
    },
    hover: {
      type: Boolean,
      default: false,
    },
  },
  filters: {
    formatDate: (value) => {
      return dayjs(value).format("DD MMMM");
    },
    formatTime: (value) => {
      return dayjs(value).format("HH:mm");
    },
  },
  computed: {
    ...mapGetters(["getDoctorName"]),
  },
};
</script>

<style scoped>
.record-card {
  cursor: pointer;
}
</style>
