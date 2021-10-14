<template>
  <div class="cursor-pointer">
    <v-dialog v-model="showMedia" v-if="showMedia" width="unset">
      <v-card v-if="showMedia" class="pb-0">
        <video
          v-if="video"
          class="video__player"
          controls
          autoplay="autoplay"
          muted="muted"
        >
          <source
            :src="`http://api.neomedy.com/api/file/download/${mediaSrc}`"
            type="video/mp4"
          />
        </video>
        <v-img v-else :src="mediaSrc"> </v-img>
      </v-card>
    </v-dialog>
    <div v-if="!video" :style="fullWidth ? 'height: 100%; width: 100%;' : ''">
      <v-img
        :src="mediaSrc"
        :style="{ maxWidth: `${maxWidthVideoThumbnail}px`, height: '100%' }"
        @click="showMedia = true"
      ></v-img>
    </div>
    <div v-else class="position-relative thumbnail">
      <v-icon class="position-absolute thumbnail__icon" size="40" dark>
        mdi-play-circle-outline
      </v-icon>
      <video
        :src="`http://api.neomedy.com/api/file/download/${mediaSrc}`"
        class="thumbnail__video"
        :style="{ maxWidth: `${maxWidthVideoThumbnail}px` }"
        @click="showMedia = true"
      ></video>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImagePreview",
  props: {
    mediaSrc: {
      type: String,
      default: "",
    },
    video: {
      type: Boolean,
      default: false,
    },
    maxWidthVideoThumbnail: {
      type: [Number, String],
      default: 200,
    },
    fullWidth: { type: Boolean, default: false },
    src: String,
  },
  data() {
    return {
      showMedia: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.video__player {
  width: 100%;
  height: 100%;
  max-height: 500px;
  display: block;
}
.thumbnail {
  height: 100%;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.thumbnail__video {
  width: 100%;
  height: 100%;
  display: block;
}
.thumbnail__icon {
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
.v-card {
  height: 100%;
}
</style>
