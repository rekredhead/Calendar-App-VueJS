<script setup lang="ts">
import { ref } from 'vue';
import { startOfToday, startOfWeek, endOfWeek, add, format } from 'date-fns';

const currentDate = startOfToday();
const currentWeekStart = startOfWeek(currentDate);
const currentWeekEnd = endOfWeek(currentDate);

const selectedWeekStart = ref(currentWeekStart);
const selectedWeekEnd = ref(currentWeekEnd);

const getPreviousDate = () => {
   const prevWeekStart = add(selectedWeekStart.value, { weeks: -1 });
   const prevWeekEnd = add(selectedWeekEnd.value, { weeks: -1 });
   selectedWeekStart.value = prevWeekStart;
   selectedWeekEnd.value = prevWeekEnd;
}
const getNextDate = () => {
   const nextWeekStart = add(selectedWeekStart.value, { weeks: 1 });
   const nextWeekEnd = add(selectedWeekEnd.value, { weeks: 1 });
   selectedWeekStart.value = nextWeekStart;
   selectedWeekEnd.value = nextWeekEnd;
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

const handleRefresh = () => {
   console.log('refresh button pressed');
}
const handlePrint = () => {
   console.log('printer button pressed');
}
const handleFilterClick = () => {
   console.log('filter button pressed');
}
const handleScheduleSettingClick = () => {
   console.log('schedule setting button pressed');
}
</script>

<template>
   <nav class="flex justify-between items-center border border-b-slate-300 px-10 py-4 h-[6%]">
      <div class="flex gap-1 justify-between items-center w-60">
         <button class="bg-white px-2 py-1 text-slate-500 rounded-md" @click="getPreviousDate">&lt;</button>
         <span class="bg-white py-1 text-slate-500 rounded-md w-full text-center">
            {{ `${format(selectedWeekStart, 'MMM dd')} - ${format(selectedWeekEnd, 'MMM dd, yyyy')}` }}
         </span>
         <button class="bg-white px-2 py-1 text-slate-500 rounded-md" @click="getNextDate">&gt;</button>
      </div>
      <div class="flex gap-2">
         <button @click="handleRefresh" class="optionsBarButton">
            <span class="material-symbols-outlined">cached</span>
         </button>
         <button @click="handlePrint" class="optionsBarButton">
            <span class="material-symbols-outlined">print</span>
         </button>
         <button @click="handleFilterClick" class="optionsBarButton gap-1">
            <span class="material-symbols-outlined">filter_alt</span>
            <p class="font-semibold">Filter</p>
         </button>
         <button @click="handleScheduleSettingClick" class="optionsBarButton gap-1">
            <span class="material-symbols-outlined">page_info</span>
            <p class="font-semibold">Schedule Setting</p>
         </button>
      </div>
   </nav>
</template>
