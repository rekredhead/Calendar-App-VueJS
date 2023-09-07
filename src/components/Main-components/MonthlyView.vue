<script setup lang="ts">
import { eachDayOfInterval, isSameDay, startOfToday, format, addHours } from 'date-fns';
import { PropType, computed } from 'vue';
import MonthlyTask from './MonthlyTask.vue';
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

const handleDateTimeClick = (selectedDay: Date) => {
   props.openSidePanel!({
      service: {},
      patient: {},
      startingDateTime: selectedDay,
      endingDateTime: addHours(selectedDay, 1)
   })
}
</script>

<template>
   <main class="flex flex-col h-4/5 ml-3">
      <div class="grid grid-cols-7 h-full border-t border-slate-400 overflow-y-scroll">
         <div v-for="dayOfMonth in daysOfMonth" @click="handleDateTimeClick(dayOfMonth)"
            class="flex flex-col p-1 text-sm border-l border-b border-slate-400 last:border-r">
            <div class="flex justify-center">
               <p class="flex justify-center items-center h-6 w-6 rounded-full"
                  :class="{ 'text-white bg-blue-600': isSameDay(dayOfMonth, currentDate) }">{{ format(dayOfMonth, 'dd') }}
               </p>
            </div>
            <div class="h-32 overflow-y-scroll">
               <div v-for="appointment in props.appointments">
                  <div v-if="isSameDay(appointment.date, dayOfMonth)" v-for="event in appointment.events">
                     <MonthlyTask :event="event" :openSidePanel="openSidePanel" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </main>
</template>