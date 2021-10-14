<template>
  <v-card
    tile
    style="box-shadow: 0px 4px 8px rgba(186, 186, 186, 0.25);"
    class="pa-3"
  >
    <div class="d-flex">
      <div class="pt-3">
        <v-icon size="20">mdi-format-list-bulleted</v-icon>
      </div>
      <v-list class="pa-0">
        <v-list-item
          v-for="(item, index) in actions"
          :key="index"
          @click="item.action"
        >
          <v-list-item-title :style="`color: ${item.color && item.color}`">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CompanionActions",
  data() {
    return {
      actions: [
        // {
        //   title: "Поделиться контактом",
        // },
        // {
        //   title: "Изменить контакт",
        // },
        {
          title: "Удалить контакт",
          action: this.removeChat,
        },
        {
          title: "Очистить историю",
          action: this.clearHistory,
        },
        // {
        //   title: "Заблокировать",
        //   color: "#FF3636",
        // },
      ],
    };
  },
  methods: {
    removeChat() {
      this.$emit("removeChat");
    },
    clearHistory() {
      this.$emit("clearHistory");
    },
  },
};
</script>

<style></style>
