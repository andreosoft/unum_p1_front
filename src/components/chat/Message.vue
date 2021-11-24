<template>
  <div class="d-flex flex-column">
    <slot name="message-date" :date="date"> </slot>
    <div class="d-flex message__body" :class="{ 'align-self-end': me }">
      <slot name="user-image"></slot>
      <v-card
        class="pa-3 rounded-xl emir"
        :class="[me ? 'rounded-br-0' : 'rounded-bl-0']"
        :color="me ? '#bed5ec' : ''"
        :max-width="
          $vuetify.breakpoint.smAndDown &&
          attachments.length &&
          attachments[0].type === 'audio'
            ? 330
            : $vuetify.breakpoint.smAndDown
            ? 250
            : 350
        "
      >
        <v-card-subtitle v-if="showMsgAuthor" class="pa-0">
          <span style="font-weight: 800">
            {{ msgAuthor }}
          </span>
        </v-card-subtitle>
        <v-card-text class="pa-0">
          {{ message }}
        </v-card-text>
        <!-- image -->
        <div v-if="attachments.length && attachments[0].type === 'image'">
          <ImagePreview :mediaSrc="attachments[0].value" />
        </div>
        <!-- file -->
        <div v-if="attachments.length && attachments[0].type === 'file'">
          <a :href="download(attachments[0].value)" target="_blank">
            <div>
              <div
                style="height: 100px; width: 100%; background-color: white;"
                class="d-flex justify-content-center align-items-center flex-column"
              >
                <v-icon>mdi-download</v-icon>
                document
              </div>
              <span>{{ attachments[0].name || "file name" }}</span>
            </div>
          </a>
        </div>
        <!-- video -->
        <div
          v-if="attachments.length && attachments[0].type === 'video'"
          class="position-relative"
        >
          <ImagePreview video :mediaSrc="attachments[0].value" />
        </div>
        <!-- audio -->

        <div v-if="attachments.length && attachments[0].type === 'audio'">
          <audio :src="download(attachments[0].value)" controls></audio>
        </div>
        <v-card-text class="pa-0 d-flex" style="justify-content: flex-end;">
          <span style="font-style: italic;">{{ date | formatTime }}</span>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import dayjs from "dayjs";
import api from "./../../config/api";
import ImagePreview from "./ImagePreview.vue";
const { mapGetters: Getters_doctors } = createNamespacedHelpers("doctors");

export default {
  name: "Message",
  props: {
    message: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    me: {
      type: Boolean,
      default: false,
    },
    attachments: {
      type: Array,
      default: () => [],
    },
    showMsgAuthor: {
      type: Boolean,
      default: false,
    },
    msgAuthor: {
      type: String,
      default: "",
    },
  },
  filters: {
    formatTime(v) {
      return dayjs(v).format("HH:MM");
    },
  },
  components: {
    ImagePreview,
  },
  data() {
    return {
      showVideo: false,
    };
  },
  computed: {
    ...Getters_doctors(["imageSrc"]),
  },
  watch: {
    attachments: {
      immediate: true,
      handler(val) {
        // if (val[0].type === "image") {
        //   console.log(this.imageSrc(val[0].file));
        // }
        // console.log(val);
      },
    },
  },
  methods: {
    download(id) {
      return `https://api.neomedy.com/api/${api.get_file}/${id}`;
    },
  },
};
</script>

<style></style>
