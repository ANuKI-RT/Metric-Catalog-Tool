<script setup>
import { useProjectsStore } from "../../store/ProjectsStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const projectsStore = useProjectsStore()
const { uiState } = storeToRefs(projectsStore)
const { resetFormData, loadFormDataById, getProjects, addProject } = projectsStore
const addDropDown = ref(null)



function storeProject(event) {
  event.preventDefault()

  //check if title is set
  if (uiState.value.formData.title == null || uiState.value.formData.title == "") {
    alert("Title is required");
    return;
  }

  console.debug('Adding item: ', uiState.value.formData)
  addProject()
  

  resetFormData()
  addDropDown.value.hide()

}


</script>

<template>
  <b-dropdown dropright text="New Project" variant="outline-secondary" no-caret=true ref="addDropDown"
    @show="() => { loadFormDataById(null); }">
    <b-dropdown-form>
      <div class="mb-3">
        <b-form-input id="dropdown-form-title" type="text" placeholder="New project"
          v-model="uiState.formData.title"></b-form-input>
      </div>
      <div class="mb-3">
        <div class="d-grid gap-2">
          <b-button type="submit" variant="secondary" @click="storeProject">Add</b-button>
        </div>
      </div>
    </b-dropdown-form>
  </b-dropdown>
</template>