<script setup lang="ts">
// This form uses states (service, patient, dateTime) instead of input fields to collect data
// Each form item was difficult to reuse, hence they have their own component

const props = defineProps({
   selectedDate: Date
});

import { ref } from 'vue';
import ServiceSelector from './ServiceSelector.vue';
import PatientSelector from './PatientSelector.vue';

const service = ref({});
const patient = ref({});
const dateTime = ref(props.selectedDate);

const setService = (selectedService: Object) => service.value = selectedService;
const setPatient = (selectedPatient: Object) => patient.value = selectedPatient;
const setDateTime = (selectedDateTime: Date) => dateTime.value = selectedDateTime;

const submitForm = (e: Event) => {
   e.preventDefault();
   /** TODO when submit button is pressed
    * Send the data to Main.vue and render it on the calendar
    * 
    * service.value is the service data
    * patient.value is the patient data
    * dateTime.value is the dateTime data
   */
}
</script>

<template>
   <form @submit="submitForm" class="flex flex-col justify-between items-center h-[47em] w-full overflow-y-scroll p-5">
      <div class=" w-full">
         <ServiceSelector :service="service" :setService="setService" />
         <PatientSelector :patient="patient" :setPatient="setPatient" />
      </div>
      <div class=" flex justify-end gap-4 h-12 w-full">
         <button class="bg-slate-100 text-slate-500 font-bold rounded-md w-1/4 hover:bg-slate-200">Cancel</button>
         <button type="submit" class="bg-slate-400 text-white font-bold rounded-md w-1/4 hover:bg-slate-500">Save</button>
      </div>
   </form>
</template>