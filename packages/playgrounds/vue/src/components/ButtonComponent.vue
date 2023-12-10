<script setup lang="ts">
defineProps<{ loading?: boolean; intent?: 'primary' | 'transparent' }>()
</script>

<template>
  <button
    class="relative text-white p-2 rounded-md transition duration-100 focus:ring-1 focus:ring-offset-2 focus:ring-offset-blue-200"
    :class="{
      'opacity-50': loading,
      'bg-blue-400 hover:bg-blue-500': intent === 'primary' || !intent,
      'bg-transparent hover:bg-black/10': intent === 'transparent'
    }"
    :disabled="loading"
  >
    <template v-if="loading">
      <span>loading...</span>
    </template>
    <template v-else>
      <div class="flex items-center gap-1">
        <slot />
        <slot name="suffixIcon" />
      </div>
    </template>
  </button>
</template>
