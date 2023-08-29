<script setup lang="ts">
import { eachDayOfInterval, endOfWeek, startOfToday, startOfWeek, set, format, isSameDay, eachHourOfInterval } from 'date-fns';
//import { ref } from 'vue';

/** Things to finish
 * Align the weekly dates (28 Mon, 29 Tue) properly so it is present even when scrolling
 * Make the timezones get scrolled along with the calendar body
*/

const currentDate = startOfToday();
const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
const currentWeekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
const daysOfWeek = eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd });

const hoursOfDay = eachHourOfInterval({
   start: currentDate,
   end: set(currentDate, { hours: 23 })
});

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

   const timeSelected = (yCoordinate / maxHeight) * 12;
   console.log(convertDecimalTimeTo24HourTime(timeSelected));
}
</script>

<template>
   <main class="flex h-[86%] pl-3 overflow-y-scroll">
      <div class="w-20 mt-12">
         <!-- Contains the time-zones like 09:00, 10:00 -->
         <div v-for="hour in hoursOfDay" class="h-16 text-slate-500 text-center">{{ format(hour, 'HH:mm') }}</div>
      </div>
      <div class="flex justify-evenly w-full h-full">
         <!-- Each day of the week is a column containing the day-label and a clickable area to add tasks -->
         <div class="flex relative flex-col w-full" v-for="dayOfWeek in daysOfWeek">
            <div
               class="flex absolute top-0 right-0 left-0 gap-1 text-slate-500 justify-center p-2 items-center bg-red-500">
               <p :class="{ 'text-white bg-blue-600': isSameDay(dayOfWeek, currentDate) }"
                  class="text-center h-full aspect-square text-xl rounded-full p-1">
                  {{ format(dayOfWeek, 'dd') }}
               </p>
               <p :class="{ 'text-blue-600': isSameDay(dayOfWeek, currentDate) }" class="font-bold">{{ format(dayOfWeek,
                  'EEE') }}</p>
            </div>
            <div @click="handleDateTimeClick" class="w-full h-full mt-16">
               <div v-for="_ in Array(24)" class="h-16 border-l border-b border-slate-400"></div>
            </div>
         </div>
      </div>
   </main>
</template>

<!--
Idea:
each day of the week (e.g. 23-Mon or 24-Tue) has it's own object in an array. For example:
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

Each day will have it's own column in the weekly calendar.
On the side are the times for a fully day. Each time (e.g. 09:00 or 10:00) is on the calendar as a label.
There is a horizontal line for each time on the calendar for to make easier to see only (no complex functionality to the line).
Each day column has the label (which is the day like 23 Mon) at the top and a clickable element below
   it expanding for 00:00 (earliest morning) to 23:59 (midnight).
When the user clicks on the element, it should gets the coordinates of area that was clicked and map it to the nearest 5-minute time (e.g. 14:35).
After the time was obtained, it should open the slide-in panel to allow the user to add a task.
   The slide-in panel should have the startTime as the time that was clicked on.
The slide-in panel submission should have the correct data as the EXAMPLE ARRAY above.
Use sample data to render some tasks in different times at different dates.
-->