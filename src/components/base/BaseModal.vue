<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="">
      <div class="fixed inset-0 bg-gray-900 opacity-40"></div>
      <div class="fixed inset-0 flex items-center justify-center">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
