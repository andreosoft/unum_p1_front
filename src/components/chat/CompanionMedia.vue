<template>
  <v-card
    tile
    style="box-shadow: 0px 4px 8px rgba(186, 186, 186, 0.25);"
    class="mb-3"
  >
    <v-list>
      <v-list-item v-for="(icon, index) in icons" :key="index">
        <v-list-item-icon>
          <v-icon size="20">{{ icon.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ icon.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "CompanionMedia",
  data() {
    return {
      icons: [
        {
          icon: "mdi-image-outline",
          title: "128 фотографий",
        },
        {
          icon: "mdi-video-outline",
          title: "2 видео",
        },
        {
          icon: "mdi-file-outline",
          title: "8 файлов",
        },
        {
          icon: "mdi-attachment",
          title: "2 ссылки",
        },
      ],
    };
  },
};
</script>

<style scoped>
.v-list-item__icon {
  margin-right: 10px !important;
}
</style>
