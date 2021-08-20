<template>
  <div class="submit-access">
    <div class="submit-access__container">
      <div class="mb-3">
        <p class="ma-0">
          Идет процесс предоставления доступа к вашей амбулаторной карте
        </p>
      </div>
      <v-progress-circular
        v-show="loading"
        size="25"
        width="3"
        indeterminate
      ></v-progress-circular>
      <v-icon v-show="error" color="error" size="25">mdi-close</v-icon>
      <v-icon v-show="success" color="success" size="25">mdi-check</v-icon>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("alerts");
import axios from "./../config/axios";
import api from "./../config/api";
export default {
  name: "SubmitAccess",
  data() {
    return {
      loading: true,
      error: false,
      success: false,
    };
  },
  methods: {
    ...mapActions(["addAlert"]),
  },
  created() {
    axios.get(api.submit_access + `${this.$route.params.token}`).then((res) => {
      console.log(res);
      if (res.data.status === "ok") {
        this.addAlert({
          type: "success",
          text: "Доступ предоствлен",
        });
        this.loading = false;
        this.success = true;
        this.$router.push({ name: "Home" });
      } else {
        this.addAlert({
          type: "error",
          text: "Произошка ошибка",
        });
        this.loading = false;
        this.error = true;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.submit-access {
  height: 100%;
  position: relative;
  &__container {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    text-align: center;
  }
}
</style>
