<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <a role="button" title="Switch Color Mode" @click="toggleDark()">
    <div v-show="isDark" carbon:moon />
    <div v-show="!isDark" carbon:sun />
  </a>
</template>
