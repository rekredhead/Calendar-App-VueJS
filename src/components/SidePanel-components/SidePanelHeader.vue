<script setup lang="ts">
defineProps<{
   userProfilePicture: string,
   userName: string,
   userEmailAddress: string,
   userPosition: string
}>();
</script>

<template>
   <div class="bg-blue-100 h-44 pl-12 pr-16 border">
      <div class="flex items-center border-b h-1/4 border-gray-400 px-4 text-slate-600 font-bold">Add new appointment</div>
      <div class="flex justify-between items-center h-3/4">
         <div class="flex w-4/5 gap-4">
            <img class="bg-white rounded-full w-20 aspect-square" :src="userProfilePicture" alt="Profile Picture" /><!-- Replace img src with your intended img -->
            <div class="flex flex-col justify-evenly w-5/6 overflow-hidden">
               <div class="flex gap-5 items-end">
                  <h1 class="whitespace-nowrap text-3xl font-bold">{{ userName }}</h1>
                  <h2 class="bg-slate-50 text-sm text-slate-600 font-semibold px-1 rounded-lg">{{ userPosition }}</h2>
               </div>
               <p class="whitespace-nowrap font-semibold text-base text-slate-600">{{ userEmailAddress }}</p>
            </div>
         </div>
         <button
            class="flex bg-white px-2 py-1 gap-2 items-center rounded-md shadow-md hover:drop-shadow-md active:opacity-60 transition duration-75">
            <span class="material-symbols-outlined text-lg">description</span>
            <p class="font-bold text-slate-600">Add Note</p>
         </button>
      </div>
   </div>
</template>