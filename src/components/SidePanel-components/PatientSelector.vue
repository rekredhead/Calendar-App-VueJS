<script setup lang="ts">
import { ref, computed, PropType } from 'vue';
import { Patient } from '../types';
import { availablePatients } from '../../assets/sampleData';

const props = defineProps({
   patient: Object as PropType<Patient>,
   setPatient: Function
});

const isPatientSelected = () => Object.keys(props.patient!).length;

const isOpen = ref(false);
const searchText = ref('');
const filteredPatients = computed(() => {
   return availablePatients.filter((patient) => patient.name.toLowerCase().includes(searchText.value.toLowerCase()))
});

const selectPatients = (patient: Patient) => {
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
            <label class="text-gray-700 text-sm font-bold" for="patientSelect">
               {{ isPatientSelected() ? 'PATIENT INFORMATION' : 'THEN YOU NEED TO ADD PATIENT' }}
            </label>
            <button v-if="isPatientSelected()" @click="props.setPatient!({})"
               class="text-blue-600 text-sm font-bold hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md active:opacity-70">EDIT</button>
         </div>
         <div class="relative">
            <!-- Render the dropdown box if user hasn't selected anything yet -->
            <button id="patientSelect" v-show="!isPatientSelected()" @click="isOpen = !isOpen"
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
                     <img class="bg-white w-8 aspect-square rounded-full" v-bind:src="patient.profilePicture"
                        v-bind:alt="patient.name + ' Profile Picture'" />
                     <span class="text-lg">{{ patient.name }}</span>
                  </li>
               </ul>
            </div>

            <!-- Render the choice-selected if the user has selected their choice -->
            <div class="flex" v-show="isPatientSelected()">
               <div class="w-16">
                  <img class="bg-white w-full aspect-square rounded-full" v-bind:src="patient?.profilePicture"
                     v-bind:alt="patient?.name + ' Profile Picture'" />
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