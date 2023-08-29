<script setup lang="ts">
import { ref } from 'vue';

const notifications: any[] = [ 1, 2, 3 ]; // Change the type based on the actual notifications data
const modes = ['list', 'monthly', 'weekly'];
const mode = ref(modes[0]);

const toTitleCase = (word: string) => word.toLowerCase().replace(/(?:^|\s)\w/g, match => match.toUpperCase());
const handleModeChange = (item: string) => {
   if (mode.value === item) return; // Do not run if the mode hasn't changed

   mode.value = item;
   // More code for changing the main calendar when mode state changes
}
const handleAdd = () => {
   console.log('add button pressed');
}
const handleNotificationClick = () => {
   console.log('notification button pressed');
}
</script>

<template>
   <header class="flex justify-between px-10 py-4 items-center border border-b-slate-300 h-[8%]">
      <div class="flex gap-10">
         <div class="flex justify-center items-center gap-3">
            <span class="material-symbols-outlined text-4xl text-blue-600 font-bold">calendar_month</span>
            <h1 class="text-2xl font-bold text-slate-700">Calendar</h1>
         </div>
         <div class="flex gap-5">
            <button
               v-for="item in modes"
               @click="handleModeChange(item)"
               class="font-bold hover:text-blue-500"
               :class="{ 'text-blue-600': mode === item, 'text-slate-500': mode !== item }"
            >{{ toTitleCase(item) }}</button>
         </div>
      </div>
      <div class="flex items-center w-1/5 justify-between h-11">
         <!-- Change the input element to handle submission later -->
         <input
            type="search"
            class="px-5 h-[80%] rounded-full outline-none bg-white"
            placeholder="Search"
         />
         <button
            @click="handleAdd"
            class="flex items-center justify-center h-full aspect-square bg-blue-600 rounded-full hover:opacity-80 active:opacity-60 transition duration-100"
         >
            <span class="material-symbols-outlined text-white text-2xl">add</span>
         </button>
         <button
            @click="handleNotificationClick"
            class="flex relative p-2 rounded-full bg-white hover:bg-slate-100 active:bg-slate-200"
         >
            <div v-if="notifications.length" class="flex absolute top-0 right-0 bg-red-500 h-4 w-4 rounded-full translate-x-1"></div>
            <span class="material-symbols-outlined">notifications</span>
         </button>
      </div>
   </header>
</template>