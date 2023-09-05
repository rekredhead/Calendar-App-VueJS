<script setup lang="ts">
import { PropType, ref } from 'vue';
import ServiceSelector from './ServiceSelector.vue';
import PatientSelector from './PatientSelector.vue';
import DateTimeSelector from './DateTimeSelector.vue';

interface Service {
   nameOfService: string;
   price: number;
}
interface Patient {
   profilePicture: string;
   name: string;
   emailAddress: string;
   phone: string;
   address: string;
}
interface FormData {
   id: string;
   initialDate: Date;
   service: Service;
   patient: Patient;
   startingDateTime: Date;
   endingDateTime: Date;
}
const props = defineProps({
   sidePanelFormData: Object as PropType<FormData>,
   addAppointment: Function,
   editAppointment: Function,
   closeSidePanel: Function
});
const sidePanelFormData = props.sidePanelFormData!;

const service = ref(sidePanelFormData.service);
const patient = ref(sidePanelFormData.patient);
const startingDateTime = ref(sidePanelFormData.startingDateTime);
const endingDateTime = ref(sidePanelFormData.endingDateTime);

const setService = (selectedService: Service) => service.value = selectedService;
const setPatient = (selectedPatient: Patient) => patient.value = selectedPatient;
const setStartingDateTime = (selectedDateTime: Date) => startingDateTime.value = selectedDateTime;
const setEndingDateTime = (selectedDateTime: Date) => endingDateTime.value = selectedDateTime;

const isObjectEmpty = (obj: Object) => Object.keys(obj).length === 0;

const submitForm = () => {
   if (isObjectEmpty(service.value)) {
      alert('Please enter the service');
      return;
   }
   if (isObjectEmpty(patient.value)) {
      alert('Please enter the patient info');
      return;
   }

   const isEdited = !isObjectEmpty(sidePanelFormData.service);

   if (isEdited) {
      props.editAppointment!({
         id: sidePanelFormData.id,
         initialDate: sidePanelFormData.startingDateTime,
         service: service.value,
         patient: patient.value,
         startingDateTime: startingDateTime.value,
         endingDateTime: endingDateTime.value
      });
   } else {
      props.addAppointment!({
         service: service.value,
         patient: patient.value,
         startingDateTime: startingDateTime.value,
         endingDateTime: endingDateTime.value
      });
   }

   props.closeSidePanel!();
}
</script>

<template>
   <form @submit.prevent class="flex flex-col justify-between items-center h-[47em] w-full overflow-y-scroll p-5">
      <div class=" w-full">
         <ServiceSelector :service="service" :setService="setService" />
         <PatientSelector :patient="patient" :setPatient="setPatient" />
         <DateTimeSelector :startingDateTime="startingDateTime" :endingDateTime="endingDateTime"
            :setStartingDateTime="setStartingDateTime" :setEndingDateTime="setEndingDateTime" />
      </div>
      <div class="flex justify-end gap-4 h-12 w-full">
         <button @click="props.closeSidePanel!()"
            class="bg-slate-100 text-slate-500 font-bold rounded-md w-1/4 hover:bg-slate-200">Cancel</button>
         <button @click="submitForm"
            class="bg-slate-400 text-white font-bold rounded-md w-1/4 hover:bg-slate-500">Save</button>
      </div>
   </form>
</template>