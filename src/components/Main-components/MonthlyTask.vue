<script setup lang="ts">
import { format } from 'date-fns';
import { PropType } from 'vue';
import { Event } from '../types';

const props = defineProps({
   event: Object as PropType<Event>,
   openSidePanel: Function
});

const handleClick = () => {
   props.openSidePanel!({
      id: props.event!.id,
      service: props.event!.service,
      patient: props.event!.patient,
      startingDateTime: props.event!.startTime,
      endingDateTime: props.event!.endTime
   });
}
</script>

<template>
   <div :key="props.event!.id" @click="handleClick"
      class="flex cursor-pointer bg-blue-500 text-white rounded-md px-2 py-0.5 mb-1 gap-2 overflow-hidden">
      <p>{{ format(props.event!.startTime, 'h:m a').toLocaleLowerCase() }}</p>
      <p>{{ props.event!.service.nameOfService }}</p>
   </div>
</template>