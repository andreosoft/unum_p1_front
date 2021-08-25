<template>
  <v-container fluid class="pa-0">
    <Loader v-if="!selectedDoctorFetched" />
    <v-row
      v-else
      :class="[{ 'full-height': $vuetify.breakpoint.mdAndUp }, 'ma-0']"
    >
      <v-col cols="12" md="4" lg="3" class="d-flex doctor-info">
        <div>
          <v-avatar size="200" class="mb-3">
            <v-img
              :src="
                getSelectedDoctor.photo
                  ? getPhotoURL(getSelectedDoctor.photo)
                  : '/images/doctor-placeholder.jpeg'
              "
              rounded
            >
            </v-img>
          </v-avatar>
          <div class="doctor-info__text-wrap">
            <p class="doctor-info__text mb-1">
              {{ getSecondName }}
            </p>
            <p class="doctor-info__text mb-1">
              {{ getFirstName }}
            </p>
            <p class="doctor-info__text mb-1">
              {{ getMiddleName }}
            </p>
            <p
              v-if="
                getSelectedDoctorSpecialty && getSelectedDoctorSpecialty.length
              "
            >
              Должность -
              {{ getSelectedDoctorSpecialty }}
            </p>
          </div>
        </div>
      </v-col>
      <v-divider v-show="$vuetify.breakpoint.mdAndUp" vertical></v-divider>
      <v-col md="8" lg="9" cols="12">
        <v-tabs class="mb-3 d-flex" centered>
          <v-tab
            :ripple="false"
            :color="
              mainView === 'appointment' ? 'primary' : 'rgb(232, 232, 232)'
            "
            class="mr-3"
            @click="mainView = 'appointment'"
          >
            запись на прием
          </v-tab>
          <v-tab
            :ripple="false"
            :color="
              mainView === 'information' ? 'primary' : 'rgb(232, 232, 232)'
            "
            @click="mainView = 'information'"
          >
            информация о враче
          </v-tab>
        </v-tabs>

        <transition name="slide-fade" mode="out-in">
          <div v-if="mainView === 'appointment'" key="appointment">
            <v-card class="mb-5 pa-4">
              <v-card-title
                class="pa-0"
                :class="{ 'mb-4': Object.keys(doctorSchedule).length }"
                >Расписание врача</v-card-title
              >
              <v-card-text class="pa-0">
                <v-expansion-panels>
                  <v-expansion-panel
                    v-for="(timeArray, key) in doctorSchedule"
                    :key="key"
                  >
                    <v-expansion-panel-header>
                      {{ key | $_formatDate }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-container>
                        <v-row>
                          <v-col
                            v-for="(event, index) in timeArray"
                            :key="index"
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-btn
                              @click="
                                openEventDialog(key, event.start, event.end)
                              "
                            >
                              с {{ event.start.slice(0, 5) }} - до
                              {{ event.end.slice(0, 5) }}
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-dialog v-model="setEventDialog" :max-width="500">
                    <v-card>
                      <v-card-title>
                        хотите сделать запись ?
                      </v-card-title>
                      <v-card-actions>
                        <v-btn color="secondary" @click="closeEventDialog"
                          >Отмена</v-btn
                        >
                        <v-btn color="primary" @click="setEvent"
                          >Записаться</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-expansion-panels>
              </v-card-text>
            </v-card>

            <v-card v-if="getEventsByDoctor.length">
              <v-card-title class="pa-3"
                >Ваши записи к этому доктору</v-card-title
              >
              <v-card-text class="pa-0">
                <v-container fluid class="pa-0">
                  <v-row class="ma-0">
                    <v-col
                      class=""
                      v-for="event in getEventsByDoctor"
                      :key="event.id"
                      cols="6"
                      lg="3"
                      md="4"
                    >
                      <v-btn
                        @click="
                          () => {
                            deleteEventDialog = true;
                            eventIdToDelete = event.id;
                          }
                        "
                      >
                        {{ event.start | $_formatDate }}
                        {{ event.start | $_formatTime }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-dialog v-model="deleteEventDialog" :max-width="500">
                <v-card>
                  <v-card-title>Удалить запись?</v-card-title>
                  <v-card-actions>
                    <v-btn @click="deleteEventDialog = false">отмена</v-btn>
                    <v-btn @click="deleteItem">Удалить</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
            <v-card v-else>
              <v-card-title>
                Вы не записывались на прием к этому доктору
              </v-card-title>
            </v-card>
          </div>
          <div v-else key="information">
            <v-card>
              <v-list>
                <v-list-item>Имя - {{ getSelectedDoctor.name }}</v-list-item>
                <v-list-item>
                  Страна - {{ getSelectedDoctor.country || "Страна" }}
                </v-list-item>
                <v-list-item
                  >Язык - {{ getSelectedDoctor.lang || "ru" }}</v-list-item
                >
              </v-list>
              <v-list>
                <v-list-item
                  v-if="
                    getSelectedDoctorSpecialty &&
                      getSelectedDoctorSpecialty.length
                  "
                >
                  Специальность -
                  {{ getSelectedDoctorSpecialty }}
                </v-list-item>
                <v-list-item>
                  Образование -
                  {{ getSelectedDoctor.medical_university || "Образование" }}
                </v-list-item>
              </v-list>
              <div v-if="getQualification.length">
                <v-card-title class="pb-2">
                  Повышение квалификации
                </v-card-title>
                <v-card-text style="white-space: pre;">
                  {{ getQualification }}
                </v-card-text>
              </div>
            </v-card>
          </div>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import Loader from "./../components/Loader";
import filters from "./../mixins/filters";
dayjs.locale("ru");
const {
  mapState: State_doctors,
  mapGetters: Getters_doctors,
  mapActions: Actions_doctors,
} = createNamespacedHelpers("doctors");
const {
  mapActions: Actions_events,
  mapState: State_events,
} = createNamespacedHelpers("events");
export default {
  mixins: [filters],
  name: "Doctor",
  components: {
    Loader,
  },
  data() {
    return {
      mainView: "appointment",
      setEventDialog: false,
      eventDate: "",
      eventStart: "",
      eventEnd: "",
      eventReasonDialog: false,
      eventReason: "",
      doctorEvents: [],
      deleteEventDialog: false,
      eventIdToDelete: null,
      drawer: false,
    };
  },
  computed: {
    ...State_doctors([
      "selectedDoctorFetched",
      "doctorSchedule",
      "selectedDoctor",
    ]),
    ...Getters_doctors([
      "getSelectedDoctor",
      "getDoctorSchedule",
      "getPhotoURL",
      "getSelectedDoctorSpecialty",
    ]),
    ...State_events(["events"]),
    currentDate() {
      return dayjs(this.date).format("DD MMMM");
    },
    getFirstName() {
      return this.getSelectedDoctor.name.split(" ")[1];
    },
    getSecondName() {
      return this.getSelectedDoctor.name.split(" ")[0];
    },
    getMiddleName() {
      return this.getSelectedDoctor.name.split(" ")[2];
    },
    getEventsByDoctor() {
      const events =
        this.events &&
        this.events.filter(
          (event) => event.doctor_id === Number(this.$route.params.id)
        );
      return events;
    },
    getQualification() {
      return (
        this.selectedDoctor &&
        JSON.parse(this.selectedDoctor.info).qualification
      );
    },
  },
  methods: {
    ...Actions_doctors(["fetchDoctorById", "fetchDoctorSchedule"]),
    ...Actions_events(["addEvent", "deleteEvent"]),
    async setEvent() {
      const event = {
        start: this.date + " " + this.start,
        end: this.date + " " + this.end,
        doctor_id: this.$route.params.id,
      };
      await this.addEvent(event);
      this.fetchDoctorSchedule(this.$route.params.id);
      this.setEventDialog = false;
    },
    openEventDialog(date, start, end) {
      this.setEventDialog = true;
      this.date = date;
      this.start = start;
      this.end = end;
    },
    closeEventDialog() {
      this.setEventDialog = false;
      this.date = "";
      this.start = "";
      this.end = "";
      this.eventIdToDelete = null;
    },
    async deleteItem() {
      this.deleteEventDialog = false;
      this.deleteEvent({
        eventId: this.eventIdToDelete,
        doctorId: this.$route.params.id,
      });
    },
  },
  async created() {
    this.fetchDoctorById(this.$route.params.id);
    this.fetchDoctorSchedule(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables";

.container {
  height: 100%;
}
.v-tab {
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    font-size: 10px;
  }
}
.doctor-info {
  align-items: center;
  flex-direction: column;
}
.doctor-info__text-wrap {
  max-width: 200px;
}
.doctor-info__text {
  font-weight: 800;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.full-height {
  height: 100%;
}
</style>
<style>
.v-slide-group__prev {
  display: none !important;
}
</style>
