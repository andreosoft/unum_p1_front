<template>
  <v-card
    tile
    style="box-shadow: 0px 4px 8px rgba(186, 186, 186, 0.25);"
    class="pa-3"
  >
    <div class="d-flex">
      <div>
        <v-icon size="20">mdi-format-list-bulleted</v-icon>
      </div>
      <v-list class="pa-0">
        <v-list-item v-for="(item, index) in actions" :key="index">
          <v-list-item-title
            :style="`color: ${item.color && item.color}`"
            class="align-self-start"
            >{{ item.title }}</v-list-item-title
          >
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
        {
          title: "Поделиться контактом",
        },
        {
          title: "Изменить контакт",
        },
        {
          title: "Удалить контакт",
        },
        {
          title: "Очистить историю",
        },
        {
          title: "Заблокировать",
          color: "#FF3636",
        },
      ],
    };
  },
};
</script>

<style></style>
