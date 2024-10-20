<script setup>
import { storeToRefs } from "pinia";
import { useMetricItemStore } from "../../store/MetricItems";

const metricItemsStore = useMetricItemStore()
const { uiState } = storeToRefs(metricItemsStore)
const { metricSourceOptions, metricTypeOptions, categoryOptions, subcategoryOptions, developementphaseOptions, apcOptions } = metricItemsStore
</script>

<template>
    <div class="mb-3">
        <b-form-input id="dropdown-form-metricname" placeholder="Name" v-model="uiState.formData.title"></b-form-input>
    </div>
    <div class="mb-3">
        <b-form-input id="dropdown-form-description" placeholder="Description"
            v-model="uiState.formData.description"></b-form-input>
    </div>
    <div class="mb-3">
        <b-form-select class="form-select" id="dropdown-form-metricsource" v-model="uiState.formData.metricSource"
            :options="metricSourceOptions">
            <template #first>
                <b-form-select-option value="" disabled>Metric Source</b-form-select-option>
            </template>
        </b-form-select>
    </div>

    <div class="mb-3">
        <b-form-input id="dropdown-form-id" placeholder="Id" v-model="uiState.formData.metricId"></b-form-input>
    </div>
    <div class="mb-3">
        <b-form-input id="dropdown-form-formula" placeholder="Formula" v-model="uiState.formData.formula"></b-form-input>
    </div>
    <div class="mb-3">
        <b-form-select class="form-select" id="dropdown-form-metrictype" v-model="uiState.formData.metricType"
            :options="metricTypeOptions">
            <template #first>
                <b-form-select-option value="" disabled>Metric Type</b-form-select-option>
            </template>

        </b-form-select>
    </div>
    <div class="mb-3">
        <b-row>
            <b-col cols="10" class="categoryrow10">
                <b-form-select class="form-select" id="dropdown-form-category" v-model="uiState.formData.category"
                    :options="categoryOptions">
                    <template #first>
                        <b-form-select-option value="" disabled>Category</b-form-select-option>
                    </template>

                </b-form-select>
            </b-col>
            <b-col cols="2" class="categoryrow2">
                <div class="d-grid gap-2">
                    <!--TODO: add function to add another category field and select another category-->
                    <b-button variant="outline-secondary" class="plus"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                            height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg></b-button>
                </div>
            </b-col>
        </b-row>

    </div>
    <div class="mb-3">
        <b-row>
            <b-col cols="10" class="categoryrow10">
                <b-form-select class="form-select" id="dropdown-form-subcategory" v-model="uiState.formData.subcategory"
                    :options="subcategoryOptions">
                    <template #first>
                        <b-form-select-option value="" disabled>Subcategory</b-form-select-option>
                    </template>

                </b-form-select>
            </b-col>
            <b-col cols="2" class="categoryrow2">
                <div class="d-grid gap-2">
                    <!--TODO: add function to add another subcategory field and select another subcategory-->
                    <b-button variant="outline-secondary" class="plus"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                            height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg></b-button>
                </div>
            </b-col>
        </b-row>
    </div>
    <div class="mb-3">
        <b-form-select class="form-select" id="dropdown-form-apc" v-model="uiState.formData.apc"
            :options="apcOptions">
            <template #first>
                <b-form-select-option value="" disabled>Automated process capability</b-form-select-option>
            </template>
        </b-form-select>
    </div>
    <div class="mb-3">
        <b-form-select class="form-select" id="dropdown-form-developementphase" v-model="uiState.formData.developementphase"
            :options="developementphaseOptions">
            <template #first>
                <b-form-select-option value="" disabled>Developement Phase</b-form-select-option>
            </template>

        </b-form-select>
    </div>
    <div class="mb-3">
        <b-form-input id="dropdown-form-metricuser" placeholder="Metric User"
            v-model="uiState.formData.metricUser"></b-form-input>
    </div>
    <div class="mb-3">
        <b-form-input id="dropdown-form-mertricproducer" placeholder="Metric Producer"
            v-model="uiState.formData.metricProducer"></b-form-input>
    </div>
    <div class="mb-3">
        <b-form-input id="dropdown-form-idjoint" placeholder="Id Joint" v-model="uiState.formData.idJoint"></b-form-input>
    </div>
    <div class="mb-3">
        <b-form-input id="dropdown-form-minValue" placeholder="minValue" v-model="uiState.formData.minValue"></b-form-input>
    </div>
    <div class="mb-3">
        <b-form-input id="dropdown-form-maxValue" placeholder="maxValue" v-model="uiState.formData.maxValue"></b-form-input>
    </div>
    <div class="mb-3">
        <b-form-textarea style="resize: vertical; height: 90px;" id="dropdown-form-scheme" placeholder="XML Scheme" v-model="uiState.formData.scheme"></b-form-textarea>
    </div>
</template>