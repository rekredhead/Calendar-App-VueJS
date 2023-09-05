<script setup lang="ts">
import { addMinutes, format, parseISO, set, startOfHour, isAfter } from 'date-fns';
import { ref } from 'vue';

const props = defineProps({
   startingDateTime: Date,
   endingDateTime: Date,
   setStartingDateTime: Function,
   setEndingDateTime: Function
});

const isEditingOn = ref(false);
const selectedDate = ref(format(props.startingDateTime!, 'yyyy-MM-dd'));
const selectedStartingTime = ref(format(props.startingDateTime!, 'HH:mm'));
const selectedEndingTime = ref(format(props.endingDateTime!, 'HH:mm'));

const roundTimeToNearest15Minutes = (e: Event) => {
   const eventTarget = e.target as HTMLInputElement;
   const parsedTime = parseISO(`1970-01-01T${eventTarget.value}`);

   const roundedTime = addMinutes(
      startOfHour(parsedTime),
      Math.round(parsedTime.getMinutes() / 15) * 15
   );

   eventTarget.value = format(roundedTime, 'HH:mm');
}

const submitDateTime = () => {
   const parsedDate = parseISO(selectedDate.value);
   const parsedStartingTime = parseISO(`1970-01-01T${selectedStartingTime.value}`);
   const parsedEndingTime = parseISO(`1970-01-01T${selectedEndingTime.value}`);

   const combinedStartingDateTime = set(parsedDate, {
      hours: parsedStartingTime.getHours(),
      minutes: parsedStartingTime.getMinutes(),
   });
   const combinedEndingDateTime = set(parsedDate, {
      hours: parsedEndingTime.getHours(),
      minutes: parsedEndingTime.getMinutes()
   });

   if (isAfter(combinedStartingDateTime, combinedEndingDateTime)) {
      alert('The ending time must be higher than the starting time');
      return;
   }

   props.setStartingDateTime!(combinedStartingDateTime);
   props.setEndingDateTime!(combinedEndingDateTime);
   isEditingOn.value = false;
}
</script>

<template>
   <div class="flex">
      <div class="flex relative justify-center items-center w-36">
         <!-- Indicator for whether the input is filled or not -->
         <div class="formFillIndicator" :class="{ 'bg-green-500': !isEditingOn }">3</div>
      </div>
      <div class="flex flex-col w-full p-4 gap-4 shadow-md shadow-slate-300 rounded-lg mb-5">
         <div class="flex justify-between items-center">
            <p class="text-gray-700 text-sm font-bold">
               {{ !isEditingOn ? 'TIME & DATE' : 'FINALLY SELECT THE DATE & TIME' }}
            </p>
            <button v-if="!isEditingOn" @click="isEditingOn = true"
               class="text-blue-600 text-sm font-bold hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md active:opacity-70">EDIT</button>
         </div>
         <div class="flex flex-col items-end gap-2">
            <div v-show="isEditingOn" class="flex w-full gap-5">
               <input type="date" v-model="selectedDate"
                  class="border border-gray-300 w-full py-4 text-center rounded-md px-5 focus:ring-1 outline-none" />
               <div class="flex items-center gap-2 w-full">
                  <input type="time" v-model="selectedStartingTime" @change="roundTimeToNearest15Minutes"
                     class="border border-gray-300 w-full py-4 text-center rounded-md px-5 focus:ring-1 outline-none" />
                  <p>-</p>
                  <input type="time" v-model="selectedEndingTime" @change="roundTimeToNearest15Minutes"
                     class="border border-gray-300 w-full py-4 text-center rounded-md px-5 focus:ring-1 outline-none" />
               </div>
            </div>

            <button v-show="isEditingOn" @click="submitDateTime"
               class=" bg-blue-600 text-white font-bold px-10 py-2 rounded-md hover:bg-blue-700 active:opacity-70">Confirm</button>

            <!-- Render the choice selected if their choice was selected v-show="isDateTimeSelected()" -->
            <div class="flex flex-col w-full gap-2 px-2" v-show="!isEditingOn">
               <h1 class="text-xl text-gray-700">
                  {{ format(props.startingDateTime!, 'EEEE, dd MMMM HH:mm') }} - {{ format(props.endingDateTime!, 'HH:mm') }}
               </h1>
               <h2 class="text-slate-400 text-sm">*patient approval is needed</h2>
            </div>
         </div>
      </div>
   </div>
</template>