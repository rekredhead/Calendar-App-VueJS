<script setup lang="ts">
defineProps(['icon', 'title'])

import { ref } from 'vue';

const isFocused = ref(false);
const handleFocus = () => isFocused.value = true;
const handleBlur = () => isFocused.value = false;

</script>

<template>
   <button
      @focus="handleFocus"
      @blur="handleBlur"
      class="flex items-center w-full px-5 py-2 gap-5 hover:bg-blue-200 focus:bg-blue-600 transition duration-100"
   >
      <span
         class="material-symbols-outlined text-lg"
         :class="{ 'text-white': isFocused, 'text-slate-500': !isFocused }"
      >{{ icon }}</span>
      <p
         class="font-semibold"
         :class="{ 'text-white':  isFocused, 'text-black': !isFocused }"
      >{{ title }}</p>
   </button>
</template>