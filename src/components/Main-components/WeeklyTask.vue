<script setup lang="ts">
import { format, differenceInMinutes, set } from 'date-fns';
import { PropType, ref } from 'vue';
import { Event } from '../types';

const props = defineProps({
   event: Object as PropType<Event>,
   openSidePanel: Function
});

const isResizing = ref(false);
const initialHeight = ref(0);
const startY = ref(0);
const startTime = ref(props.event!.startTime);
const endTime = ref(props.event!.endTime);

const convertTimeToTopEM = (time: Date) => `${(time.getHours() * 4 + ((time.getMinutes() * 4) / 60))}em`;
const convertTimeToHeightEM = (startingTime: Date, endingTime: Date) => {
   const timeDifferenceInMinutes = differenceInMinutes(endingTime, startingTime);

   const hoursDifference = Math.round(timeDifferenceInMinutes / 60);
   const minutesDifference = (timeDifferenceInMinutes - (hoursDifference * 60));

   return `${hoursDifference * 4 + ((minutesDifference * 4) / 60)}em`;
};
const convertHeightInEMToEndTime = (heightInEM: string) => {
   const height = parseInt(heightInEM.slice(0, -2));

   const hoursDifference = Math.trunc(height / 4);
   const minutesDifference = ( (height / 4) - hoursDifference ) * 60;
   
   const endTimeHours = hoursDifference + startTime.value.getHours();
   const endTimeMinutes = minutesDifference + startTime.value.getMinutes();

   return set(endTime.value, { hours: endTimeHours, minutes: endTimeMinutes });
}

const divHeight = ref(convertTimeToHeightEM(startTime.value, endTime.value));

const handleClick = () => {
   props.openSidePanel!({
      id: props.event!.id,
      service: props.event!.service,
      patient: props.event!.patient,
      startingDateTime: startTime.value,
      endingDateTime: endTime.value,
   });
}

const startResize = (e: MouseEvent) => {
   const eventTarget = e.target as HTMLDivElement;
   const parentElement = eventTarget.parentElement as HTMLDivElement;

   isResizing.value = true;
   initialHeight.value = parentElement.offsetHeight;

   startY.value = e.clientY;

   window.addEventListener('mousemove', resize);
   window.addEventListener('mouseup', stopResize);
}
const resize = (e: MouseEvent) => {
   if (!isResizing.value) return;
   const deltaY = e.clientY - startY.value;
   const newHeight = initialHeight.value + deltaY;

   divHeight.value = Math.round(newHeight / 16) + "em"; // Resize every 1em
}
const stopResize = () => {
   // Sometimes after resizing, when the cursor is over the main div and not over the resizingDiv,
   // it triggers the click event in the main div and opens the side panel accidentally
   isResizing.value = false;
   window.removeEventListener('mousemove', resize);
   window.removeEventListener('mouseup', stopResize);

   endTime.value = convertHeightInEMToEndTime(divHeight.value);
   props.event!.endTime = endTime.value;
}
</script>

<template>
   <div :key="props.event!.id" @click="handleClick" class="weeklyTaskContainer"
      :style="{ top: convertTimeToTopEM(props.event!.startTime), height: divHeight }">
      <div>
         <h1 class="text-sm">{{ props.event!.patient.name }}</h1>
         <h2 class="text-xs text-slate-500">{{ props.event!.service.nameOfService }}</h2>
      </div>
      <div class="text-xs text-slate-500">
         {{ format(startTime, 'HH:mm') }} - {{ format(endTime, 'HH:mm') }}
      </div>
      <div @click.stop @mousedown="startResize" class="cursorResizable" :style="{ userSelect: isResizing ? 'none' : 'auto' }"></div>
   </div>
</template>