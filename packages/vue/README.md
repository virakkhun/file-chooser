# vue-file-chooser

a helper for choosing a file in vue application.

### Install

with npm:

```code
npm install vue-file-chooser
```

with yarn:

```code
yarn add vue-file-chooser
```

with pnpm:

```code
pnpm add vue-file-chooser
```

### Usage

with drag and drop

```vue
<script setup lang="ts">
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { FileChooser } from 'vue-file-chooser'
import AlertComponent from './AlertComponent.vue'
import ButtonComponent from './ButtonComponent.vue'

const fileChooserBuilder = new FileChooser()

const onCancelImageClick = (e: Event) => {
  e.preventDefault()
  e.stopImmediatePropagation()
  fileChooserBuilder.destroy()
}

/**
 * Define expose here, so the file and imageDataUrl can be access via instance
 */
defineExpose({
  file: fileChooserBuilder.file,
  imageDataUrl: fileChooserBuilder.imageDataUrl
})
</script>

<template>
  <div>
    <AlertComponent v-if="fileChooserBuilder.error.value">{{
      fileChooserBuilder.error.value
    }}</AlertComponent>
    <label
      @dragover="(event) => event.preventDefault()"
      @dragleave="(event) => fileChooserBuilder.onDrag(event, false)"
      @dragenter="(event) => fileChooserBuilder.onDrag(event, true)"
      @drop="(event) => fileChooserBuilder.onChange(event, true)"
      for="file-upload"
      class="relative cursor-pointer w-96 h-56 border border-dashed border-blue-400 p-20 flex flex-col justify-center items-center gap-2 hover:bg-blue-50 duration-150 transition rounded-2xl"
      :class="{ 'bg-blue-50': fileChooserBuilder.isDragging.value }"
    >
      <input
        @change="(event) => fileChooserBuilder.onChange(event, false)"
        type="file"
        name="file-upload"
        id="file-upload"
        class="hidden"
      />

      <template v-if="!fileChooserBuilder.imageDataUrl.value">
        <ArrowUpTrayIcon class="w-5 h-5" />
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
        <ButtonComponent intent="transparent" @click="onCancelImageClick">
          <XMarkIcon class="w-5 h-5 fill-black" />
        </ButtonComponent>
      </span>
    </label>
  </div>
</template>
```

without drag and drop

```vue
<script setup lang="ts">
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { FileChooser } from 'vue-file-chooser'
import AlertComponent from './AlertComponent.vue'
import ButtonComponent from './ButtonComponent.vue'

const fileChooserBuilder = new FileChooser()

const onCancelImageClick = (e: Event) => {
  e.preventDefault()
  e.stopImmediatePropagation()
  fileChooserBuilder.destroy()
}

/**
 * Define expose here, so the file and imageDataUrl can be access via instance
 */
defineExpose({
  file: fileChooserBuilder.file,
  imageDataUrl: fileChooserBuilder.imageDataUrl
})
</script>

<template>
  <div>
    <AlertComponent v-if="fileChooserBuilder.error.value">{{
      fileChooserBuilder.error.value
    }}</AlertComponent>
    <label
      for="file-upload"
      class="relative cursor-pointer w-96 h-56 border border-dashed border-blue-400 p-20 flex flex-col justify-center items-center gap-2 hover:bg-blue-50 duration-150 transition rounded-2xl"
      :class="{ 'bg-blue-50': fileChooserBuilder.isDragging.value }"
    >
      <input
        @change="(event) => fileChooserBuilder.onChange(event, false)"
        type="file"
        name="file-upload"
        id="file-upload"
        class="hidden"
      />

      <template v-if="!fileChooserBuilder.imageDataUrl.value">
        <ArrowUpTrayIcon class="w-5 h-5" />
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
        <ButtonComponent intent="transparent" @click="onCancelImageClick">
          <XMarkIcon class="w-5 h-5 fill-black" />
        </ButtonComponent>
      </span>
    </label>
  </div>
</template>
```
