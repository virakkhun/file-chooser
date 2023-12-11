<script setup lang="ts">
import FileChooserComponent from './components/FileChooserComponent.vue'
</script>

<template>
  <main class="w-full h-screen flex flex-col items-center py-4">
    <header>
      <h1 class="text-2xl font-bold text-center">Vue Demo</h1>
    </header>
    <section class="flex justify-center items-center h-full w-full">
      <FileChooserComponent />
    </section>
    <footer class="flex items-center gap-2">
      <a
        href="https://github.com/virakkhun/file-chooser/tree/main/packages/playgrounds"
        class="hover:text-blue-500 duration-200"
        target="_blank"
        >github
      </a>
      <a
        href="https://www.npmjs.com/package/vue-file-chooser"
        class="hover:text-blue-500 duration-200"
        target="_blank"
        >npm</a
      >
    </footer>
  </main>
</template>
