<script setup lang="ts">
import { format, differenceInMinutes } from 'date-fns';
import { PropType } from 'vue';

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

const convertTimeToTopEM = (time: Date) => `${(time.getHours() * 4 + ((time.getMinutes() * 4) / 60))}em`;
const convertTimeToHeightEM = (startingTime: Date, endingTime: Date) => {
   const timeDifferenceInMinutes = differenceInMinutes(endingTime, startingTime);

   const hoursDifference = Math.round(timeDifferenceInMinutes / 60);
   const minutesDifference = (timeDifferenceInMinutes - (hoursDifference * 60));

   return `${hoursDifference * 4 + ((minutesDifference * 4) / 60)}em`;
};

const handleClick = () => {
   props.openSidePanel!({
      id: props.event!.id,
      service: props.event!.service,
      patient: props.event!.patient,
      startingDateTime: props.event!.startTime,
      endingDateTime: props.event!.endTime,
   });
}
</script>

<template>
   <div
      :key="props.event!.id"
      @click="handleClick"
      class="flex flex-col absolute cursor-pointer justify-between font-semibold p-2 left-2 shadow-md shadow-slate-300 rounded-md bg-white border-t-4 border-blue-600 w-5/6"
      :style="{ top: convertTimeToTopEM(props.event!.startTime), height: convertTimeToHeightEM(props.event!.startTime, props.event!.endTime) }"
   >
      <div>
         <h1 class="text-sm">{{ props.event!.patient.name }}</h1>
         <h2 class="text-xs text-slate-500">{{ props.event!.service.nameOfService }}</h2>
      </div>
      <div class="text-xs text-slate-500">
         {{ format(props.event!.startTime, 'HH:mm') }} - {{ format(props.event!.endTime,'HH:mm') }}</div>
   </div>
</template>