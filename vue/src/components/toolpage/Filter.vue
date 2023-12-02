<script setup>
import { useMetricItemStore } from "../../store/MetricItems";
import { storeToRefs } from "pinia";


const metricStore = useMetricItemStore()
const { uiState } = storeToRefs(metricStore)
const { resetFilters } = metricStore


function showdivtype() {
    if (document.getElementById('filtertype').hidden == true) {
        document.getElementById('filtertype').hidden = false;
    } else {
        document.getElementById('filtertype').hidden = true;
    }
}
function showdivcategory() {
    if (document.getElementById('filtercategory').hidden == true) {
        document.getElementById('filtercategory').hidden = false;
    } else {
        document.getElementById('filtercategory').hidden = true;
    }
}
function showdivsubcategory() {
    if (document.getElementById('filtersubcategory').hidden == true) {
        document.getElementById('filtersubcategory').hidden = false;
    } else {
        document.getElementById('filtersubcategory').hidden = true;
    }
}
function showdivphase() {
    if (document.getElementById('filterphase').hidden == true) {
        document.getElementById('filterphase').hidden = false;
    } else {
        document.getElementById('filterphase').hidden = true;
    }
}
function showdivproducer() {
    if (document.getElementById('filterproducer').hidden == true) {
        document.getElementById('filterproducer').hidden = false;
    } else {
        document.getElementById('filterproducer').hidden = true;
    }
}
function showdivuser() {
    if (document.getElementById('filteruser').hidden == true) {
        document.getElementById('filteruser').hidden = false;
    } else {
        document.getElementById('filteruser').hidden = true;
    }
}
function showdivsource() {
    if (document.getElementById('filtersource').hidden == true) {
        document.getElementById('filtersource').hidden = false;
    } else {
        document.getElementById('filtersource').hidden = true;
    }
}
function showdivothers() {
    if (document.getElementById('filterothers').hidden == true) {
        document.getElementById('filterothers').hidden = false;
    } else {
        document.getElementById('filterothers').hidden = true;
    }
}

</script>

<template>
    <!--Filter-->
    <b-col cols="2" class="filter">
        <div class="dropdown-center d-grid gap-2">
            <b-dropdown no-caret=true variant="secondary" right text="Right align">
                <template #button-content>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel"
                        viewBox="0 0 16 16">
                        <path
                            d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                    </svg>
                    Filter
                </template>
                <b-dropdown-form id="dropfilterform">
                    
                    <div class="mb-3">
                        <div class="d-grid gap-2">
                            <b-button type="button" variant="outline-secondary" class="filterbutton" @click="showdivtype">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-caret-down" viewBox="0 0 16 16">
                                    <path
                                        d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                                </svg>Metric type</b-button>
                        </div>
                    </div>
                    <div class="mb-3" id="filtertype" hidden>
                        <b-form-group v-slot="{ ariaDescribedby }">
                            <b-form-radio v-model="uiState.filterOptions.metricType" :aria-describedby="ariaDescribedby" value="">None</b-form-radio>
                            <b-form-radio v-model="uiState.filterOptions.metricType" :aria-describedby="ariaDescribedby" value="process">Process</b-form-radio>
                            <b-form-radio v-model="uiState.filterOptions.metricType" :aria-describedby="ariaDescribedby" value="product">Product</b-form-radio>
                            <b-form-radio v-model="uiState.filterOptions.metricType" :aria-describedby="ariaDescribedby" value="code">Code</b-form-radio>
                        </b-form-group>
                        
                    </div>
                    <div class="mb-3">
                        <div class="d-grid gap-2">
                            <b-button type="button" variant="outline-secondary" class="filterbutton" @click="showdivcategory">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-caret-down" viewBox="0 0 16 16">
                                    <path
                                        d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                                </svg>Metric Category</b-button>
                        </div>
                    </div>
                    <div class="mb-3" id="filtercategory" hidden>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="categorycategory1">
                            <label class="form-check-label" for="flexCheckDefault">
                                Category 1
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="categorycategory2">
                            <label class="form-check-label" for="flexCheckChecked">
                                Category 2
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="categorycategory3">
                            <label class="form-check-label" for="flexCheckChecked">
                                Category 3
                            </label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-grid gap-2">
                            <b-button type="button" variant="outline-secondary" class="filterbutton"
                                @click="showdivsubcategory">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-caret-down" viewBox="0 0 16 16">
                                    <path
                                        d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                                </svg>Metric Subcategory</b-button>
                        </div>
                    </div>
                    <div class="mb-3" id="filtersubcategory" hidden>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="subcategorysubcategory1">
                            <label class="form-check-label" for="flexCheckDefault">
                                Subcategory 1
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="subcategorysubcategory2">
                            <label class="form-check-label" for="flexCheckChecked">
                                Subcategory 2
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="subcategorysubcategory3">
                            <label class="form-check-label" for="flexCheckChecked">
                                Subcategory 3
                            </label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-grid gap-2">
                            <b-button type="button" variant="outline-secondary" class="filterbutton" @click="showdivphase">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-caret-down" viewBox="0 0 16 16">
                                    <path
                                        d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                                </svg>Developement Phase</b-button>
                        </div>
                    </div>
                    <div class="mb-3" id="filterphase" hidden>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="phaserequirement">
                            <label class="form-check-label" for="flexCheckDefault">
                                Requirement
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="phasedesign">
                            <label class="form-check-label" for="flexCheckChecked">
                                Design
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="phaseimplementation">
                            <label class="form-check-label" for="flexCheckChecked">
                                Implementation
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="phasev&v">
                            <label class="form-check-label" for="flexCheckDefault">
                                V&V
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="phaseoperation">
                            <label class="form-check-label" for="flexCheckChecked">
                                Operation
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="phasemaintenance">
                            <label class="form-check-label" for="flexCheckChecked">
                                Maintenance
                            </label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-grid gap-2">
                            <b-button type="button" variant="outline-secondary" class="filterbutton" @click="showdivproducer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-caret-down" viewBox="0 0 16 16">
                                    <path
                                        d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                                </svg>Metric Producer</b-button>
                        </div>
                    </div>
                    <div class="mb-3" id="filterproducer" hidden>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="producerproducer1">
                            <label class="form-check-label" for="flexCheckDefault">
                                Producer 1
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="producerproducer2">
                            <label class="form-check-label" for="flexCheckChecked">
                                Producer 2
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="producerproducer3">
                            <label class="form-check-label" for="flexCheckChecked">
                                Producer 3
                            </label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-grid gap-2">
                            <b-button type="button" variant="outline-secondary" class="filterbutton" @click="showdivuser">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-caret-down" viewBox="0 0 16 16">
                                    <path
                                        d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                                </svg>Metric User</b-button>
                        </div>
                    </div>
                    <div class="mb-3" id="filteruser" hidden>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="useruser1">
                            <label class="form-check-label" for="flexCheckDefault">
                                User 1
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="useruser2">
                            <label class="form-check-label" for="flexCheckChecked">
                                User 2
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="useruser3">
                            <label class="form-check-label" for="flexCheckChecked">
                                User 3
                            </label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-grid gap-2">
                            <b-button type="button" variant="outline-secondary" class="filterbutton" @click="showdivsource">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-caret-down" viewBox="0 0 16 16">
                                    <path
                                        d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                                </svg>Metric Source</b-button>
                        </div>
                    </div>
                    <div class="mb-3" id="filtersource" hidden>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="sourceecss">
                            <label class="form-check-label" for="flexCheckDefault">
                                ECSS
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="sourceiso25000">
                            <label class="form-check-label" for="flexCheckChecked">
                                ISO25000
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="sourceslr">
                            <label class="form-check-label" for="flexCheckChecked">
                                SLR
                            </label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-grid gap-2">
                            <b-button type="button" variant="outline-secondary" class="filterbutton" @click="showdivothers">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-caret-down" viewBox="0 0 16 16">
                                    <path
                                        d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                                </svg>Others</b-button>
                        </div>
                    </div>
                    <div class="mb-3" id="filterothers" hidden>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="sourceecss">
                            <label class="form-check-label" for="flexCheckDefault">
                                AI measured metrics
                            </label>
                        </div>
                        <div class="form-check checkfilter">
                            <input class="form-check-input" type="checkbox" value="" id="sourceiso25000">
                            <label class="form-check-label" for="flexCheckChecked">
                                NLP based metrics
                            </label>
                        </div>
                    </div>
                    <div class="d-grid gap-2">
                        <b-button type="button" variant="secondary" @click="resetFilters">Reset Filters</b-button>
                    </div>
                </b-dropdown-form>
            </b-dropdown>
        </div>
    </b-col>
</template>
<style>
.categoryrow10 {
  padding-right: 0;
}

.categoryrow2 {
  padding-left: 0;
}

.filterbutton {
  text-align: left;
  font-size: 0.9rem;
}

.checkfilter {
  text-align: left;
}
#dropfilterform{
    min-width: 15em;
    max-height: 35em;
    overflow-y: auto;
    
}



</style>
