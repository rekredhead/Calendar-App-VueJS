<script setup lang="ts">
import { eachDayOfInterval, getHours, startOfToday, set, format, isSameDay, eachHourOfInterval, addHours } from 'date-fns';
import { PropType, computed } from 'vue';
import WeeklyTask from './WeeklyTask.vue';
import { Appointment} from '../types';

const props = defineProps({
   appointments: Array as PropType<Appointment[]>,
   selectedDateStart: Date,
   selectedDateEnd: Date,
   openSidePanel: Function
});

const currentDate = startOfToday();
const daysOfWeek = computed(() => eachDayOfInterval({
   start: props.selectedDateStart!,
   end: props.selectedDateEnd!
}));
const hoursOfDay = eachHourOfInterval({
   start: currentDate,
   end: set(currentDate, { hours: 23 })
});

const handleDateTimeClick = (e: MouseEvent, hour: Date, selectedDay: Date) => {
   const selectedHour = getHours(hour);
   const eventTarget = e.target as HTMLElement;

   const yCoordinate = e.offsetY > 0 ? e.offsetY : 1;
   const maxHeight = eventTarget.clientHeight;
   const decimalMinutes = (yCoordinate / maxHeight) * 60;
   const roundedMinutes = Math.round(decimalMinutes / 15) * 15;

   const time = set(selectedDay, { hours: selectedHour, minutes: roundedMinutes });
   props.openSidePanel!({
      service: {},
      patient: {},
      startingDateTime: time,
      endingDateTime: addHours(time, 1)
   });
}
</script>

<template>
   <main class="flex flex-col h-4/5 ml-3">
      <div class="flex h-32">
         <!-- Labels for the days of the week -->
         <div class="flex justify-center items-center w-20">
            <span class="material-symbols-outlined text-slate-500">schedule</span>
         </div>
         <div class="flex w-full">
            <div class="flex w-full justify-center items-center text-slate-500" v-for="dayOfWeek in daysOfWeek">
               <p :class="{ 'text-white bg-blue-600': isSameDay(dayOfWeek, currentDate) }"
                  class="flex items-center justify-center h-3/4 aspect-square text-xl rounded-full">
                  {{ format(dayOfWeek, 'dd') }}
               </p>
               <p :class="{ 'text-blue-600 ml-1': isSameDay(dayOfWeek, currentDate) }" class="font-bold">
                  {{ format(dayOfWeek, 'EEE') }}
               </p>
            </div>
         </div>
      </div>
      <div class="flex overflow-y-scroll">
         <div class="w-20">
            <div v-for="hour in hoursOfDay" class="h-16 text-slate-500 text-center">{{ format(hour, 'HH:mm') }}</div>
         </div>
         <div class="flex w-full h-full mt-3">
            <div v-for="day in daysOfWeek" class="relative w-full">
               <div v-for="appointment in props.appointments">
                  <div v-if="isSameDay(appointment.date, day)" v-for="event in appointment.events">
                     <WeeklyTask :event="event" :openSidePanel="openSidePanel" />
                  </div>
               </div>
               <div v-for="hour in hoursOfDay" @click="handleDateTimeClick($event, hour, day)"
                  class="h-16 border-l border-t border-slate-400 last:border-b"></div>
            </div>
         </div>
      </div>
   </main>
</template>