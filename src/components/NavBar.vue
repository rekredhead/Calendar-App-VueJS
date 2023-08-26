<script setup lang="ts">
import { ref } from 'vue';
import Header from './NavBar-components/Header.vue';
import NavButton from './NavBar-components/NavButton.vue';

const navButtonsInfo = ref([
   { id: 0, icon: 'lightbulb', title: 'Overview' },
   { id: 1, icon: 'calendar_month', title: 'Calendar' },
   { id: 2, icon: 'person', title: 'Patient List' },
   { id: 3, icon: 'chat', title: 'Messages' },
   { id: 4, icon: 'credit_card', title: 'Payment Information' },
   { id: 5, icon: 'tune', title: 'Settings' },
]);

</script>

<template>
   <nav class="flex relative flex-col w-60 h-full">
      <Header></Header>
      <NavButton
         v-for="buttonInfo in navButtonsInfo"
         :key="buttonInfo.id"
         :icon="buttonInfo.icon"
         :title="buttonInfo.title"
      />
      <div class="flex absolute flex-col w-full bottom-0">
         <NavButton icon="info" title="Help" />

         <div class="flex w-full border border-t-2 items-center justify-between p-2">
            <div class="flex w-4/5 gap-2 items-center">
               <img class="border h-full aspect-square flex rounded-full" src="vue.svg" alt="Profile Picture" /> <!-- Replace profile picture src with intended image -->
               <div class="overflow-hidden">
                  <h1 class="whitespace-nowrap text-base font-semibold">User Name asdfasdf asdfasdf asdfasdfasdfas</h1>
                  <h2 class="whitespace-nowrap text-sm text-slate-500">User Career asdfasd asdfas dfasdf</h2>
               </div>
            </div>

            <button class="">
               <span class="material-symbols-outlined">expand_more</span>
            </button>
         </div>
      </div>
   </nav>
</template>

<style scoped></style>