<script setup lang="ts">
import { addHours, format, parseISO, set } from 'date-fns';
import { ref } from 'vue';

const props = defineProps({
   dateTime: Date,
   setDateTime: Function
});

const isEditingOn = ref(false);
const selectedDate = ref('');
const selectedTime = ref('');

const selectDateTime = () => {
   const parsedDate = parseISO(selectedDate.value);
   const parsedTime = parseISO(`1970-01-01T${selectedTime.value}`);

   const combinedDateTime = set(parsedDate, {
      hours: parsedTime.getHours(),
      minutes: parsedTime.getMinutes(),
      seconds: parsedTime.getSeconds(),
   });

   props.setDateTime!(combinedDateTime);
   isEditingOn.value = false;
}
</script>

<template>
   <!---->
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
               <input type="time" v-model="selectedTime"
                  class="border border-gray-300 w-full py-4 text-center rounded-md px-5 focus:ring-1 outline-none" />
            </div>

            <button v-show="isEditingOn" @click="selectDateTime"
               class=" bg-blue-600 text-white font-bold px-10 py-2 rounded-md hover:bg-blue-700 active:opacity-70">Confirm</button>

            <!-- Render the choice selected if their choice was selected v-show="isDateTimeSelected()" -->
            <div class="flex flex-col w-full gap-2 px-2" v-show="!isEditingOn">
               <h1 class="text-xl text-gray-700">{{ format(props.dateTime!, 'EEEE, dd MMMM HH:mm') }}-{{
                  format(addHours(props.dateTime!, 1), 'HH:mm') }}</h1>
               <h2 class="text-slate-400 text-sm">*patient approval is needed</h2>
            </div>
         </div>
      </div>
   </div>
</template>