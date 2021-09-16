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
        <v-list-item
          v-for="(item, index) in companionDialogMockup"
          :key="index"
          class="flex-column align-items-start"
        >
          <v-list-item-title class="align-self-start">{{
            item.title
          }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.sub }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CompanionEducation",
  data() {
    return {
      companionDialogMockup: [
        {
          title: "Стоматолог",
          sub: "Должность",
        },
        {
          title: "Россия",
          sub: "Страна",
        },
        {
          title: "русский",
          sub: "Язык",
        },
        {
          title: "Кыргызская Государственная Медицинская Академия",
          sub: "Образование",
        },
      ],
    };
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
