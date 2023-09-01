<script setup lang="ts">
// This form uses states (service, patient, dateTime) instead of input fields to collect data
// Each form item was difficult to reuse, hence they have their own component

const props = defineProps({
   selectedDate: Date,
   closeSidePanel: Function
});

import { ref } from 'vue';
import { addHours } from 'date-fns';
import ServiceSelector from './ServiceSelector.vue';
import PatientSelector from './PatientSelector.vue';
import DateTimeSelector from './DateTimeSelector.vue';

const service = ref({});
const patient = ref({});
const startingDateTime = ref(props.selectedDate);
const endingDateTime = ref(addHours(props.selectedDate!, 1));

const setService = (selectedService: Object) => service.value = selectedService;
const setPatient = (selectedPatient: Object) => patient.value = selectedPatient;
const setStartingDateTime = (selectedDateTime: Date) => startingDateTime.value = selectedDateTime;
const setEndingDateTime = (selectedDateTime: Date) => endingDateTime.value = selectedDateTime

const isObjectEmpty = (obj: Object) => Object.keys(obj).length === 0;

const submitForm = () => {
   if (isObjectEmpty(service.value)) {
      console.log('Please enter service');
      return;
   }
   if (isObjectEmpty(patient.value)) {
      console.log('Please enter patient info');
      return;
   }

   console.log({
      service: service.value,
      patient: patient.value,
      startingDateTime: startingDateTime.value,
      endingDateTime: endingDateTime.value
   });

   props.closeSidePanel!();
}
</script>

<template>
   <form @submit.prevent class="flex flex-col justify-between items-center h-[47em] w-full overflow-y-scroll p-5">
      <div class=" w-full">
         <ServiceSelector :service="service" :setService="setService" />
         <PatientSelector :patient="patient" :setPatient="setPatient" />
         <DateTimeSelector
            :startingDateTime="startingDateTime"
            :endingDateTime="endingDateTime"
            :setStartingDateTime="setStartingDateTime"
            :setEndingDateTime="setEndingDateTime"
         />
      </div>
      <div class=" flex justify-end gap-4 h-12 w-full">
         <button @click="props.closeSidePanel!()" class="bg-slate-100 text-slate-500 font-bold rounded-md w-1/4 hover:bg-slate-200">Cancel</button>
         <button @click="submitForm" class="bg-slate-400 text-white font-bold rounded-md w-1/4 hover:bg-slate-500">Save</button>
      </div>
   </form>
</template>