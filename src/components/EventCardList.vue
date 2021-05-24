<template>
  <v-container class="pa-0">
    <v-row class="pa-0">
      <v-col v-for="(event, index) in events" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-hover>
          <template v-slot="{ hover }">
            <EventCard
              :event="event"
              :hover="hover"
              @click.native="
                $router.push({
                  name: 'Doctor',
                  params: { slug: 'my-doctors', id: event.doctor_id },
                })
              "
            ></EventCard>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventCard from './EventCard'
export default {
  name: "EventCardList",
  components: {
    EventCard
  },
  props: {
    events: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style></style>
