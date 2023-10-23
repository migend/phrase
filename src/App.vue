<script setup lang="ts"></script>

<template>
  <header>
    <!-- it could be a component -->
    <div
      class="container mx-auto w-full px-5 py-7 flex flex-col md:flex-row justify-center md:justify-start"
    >
      <RouterLink to="/" class="mx-auto md:mx-0">
        <img alt="Phrase logo" class="logo" src="@/assets/logo.svg" />
      </RouterLink>
      <nav class="flex gap-10 font-bold md:ml-20 items-end justify-center ml-0 mt-5 md:mt-0">
        <RouterLink to="/entries">Entries</RouterLink>
        <RouterLink to="/projects">Active projects</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>
