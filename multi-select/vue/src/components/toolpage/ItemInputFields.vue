<script setup>
import { useMetricItemStore } from "../../store/MetricItems";
import { storeToRefs } from "pinia";

const metricItemsStore = useMetricItemStore()
const { uiState } = storeToRefs(metricItemsStore)
const { metricSourceOptions, metricTypeOptions, categoryOptions, subcategoryOptions, developementphaseOptions } = metricItemsStore

function showdivcategory() {
    if (document.getElementById('selectcategory').hidden == true) {
        document.getElementById('selectcategory').hidden = false;
    } else {
        document.getElementById('selectcategory').hidden = true;
    }
}
function showdivsubcategory() {
    if (document.getElementById('selectsubcategory').hidden == true) {
        document.getElementById('selectsubcategory').hidden = false;
    } else {
        document.getElementById('selectsubcategory').hidden = true;
    }
}
function showdivdevelopmentphase() {
    if (document.getElementById('selectdevelopmentphase').hidden == true) {
        document.getElementById('selectdevelopmentphase').hidden = false;
    } else {
        document.getElementById('selectdevelopmentphase').hidden = true;
    }
}

</script>

<template>

    <!--metric name-->
    <div class="mb-3">
        <b-form-input
            id="dropdown-form-metricname"
            placeholder="Name"
            v-model="uiState.formData.title">
        </b-form-input>
    </div>

    <!--description-->
    <div class="mb-3">
        <b-form-input
            id="dropdown-form-description"
            placeholder="Description"
            v-model="uiState.formData.description">
        </b-form-input>
    </div>

    <!--metric source-->
    <div class="mb-3">
        <b-form-select
            class="form-select"
            id="dropdown-form-metricsource"
            v-model="uiState.formData.metricSource"
            :options="metricSourceOptions">
            <template #first>
                <b-form-select-option value="" disabled>Metric Source</b-form-select-option>
            </template>
        </b-form-select>
    </div>

    <!--metric id-->
    <div class="mb-3">
        <b-form-input   
            id="dropdown-form-id"
            placeholder="Id"
            v-model="uiState.formData.metricId">
        </b-form-input>
    </div>

    <!--formula-->
    <div class="mb-3">
        <b-form-input
            id="dropdown-form-formula"
            placeholder="Formula"
            v-model="uiState.formData.formula">
        </b-form-input>
    </div>

    <!--metric type-->
    <div class="mb-3">
        <b-form-select
            class="form-select"
            id="dropdown-form-metrictype"
            v-model="uiState.formData.metricType"
            :options="metricTypeOptions">
            <template #first>
                <b-form-select-option value="" disabled>Metric Type</b-form-select-option>
            </template>
        </b-form-select>
    </div>

    <!--category-->
    <div class="mb-3">
        <div class="d-grid gap-2">
            <b-button type="button" variant="outline-secondary" class="filterbutton" @click="showdivcategory">Category</b-button>
        </div>
    </div>
    
    <div class="mb-3" id="selectcategory" hidden>
        <div class="form-group">

            <div id="dropdown-category" class="dropdown-category mb-3">

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="category1" id="dropdown-form-category">
                    <label class="form-check-label" for="dropdown-form-category1">
                        Functionality
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="category2" id="dropdown-form-category">
                    <label class="form-check-label" for="dropdown-form-category2">
                        Reliability
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="category3" id="dropdown-form-category">
                    <label class="form-check-label" for="dropdown-form-category3">
                        Maintainability
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="category4" id="dropdown-form-category">
                    <label class="form-check-label" for="dropdown-form-category4">
                        Reusability
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="category5" id="dropdown-form-category">
                    <label class="form-check-label" for="dropdown-form-category5">
                        Suitability for safety
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="category6" id="dropdown-form-category">
                    <label class="form-check-label" for="dropdown-form-category6">
                        Usability
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="category7" id="dropdown-form-category">
                    <label class="form-check-label" for="dropdown-form-category7">
                        Software development effectiveness
                    </label>
                </div>

            </div>
        </div>
    </div>


    <!--subcategory-->
    <div class="mb-3">
        <div class="d-grid gap-2">
            <b-button type="button" variant="outline-secondary" class="filterbutton" @click="showdivsubcategory">Subcategory</b-button>
        </div>
    </div>

    <div class="mb-3" id="selectsubcategory" hidden>
        <div class="form-group">

            <div id="dropdown-subcategory" class="dropdown-subcategory mb-3">

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="subcategory1" id="dropdown-form-subcategory">
                    <label class="form-check-label" for="dropdown-form-subcategory1">
                        Completeness
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="subcategory2" id="dropdown-form-subcategory">
                    <label class="form-check-label" for="dropdown-form-subcategory2">
                        Correctness
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="subcategory3" id="dropdown-form-subcategory">
                    <label class="form-check-label" for="dropdown-form-subcategory3">
                        Efficiency
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="subcategory4" id="dropdown-form-subcategory">
                    <label class="form-check-label" for="dropdown-form-subcategory4">
                        Reliability evidence
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="subcategory5" id="dropdown-form-subcategory">
                    <label class="form-check-label" for="dropdown-form-subcategory5">
                        Modularity
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="subcategory6" id="dropdown-form-subcategory">
                    <label class="form-check-label" for="dropdown-form-subcategory6">
                        Testability
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="subcategory7" id="dropdown-form-subcategory">
                    <label class="form-check-label" for="dropdown-form-subcategory7">
                        Complexity
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="subcategory8" id="dropdown-form-subcategory">
                    <label class="form-check-label" for="dropdown-form-subcategory8">
                        Reusability documentation
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="subcategory9" id="dropdown-form-subcategory">
                    <label class="form-check-label" for="dropdown-form-subcategory9">
                        Portability
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="subcategory10" id="dropdown-form-subcategory">
                    <label class="form-check-label" for="dropdown-form-subcategory10">
                        Reuse modification
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="subcategory11" id="dropdown-form-subcategory">
                    <label class="form-check-label" for="dropdown-form-subcategory11">
                        Safety evidence
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="subcategory12" id="dropdown-form-subcategory">
                    <label class="form-check-label" for="dropdown-form-subcategory12">
                        User documentation quality
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="subcategory13" id="dropdown-form-subcategory">
                    <label class="form-check-label" for="dropdown-form-subcategory13">
                        User interface quality
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="subcategory14" id="dropdown-form-subcategory">
                    <label class="form-check-label" for="dropdown-form-subcategory14">
                        Project development process level
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="subcategory15" id="dropdown-form-subcategory">
                    <label class="form-check-label" for="dropdown-form-subcategory15">
                        Project management effectiveness
                    </label>
                </div>

            </div>
        </div>
    </div>

    <!--developement phase-->
    <div class="mb-3">
        <div class="d-grid gap-2">
            <b-button type="button" variant="outline-secondary" class="filterbutton" @click="showdivdevelopmentphase">Developmentphase</b-button>
        </div>
    </div>
        
    <div class="mb-3" id="selectdevelopmentphase" hidden>
        <div class="form-group">

            <div id="dropdown-developmentphase" class="dropdown-developmentphase mb-3">

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="requirement" id="dropdown-form-requirement">
                    <label class="form-check-label" for="dropdown-form-requirement">
                        Requirements analysis
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="design" id="dropdown-form-design">
                    <label class="form-check-label" for="dropdown-form-design">
                        Design
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="implementation" id="dropdown-form-implementation">
                    <label class="form-check-label" for="dropdown-form-implementation">
                        Implementation
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="v&v" id="dropdown-form-v&v">
                    <label class="form-check-label" for="dropdown-form-v&v">
                        Testing
                    </label>
                </div>

                <div class="form-check checkfilter">
                    <input class="form-check-input" type="checkbox" value="operation" id="dropdown-form-operation">
                    <label class="form-check-label" for="dropdown-form-operation">
                        Operation
                    </label>
                </div>

            </div>
        </div>
    </div>

    <!--metric user-->
    <div class="mb-3">
        <b-form-input
            id="dropdown-form-metricuser"
            placeholder="Metric User"
            v-model="uiState.formData.metricUser">
        </b-form-input>
    </div>

    <!--metric producer-->
    <div class="mb-3">
        <b-form-input
            id="dropdown-form-mertricproducer"
            placeholder="Metric Producer"
            v-model="uiState.formData.metricProducer">
        </b-form-input>
    </div>

    <!--metric owner-->
    <div class="mb-3">
        <b-form-input
            id="dropdown-form-idjoint"
            placeholder="Id Joint"
            v-model="uiState.formData.idJoint">
        </b-form-input>
    </div>

    <!--minValue-->
    <div class="mb-3">
        <b-form-input
            id="dropdown-form-minValue"
            placeholder="minValue"
            v-model="uiState.formData.minValue">
        </b-form-input>
    </div>

    <!--maxValue-->
    <div class="mb-3">
        <b-form-input
        id="dropdown-form-maxValue"
        placeholder="maxValue"
        v-model="uiState.formData.maxValue">
    </b-form-input>
    </div>

</template>