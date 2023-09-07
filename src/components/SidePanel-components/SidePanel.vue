<script setup lang="ts">
import SidePanelHeader from './SidePanelHeader.vue';
import SidePanelForm from './SidePanelForm.vue';
import { ref, PropType } from 'vue';
import { FormData } from '../types';

const props = defineProps({
   isSidePanelOpen: Boolean,
   addAppointment: Function,
   editAppointment: Function,
   closeSidePanel: Function,
   sidePanelFormData: Object as PropType<FormData>
});

const userProfilePicture = ref('vue.svg');
const userName = ref('User Name');
const userEmailAddress = ref('User Email Address');
const userPosition = ref('User Position');
</script>

<template>
   <aside
      class="flex flex-col fixed bg-white top-0 bottom-0 right-0 border w-1/2 transform transition-transform duration-300"
      :class="{ 'translate-x-0': props.isSidePanelOpen, 'translate-x-full': !props.isSidePanelOpen }">
      <SidePanelHeader :userProfilePicture="userProfilePicture" :userName="userName" :userEmailAddress="userEmailAddress"
         :userPosition="userPosition" />
      <SidePanelForm v-if="isSidePanelOpen" :addAppointment="addAppointment" :editAppointment="editAppointment"
         :sidePanelFormData="sidePanelFormData" :closeSidePanel="closeSidePanel" />
   </aside>
</template>