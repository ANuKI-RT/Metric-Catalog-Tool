<script setup>
import { useMetricItemStore } from "../../store/MetricItems";
import { useProjectsStore } from "../../store/ProjectsStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import ItemInputFields from "./ItemInputFields.vue";


const metricItemsStore = useMetricItemStore()
const projectStore = useProjectsStore()
const { uiState } = storeToRefs(metricItemsStore)
const { uiState: projectUiState } = storeToRefs(projectStore)
const { resetFormData, loadFormDataById, addMetric } = metricItemsStore
const addDropDown = ref(null)


function storeMetric(event) {
  event.preventDefault()

  //check if title is set
  if (uiState.value.formData.title == null || uiState.value.formData.title == "") {
    alert("Title is required");
    return;
  }
  //check if id is set
  if (uiState.value.formData.metricId == null || uiState.value.formData.metricId == "") {
    alert("Id is required");
    return;
  }


  console.debug('Adding item: ', uiState.value.formData)
  addMetric()

  resetFormData()
  //hide input fields
  addDropDown.value.hide()
}






</script>

<template>
  <!--add button-->
  <b-col cols="4" class="addButton" v-show="projectUiState.addButtonVisible">
    <div class="d-grid gap-2 dropstart">
      <b-dropdown dropleft no-caret=true variant="secondary" ref="addDropDown" @show="() => { loadFormDataById(null); }">
        <template #button-content><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg> Add</template>
        <b-dropdown-form class="dropaddform">
          <ItemInputFields />


          <div class="d-grid gap-2">
            <b-button type="submit" variant="secondary" @click="storeMetric">Add</b-button>
          </div>

        </b-dropdown-form>
      </b-dropdown>
    </div>
  </b-col>
</template>



<style scoped>
div {
  text-align: center;
}

.gbf {
  background-color: lightblue;
  border-radius: 0.3em;
  margin-left: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}



.topRightSide.editVisible {
  border-bottom-width: 0;
}

.addButton {
  padding-right: 0;
}

.addBar {
  padding-top: 0.5em;
  border-bottom: 0.1em solid black;
}

.cancelButton {
  padding-top: 0.5em;
}

.bounce-enter-active {
  transform-origin: top;
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  transform-origin: top;
  animation: bounce-in 0.5s reverse;
}



.plus {
  --bs-btn-color: #6c757d;
  --bs-btn-border-color: #ced4da;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #6c757d;
  --bs-btn-hover-border-color: #6c757d;
  --bs-btn-focus-shadow-rgb: 108, 117, 125;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #6c757d;
  --bs-btn-active-border-color: #6c757d;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #6c757d;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #6c757d;
  --bs-gradient: none;
}

.dropaddform {
  min-width: 30em;
  max-height: 45em;
  overflow-y: auto;
}
</style>