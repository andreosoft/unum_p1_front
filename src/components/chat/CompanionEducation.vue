<template>
  <v-card
    tile
    style="box-shadow: 0px 4px 8px rgba(186, 186, 186, 0.25);"
    class="mb-3 pa-3"
  >
    <div class="d-flex">
      <div>
        <v-icon size="20">mdi-alert-circle-outline</v-icon>
      </div>
      <v-list class="py-0">
        <v-list-item class="flex-column align-items-start">
          <v-list-item-title class="align-self-start">
            {{ specialty }}
          </v-list-item-title>
          <v-list-item-subtitle>Должность</v-list-item-subtitle>
        </v-list-item>
        <v-list-item class="flex-column align-items-start">
          <v-list-item-title class="align-self-start">
            {{ country }}
          </v-list-item-title>
          <v-list-item-subtitle>Страна</v-list-item-subtitle>
        </v-list-item>
        <v-list-item class="flex-column align-items-start">
          <v-list-item-title class="align-self-start">
            {{ lang }}
          </v-list-item-title>
          <v-list-item-subtitle>Язык</v-list-item-subtitle>
        </v-list-item>
        <v-list-item class="flex-column align-items-start">
          <v-list-item-title class="align-self-start">
            {{ uni }}
          </v-list-item-title>
          <v-list-item-subtitle>Образование</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CompanionEducation",
  props: {
    specialty: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    lang: {
      type: String,
      default: "",
    },
    uni: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.v-list-item:after {
  content: unset;
}
.v-list-item__title {
  white-space: normal;
}
</style>
