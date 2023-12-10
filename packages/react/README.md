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

```tsx
export const FileChooser = () => {
  return (
    <label
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={(event) => fileChooserBuilder.onDragOver(event, false)}
      onDragEnter="(event) => fileChooserBuilder.onDragOver(event, true)"
      onDrop="(event) => fileChooserBuilder.onFileChange(event, true)"
      htmlFor="file"
    >
      <input
        id="file"
        class="hidden"
        type="file"
        @change="(event) => fileChooserBuilder.onFileChange(event, false)"
      />
    </label>
  )
}
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
