<template>
  <div class="login-wrap">
    <v-card class="pa-5 mb-4" :width="500">
      <form @submit.prevent="submit">
        <p class="form__title text-center">NEOMEDY</p>
        <v-text-field
          outlined
          dense
          v-model="$v.email.$model"
          :error="$v.email.$error"
          @input="$v.email.$reset"
          :error-messages="
            formValidationError && !$v.email.required ? 'Поле обязательно' : formValidationError && !$v.email.emailValidation ? 'Введите правильный Email' : ''
          "
          label="Email"
          class="mb-2"
        ></v-text-field>
        <v-text-field
          outlined
          dense
          label="Пароль"
          :error="formValidationError && $v.password.$error"
          :error-messages="
            formValidationError && !$v.password.required
              ? 'Поле обязательно'
              : formValidationError && !$v.password.minLength
              ? 'Пароль должен содержать более 6 символов'
              : ''
          "
          v-model="$v.password.$model"
          type="password"
        ></v-text-field>
        <v-spacer class="mb-5"></v-spacer>
        {{ submitStatus }}
        <v-btn type="submit" class="mr-2">Войти</v-btn>
      </form>
    </v-card>
    <v-card :width="500">
      <v-card-text>
        Нет личного кабинета? Тогда
        <router-link :to="{ name: 'SignUp' }">зарегистрируйтесь</router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("auth");
export default {
  name: "Login",
  data() {
    return {
      password: "",
      email: "",
      dialog: true,
      submitStatus: "",
      formValidationError: false,
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
  },
  watch: {},
  methods: {
    ...mapActions(["login", "confirm_login"]),
    submit() {
      const { email, password } = this;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.formValidationError = true;
        return;
      }
      this.login({ email, password });
    },
  },
};
</script>
<style lang="scss" scoped>
.login-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
}
.form__title {
  font-size: 36px;
}
</style>
<style>
.login-dialog.v-dialog {
  box-shadow: none !important;
}
</style>
