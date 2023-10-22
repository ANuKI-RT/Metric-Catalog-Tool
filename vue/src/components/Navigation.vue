<script setup>
import { ref } from "vue";
import projectlist from "./navigation/projectlist.vue";
import AddProject from "./navigation/AddProject.vue";
const allMetricsActive = ref(false)

</script>

<template>
  <!--Header-->
  <div class="headerToolpage">
    <div class="row">
      <div class="col-3"><img class="img-fluid" src="../images/MicrosoftTeams-image.png"></div>
      <div class="col-9 header">
        <h1>SPACEMET</h1>
      </div>
    </div>

  </div>
  <!--Formular for search-->
  <div class="input-group mb-3">
    <button class="btn btn-outline-secondary" type="button" id="button-addon1">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
        viewBox="0 0 16 16">
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
      Search
    </button>
    <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon"
      aria-describedby="button-addon1">
  </div>

  <!-- tree view open -->
  <ul class="treeview">
    <li><span class="caret">All metrics</span>
      <ul :class="{ active: allMetricsActive }" class="nested">
        <li><span class="caret">ECSS</span>
          <ul class="nested">
            <li>ECSS-Q-HB-80-04A</li>
          </ul>
        </li>
        <li><span class="caret">ISO/IEC250xx</span>
          <ul class="nested">
            <li>ISO/IEC25023</li>
          </ul>
        </li>
        <li><span class="caret">SLR</span>
          <ul class="nested">
            <li>New</li>
            <li>Refs.</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
  <!--tree view close -->

  <hr>
  <!--Projects-->
  <div class="d-grid gap-2">
    <AddProject/>
  </div>
  <b-row>
    <projectlist/>
  </b-row>
  <hr>
  <!--Button for Export-->
  <div class="d-grid gap-2">
    <button type="button" class="btn btn-outline-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z" />
        <path fill-rule="evenodd"
          d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z" />
      </svg>
      Export
    </button>
  </div>
  <p></p>
  <!--Button for Import-->
  <div class="d-grid gap-2 import">
    <button type="button" class="btn btn-outline-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-up"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z" />
        <path fill-rule="evenodd"
          d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
      </svg>
      Import
    </button>
  </div>
</template>
<script>
export default {
  name: 'Navigation'
}

function initAddMarginToLastItemInTreeView() {
  const allListItems = document.querySelectorAll(".treeview li")
  if (!allListItems) return;

  allListItems.forEach((listItem) => {
    const hasChildren = listItem.children.length > 0;
    if (!hasChildren) {
      listItem.classList.add("lastListItem");
    }
  })
}

function initAddTreeView() {
  let toggler = document.getElementsByClassName("caret");
  let i;
  if (!toggler) return;

  for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function () {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initAddMarginToLastItemInTreeView()
  initAddTreeView()
})
</script>
<style scoped>
html,
body {
  height: 100%;
}

div {
  text-align: center;
}

.headerToolpage {
  text-align: left;
}

a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}

.import {
  padding-bottom: 1em;
}

.header {
  text-align: left;
}
</style>