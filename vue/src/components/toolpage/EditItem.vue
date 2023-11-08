<script setup>
import { useMetricItemStore } from "../../store/MetricItems";
import { storeToRefs } from "pinia";
import ItemInputFields from "./ItemInputFields.vue";
import { defineProps } from "vue";


const metricItemsStore = useMetricItemStore()
const { uiState } = storeToRefs(metricItemsStore)
const { updateItemById, resetFormData } = metricItemsStore
const { dropDownRef } = defineProps(['dropDownRef'])

function storeMetric(event) {
    event.preventDefault()

    if (uiState.value.formData.title == null || uiState.value.formData.title == "") {
        alert("Title is required");
        return;
    }
    if (uiState.value.formData.metricId == null || uiState.value.formData.metricId == "") {
        alert("Id is required");
        return;
    }

    updateItemById(uiState.value.formData.id, uiState.value.formData)
    resetFormData()
    dropDownRef.forEach((e) => e.hide())
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