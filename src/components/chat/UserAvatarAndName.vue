<template>
  <v-list-item @click="$emit('click')" :ripple="false" :disabled="disabled">
    <v-list-item-avatar :size="avatarSize">
      <v-img style="background-color: red;"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="text-truncate text-no-wrap">
        Андрей Романов Андрей Романов Андрей Романов
      </v-list-item-title>
      <slot name="subtitle"></slot>
    </v-list-item-content>
    <slot name="badge"></slot>
  </v-list-item>
</template>

<script>
export default {
  name: "UserAvatarAndName",
  props: {
    online: {
      type: Boolean,
      default: false,
    },
    avatarSize: {
      type: Number,
      default: 50,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.v-list-item {
  background-color: transparent !important;
  width: 50%;
  &:after,
  &:before {
    content: unset;
  }
}
.theme--light.v-list-item--disabled {
  color: black;
}
.online {
  &:before {
    content: "●";
    color: #35d11b;
  }
}
.offline {
  &:before {
    content: "●";
  }
}
</style>
