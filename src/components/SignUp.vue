<template>
  <div class="signup-wrap pa-2">
    <div class="signup-wrap__container">
      <v-card style="width: 100%;" class="pa-4 mb-4">
        <form @submit="submit">
          <div v-show="mainView === 0">
            <p class="form__title">Регистрация</p>
            <v-text-field
              :error="$v.email.$error"
              v-model="$v.email.$model"
              label="Email"
              outlined
              dense
              size="31"
              @input="$v.email.$reset"
              :error-messages="
                userError && !$v.email.required
                  ? 'Поле обязательно'
                  : userError && !$v.email.emailValidation
                  ? 'Введите правильный Email'
                  : ''
              "
            ></v-text-field>
            <v-text-field
              :error="$v.password.$error"
              v-model="$v.password.$model"
              label="Пароль"
              type="password"
              outlined
              dense
              @input="$v.password.$reset"
              :error-messages="
                userError && !$v.password.required
                  ? 'Поле обязательно'
                  : userError && !$v.password.minLength
                  ? 'Пароль должен содержать минимум 6 символов'
                  : ''
              "
            ></v-text-field>
            <v-text-field
              label="Подтвердите пароль"
              v-model="$v.passwordConfirmation.$model"
              @input="$v.passwordConfirmation.$reset"
              type="password"
              outlined
              dense
              :error="$v.passwordConfirmation.$error"
              :error-messages="
                userError && !$v.passwordConfirmation.sameAsPassword
                  ? 'пароли должны совпадать'
                  : ''
              "
            ></v-text-field>
            <vue-phone-number-input
              v-model="phoneModel"
              default-country-code="KG"
              show-code-on-list
              :disabled="phoneIsCorrect"
              :translations="{
                countrySelectorLabel: 'Код страны',
                phoneNumberLabel: 'Номер телефона',
              }"
              no-example
              @update="handler"
              class="mb-7"
            />
            <v-text-field
              v-model="lang"
              outlined
              dense
              label="Язык"
              disabled
            ></v-text-field>
            <v-autocomplete
              ref="country"
              v-model="country"
              :items="countries"
              label="Страна"
              placeholder="Выберите..."
              dense
              outlined
            >
            </v-autocomplete>
          </div>
          <div v-show="mainView === 1">
            <p class="form__title">Личная информация</p>
            <v-text-field
              outlined
              dense
              v-model="$v.surname.$model"
              @input="$v.surname.$reset"
              :error="$v.surname.$error"
              :error-messages="
                patientError && !$v.surname.required ? 'Поле обязательно' : ''
              "
              label="Фамилия"
            ></v-text-field>
            <v-text-field
              outlined
              dense
              v-model="$v.name.$model"
              :error="$v.name.$error"
              @input="$v.name.$reset"
              :error-messages="
                patientError && !$v.name.required ? 'Поле обязательно' : ''
              "
              label="Имя"
            ></v-text-field>
            <v-text-field
              outlined
              dense
              label="Отчество"
              v-model="secondname"
            ></v-text-field>
          </div>

          <v-spacer class="mb-1"></v-spacer>
          <!-- <v-btn
          :ripple="false"
          v-if="mainView === 0"
          @click="$router.push({ name: 'Login' })"
          class="mr-2"
        >
          Отмена
        </v-btn> -->
          <v-btn
            :ripple="false"
            v-if="mainView !== 0"
            class="mr-2"
            @click="mainView--"
          >
            Назад
          </v-btn>
          <v-btn
            :ripple="false"
            v-show="mainView === 0"
            class="mr-2"
            @click="validateUser"
          >
            Далее
          </v-btn>
          <v-btn :ripple="false" v-show="mainView !== 0" @click="submit">
            Зарегистрироваться
          </v-btn>
        </form>
      </v-card>
      <v-card style="width: 100%;">
        <v-card-text
          >Уже есть личный кабинет?
          <router-link :to="{ name: 'Login' }"
            >Войдите</router-link
          ></v-card-text
        >
      </v-card>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("auth");
export default {
  name: "SignUp",
  data() {
    return {
      dialog: true,
      email: "",
      password: "",
      passwordConfirmation: "",
      phone: "",
      phoneModel: "",
      lang: "RU",
      country: "",

      name: "",
      surname: "",
      secondname: "",
      mainView: 0,
      userError: false,
      patientError: false,
      phoneIsCorrect: false,
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
    };
  },
  validations: {
    email: {
      required,
      emailValidation: (email) => /.+@.+\..+/.test(email),
    },
    password: {
      required,
      minLength: minLength(6),
    },
    passwordConfirmation: {
      sameAsPassword: sameAs("password"),
    },
    name: {
      required,
    },
    surname: {
      required,
    },
  },
  methods: {
    ...mapActions(["signup"]),
    handler(val) {
      this.phone = val.formatInternational;
    },
    validateUser() {
      const arr = ["email", "password", "passwordConfirmation"];
      arr.map((el) => {
        this.$v[el].$touch();
      });
      if (
        this.$v.email.$invalid ||
        this.$v.password.$invalid ||
        this.$v.passwordConfirmation.$invalid
      ) {
        this.userError = true;
        return;
      }

      this.mainView++;
    },
    submit() {
      const arr = ["name", "surname"];
      arr.map((el) => this.$v[el].$touch());
      if (this.$v.name.$invalid || this.$v.surname.$invalid) {
        this.patientError = true;
        return;
      }
      const data = {
        patient: {
          name: this.name,
          surname: this.surname,
          secondname: this.secondname,
        },
        user: {
          login: this.email,
          phone: this.phone,
          lang: this.lang,
          country: this.country,
          password: this.passwordConfirmation,
        },
      };
      this.signup(data);
    },
  },
};
</script>

<style lang="scss" scoped>
.signup-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  &__container {
    width: 100%;
    max-width: 500px;
  }
}
</style>
