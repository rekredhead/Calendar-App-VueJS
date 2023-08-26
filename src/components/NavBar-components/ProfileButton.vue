<script setup lang="ts">
import {ref} from 'vue';

const isExpanded = ref(false);
</script>

<template>
   <div class="flex w-full border border-t-2 items-center justify-between p-2">
      <div class="flex w-4/5 gap-2 items-center">
         <!-- Replace profile picture src with intended image -->
         <img class="flex border h-full aspect-square rounded-full" src="vue.svg" alt="Profile Picture" />
         
         <div class="overflow-hidden">
            <h1 class="whitespace-nowrap text-base font-semibold">User Name</h1>
            <h2 class="whitespace-nowrap text-sm text-slate-500">User Career</h2>
         </div>
      </div>

      <button
         @click="isExpanded = !isExpanded"
         class="flex rounded-full p-1 hover:bg-slate-200 active:bg-slate-300 transition"
      >
         <span v-if="isExpanded" class="material-symbols-outlined">expand_less</span>
         <span v-else class="material-symbols-outlined">expand_more</span>
      </button>
   </div>
</template>