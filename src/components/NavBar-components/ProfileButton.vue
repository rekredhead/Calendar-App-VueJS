<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
   userProfilePicture: string,
   userName: string,
   userCareer: string
}>();

const isExpanded = ref(false);
</script>

<template>
   <div class="flex w-full border border-t-2 items-center justify-between h-16 p-2">
      <div class="flex h-full w-4/5 gap-2 items-center">
         <!-- Replace profile picture src with intended image -->
         <img class="flex border h-full aspect-square rounded-full" :src="userProfilePicture"
            alt="Profile Picture" />
         <div class="overflow-hidden">
            <h1 class="whitespace-nowrap text-base font-semibold">{{ userName }}</h1>
            <h2 class="whitespace-nowrap text-sm text-slate-500">{{ userCareer }}</h2>
         </div>
      </div>

      <button @click="isExpanded = !isExpanded"
         class="flex rounded-full p-1 hover:bg-slate-200 active:bg-slate-300 transition">
         <span v-if="isExpanded" class="material-symbols-outlined">expand_less</span>
         <span v-else class="material-symbols-outlined">expand_more</span>
      </button>
   </div>
</template>