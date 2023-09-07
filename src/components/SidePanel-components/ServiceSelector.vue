<script setup lang="ts">
import { ref, computed, PropType } from 'vue';
import { Service } from '../types';
import { availableServices } from '../../assets/sampleData';

const props = defineProps({
   service: Object as PropType<Service>,
   setService: Function
});

const isServiceSelected = () => Object.keys(props.service!).length;

const isOpen = ref(false);
const searchText = ref('');
const filteredServices = computed(() => {
   return availableServices.filter((service) => service.nameOfService.toLowerCase().includes(searchText.value.toLowerCase()))
});

const selectService = (service: Service) => {
   props.setService!(service);
   isOpen.value = false;
}
</script>

<template>
   <div class="flex">
      <div class="flex relative justify-center items-center w-36">
         <!-- Indicator for whether the input is filled or not -->
         <div class="formFillIndicator" :class="{ 'bg-green-500': isServiceSelected() }">1</div>
         <div class="flex absolute bottom-0 h-full bg-blue-100 w-2"></div>
      </div>
      <div class="flex flex-col w-full p-4 gap-4 shadow-md shadow-slate-300 rounded-lg mb-5">
         <div class="flex justify-between items-center">
            <label class="text-gray-700 text-sm font-bold" for="serviceSelect">
               {{ isServiceSelected() ? 'SERVICE INFORMATION' : 'FIRST YOU NEED TO ADD A SERVICE' }}
            </label>
            <button v-if="isServiceSelected()" @click="props.setService!({})"
               class="text-blue-600 text-sm font-bold hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md active:opacity-70">EDIT</button>
         </div>
         <div class="relative">
            <!-- Render the dropdown box if user hasn't selected anything yet -->
            <button id="serviceSelect" v-show="!isServiceSelected()" @click="isOpen = !isOpen"
               class="flex w-full border border-gray-300 justify-center py-4 items-center gap-2 rounded-md focus:ring-1">
               <span class="material-symbols-outlined bg-blue-600 w-6 h-6 rounded-full text-white text-base">add</span>
               <p class="text-slate-400 font-semibold">Add Service</p>
            </button>
            <div v-show="isOpen" class="absolute mt-2 w-full bg-white shadow-md shadow-slate-300 rounded-md p-2 z-10">
               <input type="text" class="bg-slate-100 text-slate-500 w-full px-5 py-3 rounded-md outline-none"
                  v-model="searchText" placeholder="Search services" autofocus="true" />
               <ul class="h-64 overflow-y-scroll">
                  <li v-for="(service, index) in filteredServices" :key="index"
                     class="flex justify-between px-5 py-3 text-slate-500 cursor-pointer border-l-4 border-transparent hover:bg-green-100 hover:text-green-500 hover:border-green-500"
                     @click="selectService(service)">
                     <span class="text-lg">{{ service.nameOfService }}</span>
                     <span class="font-bold">{{ service.price ? `$${service.price}` : 'Free' }}</span>
                  </li>
               </ul>
            </div>

            <!-- Render the choice-selected if the user has selected their choice -->
            <div class="flex justify-between items-center" v-show="isServiceSelected()">
               <div>
                  <h1 class="text-xl">{{ props.service!.nameOfService }}</h1>
                  <h2 class="text-slate-400 text-sm">Subtext here</h2>
               </div>
               <button
                  class="bg-green-500 text-white font-semibold px-5 h-10 rounded-md hover:bg-green-600 active:opacity-70">Meeting
                  Room</button>
            </div>
         </div>
      </div>
   </div>
</template>