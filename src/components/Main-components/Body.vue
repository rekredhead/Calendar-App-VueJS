<script setup lang="ts">
import { eachDayOfInterval, endOfWeek, startOfToday, startOfWeek, set, format, isSameDay, eachHourOfInterval } from 'date-fns';
//import { ref } from 'vue';

const currentDate = startOfToday();
const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
const currentWeekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

const daysOfWeek = eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd });
const hoursOfDay = eachHourOfInterval({ start: currentDate, end: set(currentDate, { hours: 23 }) });

const convertDecimalTimeTo24HourTime = (decimalTime: number) => {
   const hours = Math.floor(decimalTime);
   const decimalMinutes = (decimalTime - hours) * 60;
   const roundedMinutes = Math.round(decimalMinutes / 15) * 15;

   const time = set(new Date(), { hours, minutes: roundedMinutes });
   return format(time, 'HH:mm');
}

const handleDateTimeClick = (e: any) => {
   const yCoordinate = e.offsetY > 0 ? e.offsetY : 1;
   const maxHeight = e.target.clientHeight;

   const timeSelected = (yCoordinate / maxHeight) * 24;
   console.log(convertDecimalTimeTo24HourTime(timeSelected));
}
</script>

<template>
   <main class="flex flex-col h-[86%] pl-3">
      <div class="flex h-[12%]">
         <!-- Labels for the days of the week -->
         <div class="flex justify-center items-center w-20">
            <span class="material-symbols-outlined text-slate-500">schedule</span>
         </div>
         <div class="flex w-full">
            <div class="flex w-full justify-center items-center text-slate-500" v-for="dayOfWeek in daysOfWeek">
               <p
                  :class="{ 'text-white bg-blue-600': isSameDay(dayOfWeek, currentDate) }"
                  class="flex items-center justify-center h-3/4 aspect-square text-xl rounded-full"
               >
                  {{ format(dayOfWeek, 'dd') }}
               </p>
               <p
                  :class="{ 'text-blue-600 ml-1': isSameDay(dayOfWeek, currentDate) }"
                  class="font-bold"
               >
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
            <div @click="handleDateTimeClick" v-for="_ in daysOfWeek" class="w-full">
            </div>
         </div>
      </div>
   </main>
</template>

<!--
[{
   date: 23-Oct-2019,
   events: [
      {
         task: 'Do the laundary',
         startTime: 09:00
         endTime: 10:00
         timeStamp: dd-mm-yyy 05:30:25:89
      },
      {
         task: 'Workout',
         startTime: 16:00
         endTime: 17:00
         timeStamp: dd-mm-yyy 05:30:26:14
      }
   ]
}]
-->