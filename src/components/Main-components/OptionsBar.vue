<script setup lang="ts">

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
   <nav class="flex justify-between items-center border border-b-slate-300 px-10 py-4 tra">
      <div>
         <button></button>
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
