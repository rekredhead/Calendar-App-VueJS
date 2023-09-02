<script setup lang="ts">
import { format, differenceInMinutes } from 'date-fns';

const props = defineProps({
   event: Object
});
const event = props.event!;

const convertTimeToTopEM = (time: Date) => `${(time.getHours() * 4 + ((time.getMinutes() * 4) / 60))}em`;
const convertTimeToHeightEM = (startingTime: Date, endingTime: Date) => {
   const timeDifferenceInMinutes = differenceInMinutes(endingTime, startingTime);

   const hoursDifference = Math.round(timeDifferenceInMinutes / 60);
   const minutesDifference = (timeDifferenceInMinutes - (hoursDifference * 60));

   return `${hoursDifference * 4 + ((minutesDifference * 4) / 60)}em`;
};
</script>

<template>
   <div
      class="flex flex-col justify-between p-3 absolute left-2 shadow-md shadow-slate-300 rounded-md bg-white border-t-4 border-blue-600 w-5/6"
      :style="{ top: convertTimeToTopEM(event.startTime), height: convertTimeToHeightEM(event.startTime, event.endTime) }"
   >
      <div class="font-semibold">{{ event.task }}</div>
      <div class="font-semibold text-sm text-slate-500">
         {{ format(event.startTime, 'HH:mm') }} - {{ format(event.endTime,'HH:mm') }}</div>
   </div>
</template>