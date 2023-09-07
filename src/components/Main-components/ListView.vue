<script setup lang="ts">
import { PropType } from 'vue';
import { Appointment } from '../types';
import { eachHourOfInterval, format, isSameDay, set, startOfToday } from 'date-fns';

const props = defineProps({
   appointments: Array as PropType<Appointment[]>,
   selectedDateStart: Date,
   selectedDateEnd: Date,
   openSidePanel: Function
});

const currentDate = startOfToday();
const hoursOfDay = eachHourOfInterval({
   start: currentDate,
   end: set(currentDate, { hours: 23 })
});
const handleDateTimeClick = () => {
   return;
}
</script>

<template>
   <main class="flex flex-col h-4/5 ml-3">
      <div class="flex h-32">
         <!-- Label for the day -->
         <div class="flex justify-center items-center w-20">
            <span class="material-symbols-outlined text-slate-500">schedule</span>
         </div>
         <div class="flex w-full px-5">
            <div class="flex w-full items-center text-slate-500">
               <p :class="{ 'text-white bg-blue-600': isSameDay(props.selectedDateStart!, currentDate) }"
                  class="flex items-center justify-center h-3/4 aspect-square text-xl rounded-full">
                  {{ format(props.selectedDateStart!, 'dd') }}
               </p>
               <p :class="{ 'text-blue-600 ml-1': isSameDay(props.selectedDateStart!, currentDate) }" class="font-bold">
                  {{ format(props.selectedDateStart!, 'EEEE') }}
               </p>
            </div>
         </div>
      </div>
      <div class="flex overflow-y-scroll">
         <div class="w-20">
            <div v-for="hour in hoursOfDay" class="h-16 text-slate-500 text-center">{{ format(hour, 'HH:mm') }}</div>
         </div>
         <div class="flex flex-col w-full h-full mt-3">
            <div class="relative w-full">
               <!-- Appointment renders here -->
               <div v-for="hour in hoursOfDay" @click="handleDateTimeClick()"
                  class="h-16 border-l border-t border-slate-400 last:border-b"></div>
            </div>
         </div>
      </div>
   </main>
</template>