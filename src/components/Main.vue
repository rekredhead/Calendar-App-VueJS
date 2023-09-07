<script setup lang="ts">
import Header from './Main-components/Header.vue';
import OptionsBar from './Main-components/OptionsBar.vue';
import WeeklyView from './Main-components/WeeklyView.vue';
import MonthlyView from './Main-components/MonthlyView.vue';
import SidePanel from './SidePanel-components/SidePanel.vue';
import { FormData } from './types';

import { startOfToday, isSameDay, startOfWeek, endOfWeek, add, startOfMonth, endOfMonth } from 'date-fns';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const generateRandomID = () => uuidv4().slice(0, 8);
const notifications: any[] = [0, 1, 2]; // Change the type based on the actual notifications data
const modes = ['list', 'monthly', 'weekly'];
const mode = ref(modes[1]);

const currentDate = startOfToday();
const getCurrentWeekStart = () => startOfWeek(currentDate, { weekStartsOn: 1 });
const getCurrentWeekEnd = () => endOfWeek(currentDate, { weekStartsOn: 1 });
const getCurrentMonthStart = () => startOfMonth(currentDate);
const getCurrentMonthEnd = () => endOfMonth(currentDate);

const selectedDateStart = ref(getCurrentMonthStart());
const selectedDateEnd = ref(getCurrentMonthEnd());

const setMode = (newMode: string) => {
   mode.value = newMode;
   switch (newMode) {
      case modes[1]:
         // Set selected date to monthly
         selectedDateStart.value = getCurrentMonthStart();
         selectedDateEnd.value = getCurrentMonthEnd();
         break;
      case modes[2]:
         // Set selected date to weekly
         selectedDateStart.value = getCurrentWeekStart();
         selectedDateEnd.value = getCurrentWeekEnd();
         break;
   }
}
const getPreviousDate = () => {
   switch (mode.value) {
      case modes[1]:
         // Get previous month
         selectedDateStart.value = add(selectedDateStart.value, { months: -1 });
         selectedDateEnd.value = add(selectedDateEnd.value, { months: -1 });
         break;
      case modes[2]:
         // Get previous week
         selectedDateStart.value = add(selectedDateStart.value, { weeks: -1 });
         selectedDateEnd.value = add(selectedDateEnd.value, { weeks: -1 });
         break;
   }
}
const getNextDate = () => {
   switch (mode.value) {
      case modes[1]:
         // Get next month
         selectedDateStart.value = add(selectedDateStart.value, { months: 1 });
         selectedDateEnd.value = add(selectedDateEnd.value, { months: 1 });
         break;
      case modes[2]:
         // Get next week
         selectedDateStart.value = add(selectedDateStart.value, { weeks: 1 });
         selectedDateEnd.value = add(selectedDateEnd.value, { weeks: 1 });
         break;
   }
}

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
      <Header :mode="mode" :setMode="setMode" :modes="modes" :notifications="notifications"></Header>
      <OptionsBar :mode="mode" :modes="modes" :selectedDateStart="selectedDateStart" :selectedDateEnd="selectedDateEnd"
         :getPreviousDate="getPreviousDate" :getNextDate="getNextDate"></OptionsBar>

      <div v-if="mode === modes[0]">ListView Component not available</div>

      <MonthlyView v-if="mode === modes[1]" :appointments="appointments" :selectedDateStart="selectedDateStart"
         :selectedDateEnd="selectedDateEnd" :openSidePanel="openSidePanel"></MonthlyView>

      <WeeklyView v-if="mode === modes[2]" :appointments="appointments" :selectedDateStart="selectedDateStart"
         :selectedDateEnd="selectedDateEnd" :openSidePanel="openSidePanel"></WeeklyView>

      <div v-if="isSidePanelOpen" class="absolute inset-0 bg-black opacity-40"></div>
      <SidePanel :isSidePanelOpen="isSidePanelOpen" :addAppointment="addAppointment" :editAppointment="editAppointment"
         :closeSidePanel="closeSidePanel" :sidePanelFormData="sidePanelFormData" />
   </div>
</template>