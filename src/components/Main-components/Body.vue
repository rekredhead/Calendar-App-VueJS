<script setup lang="ts">
import { eachDayOfInterval, getHours, startOfToday, set, format, isSameDay, eachHourOfInterval, differenceInMinutes } from 'date-fns';
import { computed, ref } from 'vue';

const props = defineProps({
   selectedWeekStart: Date,
   selectedWeekEnd: Date,
   openSidePanel: Function
});

const tasks = ref([
   {
      date: set(new Date(), { date: 1 }),
      events: [
         {
            task: 'Task1',
            startTime: set(new Date(), { hours: 9, minutes: 30 }),
            endTime: set(new Date(), { hours: 10, minutes: 0 }),
            timeStamp: new Date()
         },
         {
            task: 'Task2',
            startTime: set(new Date(), { hours: 16, minutes: 15 }),
            endTime: set(new Date(), { hours: 20, minutes: 45 }),
            timeStamp: new Date()
         }
      ]
   }
]);
const convertTimeToTopEM = (time: Date) => `${(time.getHours() * 4 + ((time.getMinutes() * 4 ) / 60))}em`;
const convertTimeToHeightEM = (startingTime: Date, endingTime: Date) => {
   const timeDifferenceInMinutes = differenceInMinutes(endingTime, startingTime);

   const hoursDifference = Math.round(timeDifferenceInMinutes / 60);
   const minutesDifference = (timeDifferenceInMinutes - (hoursDifference * 60));

   return `${hoursDifference * 4 + ((minutesDifference * 4) / 60)}em`;
};

const currentDate = startOfToday();
const daysOfWeek = computed(() => eachDayOfInterval({
   start: props.selectedWeekStart!,
   end: props.selectedWeekEnd!
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
   props.openSidePanel!(time);
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
               <div v-for="task in tasks">
                  <div v-if="isSameDay(task.date, day)" v-for="event in task.events">
                     <div
                        class="absolute border border-blue-600 w-5/6"
                        :style="{ top: convertTimeToTopEM(event.startTime), height: convertTimeToHeightEM(event.startTime, event.endTime) }"
                     >
                        hello
                     </div>
                  </div>
               </div>
               <div v-for="hour in hoursOfDay" @click="handleDateTimeClick($event, hour, day)"
                  class="h-16 border-l border-t border-slate-400 last:border-b"></div>
            </div>
         </div>
      </div>
   </main>
</template>