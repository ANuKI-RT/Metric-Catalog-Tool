<script setup>
import Sort from "../components/toolpage/Sort.vue";
import Filter from "../components/toolpage/Filter.vue";
import AddItem from "./toolpage/AddItem.vue";
import { useProjectsStore } from "../store/ProjectsStore";
import { useMetricItemStore } from "../store/MetricItems";
import { storeToRefs } from "pinia";

const projectsStore = useProjectsStore()
const metricStore = useMetricItemStore()
const { uiState } = storeToRefs(projectsStore)
const { resetSeledtedProject } = projectsStore
const { getMainCatalogItems } = metricStore
/**
 * function that changes selected project to main catalog and loads main catalog items to the view
 */
const changeSelectedProject = () => {
  resetSeledtedProject()
  //alert(`Selected Main Catalog, we will need to change the main view through this click.`);
  getMainCatalogItems()
};
</script>
<template>
  <div class="d-flex flex-column">
    <b-row class="topRightSide" id="topRightSide">
      <b-col cols="6" class="topRightSideHeader">
        <h4><button class="btn-mainCatalog" @click="changeSelectedProject">Main Catalog -</button> {{
          uiState.selectedProject }}</h4>
      </b-col>
      <b-col cols="6">
        <b-row align-h="end">
          <AddItem />
          <Sort />
          <Filter />
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<style>
.topRightSide {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border-bottom: 0.1em solid black;
}

.topRightSideHeader {
  text-align: left;
}

.btn-mainCatalog {
  border: none;
  cursor: pointer;
  background-color: transparent;
  text-wrap: nowrap;
}
</style>