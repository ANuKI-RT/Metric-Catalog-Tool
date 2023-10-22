<script setup>
import { useProjectsStore } from "../../store/ProjectsStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const projectsStore = useProjectsStore()
const { uiState } = storeToRefs(projectsStore)
const { addItem, resetFormData } = projectsStore
const addDropDown = ref(null)

function storeProject(event) {
  event.preventDefault()

  if(uiState.value.formData.title == null || uiState.value.formData.title == "") {
    alert("Title is required");
    return;
  }

  if (uiState.value.formData.id === null) {
    console.debug('Adding item: ', uiState.value.formData)
    addItem(uiState.value.formData)
  } else {
    console.debug('Updating item with id: ', uiState.value.formData.id, ': ', uiState.value.formData)
    updateItemById(uiState.value.formData.id, uiState.value.formData)
  }

  resetFormData()
  addDropDown.value.hide()

}


</script>

<template>
    <b-dropdown dropright text="New Project" variant="outline-secondary" no-caret=true ref="addDropDown">
    <b-dropdown-form>
      <div class="mb-3">
        <b-form-input id="dropdown-form-title" type="text" placeholder="New project" v-model="uiState.formData.title"></b-form-input>
      </div>
      <div class="mb-3">
        <div class="d-grid gap-2">
          <b-button type="submit" variant="secondary"  @click="storeProject">Add</b-button>
        </div>
      </div>
    </b-dropdown-form>
  </b-dropdown>
</template>