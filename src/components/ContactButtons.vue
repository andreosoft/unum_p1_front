<template>
  <div class="d-flex patient-actions__list">
    <v-responsive
      style="overflow: unset; position: relative"
      v-for="(item, index) in patientActions"
      :key="item.id"
      :aspect-ratio="2 / 1"
      :class="{ 'mr-1': index !== patientActions.length - 1 }"
    >
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <a
            class="rounded patient-actions__item"
            :href="item.href"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon size="17" v-text="item.icon" color="white"> </v-icon>
          </a>
          <div v-show="false" class="patient-notifications">
            <!-- notifications count -->
            <!-- :class="[
            notif.length < 2
              ? 'rounded-circle width-15'
              : 'rounded-pill width-content px-1',
          ]" -->
          </div>
        </template>
        <span>{{ item.tooltip }}</span>
      </v-tooltip>
    </v-responsive>
  </div>
</template>

<script>
export default {
  name: "ContactButtons",
  props: {
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
  },
  computed: {
    patientActions() {
      const actions = [
        {
          icon: "mdi-phone",
          href: `tel:${this.phone}`,
          tooltip: this.phone,
          id: 1,
        },
        {
          icon: "mdi-email",
          href: `mailto:${this.email}`,
          id: 2,
          tooltip: this.email,
        },
      ];
      return actions;
    },
  },
};
</script>

<style lang="scss" scoped>
.patient-actions__item {
  display: flex;
  justify-content: center;
  background-color: rgb(14, 98, 154);
  padding: 10px 0;
  text-decoration: none;
}
.patient-notifications {
  color: #fff;
  text-align: center;
  position: absolute;
  height: 15px;
  top: 0;
  right: 0;
  background-color: red;
  font-size: 10px;
  line-height: 15px;
}
.width-15 {
  width: 15px;
}
.width-content {
  width: fit-content;
}
</style>
