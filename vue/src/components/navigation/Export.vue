<script setup>
import { XMLBuilder } from 'fast-xml-parser';
import { useMetricItemStore } from "../../store/MetricItems";
import { storeToRefs } from "pinia";
import fileDownload from 'js-file-download';
import { computed } from 'vue';
import jsPDF from 'jspdf';

const metricItemsStore = useMetricItemStore();
const { items, uiState, categoryTexts, subcategoryTexts } = storeToRefs(metricItemsStore);

const filterMetricStoreItems = computed(() => {
    let filteredItems = items.value;
    if (uiState.value.filterOptions.metricType != 'all') {
        filteredItems = filteredItems.filter((item) => item.metrictype == uiState.value.filterOptions.metricType);
    }
    if (uiState.value.filterOptions.category != 'all') {
        filteredItems = filteredItems.filter((item) => item.category == uiState.value.filterOptions.category);
    }
    if (uiState.value.filterOptions.subcategory != 'all') {
        filteredItems = filteredItems.filter((item) => item.subcategory == uiState.value.filterOptions.subcategory);
    }
    if (uiState.value.filterOptions.developmentase != 'all') {
        filteredItems = filteredItems.filter((item) => item.developmentphase == uiState.value.filterOptions.developmentphase);
    }
    if (uiState.value.filterOptions.metricSource != 'all') {
        filteredItems = filteredItems.filter((item) => item.metricSource == uiState.value.filterOptions.metricSource);
    }
    return filteredItems;
});

const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "@",
    format: true
};

function exportCatalog() {
    const metrics = {};
    const builder = new XMLBuilder(options);
    filterMetricStoreItems.value.forEach(function (item) {
        const metric = {
            "@name": item.title,
            "@id": item.metricId,
            "@desciption": item.description,
            "@metricSource": item.metricSource,
            "@formula": item.formula,
            "@metricType": item.metricType,
            "@category": categoryTexts.value[item.category],
            "@subcategory": subcategoryTexts.value[item.subcategory],
            "@developmenthase": item.developmentphase,
            "@metricUser": item.metricUser,
            "@metricProducer": item.metricProducer,
            "@idJoint": item.idJoint,
            "@minValue": item.minValue,
            "@maxValue": item.maxValue
        };
        metrics["metric_" + item.metricSource + "_" + item.metricId] = metric;
    });
    const exportObj = {
        "ns2:aeneasLanguage": {
            "@xmlns:ns2": "http://www.xml.ohb.de/aeneas",
            "format": { "@version": "2.0" },
            "project": {
                "@name": "ExampleProject",
                "component": {
                    "@name": "ExampleComp",
                    "delivery": {
                        metrics
                    }
                }
            }
        }
    };

    let xmlDataStr = builder.build(exportObj);
    fileDownload(xmlDataStr, "Example.xml");
    console.log(xmlDataStr);
}


</script>

<template>
    <div class="button-container">
        <b-button type="button" variant="outline-secondary" @click="exportCatalog">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z" />
                <path fill-rule="evenodd"
                    d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z" />
            </svg>
            Export
        </b-button>
        <b-dropdown dropright variant="outline-secondary" no-caret ref="importDropDown">
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
                            <li v-for="file in files" :key="file.name">{{ file.name }}</li>
                        </ul>
                    </div>
                </div>
                <div class="d-grid gap-2">
                    <b-button type="submit" variant="secondary" @click="importFile">Import files</b-button>
                </div>
            </b-dropdown-form>
        </b-dropdown>
    </div>
</template>

<style scoped>
.button-container {
    display: flex;
    gap: 10px;
    justify-content: center; /* Zentriert die Buttons horizontal */
}
</style>


