<!--TODO: connect import function with backend and database-->
<script setup>
import { useMetricItemStore } from "../../store/MetricItems";
import { storeToRefs } from "pinia";
import { ref } from 'vue';
import { XMLParser } from 'fast-xml-parser'

const files = ref([]);
const importDropDown = ref(null)
const metricItemsStore = useMetricItemStore()
const { uiState, items } = storeToRefs(metricItemsStore)
const { addItem, resetFormData } = metricItemsStore

//options for xml parser
const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
    allowBooleanAttributes: true,
    alwaysCreateTextNode: true
}

/**
 * filereader parses xml from files into text and xml parser uses this text to create items from xml file
 * @param {*} event 
 */
function importFile(event) {
    event.preventDefault()
    files.value.forEach(file => {
        let reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function () {
            console.log(reader.result);
            let parser = new XMLParser(options)
            const output = parser.parse(reader.result)
            const delivery = output["ns2:aeneasLanguage"].project.component.delivery
            for (const property in delivery) {
                if (property.substring(0, 6) == "metric") {
                    uiState.value.formData.title = delivery[property].name
                    uiState.value.formData.metricId = delivery[property].id
                    let metricDuplicate = false
                    items.value.forEach(function(item) {
                        if (item.title == delivery[property].name && item.metricId == delivery[property].id) {
                            metricDuplicate = true;
                        }
                    });
                    if (metricDuplicate == false) {
                        console.debug('Adding item: ', uiState.value.formData)
                        addItem(uiState.value.formData)
                    }
                    resetFormData()
                    clearFiles()
                }
            }
        };

        reader.onerror = function () {
            console.log(reader.error);
        };
    });
    importDropDown.value.hide()
}
function clearFiles(){
    files.value = []
}
</script>
<template>
    <b-dropdown dropright variant="outline-secondary" no-caret=true ref="importDropDown">
        <template #button-content>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-up"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z" />
                <path fill-rule="evenodd"
                    d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
            </svg>
            Import
        </template>
        <b-dropdown-form>
            <div class="mb-3">
                <b-form-file class="mt-3" plain :multiple="true" v-model="files" accept=".xml"></b-form-file>
                <div class="mt-3">Selected files:
                    <ul>
                        <li v-for="file in files">{{ file.name }}</li>
                    </ul>
                </div>
            </div>
            <div class="d-grid gap-2">
                <b-button type="submit" variant="secondary" @click="importFile">Import files</b-button>
            </div>
        </b-dropdown-form>
    </b-dropdown>
</template>