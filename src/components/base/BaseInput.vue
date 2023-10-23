<script setup lang="ts">
defineProps<{
  modelValue?: string
  placeholder?: string
}>()

const input = $ref(null)

const emits = defineEmits<{
  (_event: 'update:modelValue', _value: string): void
}>()

const onInput = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
<template>
  <div class="block w-full">
    <input
      ref="input"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      class="border border-gray-400 rounded block w-full p-2 text-sm text-gray-500"
      @input="onInput"
    />
  </div>
</template>
