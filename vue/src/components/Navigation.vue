<script setup>
import { ref } from "vue";
import "../assets/images/AnukiLogo.png";
import { useMetricItemStore } from '../store/MetricItems';


import AddProject from "./navigation/AddProject.vue";
import Export from "./navigation/Export.vue";
import Import from "./navigation/Import.vue";
import projectlist from "./navigation/Projectlist.vue";

const allMetricsActive = ref(false)
const { searchItems } = useMetricItemStore();
const searchQuery = ref('');

async function handleSearch() { 
    const items = await searchItems(searchQuery.value);
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
      aria-describedby="button-addon1" v-model="searchQuery">
  </div>

  <!-- tree view open -->
  <ul class="treeview">
    <li><span class="caret">All metrics</span>
      <ul :class="{ active: allMetricsActive }" class="nested">
        <li><span class="caret">ECSS</span>
          <ul class="nested">
            <li><span class="caret">ECSS-Q-HB-80-04A</span>
              <ul class="nested">
                <li><span class="caret">Functionality</span>
                  <ul class="nested">
                    <li>Completeness</li>
                    <li>Correctness</li>
                    <li>Efficiency</li>
                  </ul>
                </li>
                <li><span class="caret">Reliability</span>
                  <ul class="nested">
                    <li>Reliability evidence</li>
                  </ul>
                </li>
                <li><span class="caret">Maintainability</span>
                  <ul class="nested">
                    <li>Modularity</li>
                    <li>Testability</li>
                    <li>Complexity</li>
                  </ul>
                </li>
                <li><span class="caret">Reusability</span>
                  <ul class="nested">
                    <li>Reusability documentation</li>
                    <li>Portability</li>
                    <li>Reuse modification</li>
                  </ul>
                </li>
                <li><span class="caret">Suitability for safety</span>
                  <ul class="nested">
                    <li>Safety evidence</li>
                  </ul>
                </li>
                <li><span class="caret">Usability</span>
                  <ul class="nested">
                    <li>User documentation quality</li>
                    <li>User interface quality</li>
                  </ul>
                </li>
                <li><span class="caret">Software development effectiveness</span>
                  <ul class="nested">
                    <li>Project development process level</li>
                    <li>Project management effectiveness</li>
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
  }
}

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