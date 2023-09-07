<script setup lang="ts">
import { eachDayOfInterval, isSameDay, startOfToday, format } from 'date-fns';
import { PropType, computed } from 'vue';
import { Appointment } from '../types';

const props = defineProps({
   appointments: Array as PropType<Appointment[]>,
   selectedDateStart: Date,
   selectedDateEnd: Date,
   openSidePanel: Function
});

const currentDate = startOfToday();
const daysOfMonth = computed(() => eachDayOfInterval({
   start: props.selectedDateStart!,
   end: props.selectedDateEnd!
}));
</script>

<template>
   <main class="flex flex-col h-[86%] pl-3">
      <div class="grid grid-cols-7 h-full border-t border-slate-400">
         <div
            v-for="dayOfMonth in daysOfMonth"
            class="flex flex-col p-1 text-sm border-l border-b border-slate-400 last:border-r"
         >
            <div class="flex justify-center">
               <p class="flex justify-center items-center h-6 w-6 rounded-full" :class="{ 'text-white bg-blue-600': isSameDay(dayOfMonth, currentDate)}">{{ format(dayOfMonth, 'dd') }}</p>
            </div>
         </div>
      </div>
   </main>
</template>