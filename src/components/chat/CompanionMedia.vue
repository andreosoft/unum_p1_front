<template>
  <v-card
    tile
    style="box-shadow: 0px 4px 8px rgba(186, 186, 186, 0.25);"
    class="mb-3"
  >
    <v-list>
      <v-list-item
        v-for="(icon, index) in media"
        :key="index"
        :disabled="icon.disabled"
        @click="showMedia(index)"
      >
        <v-list-item-icon>
          <v-icon size="20">{{ icon.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ icon.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-dialog v-model="dialog" fullscreen content-class="media__dialog">
      <v-toolbar>
        <v-toolbar-items>
          <v-btn text @click="dialog = false">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card tile :elevation="0">
        <MediaList v-if="items" :items="items" />
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import MediaList from "./MediaList.vue";
export default {
  name: "CompanionMedia",
  components: {
    MediaList,
  },
  props: {
    photos: {
      type: Array,
      default: () => [],
    },
    videos: {
      type: Array,
      default: () => [],
    },
    files: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialog: false,
      items: null,
    };
  },
  computed: {
    media() {
      return [
        {
          icon: "mdi-image-outline",
          title: this.photos.length + " фотографий",
          list: this.photos,
          disabled: false,
        },
        {
          icon: "mdi-video-outline",
          title: this.videos.length + " видео",
          list: this.videos,
          disabled: false,
        },
        {
          icon: "mdi-file-outline",
          title: this.files.length + " файлов",
          list: this.files,
          disabled: true,
        },
        {
          icon: "mdi-attachment",
          title: "2 ссылки",
          disabled: true,
        },
      ];
    },
  },
  watch: {
    items: {
      immediate: true,
      handler(val) {
        console.log(val);
      },
    },
    dialog(val) {
      if (!val) {
        this.items = null;
      }
    },
  },
  methods: {
    showMedia(index) {
      this.dialog = true;
      this.items = this.media[index].list;
    },
  },
};
</script>

<style scoped>
.v-list-item__icon {
  margin-right: 10px !important;
}
</style>
<style lang="scss">
.media__dialog {
  .v-toolbar__content {
    padding: 0 20px;
  }
}
</style>
