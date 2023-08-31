<script setup lang="ts">
import { format } from 'date-fns';
import SidePanelHeader from './SidePanelHeader.vue';

const props = defineProps({
   isSidePanelOpen: Boolean,
   selectedDate: Date
});

// Task 2: Start styling the Side Panel
// Task 3: Enable form submission to console log the data
// Task 4: Change the state of the isSidePanelOpen to false upon submission (use state passed as props)
</script>

<template>
   <!--{{ format(props.selectedDate!, 'EEEE, dd MMMM HH:mm') }}-->
   <aside class="flex flex-col fixed bg-white top-0 bottom-0 right-0 w-1/2 transform transition-transform duration-300"
      :class="{ 'translate-x-0': isSidePanelOpen, 'translate-x-full': !isSidePanelOpen }">
      <SidePanelHeader/>
      <div><!-- Form --></div>
   </aside>
</template>