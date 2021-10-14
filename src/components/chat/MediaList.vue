<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
        v-for="item in items"
        :key="item.value"
        cols="5"
        sm="4"
        md="3"
        class="pa-2"
      >
        <div
          style="min-height: 100px; max-height: 250px; padding-top: 100%;"
          class="position-relative"
        >
          <ImagePreview
            class="position-absolute media__preview cursor-pointer"
            :video="item.type === 'video'"
            :mediaSrc="item.value"
            fullWidth
            :maxWidthVideoThumbnail="300"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ImagePreview from "./ImagePreview.vue";
export default {
  name: "MediaList",
  components: {
    ImagePreview,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.media__preview {
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
