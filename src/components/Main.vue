<script setup lang="ts">
import Header from './Main-components/Header.vue';
import OptionsBar from './Main-components/OptionsBar.vue';
import Body from './Main-components/Body.vue';
import SidePanel from './SidePanel-components/SidePanel.vue';

import { startOfToday, isSameDay, startOfWeek, endOfWeek, add } from 'date-fns';
import { ref } from 'vue';

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
   service: Service;
   patient: Patient;
   startingDateTime: Date;
   endingDateTime: Date;
}

const appointments = ref([
   {
      date: new Date('2023-09-02'),
      events: [
         {
            patientName: 'Patient1',
            serviceName: 'Service1',
            startTime: new Date('2023-09-02 7:15:00'),
            endTime: new Date('2023-09-02 10:00:00'),
            timeStamp: new Date('2023-09-02 4:04:04')
         },
         {
            patientName: 'Patient2',
            serviceName: 'Service2',
            startTime: new Date('2023-09-02 16:15:00'),
            endTime: new Date('2023-09-02 20:45:00'),
            timeStamp: new Date('2023-09-02 7:07:07')
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
         events: [
            {
               patientName: patient.name,
               serviceName: service.nameOfService,
               startTime: startingDateTime,
               endTime: endingDateTime,
               timeStamp: startOfToday()
            }
         ]
      }

      appointments.value.push(newAppointment);
   } else {
      // Push formData to the events array of the appointment that has the same date
      const newEvent = {
         patientName: patient.name,
         serviceName: service.nameOfService,
         startTime: startingDateTime,
         endTime: endingDateTime,
         timeStamp: startOfToday()
      }

      appointments.value[indexOfSameDate].events.push(newEvent);
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
const selectedDate = ref(currentDate);
const openSidePanel = (dateTime: Date) => {
   isSidePanelOpen.value = true;
   selectedDate.value = dateTime;
};
const closeSidePanel = () => {
   isSidePanelOpen.value = false;
}

/*
const selectedDate = ref(startOfToday());

const getPreviousDate = () => {
   const prevDate = add(selectedDate.value, { months: -1 });
   selectedDate.value = prevDate;
}
const getNextDate = () => {
   const nextDate = add(selectedDate.value, { months: 1 });
   selectedDate.value = nextDate;
}
*/
</script>

<template>
   <div class="flex relative flex-col h-screen bg-blue-100 pb-5">
      <div v-if="isSidePanelOpen" class="absolute inset-0 bg-black opacity-40"></div>
      <Header></Header>
      <OptionsBar :selectedWeekStart="selectedWeekStart" :selectedWeekEnd="selectedWeekEnd"
         :getPreviousDate="getPreviousDate" :getNextDate="getNextDate"></OptionsBar>

      <Body :appointments="appointments" :selectedWeekStart="selectedWeekStart" :selectedWeekEnd="selectedWeekEnd"
         :openSidePanel="openSidePanel"></Body>
      <SidePanel :isSidePanelOpen="isSidePanelOpen" :addAppointment="addAppointment" :closeSidePanel="closeSidePanel"
         :selectedDate="selectedDate" />
   </div>
</template>