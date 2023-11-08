<script setup>
import { useMetricItemStore } from "../../store/MetricItems";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import ItemInputFields from "./ItemInputFields.vue";


const metricItemsStore = useMetricItemStore()
const { uiState } = storeToRefs(metricItemsStore)
const { addItem, resetFormData, loadFormDataById } = metricItemsStore
const addDropDown = ref(null)


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

  if(uiState.value.formData.id === null) {
    console.debug('Adding item: ', uiState.value.formData)
    addItem(uiState.value.formData)
  }
  resetFormData()
  addDropDown.value.hide()
}






</script>

<template>
  <!--add button-->
  <b-col cols="2" class="addButton">
    <div class="d-grid gap-2 dropstart">
      <b-dropdown dropleft no-caret=true variant="secondary" ref="addDropDown" @show="() => { loadFormDataById(null); }">
        <template #button-content><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg> Add</template>
        <b-dropdown-form class="dropaddform">
          <ItemInputFields />


          <div class="d-grid gap-2">
            <b-button type="submit" variant="secondary" @click="storeMetric">Add</b-button>
          </div>

        </b-dropdown-form>
      </b-dropdown>
    </div>
  </b-col>



  <!--
  <div class="d-flex flex-column">
    
    
    <div class="row topRightSide" :class='{ editVisible : uiState.showEdit }' id="topRightSide">
      
      <div class="col-1 addButton">
        <div class="d-grid gap-2">
          <b-button variant="secondary" @click="showAdd">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Add
          </b-button>
        </div>

      </div>
      
      <div class="col-9 gbf">
        <span>Grouping by folder</span>
      </div>
      
      <div class="col">
        <b-dropdown class="dropdown-center d-grid gap-2">
          <template #button-content>
            Filter
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-funnel" viewBox="0 0 16 16">
              <path
                  d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
            </svg>
          </template>
          <b-dropdown-item><a class="dropdown-item" href="#">Name</a></b-dropdown-item>
          <b-dropdown-item><a class="dropdown-item" href="#">Rating</a></b-dropdown-item>
          <b-dropdown-item><a class="dropdown-item" href="#">Version</a></b-dropdown-item>
        </b-dropdown>
      </div>
    </div>-->

  <!--edit item-->
  <!--<Transition name="bounce">-->
  <!-- TODO: should be a separate component! -->
  <!--
      <div class="row addBar" id="addBar" v-if="uiState.showEdit">
        <b-form id="metricItemForm">
          <input type="hidden" id="metric-id" v-model="uiState.formData.id" />
          <div class="row">
            <div class="col-5">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <b-input type="text" class="form-control" id="title" v-model="uiState.formData.title" />
              </div>
              <div class="mb-3">
                <label for="comment" class="form-label">Comment</label>
                <b-textarea class="form-control" id="comment" rows="3" v-model="uiState.formData.comment" />
              </div>

            </div>
            <div class="col-5">
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <b-textarea class="form-control" id="description" rows="3" v-model="uiState.formData.description" />
              </div>
              <div class="mb-3">
                <div class="mb-3">
                  <label for="rating" class="form-label">Rating from 0-10</label>
                  <b-input type="range" class="form-range" min="0" max="10" id="rating"
                    v-model="uiState.formData.rating" />
                  <output>{{ uiState.formData.rating }}</output>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="d-grid gap-2 addButton2">
                <b-button type="submit" class="btn btn-secondary" @click="storeMetric">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-check-lg" viewBox="0 0 16 16">
                    <path
                      d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  Ok
                </b-button>
              </div>
              <div class="d-grid gap-2 cancelButton">
                <b-button type="button" class="btn btn-secondary" @click="cancelMetric">Cancel</b-button>
              </div>
            </div>
          </div>
        </b-form>
      </div>
    </Transition>
  </div>
  -->
</template>



<style scoped>
div {
  text-align: center;
}

.gbf {
  background-color: lightblue;
  border-radius: 0.3em;
  margin-left: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}



.topRightSide.editVisible {
  border-bottom-width: 0;
}

.addButton {
  padding-right: 0;
}

.addBar {
  padding-top: 0.5em;
  border-bottom: 0.1em solid black;
}

.cancelButton {
  padding-top: 0.5em;
}

.bounce-enter-active {
  transform-origin: top;
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  transform-origin: top;
  animation: bounce-in 0.5s reverse;
}



.plus {
  --bs-btn-color: #6c757d;
  --bs-btn-border-color: #ced4da;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #6c757d;
  --bs-btn-hover-border-color: #6c757d;
  --bs-btn-focus-shadow-rgb: 108, 117, 125;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #6c757d;
  --bs-btn-active-border-color: #6c757d;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #6c757d;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #6c757d;
  --bs-gradient: none;
}

.dropaddform {
  min-width: 30em;
  max-height: 45em;
  overflow-y: auto;
}
</style>