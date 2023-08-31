<script setup lang="ts">
import { format } from 'date-fns';
import { ref } from 'vue';

const props = defineProps({
   isSidePanelOpen: Boolean,
   selectedDate: Date
});
</script>

<template>
   <aside
      class="flex fixed bg-white top-0 bottom-0 right-0 w-1/2 transform transition-transform duration-300"
      :class="{ 'translate-x-0': isSidePanelOpen, 'translate-x-full': !isSidePanelOpen }"
   >
      {{ format(props.selectedDate!, 'EEEE, dd MMMM HH:mm') }}
   </aside>
</template>

<!--
To add an event/task:
- Get the date-time that was clicked on in the calendar
- Send the date-time to Main.vue
- Main.vue will trigger the Slide-in panel
- Render the date-time in the slide-in panel - initially it is the current date as a state
- Start styling the Slide-in panel

<button @click="isSidePanelOpen = !isSidePanelOpen"
   class="border text-white p-3 m-5 hover:bg-blue-500 active:bg-blue-400">click me!</button>
<aside
   class="flex fixed bg-blue-200 top-0 bottom-0 right-0 w-80 transform transition-transform duration-300"
   :class="{ 'translate-x-0': isSidePanelOpen, 'translate-x-full': !isSidePanelOpen }">
   Slide-panel
</aside>
-->