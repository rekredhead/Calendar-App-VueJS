<script setup lang="ts">
import { format, differenceInMinutes } from 'date-fns';
import { PropType, ref } from 'vue';

interface Service {
   nameOfService: string;
   price: number;
}
interface Patient {
   profilePicture: string;
   name: string;
   emailAddress: string;
   phone: string;
   address: string;
}
interface Event {
   id: string;
   patient: Patient;
   service: Service;
   startTime: Date;
   endTime: Date;
   timeStamp: Date
}
const props = defineProps({
   event: Object as PropType<Event>,
   openSidePanel: Function
});

const isResizing = ref(false);
const initialHeight = ref(0);
const startY = ref(0);

const convertTimeToTopEM = (time: Date) => `${(time.getHours() * 4 + ((time.getMinutes() * 4) / 60))}em`;
const convertTimeToHeightEM = (startingTime: Date, endingTime: Date) => {
   const timeDifferenceInMinutes = differenceInMinutes(endingTime, startingTime);

   const hoursDifference = Math.round(timeDifferenceInMinutes / 60);
   const minutesDifference = (timeDifferenceInMinutes - (hoursDifference * 60));

   return `${hoursDifference * 4 + ((minutesDifference * 4) / 60)}em`;
};

const divHeight = ref(convertTimeToHeightEM(props.event!.startTime, props.event!.endTime));

const handleClick = () => {
   console.log('click');
   props.openSidePanel!({
      id: props.event!.id,
      service: props.event!.service,
      patient: props.event!.patient,
      startingDateTime: props.event!.startTime,
      endingDateTime: props.event!.endTime,
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

   // Resize every 1em
   divHeight.value = Math.round(newHeight / 16) + "em";
}
const stopResize = () => {
   console.log('stop');
   isResizing.value = false;
   window.removeEventListener('mousemove', resize);
   window.removeEventListener('mouseup', stopResize);
}
</script>

<template>
   <div :key="props.event!.id" @click="handleClick" class="weeklyTaskContainer"
      :style="{ top: convertTimeToTopEM(props.event!.startTime), height: divHeight }">
      <div @mousedown="startResize" class="cursorResizable"></div>
      <div>
         <h1 class="text-sm">{{ props.event!.patient.name }}</h1>
         <h2 class="text-xs text-slate-500">{{ props.event!.service.nameOfService }}</h2>
      </div>
      <div class="text-xs text-slate-500">
         {{ format(props.event!.startTime, 'HH:mm') }} - {{ format(props.event!.endTime, 'HH:mm') }}</div>
   </div>
</template>