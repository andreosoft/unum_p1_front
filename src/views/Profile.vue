<template>
  <div class="pa-3">
    <h1>Мой профиль</h1>
    <v-container fluid class="pa-0">
      <v-row>
        <v-col cols="12" sm="8" md="6">
          <v-text-field
            label="Name"
            dense
            outlined
            hide-details
            class="mb-6"
            v-model="getSetName"
          ></v-text-field>
          <v-input
            dense
            class="v-input--is-label-active v-input--is-dirty v-text-field v-text-field--is-booted"
          >
            <template v-slot:default>
              <v-label :value="true" :absolute="true">Дата рождения</v-label>
              <div class="d-inline-block">
                <v-dialog
                  ref="dialog"
                  v-model="showBirthdayPicker"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <slot>
                      <div v-bind="attrs" v-on="on">
                        <v-icon>mdi-calendar</v-icon>
                        {{ getSetDateOfBirth }}
                      </div>
                    </slot>
                  </template>
                  <v-date-picker
                    v-if="showBirthdayPicker"
                    v-model="getSetDateOfBirth"
                    full-width
                    :max="currentDate"
                    @change="showBirthdayPicker = false"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="blue darken-1"
                      @click="showBirthdayPicker = false"
                    >
                      Закрыть
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </div>
            </template>
          </v-input>
          <v-text-field
            label="Phone"
            dense
            outlined
            hide-details
            class="mb-3"
            v-model="getSetPhone"
          ></v-text-field>
          <v-text-field
            label="Email"
            dense
            outlined
            hide-details
            v-model="getSetEmail"
            class="mb-3"
          ></v-text-field>
          <v-select
            label="Язык"
            dense
            outlined
            v-model="getSetLanguage"
            :items="languages"
            class="mb-3"
            messages="нужно чтобы бэк сохранял это значение и возвращал его остальное уже готово"
            disabled
          ></v-select>
          <v-autocomplete
            ref="country"
            v-model="getSetCountry"
            :items="countries"
            label="Страна"
            dense
            outlined
            messages="нужно чтобы бэк сохранял это значение и возвращал его остальное уже готово"
            disabled
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
    <div class="loader">
      <v-progress-circular
        v-if="isProfileUpdating"
        width="3"
        size="35"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import dayjs from "dayjs";
const { mapState, mapMutations } = createNamespacedHelpers("auth");
const { mapActions: Actions_alerts } = createNamespacedHelpers("alerts");
export default {
  name: "Profile",
  data() {
    return {
      selectedLanguage: [],
      languages: ["RU", "EN", "ES", "FR", "GR"],
      countries: [
        "Австралия",
        "Азербайджан",
        "Албания",
        "Армения",
        "Афганистан",
        "Белоруссия",
        "Болгария",
        "Бразилия",
        "Великобритания",
        "Венгрия",
        "Германия",
        "Греция",
        "Грузия",
        "Дания",
        "Египет",
        "Индия",
        "Ирак",
        "Ирландия",
        "Исландия",
        "Испания",
        "Италия",
        "Казахстан",
        "Китай",
        "Кыргызстан",
        "Латвия",
        "Литва",
        "Малайзия",
        "Мексика",
        "Молдавия",
        "Непал",
        "Нидерланды",
        "Норвегия",
        "ОАЭ",
        "Пакистан",
        "Польша",
        "Португалия",
        "Россия",
        "Румыния",
        "Сербия",
        "Сингапур",
        "Сирия",
        "Словакия",
        "Словения",
        "США",
        "Таджикистан",
        "Турция",
        "Узбекистан",
        "Украина",
        "Филиппины",
        "Финляндия",
        "Франция",
        "Хорватия",
        "Черногория",
        "Чехия",
        "Швейцария",
        "Швеция",
        "Эстония",
        "Япония",
      ],
      showBirthdayPicker: false,
      dateOfBirth: "",
      currentDate: dayjs().format("YYYY-MM-DD"),
    };
  },
  computed: {
    ...mapState(["userProfile", "isProfileUpdating"]),
    getSetName: {
      get() {
        return this.userProfile && this.userProfile.name;
      },
      set(val) {
        this.SET_USER_PROFILE_NAME(val);
      },
    },
    getSetDateOfBirth: {
      get() {
        return this.userProfile && this.userProfile.birthday;
      },
      set(val) {
        this.SET_USER_PROFILE_BIRTHDAY(val);
      },
    },
    getSetPhone: {
      get() {
        return this.userProfile && this.userProfile.phones;
      },
      set(val) {
        this.SET_USER_PROFILE_PHONES(val);
      },
    },
    getSetEmail: {
      get() {
        return this.userProfile && this.userProfile.email;
      },
      set(val) {
        this.SET_USER_PROFILE_EMAIL(val);
      },
    },
    getSetLanguage: {
      get() {
        return this.userProfile && this.userProfile.lang;
      },
      set(val) {
        this.SET_USER_PROFILE_LANG(val);
      },
    },
    getSetCountry: {
      get() {
        return this.userProfile && this.userProfile.country;
      },
      set(val) {
        this.SET_USER_PROFILE_COUNTRY(val);
      },
    },
  },
  watch: {
    isProfileUpdating(val) {
      if (!val) {
        this.addAlert({ type: "success", text: "Профиль обновлён" });
      }
    },
  },
  methods: {
    ...mapMutations([
      "SET_USER_PROFILE_NAME",
      "SET_USER_PROFILE_BIRTHDAY",
      "SET_USER_PROFILE_PHONES",
      "SET_USER_PROFILE_EMAIL",
      "SET_USER_PROFILE_LANG",
      "SET_USER_PROFILE_COUNTRY",
    ]),
    ...Actions_alerts(["addAlert"]),
  },
};
</script>

<style scoped>
.loader {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
