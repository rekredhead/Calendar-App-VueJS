<script setup lang="ts">
import { format } from 'date-fns';

defineProps<{
   mode: String,
   modes: Array<String>,
   selectedDateStart: Date,
   selectedDateEnd: Date,
   getPreviousDate: Function,
   getNextDate: Function
}>();

const handleRefresh = () => {
   console.log('refresh button pressed');
}
const handlePrint = () => {
   console.log('printer button pressed');
}
const handleFilterClick = () => {
   console.log('filter button pressed');
}
const handleScheduleSettingClick = () => {
   console.log('schedule setting button pressed');
}
</script>

<template>
   <nav class="flex justify-between items-center border border-b-slate-300 px-10 py-4 h-14">
      <div class="flex gap-1 justify-between items-center w-60">
         <button class="bg-white px-2 py-1 text-slate-500 rounded-md hover:text-black active:opacity-60" @click="getPreviousDate()">&lt;</button>
         <span class="bg-white py-1 text-slate-500 rounded-md w-full text-center">
            {{ `${format(selectedDateStart, 'MMM dd')} - ${format(selectedDateEnd, 'MMM dd, yyyy')}` }}
         </span>
         <button class="bg-white px-2 py-1 text-slate-500 rounded-md hover:text-black active:opacity-60" @click="getNextDate()">&gt;</button>
      </div>
      <div class="flex gap-2">
         <button @click="handleRefresh" class="optionsBarButton">
            <span class="material-symbols-outlined">cached</span>
         </button>
         <button @click="handlePrint" class="optionsBarButton">
            <span class="material-symbols-outlined">print</span>
         </button>
         <button @click="handleFilterClick" class="optionsBarButton gap-1">
            <span class="material-symbols-outlined">filter_alt</span>
            <p class="font-semibold">Filter</p>
         </button>
         <button @click="handleScheduleSettingClick" class="optionsBarButton gap-1">
            <span class="material-symbols-outlined">page_info</span>
            <p class="font-semibold">Schedule Setting</p>
         </button>
      </div>
   </nav>
</template>
