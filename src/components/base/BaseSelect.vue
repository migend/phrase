<script setup lang="ts">
const props = defineProps<{
  options: string[]
  modelValue?: string
  defaultSelected?: string
}>()

const emit = defineEmits<{ (_event: 'update:modelValue', _value: string | null): void }>()

const onChange = (event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value
  const value = props.options?.find((op) => op === selectedValue) ?? null

  emit('update:modelValue', value)
}
</script>
<template>
  <div class="block w-full">
    <select
      class="border border-gray-400 rounded block w-full p-2 text-sm text-gray-500"
      @change="onChange"
    >
      <option selected value>-- select an option --</option>
      <option
        v-for="option in options"
        :key="option"
        :value="option"
        :selected="option === props.modelValue"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>
