<script setup lang="ts">
</script>

<template>
   <header class="flex flex-row justify-between items-center h-12 p-2 mt-3 mb-6">
      <div class="flex w-4/5 gap-2 items-center">
         <!-- Replace logo src with your intended logo -->
         <img class="w-1/5 aspect-square" src="vue.svg" alt="Logo" />

         <div class="overflow-hidden">
            <h1 class="whitespace-nowrap text-2xl font-bold">Zendenta</h1>
            <h2 class="whitespace-nowrap text-xs text-slate-500">Lorem ipsum dolor sit</h2>
         </div>
      </div>
      <button class="flex rounded-full p-1 hover:bg-slate-200 active:bg-slate-300">
         <span class="material-symbols-outlined">
            menu
         </span>
      </button>
   </header>
</template>