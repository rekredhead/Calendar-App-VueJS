<script setup lang="ts">
import { format } from 'date-fns';
import { PropType } from 'vue';
import { Event } from '../types';

const props = defineProps({
   event: Object as PropType<Event>,
   openSidePanel: Function
});
</script>

<template>
   <div :key="props.event!.id" class="flex bg-blue-500 text-white rounded-md px-2 py-0.5 mb-1 gap-2 overflow-hidden">
      <p>{{ format(props.event!.startTime, 'h:m a').toLocaleLowerCase() }}</p>
      <p>{{ props.event!.service.nameOfService }}</p>
   </div>
</template>