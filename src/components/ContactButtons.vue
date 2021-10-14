<template>
  <div class="patient-actions__list">
    <v-tooltip bottom v-for="item in patientActions" :key="item.id">
      <template #activator="{ on, attrs }">
        <a
          v-if="item.href"
          class="rounded patient-actions__item"
          :href="item.href"
          v-on="on"
          v-bind="attrs"
        >
          <v-icon size="17" v-text="item.icon" color="white"> </v-icon>
        </a>
        <button
          v-else
          class="rounded patient-actions__item w-100"
          v-on="on"
          v-bind="attrs"
          @click="item.action"
        >
          <v-badge
            v-if="item.notifications"
            :content="item.notifications"
            color="red"
          >
            <v-icon size="17" v-text="'mdi-chat'" color="white"> </v-icon>
          </v-badge>
          <v-icon v-else size="17" v-text="'mdi-chat'" color="white"> </v-icon>
        </button>
      </template>
      <span>{{ item.tooltip }}</span>
    </v-tooltip>
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
        {
          icon: "mdi-chat",
          action: this.createChat,
          id: 3,
          tooltip: "Написать сообщение",
          notifications: 0,
        },
      ];
      return actions;
    },
  },
  methods: {
    createChat() {
      this.$emit("createChat");
    },
  },
};
</script>

<style lang="scss" scoped>
.patient-actions__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
}
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
