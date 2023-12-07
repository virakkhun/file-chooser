<script setup lang="ts">
import { FileChooser } from 'vue-file-chooser'
const fileChooserBuilder = new FileChooser()

const onCancelImageClick = (e: Event) => {
  e.preventDefault()
  e.stopImmediatePropagation()
  fileChooserBuilder.destroy()
}

defineExpose({
  file: fileChooserBuilder.file,
  imageDataUrl: fileChooserBuilder.imageDataUrl
})
</script>

<template>
  <label
    @dragover="(event) => event.preventDefault()"
    @dragleave="(event) => fileChooserBuilder.onDrag(event, false)"
    @dragenter="(event) => fileChooserBuilder.onDrag(event, true)"
    @drop="(event) => fileChooserBuilder.onChange(event, true)"
    for="file-upload"
  >
    <input
      @change="(event) => fileChooserBuilder.onChange(event, false)"
      type="file"
      name="file-upload"
      id="file-upload"
      class="hidden"
    />

    <template v-if="!fileChooserBuilder.imageDataUrl.value">
      <span class="text-blue-500 text-sm"
        >Browse <span class="text-black/50">or</span> Drag & Drop</span
      >
    </template>
    <template v-else>
      <div class="w-32 h-32 rounded-full overflow-hidden"></div>
      <img
        :src="fileChooserBuilder.imageDataUrl.value"
        class="w-32 h-32 rounded-full object-cover object-center"
      />
    </template>

    <span
      v-if="!!fileChooserBuilder.imageDataUrl.value"
      class="absolute top-2 right-2"
    >
      <button intent="transparent" @click="onCancelImageClick">click</button>
    </span>
  </label>
</template>
