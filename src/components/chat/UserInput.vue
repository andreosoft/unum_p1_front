<template>
  <div class="d-flex chat-window__input">
    <div
      class="d-flex align-items-center justify-content-center cursor-pointer"
      style="width: 48px; height: 100%; background-color: #fff; border-right: 1px solid #EFEFEF;"
    >
      <v-icon @click="$emit('attachFile')">mdi-paperclip</v-icon>
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
    <div
      style="width: 48px;"
      class="cursor-pointer"
      @click="$emit('sendMessage', message)"
    >
      <div
        class="d-flex align-items-center justify-content-center position-relative"
        style="background-color: #406278; padding-top: 100%;"
      >
        <v-icon
          class="position-absolute"
          style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
          color="white"
        >
          mdi-send
        </v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInput",
  data() {
    return {
      message: "",
    };
  },
};
</script>

<style></style>
