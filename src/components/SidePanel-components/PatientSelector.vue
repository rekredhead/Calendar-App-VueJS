<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
   patient: Object,
   setPatient: Function
});

const availablePatients = [
   { profilePicture: 'vue.svg', name: 'Eleanor Pena', emailAddress: 'eleanor@pena.co', phone: '(270) 555-0117', address: ' 2715 Ash Dr. San Jose, South Dakota 837475' },
   { profilePicture: 'vue.svg', name: "Oliver Bennett", emailAddress: "oliver@bennett.co", phone: "(415) 555-1234", address: "123 Elm Street, Springfield, IL 62701" },
   { profilePicture: 'vue.svg', name: "Sophia Rodriguez", emailAddress: "sophia@rodriguez.co", phone: "(602) 555-5678", address: "789 Oak Avenue, Phoenix, AZ 85001" },
   { profilePicture: 'vue.svg', name: "Liam Campbell", emailAddress: "liam@campbell.co", phone: "(312) 555-7890", address: "456 Maple Lane, Chicago, IL 60601" },
   { profilePicture: 'vue.svg', name: "Ava Foster", emailAddress: "ava@foster.co", phone: "(713) 555-2345", address: "987 Pine Road, Houston, TX 77001" },
   { profilePicture: 'vue.svg', name: "Noah Hughes", emailAddress: "noah@hughes.co", phone: "(502) 555-6789", address: "654 Birch Street, Louisville, KY 40201" }
];

const isPatientSelected = () => Object.keys(props.patient!).length;

const isOpen = ref(false);
const searchText = ref('');
const filteredPatients = computed(() => {
   return availablePatients.filter((patient) => patient.name.toLowerCase().includes(searchText.value.toLowerCase()))
});

type selectPatientProps = {
   profilePicture: string,
   name: string,
   emailAddress: string,
   phone: string,
   address: string
}
const selectPatients = (patient: selectPatientProps) => {
   props.setPatient!(patient);
   searchText.value = '';
   isOpen.value = false;
}
</script>

<template>
   <div class="flex">
      <div class="flex relative justify-center items-center w-36">
         <!-- Indicator for whether the input is filled or not -->
         <div class="formFillIndicator" :class="{ 'bg-green-500': isPatientSelected() }">2</div>
         <div class="flex absolute bottom-0 h-full bg-blue-100 w-2"></div>
      </div>
      <div class="flex flex-col w-full p-4 gap-4 shadow-md shadow-slate-300 rounded-lg mb-5">
         <div class="flex justify-between items-center">
            <label class="text-gray-700 text-sm font-bold" for="serviceSelect">
               {{ isPatientSelected() ? 'PATIENT INFORMATION' : 'THEN YOU NEED TO ADD PATIENT' }}
            </label>
            <button v-if="isPatientSelected()" @click="props.setPatient!({})"
               class="text-blue-600 text-sm font-bold hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md active:opacity-70">EDIT</button>
         </div>
         <div class="relative">
            <!-- Render the dropdown box if user hasn't selected anything yet -->
            <button id="serviceSelect" v-show="!isPatientSelected()" @click="isOpen = !isOpen"
               class="flex w-full border border-gray-300 justify-center py-4 items-center gap-2 rounded-md focus:ring-1">
               <span class="material-symbols-outlined bg-blue-600 w-6 h-6 rounded-full text-white text-base">add</span>
               <p class="text-slate-400 font-semibold">Add Patient</p>
            </button>
            <div v-show="isOpen" class="absolute mt-2 w-full bg-white shadow-md shadow-slate-300 rounded-md p-2 z-10">
               <input type="text" class="bg-slate-100 text-slate-500 w-full px-5 py-3 rounded-md outline-none"
                  v-model="searchText" placeholder="Search patients" autofocus="true" />
               <ul class="h-64 overflow-y-scroll">
                  <li v-for="(patient, index) in filteredPatients" :key="index"
                     class="flex gap-2 items-center px-3 py-3 text-slate-500 cursor-pointer border-l-4 border-transparent hover:bg-green-100 hover:text-green-500 hover:border-green-500"
                     @click="selectPatients(patient)">
                     <img class="bg-white w-8 aspect-square rounded-full" v-bind:src="patient.profilePicture" v-bind:alt="patient.name + ' Profile Picture'" />
                     <span class="text-lg">{{ patient.name }}</span>
                  </li>
               </ul>
            </div>

            <!-- Render the choice selected if their choice was selected -->
            <div class="flex" v-show="isPatientSelected()">
               <div class="w-16">
                  <img class="bg-white w-full aspect-square rounded-full" v-bind:src="patient?.profilePicture" v-bind:alt="patient?.name + ' Profile Picture'" />
               </div>
               <div class="w-full ml-5">
                  <h1 class="text-xl text-gray-700 font-semibold pb-2 border-b border-slate-300">{{ patient?.name }}</h1>
                  <div class="flex py-2">
                     <p class="w-24 text-gray-700 font-semibold">Email</p>
                     <p class="text-slate-400">{{ patient?.emailAddress }}</p>
                  </div>
                  <div class="flex py-2">
                     <p class="w-24 text-gray-700 font-semibold">Phone</p>
                     <p class="text-slate-400">{{ patient?.phone }}</p>
                  </div>
                  <div class="flex py-2">
                     <p class="w-24 text-gray-700 font-semibold">Address</p>
                     <p class="text-slate-400">{{ patient?.address }}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>