<script setup lang="ts">
import { eachDayOfInterval, endOfWeek, startOfToday, startOfWeek, format } from 'date-fns';

const currentDate = startOfToday();
const currentWeekStart = startOfWeek(currentDate);
const currentWeekEnd = endOfWeek(currentDate);
const daysOfWeek = eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd });

/*
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
*/
</script>

<template>
   <main class="h-[86%] overflow-y-scroll">
      <div class="flex border border-black justify-evenly">
         <span class="" v-for="dayOfWeek in daysOfWeek">
            {{ format(dayOfWeek, 'dd EEE') }}
         </span>
      </div>
      Plan how the calendar will be rendered, put events data as well
      Note the problems - analyse the problem - break them down to smaller problems
      <div v-for="(_, index) in Array(50)">
         {{ index }}
      </div>
   </main>
</template>