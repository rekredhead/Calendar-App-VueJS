<script setup lang="ts">
import Header from './Main-components/Header.vue';
import OptionsBar from './Main-components/OptionsBar.vue';
import Body from './Main-components/Body.vue';
import SidePanel from './SidePanel-components/SidePanel.vue';

import { startOfToday, startOfWeek, endOfWeek, add } from 'date-fns';
import { ref } from 'vue';

const currentDate = startOfToday();
const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
const currentWeekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

const selectedWeekStart = ref(currentWeekStart);
const selectedWeekEnd = ref(currentWeekEnd);

const getPreviousDate = () => {
   selectedWeekStart.value = add(selectedWeekStart.value, { weeks: -1 });
   selectedWeekEnd.value = add(selectedWeekEnd.value, { weeks: -1 });
}
const getNextDate = () => {
   selectedWeekStart.value = add(selectedWeekStart.value, { weeks: 1 });
   selectedWeekEnd.value = add(selectedWeekEnd.value, { weeks: 1 });
}

const isSidePanelOpen = ref(false);
const selectedDate = ref(currentDate);
const openSidePanel = (dateTime: Date) => {
   isSidePanelOpen.value = true;
   selectedDate.value = dateTime;
};
const closeSidePanel = () => {
   isSidePanelOpen.value = false;
   // Modify this to add appointments in the calendar
}

/*
const selectedDate = ref(startOfToday());

const getPreviousDate = () => {
   const prevDate = add(selectedDate.value, { months: -1 });
   selectedDate.value = prevDate;
}
const getNextDate = () => {
   const nextDate = add(selectedDate.value, { months: 1 });
   selectedDate.value = nextDate;
}
*/
</script>

<template>
   <div class="flex relative flex-col h-screen bg-blue-100 pb-5">
      <div v-if="isSidePanelOpen" class="absolute inset-0 bg-black opacity-40"></div>
      <Header></Header>
      <OptionsBar
         :selectedWeekStart="selectedWeekStart"
         :selectedWeekEnd="selectedWeekEnd"
         :getPreviousDate="getPreviousDate"
         :getNextDate="getNextDate"
      ></OptionsBar>
      <Body
         :selectedWeekStart="selectedWeekStart"
         :selectedWeekEnd="selectedWeekEnd"
         :openSidePanel="openSidePanel"
      ></Body>
      <SidePanel :isSidePanelOpen="isSidePanelOpen" :closeSidePanel="closeSidePanel" :selectedDate="selectedDate" />
   </div>
</template>