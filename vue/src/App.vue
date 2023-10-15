<script setup>
</script>

<template class="">
  <b-container fluid class="mainContainer d-flex flex-column">
    <header>
    </header>

    <main class="flex-grow-1 d-flex">
      <RouterView />
    </main>

    <footer>
      <div class="footer"><span>2023 ANUKI Research Project. Metric Catalog Application Demonstrator.</span></div>
    </footer>
  </b-container>
</template>

<style scoped>
.mainContainer {
  padding: 0;
  height: 100%;
}


footer{
    text-align: center;
}

.footer{
    border-top: 0.1em solid black;
}
</style>
