<script setup>
import { storeToRefs } from 'pinia';
import { ref } from "vue";
import { useMetricItemStore } from '@/store/MetricItems';
import { useProjectsStore } from "@/store/ProjectsStore";

import AddProject from "./navigation/AddProject.vue";
import Export from "./navigation/Export.vue";
import Import from "./navigation/Import.vue";
import projectlist from "./navigation/Projectlist.vue";

const metricItemStore = useMetricItemStore();
const projectStore = useProjectsStore();

const allMetricsActive = ref(false);
const { searchItems, searchItemsInProject, getProjectItems, getMainCatalogItems } = metricItemStore;
const { uiState: projectUiState } = storeToRefs(projectStore);
const { uiState: metricUiState } = storeToRefs(metricItemStore);
const searchQuery = ref('');

async function handleSearch() { 
    if(!projectUiState.value.selectedProjectId) {
      if(!searchQuery.value){
        await searchItems(searchQuery.value);
      }else{
        await getMainCatalogItems();
      }   
    }else{
      if(!searchQuery.value){
        await searchItemsInProject(searchQuery.value, projectUiState.value.selectedProjectId)
      }else{
        await getProjectItems(projectUiState.value.selectedProjectId)
      }
    } 
}

function handleQuickFilter(metricSource, category, subcategory) {
  metricUiState.value.filterOptions.metricSource = metricSource ?? 'all';
  metricUiState.value.filterOptions.category = category ?? 'all';
  metricUiState.value.filterOptions.subcategory = subcategory ?? 'all';
}
</script>

<template>
  <!--Header-->
  <div class="headerToolpage">
    <div class="row">
      <div class="col-3"><b-img :fluid-grow="true" src="/src/assets/images/AnukiLogo.png"></b-img></div>
      <div class="col-9 header">
        <h1>SPACEMET</h1>
      </div>
    </div>

  </div>
  <!--Formular for search-->
  <div class="input-group mb-3">
    <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="handleSearch">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
        viewBox="0 0 16 16">
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
      Search
    </button>
    <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon"
      aria-describedby="button-addon1" v-model="searchQuery" @keyup.enter="handleSearch">
</div>

  <!-- tree view open -->
  <ul class="treeview">
    <li><span class="caret"><a href="" @click.prevent="handleQuickFilter()">All metrics</a></span>
      <ul :class="{ active: allMetricsActive }" class="nested">
        <li>
          <span class="caret"><a href="" @click.prevent="handleQuickFilter( 'ecss')">ECSS</a></span>
          <ul class="nested">
            <li>
              <span class="caret">ECSS-Q-HB-80-04A</span>
              <ul class="nested">
                <li>
                  <span class="caret"><a href="" @click.prevent="handleQuickFilter('ecss', 'category1')">Functionality</a></span>
                  <ul class="nested">
                    <li><a href="" @click.prevent="handleQuickFilter('ecss', 'category1', 'subcategory1')">Completeness</a></li>
                    <li><a href="" @click.prevent="handleQuickFilter('ecss', 'category1', 'subcategory2')">Correctness</a></li>
                    <li><a href="" @click.prevent="handleQuickFilter('ecss', 'category1', 'subcategory3')">Efficiency</a></li>
                  </ul>
                </li>
                <li>
                  <span class="caret"><a href="" @click.prevent="handleQuickFilter('ecss', 'category2')">Reliability</a></span>
                  <ul class="nested">
                    <li><a href="" @click.prevent="handleQuickFilter('ecss', 'category2', 'subcategory4')">Reliability evidence</a></li>
                  </ul>
                </li>
                <li><span class="caret"><a href="" @click.prevent="handleQuickFilter('ecss', 'category3')">Maintainability</a></span>
                  <ul class="nested">
                    <li><a href="" @click.prevent="handleQuickFilter('ecss', 'category3', 'subcategory5')">Modularity</a></li>
                    <li><a href="" @click.prevent="handleQuickFilter('ecss', 'category3', 'subcategory6')">Testability</a></li>
                    <li><a href="" @click.prevent="handleQuickFilter('ecss', 'category3', 'subcategory7')">Complexity</a></li>
                  </ul>
                </li>
                <li>
                  <span class="caret"><a href="" @click.prevent="handleQuickFilter('ecss', 'category4')">Reusability</a></span>
                  <ul class="nested">
                    <li><a href="" @click.prevent="handleQuickFilter('ecss', 'category4', 'subcategory8')">Reusability documentation</a></li>
                    <li><a href="" @click.prevent="handleQuickFilter('ecss', 'category4', 'subcategory9')">Portability</a></li>
                    <li><a href="" @click.prevent="handleQuickFilter('ecss', 'category4', 'subcategory10')">Reuse modification</a></li>
                  </ul>
                </li>
                <li>
                  <span class="caret"><a href="" @click.prevent="handleQuickFilter('ecss', 'category5')">Suitability for safety</a></span>
                  <ul class="nested">
                    <li><a href="" @click.prevent="handleQuickFilter('ecss', 'category5', 'subcategory11')">Safety evidence</a></li>
                  </ul>
                </li>
                <li>
                  <span class="caret"><a href="" @click.prevent="handleQuickFilter('ecss', 'category6')">Usability</a></span>
                  <ul class="nested">
                    <li><a href="" @click.prevent="handleQuickFilter('ecss', 'category6', 'subcategory12')">User documentation quality</a></li>
                    <li><a href="" @click.prevent="handleQuickFilter('ecss', 'category6', 'subcategory13')">User interface quality</a></li>
                  </ul>
                </li>
                <li>
                  <span class="caret"><a href="" @click.prevent="handleQuickFilter('ecss', 'category7')">Software development effectiveness</a></span>
                  <ul class="nested">
                    <li><a href="" @click.prevent="handleQuickFilter('ecss', 'category7', 'subcategory14')">Project development process level</a></li>
                    <li><a href="" @click.prevent="handleQuickFilter('ecss', 'category7', 'subcategory15')">Project management effectiveness</a></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li><span class="caret">ISO/IEC250xx</span>
          <ul class="nested">
            <li><span class="caret">ISO/IEC250023</span>
              <ul class="nested">
                <li><span class="caret">Functional suitability</span>
                  <ul class="nested">
                    <li>Functional completeness</li>
                    <li>Functional correctness</li>
                    <li>Functional appropriateness</li>
                  </ul>
                </li>
                <li><span class="caret">Performance efficiency</span>
                  <ul class="nested">
                    <li>Time behaviour</li>
                    <li>Resource utilization</li>
                    <li>Capacity</li>
                  </ul>
                </li>
                <li><span class="caret">Conpatibility</span>
                  <ul class="nested">
                    <li>Co-existance</li>
                    <li>Interoperability</li>
                  </ul>
                </li>
                <li><span class="caret">Usability</span>
                  <ul class="nested">
                    <li>Appropriateness recognizability</li>
                    <li>Learnability</li>
                    <li>Operability</li>
                    <li>User error protection</li>
                    <li>User interface aesthetics</li>
                    <li>Accessability</li>
                  </ul>
                </li>
                <li><span class="caret">Reliability</span>
                  <ul class="nested">
                    <li>Maturity</li>
                    <li>Availability</li>
                    <li>Fault tolerance</li>
                    <li>Recoverability</li>
                  </ul>
                </li>
                <li><span class="caret">Security</span>
                  <ul class="nested">
                    <li>Confidentiality</li>
                    <li>Integrity</li>
                    <li>Non-repudiation</li>
                    <li>Accountability</li>
                    <li>Authenticity</li>
                  </ul>
                </li>
                <li><span class="caret">Maintainability</span>
                  <ul class="nested">
                    <li>Modularity</li>
                    <li>Reusability</li>
                    <li>Analysability</li>
                    <li>Modifiability</li>
                    <li>Testability</li>
                  </ul>
                </li>
                <li><span class="caret">Portability</span>
                  <ul class="nested">
                    <li>Adaptability</li>
                    <li>Installability</li>
                    <li>Replaceability</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li><span class="caret">SLR</span>
          <ul class="nested">
            <li>New</li>
            <li>Refs.</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
  <!--tree view close -->

  <hr>
  <!--Projects-->
  <div class="d-grid gap-2">
    <AddProject/>
  </div>
  <b-row>
    <projectlist/>
  </b-row>
  <hr>
  <!--Button for Export-->
  <div class="d-grid gap-2">
    <Export/>
  </div>
  <p></p>
  <!--Button for Import-->
  <div class="d-grid gap-2 import">
    <Import/>
  </div>
</template>
<script>
export default {
  name: 'Navigation'
}

function initAddMarginToLastItemInTreeView() {
  const allListItems = document.querySelectorAll(".treeview li")
  if (!allListItems) return;

  allListItems.forEach((listItem) => {
    const hasChildren = listItem.children.length > 0;
    if (!hasChildren) {
      listItem.classList.add("lastListItem");
    }
  })
}

function initAddTreeView() {
  let toggler = document.getElementsByClassName("caret");
  let i;
  if (!toggler) return;

  for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function () {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
    });
  }}

document.addEventListener("DOMContentLoaded", () => {
  initAddMarginToLastItemInTreeView()
  initAddTreeView()
})
</script>
<style scoped>
html,
body {
  height: 100%;
}

div {
  text-align: center;
}

.headerToolpage {
  text-align: left;
}

a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}

.import {
  padding-bottom: 1em;
}

.header {
  text-align: left;
}
</style>