<script setup lang="ts">
import { ref, computed } from 'vue';

const availableServices = [
   { nameOfService: 'service1', price: '0' },
   { nameOfService: 'service2', price: '10' },
   { nameOfService: 'service3', price: '20' },
   { nameOfService: 'service4', price: '30' },
   { nameOfService: 'service5', price: '40' },
];
type selectServiceProps = {
   nameOfService: string,
}

const selectedService = ref('');

const isOpen = ref(false);
const searchText = ref('');
const filteredServices = computed(() => {
   return availableServices.filter((service) => service.nameOfService.toLowerCase().includes(searchText.value.toLowerCase()))
});

const selectService = (service: selectServiceProps) => {
   searchText.value = service.nameOfService;
   isOpen.value = false;
}

/** Todos
 * Modify the current selector to look like the demo app => Input cannot be typed on
 */
</script>

<template>
   <div class="flex">
      <div class="flex relative justify-center items-center w-36">
         <!-- Indicator for whether the input is filled or not -->
         <div class="formFillIndicator" :class="{ 'bg-green-500': selectedService }">1</div>
         <div class="flex absolute bottom-0 h-1/2 bg-blue-100 w-2"></div>
      </div>
      <div class="flex flex-col w-full p-4 gap-4 shadow-md shadow-slate-300 rounded-lg">
         <div class="flex justify-between items-center">
            <label class="text-gray-700 text-sm font-bold" for="serviceSelect">
               {{ selectedService ? 'SERVICE INFORMATION' : 'FIRST YOU NEED TO ADD A SERVICE' }}
            </label>
            <button v-if="selectedService"
               class="text-blue-600 text-sm font-bold hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md active:opacity-70">EDIT</button>
         </div>
         <div class="relative">
            <!-- Render the dropdown box if user hasn't selected anything yet -->
            <!-- Render the choice selected if their choice was selected -->
            <button
               id="serviceSelect"
               @click="isOpen = !isOpen"
               @blur="isOpen = false"
               class="flex w-full border border-gray-300 justify-center py-4 items-center gap-2 rounded-md focus:ring-1"
            >
               <span
                  class="material-symbols-outlined bg-blue-600 w-6 h-6 rounded-full text-white text-base">add</span>
               <p class="text-slate-400 font-semibold">Add Service</p>
            </button>
         </div>
      </div>
   </div>
</template>

<!--
<div v-show="isOpen" class="absolute mt-2 w-full bg-white border border-blue-300 shadow-lg rounded-md">
               <input
                  type="text"
                  class="w-full py-2 px-3 border-b border-gray-300 focus:outline-none"
                  
                  placeholder="Search services"
                  autofocus="true"
               />
               <ul>
                  <li v-for="(service, index) in filteredServices" :key="index"
                     class="p-3 hover:bg-green-100 hover:text-blue-800 cursor-pointer" @click="selectService(service)">
                     <span class="mr-2">{{ service.nameOfService }}</span>
                     <span>{{ service.price }}</span>
                  </li>
               </ul>
            </div>
-->