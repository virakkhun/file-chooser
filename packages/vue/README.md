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
import { FileChooser } from 'vue-file-chooser'

const { file, imageDataUrl, error, onChange, onDrag } = new FileChooser()
</script>

<template>
  <label
    @dragover="(event) => event.preventDefault()"
    @dragleave="(event) => fileChooserBuilder.onDragOver(event, false)"
    @dragenter="(event) => fileChooserBuilder.onDragOver(event, true)"
    @drop="(event) => fileChooserBuilder.onFileChange(event, true)"
    for="file"
  >
    <input
      id="file"
      class="hidden"
      type="file"
      @change="(event) => fileChooserBuilder.onFileChange(event, false)"
    />
  </label>
</template>
```

without drag and drop

```vue
<script setup lang="ts">
import { FileChooser } from 'vue-file-chooser'

const { file, imageDataUrl, error, onChange, onDrag } = new FileChooser()
</script>

<template>
  <label for="file">
    <input
      id="file"
      class="hidden"
      type="file"
      @change="(event) => fileChooserBuilder.onFileChange(event, false)"
    />
  </label>
</template>
```
