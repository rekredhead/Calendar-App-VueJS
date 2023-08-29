<script setup lang="ts">
import Header from './Main-components/Header.vue';
import OptionsBar from './Main-components/OptionsBar.vue';
import Body from './Main-components/Body.vue';
</script>

<template>
   <div class="flex flex-col h-screen bg-blue-100 pb-5">
      <Header></Header>
      <OptionsBar></OptionsBar>
      <Body></Body>
   </div>
</template>

<!--
import { ref } from 'vue';

const isSidePanelOpen = ref(false);

<button @click="isSidePanelOpen = !isSidePanelOpen"
   class="border text-white p-3 m-5 hover:bg-blue-500 active:bg-blue-400">click me!</button>
<aside
   class="flex fixed bg-blue-200 top-0 bottom-0 right-0 w-80 transform transition-transform duration-300"
   :class="{ 'translate-x-0': isSidePanelOpen, 'translate-x-full': !isSidePanelOpen }">
   Slide-panel
</aside>
-->