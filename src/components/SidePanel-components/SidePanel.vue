<script setup lang="ts">
import SidePanelHeader from './SidePanelHeader.vue';
import SidePanelForm from './SidePanelForm.vue';

const props = defineProps({
   isSidePanelOpen: Boolean,
   closeSidePanel: Function,
   selectedDate: Date
});

</script>

<template>
   <aside class="flex flex-col fixed bg-white top-0 bottom-0 right-0 border w-1/2 transform transition-transform duration-300"
      :class="{ 'translate-x-0': props.isSidePanelOpen, 'translate-x-full': !props.isSidePanelOpen }">
      <SidePanelHeader/>
      <SidePanelForm v-if="isSidePanelOpen" :selectedDate="selectedDate" :closeSidePanel="closeSidePanel"/>
   </aside>
</template>