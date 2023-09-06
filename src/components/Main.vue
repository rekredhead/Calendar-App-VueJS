<script setup lang="ts">
import Header from './Main-components/Header.vue';
import OptionsBar from './Main-components/OptionsBar.vue';
import Body from './Main-components/Body.vue';
import SidePanel from './SidePanel-components/SidePanel.vue';
import { FormData } from './types';

import { startOfToday, isSameDay, startOfWeek, endOfWeek, add } from 'date-fns';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const generateRandomID = () => uuidv4().slice(0, 8);

const appointments = ref([
   {
      date: new Date('2023-09-04'),
      events: [
         {
            id: generateRandomID(),
            patient: {
               profilePicture: 'vue.svg',
               name: 'Eleanor Pena',
               emailAddress: 'eleanor@pena.co',
               phone: '(270) 555-0117',
               address: ' 2715 Ash Dr. San Jose, South Dakota 837475'
            },
            service: {
               nameOfService: 'service1',
               price: 0
            },
            startTime: new Date('2023-09-04 1:15:00'),
            endTime: new Date('2023-09-04 3:00:00'),
            timeStamp: new Date('2023-09-04 4:04:04')
         },
         {
            id: generateRandomID(),
            patient: {
               profilePicture: 'vue.svg',
               name: "Oliver Bennett",
               emailAddress: "oliver@bennett.co",
               phone: "(415) 555-1234",
               address: "123 Elm Street, Springfield, IL 62701"
            },
            service: {
               nameOfService: 'service2',
               price: 10
            },
            startTime: new Date('2023-09-04 5:15:00'),
            endTime: new Date('2023-09-04 9:45:00'),
            timeStamp: new Date('2023-09-04 7:07:07')
         }
      ]
   }
]);

const addAppointment = (formData: FormData) => {
   const { service, patient, startingDateTime, endingDateTime } = formData;
   const indexOfSameDate = appointments.value.findIndex((appointment) => isSameDay(appointment.date, startingDateTime));

   if (indexOfSameDate < 0) {
      // Push formData into the appointments array
      const newAppointment = {
         date: startingDateTime,
         events: [{
            id: generateRandomID(),
            patient: patient,
            service: service,
            startTime: startingDateTime,
            endTime: endingDateTime,
            timeStamp: startOfToday()
         }]
      }

      appointments.value.push(newAppointment);
   } else {
      // Push formData to the events array of the appointment that has the same date
      const newEvent = {
         id: generateRandomID(),
         patient: patient,
         service: service,
         startTime: startingDateTime,
         endTime: endingDateTime,
         timeStamp: startOfToday()
      }

      appointments.value[indexOfSameDate].events.push(newEvent);
   }
}
const editAppointment = (formData: FormData) => {
   const { id, initialDate, service, patient, startingDateTime, endingDateTime } = formData;

   const indexOfDate = appointments.value.findIndex((appointment) => isSameDay(appointment.date, initialDate));
   const indexOfEvent = appointments.value[indexOfDate].events.findIndex((event) => event.id === id);

   if (isSameDay(initialDate, startingDateTime)) {
      const editedEvent = {
         id,
         service,
         patient,
         startTime: startingDateTime,
         endTime: endingDateTime,
         timeStamp: startOfToday()
      };

      appointments.value[indexOfDate].events[indexOfEvent] = editedEvent;

   } else {
      appointments.value[indexOfDate].events.splice(indexOfEvent, 1);

      const editedAppointment = {
         date: startingDateTime,
         events: [{
            id,
            patient,
            service,
            startTime: startingDateTime,
            endTime: endingDateTime,
            timeStamp: startOfToday()
         }]
      };

      appointments.value.push(editedAppointment);
   }
}

const currentDate = startOfToday();
const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
const currentWeekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
const selectedWeekStart = ref(currentWeekStart);
const selectedWeekEnd = ref(currentWeekEnd);

const getPreviousDate = () => {
   selectedWeekStart.value = add(selectedWeekStart.value, { weeks: -1 });
   selectedWeekEnd.value = add(selectedWeekEnd.value, { weeks: -1 });
}
const getNextDate = () => {
   selectedWeekStart.value = add(selectedWeekStart.value, { weeks: 1 });
   selectedWeekEnd.value = add(selectedWeekEnd.value, { weeks: 1 });
}

const isSidePanelOpen = ref(false);
const sidePanelFormData = ref<FormData>({
   id: '',
   initialDate: new Date(),
   service: {
      nameOfService: '',
      price: 0
   },
   patient: {
      profilePicture: '',
      name: '',
      emailAddress: '',
      phone: '',
      address: ''
   },
   startingDateTime: new Date(),
   endingDateTime: new Date()
});

const openSidePanel = (newFormData: FormData) => {
   isSidePanelOpen.value = true;
   sidePanelFormData.value = newFormData;
};
const closeSidePanel = () => {
   isSidePanelOpen.value = false;
}
</script>

<template>
   <div class="flex relative flex-col h-screen bg-blue-100 pb-5">
      <Header></Header>
      <OptionsBar :selectedWeekStart="selectedWeekStart" :selectedWeekEnd="selectedWeekEnd"
         :getPreviousDate="getPreviousDate" :getNextDate="getNextDate"></OptionsBar>

      <Body :appointments="appointments" :selectedWeekStart="selectedWeekStart" :selectedWeekEnd="selectedWeekEnd"
         :openSidePanel="openSidePanel"></Body>
      <div v-if="isSidePanelOpen" class="absolute inset-0 bg-black opacity-40"></div>
      <SidePanel :isSidePanelOpen="isSidePanelOpen" :addAppointment="addAppointment" :editAppointment="editAppointment"
         :closeSidePanel="closeSidePanel" :sidePanelFormData="sidePanelFormData" />
   </div>
</template>