<script setup lang="ts">
import ServiceSelector from './ServiceSelector.vue';
</script>

<template>
   <!--{{ format(props.selectedDate!, 'EEEE, dd MMMM HH:mm') }}-->
   <form @submit.prevent class="flex flex-col justify-between items-center h-[47em] w-full overflow-y-scroll p-5">
      <div class=" w-full">
         <ServiceSelector />
      </div>
      <div class=" flex justify-end gap-4 h-12 w-full">
         <button class="bg-slate-100 text-slate-500 font-bold rounded-md w-1/4 hover:bg-slate-200">Cancel</button>
         <button class="bg-slate-400 text-white font-bold rounded-md w-1/4 hover:bg-slate-500">Save</button>
      </div>
   </form>
</template>