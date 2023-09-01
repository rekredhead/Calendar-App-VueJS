<script setup lang="ts">
import SidePanelHeader from './SidePanelHeader.vue';
import SidePanelForm from './SidePanelForm.vue';

const props = defineProps({
   isSidePanelOpen: Boolean,
   selectedDate: Date
});

// Task 4: Change the state of the isSidePanelOpen to false upon submission (use state passed as props)
</script>

<template>
   <aside class="flex flex-col fixed bg-white top-0 bottom-0 right-0 border w-1/2 transform transition-transform duration-300"
      :class="{ 'translate-x-0': props.isSidePanelOpen, 'translate-x-full': !props.isSidePanelOpen }">
      <SidePanelHeader/>
      <SidePanelForm :selectedDate="selectedDate"/>
   </aside>
</template>