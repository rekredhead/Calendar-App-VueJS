<script setup lang="ts">
import { ref } from 'vue';
import Header from './NavBar-components/Header.vue';
import NavButton from './NavBar-components/NavButton.vue';
import ProfileButton from './NavBar-components/ProfileButton.vue';

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
         <ProfileButton/>
      </div>
   </nav>
</template>