<script setup>
import { XMLBuilder } from 'fast-xml-parser';
import { useMetricItemStore } from "../../store/MetricItems";
import { storeToRefs } from "pinia";
import fileDownload from 'js-file-download'
import { computed } from 'vue';

const metricItemsStore = useMetricItemStore()
const { items, uiState, categoryTexts, subcategoryTexts } = storeToRefs(metricItemsStore)
const filterMetricStoreItems = computed(() => {
    let filteredItems = items.value
    if (uiState.value.filterOptions.metricType != 'all') {
        filteredItems = filteredItems.filter((item) => item.metrictype == uiState.value.filterOptions.metricType)
    }
    if (uiState.value.filterOptions.category != 'all') {
        filteredItems = filteredItems.filter((item) => item.category == uiState.value.filterOptions.category)
    }
    if (uiState.value.filterOptions.subcategory != 'all') {
        filteredItems = filteredItems.filter((item) => item.subcategory == uiState.value.filterOptions.subcategory)
    }
    if (uiState.value.filterOptions.developementphase != 'all') {
        filteredItems = filteredItems.filter((item) => item.developementphase == uiState.value.filterOptions.developementphase)
    }
    if (uiState.value.filterOptions.metricSource != 'all') {
        filteredItems = filteredItems.filter((item) => item.metricSource == uiState.value.filterOptions.metricSource)
    }
    return filteredItems

})
const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "@",
    format: true
}


function exportCatalog() {
    const metrics = {}
    const date = new Date()

    const builder = new XMLBuilder(options)
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
            "@developementphase": item.developementphase,
            "@metricUser": item.metricUser,
            "@metricProducer": item.metricProducer,
            "@idJoint": item.idJoint,
            "@minValue": item.minValue,
            "@maxValue": item.maxValue
        }
        metrics["metric_" + item.metricSource + "_" + item.metricId] = metric
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
                        //"@date": date.toISOString(),
                        metrics
                    }
                }
            }
        }
    }

    let xmlDataStr = builder.build(exportObj)
    fileDownload(xmlDataStr, "Example.xml")
    console.log(xmlDataStr);
}
</script>
<template>
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
</template>