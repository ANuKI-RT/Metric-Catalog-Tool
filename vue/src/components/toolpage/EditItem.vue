<script setup>
import { storeToRefs } from "pinia";
import { useMetricItemStore } from "../../store/MetricItems";
import { useProjectsStore } from "../../store/ProjectsStore";
import ItemInputFields from "./ItemInputFields.vue";



const metricItemsStore = useMetricItemStore()
const projectStore = useProjectsStore()
const { uiState: projectUiState } = storeToRefs(projectStore)
const { uiState } = storeToRefs(metricItemsStore)
const { resetFormData, updateMainCatalogItem, updateProjectItem } = metricItemsStore
const { dropDownRef } = defineProps(['dropDownRef'])

function storeMetric(event) {
    event.preventDefault()
    //check if a title is set
    if (!uiState.value.formData.title) {
        alert("Title is required");
        return;
    }

    //check if an id is set
    if (!uiState.value.formData.metricId) {
        alert("Id is required");
        return;
    }

    //check if main catalog or a project is selected and update item
    if(!projectUiState.value.selectedProject){
        updateMainCatalogItem(uiState.value.formData._id)
    } else {
        updateProjectItem(uiState.value.formData._id, projectUiState.value.selectedProjectId)
    }
    
    resetFormData()
    //id input field
    dropDownRef().forEach((e) => e.hide())
}
</script>

<template>
    <b-dropdown-form class="dropeditform" ref="editMetricDropDown">
        <ItemInputFields />
        <div class="d-grid gap-2">
            <b-button type="submit" variant="secondary" @click="storeMetric">Save</b-button>
        </div>

    </b-dropdown-form>
</template>

<style>
.dropeditform {
    min-width: 30em;
    max-height: 45em;
    overflow-y: auto;
}
</style>