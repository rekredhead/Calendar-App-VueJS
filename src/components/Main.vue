<script setup lang="ts">
import { startOfToday, isSameDay, startOfWeek, endOfWeek, add, startOfMonth, endOfMonth } from 'date-fns';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

import Header from './Main-components/Header.vue';
import OptionsBar from './Main-components/OptionsBar.vue';
import ListView from './Main-components/ListView.vue';
import WeeklyView from './Main-components/WeeklyView.vue';
import MonthlyView from './Main-components/MonthlyView.vue';
import SidePanel from './SidePanel-components/SidePanel.vue';
import { FormData } from './types';
import { sampleAppointments } from '../assets/sampleData';

const generateRandomID = () => uuidv4().slice(0, 8);
const notifications: any[] = [0, 1, 2]; // Change the type based on the actual notifications data
const modes = ['list', 'monthly', 'weekly'];
const mode = ref(modes[2]); // The Mode state is when the calendar will show ListView, MonthlyView or WeeklyView

const currentDate = startOfToday();
const getCurrentWeekStart = () => startOfWeek(currentDate, { weekStartsOn: 1 });
const getCurrentWeekEnd = () => endOfWeek(currentDate, { weekStartsOn: 1 });
const getCurrentMonthStart = () => startOfMonth(currentDate);
const getCurrentMonthEnd = () => endOfMonth(currentDate);

const selectedDateStart = ref(
   mode.value === modes[0] ?
      currentDate :
      mode.value === modes[1] ?
         getCurrentMonthStart() :
         getCurrentWeekStart()
);
const selectedDateEnd = ref(
   mode.value === modes[0] ?
      currentDate :
      mode.value === modes[1] ?
         getCurrentMonthEnd() :
         getCurrentWeekEnd()
);

const setMode = (newMode: string) => {
   mode.value = newMode;
   switch (newMode) {
      case modes[0]:
         // Set selected date to list
         selectedDateStart.value = currentDate;
         selectedDateEnd.value = currentDate;
         break;
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
      case modes[0]:
         // Get previous day
         selectedDateStart.value = add(selectedDateStart.value, { days: -1 });
         selectedDateEnd.value = add(selectedDateEnd.value, { days: -1 });
         break;
      case modes[1]:
         // Get previous month
         const endOfSelectedMonth = add(selectedDateEnd.value, { months: -1 });
         selectedDateStart.value = add(selectedDateStart.value, { months: -1 });
         selectedDateEnd.value = endOfMonth(endOfSelectedMonth);
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
      case modes[0]:
         // Get previous day
         selectedDateStart.value = add(selectedDateStart.value, { days: 1 });
         selectedDateEnd.value = add(selectedDateEnd.value, { days: 1 });
         break;
      case modes[1]:
         // Get next month
         const endOfSelectedMonth = add(selectedDateEnd.value, { months: 1 });
         selectedDateStart.value = add(selectedDateStart.value, { months: 1 });
         selectedDateEnd.value = endOfMonth(endOfSelectedMonth);
         break;
      case modes[2]:
         // Get next week
         selectedDateStart.value = add(selectedDateStart.value, { weeks: 1 });
         selectedDateEnd.value = add(selectedDateEnd.value, { weeks: 1 });
         break;
   }
}

const appointments = ref(sampleAppointments)
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

      <ListView v-if="mode === modes[0]" :appointments="appointments" :selectedDateStart="selectedDateStart"
         :selectedDateEnd="selectedDateEnd" :openSidePanel="openSidePanel"></ListView>

      <MonthlyView v-if="mode === modes[1]" :appointments="appointments" :selectedDateStart="selectedDateStart"
         :selectedDateEnd="selectedDateEnd" :openSidePanel="openSidePanel"></MonthlyView>

      <WeeklyView v-if="mode === modes[2]" :appointments="appointments" :selectedDateStart="selectedDateStart"
         :selectedDateEnd="selectedDateEnd" :openSidePanel="openSidePanel"></WeeklyView>

      <div v-if="isSidePanelOpen" class="absolute inset-0 bg-black opacity-40"></div>
      <SidePanel :isSidePanelOpen="isSidePanelOpen" :addAppointment="addAppointment" :editAppointment="editAppointment"
         :closeSidePanel="closeSidePanel" :sidePanelFormData="sidePanelFormData" />
   </div>
</template>