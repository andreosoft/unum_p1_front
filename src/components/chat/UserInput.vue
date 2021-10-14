<template>
  <div class="d-flex chat-window__input position-relative">
    <div
      class="d-flex align-items-center justify-content-center cursor-pointer"
      style="width: 48px; height: 100%; background-color: #fff; border-right: 1px solid #EFEFEF;"
    >
      <v-file-input
        hide-input
        hide-details
        dense
        type="file"
        class="ma-0 mx-auto"
        accept="image/*, video/*, audio/*, .doc, .docx, .pdf, .xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        @change="onChange"
        :value="file"
        ref="fileInput"
      ></v-file-input>
    </div>
    <v-text-field
      v-model="message"
      class="rounded-0"
      hide-details
      placeholder="Начните печатать сообщение..."
      flat
      solo
      append-icon="mdi-emoticon-happy-outline"
      @click:append="$emit('chooseEmoji')"
    ></v-text-field>
    <div style="width: 48px;" class="cursor-pointer">
      <div
        class="d-flex align-items-center justify-content-center position-relative send__button"
        :class="{ disabled: message.length === 0 && !file }"
      >
        <v-icon
          class="position-absolute"
          style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
          color="white"
          :disabled="message.length === 0 && !file"
          @click="
            $emit('sendMessage', { message, file }),
              ((message = ''), (file = null))
          "
        >
          mdi-send
        </v-icon>
      </div>
    </div>

    <!-- image preview -->
    <div v-if="file && file.type.includes('image/')" class="files pa-5">
      <div class="position-relative">
        <v-img class="rounded-lg preview--img" :src="previewUrl"> </v-img>
        <v-icon color="grey" class="position-absolute" @click="file = null">
          mdi-close-circle-outline
        </v-icon>
      </div>
    </div>

    <!-- document preview -->
    <!-- code is here -->

    <!-- video, audio -->
    <!-- code is here -->
  </div>
</template>

<script>
export default {
  name: "UserInput",
  data() {
    return {
      message: "",
      file: null,
      previewUrl: "",
    };
  },
  watch: {
    previewUrl(val) {
      console.log(val);
    },
  },
  methods: {
    async onChange(e) {
      console.log(e);
      this.file = e;
      this.previewUrl = URL.createObjectURL(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.send__button {
  background-color: #406278;
  padding-top: 100%;
}
.disabled {
  background-color: #cacaca;
}
.files {
  position: absolute;
  bottom: 100%;
  height: 120px;
  background-color: #cecece;
  width: 100%;
  & > div {
    height: 100%;
    width: 100%;
  }
  .v-icon {
    top: 0;
  }
  .preview--img {
    display: block;
    width: 100px;
    max-height: 100%;
    background-color: cyan;
    border: 1px solid #cecece;
  }
}
</style>
<style lang="scss">
.chat-window__input {
  .v-input__prepend-outer {
    margin: 0 !important;
    width: 100%;
  }
}
</style>
