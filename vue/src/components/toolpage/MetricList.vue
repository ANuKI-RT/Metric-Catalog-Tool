<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useMetricItemStore } from "../../store/MetricItems";
import { useProjectsStore } from "../../store/ProjectsStore";
import { useConfigurationFileStore } from '../../store/template_store';
import EditItem from "./EditItem.vue";

const metricStore = useMetricItemStore();
const projectStore = useProjectsStore();
const { items: metricStoreItems, uiState, metricSourceTexts, metricTypeTexts, categoryTexts, subcategoryTexts, developementphaseTexts } = storeToRefs(metricStore);
const { items: projectStoreItems, uiState: projectUiState } = storeToRefs(projectStore);
const { loadFormDataById, deleteSelectedMainCatalogItems, deleteSelectedProjectItems, deleteMainCatalogItem, deleteProjectItem, getMainCatalogItems, getProjectItems, copyMetricsToProject, getProjectExportItems } = metricStore;
const selectedAll = ref(false);
const dropDownRef = ref(null);

/**
 * function that checks which filters are selected, filters the items and returns them
 */
const filterMetricStoreItems = computed(() => {
  let filteredItems = metricStoreItems.value;
  if (uiState.value.filterOptions.metricType !== 'all') {
    filteredItems = filteredItems.filter((metricStoreItem) => metricStoreItem.metrictype === uiState.value.filterOptions.metricType);
  }
  if (uiState.value.filterOptions.category !== 'all') {
    filteredItems = filteredItems.filter((metricStoreItem) => metricStoreItem.category === uiState.value.filterOptions.category);
  }
  if (uiState.value.filterOptions.subcategory !== 'all') {
    filteredItems = filteredItems.filter((metricStoreItem) => metricStoreItem.subcategory === uiState.value.filterOptions.subcategory);
  }
  if (uiState.value.filterOptions.developementphase !== 'all') {
    filteredItems = filteredItems.filter((metricStoreItem) => metricStoreItem.developementphase === uiState.value.filterOptions.developementphase);
  }
  if (uiState.value.filterOptions.metricSource !== 'all') {
    filteredItems = filteredItems.filter((metricStoreItem) => metricStoreItem.metricSource === uiState.value.filterOptions.metricSource);
  }
  return filteredItems;
})

const areAllSelected = computed(() => {
  return metricStoreItems.value.every((item) => item.selected);
});

const toggleAllCheckboxes = () => {
  selectedAll.value = !selectedAll.value;

  metricStoreItems.value.forEach((metricStoreItem) => {
    metricStoreItem.selected = selectedAll.value;
  });
};

const checkAllBoxes = () => {
  setTimeout(() => {
    const allSelected = areAllSelected.value;
    selectedAll.value = !!allSelected;
  }, 100);
};

onMounted(() => {
  // Check if all checkboxes are initially selected
  selectedAll.value = areAllSelected.value;
  console.log(metricSourceTexts);
});

/**
 * function that checks if a project or main catalog is selected and deletes selected items
 */
function deleteSelectedItems() {
  if (!projectUiState.value.selectedProject) {
    return deleteSelectedMainCatalogItems();
  }

  return deleteSelectedProjectItems(projectUiState.value.selectedProjectId);
}

/**
 * function that checks if a project or main catalog is selected and deletes the item
 * @param {*} id 
 */
function deleteItemById(id) {
  if (!projectUiState.value.selectedProject) {
    return deleteMainCatalogItem(id);
  }

  return deleteProjectItem(id, projectUiState.value.selectedProjectId);
}

//loads items of the selected project or main catalog in the view
if (!projectUiState.value.selectedProject) {
  getMainCatalogItems();
} else {
  getProjectItems(projectUiState.value.selectedProjectId);
}

function uploadConfigurationFile() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.onchange = (event) => {
        const file = event.target.files[0];
        if (!file.name.endsWith('.csv')) {
            alert('Bitte laden Sie eine CSV-Datei hoch.');
            return;
        }

        const templateStore = useConfigurationFileStore();
      templateStore.uploadConfigurationFile(file, projectUiState.value.selectedProjectId)
          .then(_ => alert('File uploaded'))
          .catch(error => alert(`Fehler beim Hochladen der Datei: ${error.message}`));
    };
    fileInput.click();
}

</script>
<template>
  <div class="metricOptions">
    <div class="dropstart" v-show="projectUiState.addButtonVisible">
      <b-dropdown no-caret=true dropleft size="sm" variant="outline-secondary" class="formulaButton"
        @show="() => console.log('working')">
        <template #button-content>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z" />
          </svg>
        </template>
        <b-dropdown-item v-for="projectStoreItem in projectStoreItems" @click="() => { copyMetricsToProject(projectStoreItem._id) }">{{ projectStoreItem.title }}</b-dropdown-item>
      </b-dropdown>
    </div>

    <b-button v-show="!projectUiState.addButtonVisible" size="sm" variant="outline-secondary" class="harmonizeButton bbuttons" @click="uploadConfigurationFile()">
      <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-settings-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12.52 20.924c-.87 .262 -1.93 -.152 -2.195 -1.241a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.088 .264 1.502 1.323 1.242 2.192" /><path d="M19 16v6" /><path d="M22 19l-3 3l-3 -3" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
</b-button>
    <b-button variant="outline-secondary" size="sm" @click="deleteSelectedItems">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
        viewBox="0 0 16 16">
        <path
          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
        <path
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
      </svg>
    </b-button>
  </div>
  <b-row class="metricList flex-grow-1">
    
    <!--List of the metrics-->
    <b-table-simple style="text-align: left;" class="table flex-grow-0" id="metricTable">
      <b-thead>
        <b-tr>
          <b-th>
            <b-row>
              <b-col cols="6" class="check">
                <input type="checkbox" v-model="areAllSelected" @click="toggleAllCheckboxes" />
              </b-col>
            </b-row> </b-th>
          <b-th>Title</b-th>
          <b-th>Description</b-th>
          <b-th></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="metricStoreItem in filterMetricStoreItems">
          <b-td class="check"><input type="checkbox" @click="checkAllBoxes" v-model="metricStoreItem.selected" /></b-td>
          <b-td class="col-title">{{ metricStoreItem.title }}</b-td>
          <b-td class="col-description">{{ metricStoreItem.description }}</b-td>
          <b-td class="actions dropstart">
            <b-dropdown no-caret=true dropleft size="sm" variant="outline-secondary" class="formulaButton"
              @show="() => { loadFormDataById(metricStoreItem._id); }">
              <template #button-content>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-superscript" viewBox="0 0 16 16">
                  <path
                    d="m4.266 12.496.96-2.853H8.76l.96 2.853H11L7.62 3H6.38L3 12.496h1.266Zm2.748-8.063 1.419 4.23h-2.88l1.426-4.23h.035Zm5.132-1.797v-.075c0-.332.234-.618.619-.618.354 0 .618.256.618.58 0 .362-.271.649-.52.898l-1.788 1.832V6h3.59v-.958h-1.923v-.045l.973-1.04c.415-.438.867-.845.867-1.547 0-.8-.701-1.41-1.787-1.41C11.565 1 11 1.8 11 2.576v.06h1.146Z" />
                </svg>
              </template>
              <b-dropdown-text>
                <span class="attributes">Title: </span>{{ uiState.formData.title }}
              </b-dropdown-text>
              <b-dropdown-text>
                <span class="attributes">Description: </span>{{ uiState.formData.description }}
              </b-dropdown-text>
              <b-dropdown-text>
                <span class="attributes">Metric Source: </span>{{ metricSourceTexts[uiState.formData.metricSource] }}
              </b-dropdown-text>
              <b-dropdown-text>
                <span class="attributes">Metric Id: </span>{{ uiState.formData.metricId }}
              </b-dropdown-text>
              <b-dropdown-text>
                <span class="attributes">Formula: </span>{{ uiState.formData.formula }}
              </b-dropdown-text>
              <b-dropdown-text>
                <span class="attributes">Metric Type: </span>{{ metricTypeTexts[uiState.formData.metricType] }}
              </b-dropdown-text>
              <b-dropdown-text>
                <span class="attributes">Category: </span>{{ categoryTexts[uiState.formData.category] }}
              </b-dropdown-text>
              <b-dropdown-text>
                <span class="attributes">Subcategory: </span>{{ subcategoryTexts[uiState.formData.subcategory] }}
              </b-dropdown-text>
              <b-dropdown-text>
                <span class="attributes">Developementphase: </span>{{ developementphaseTexts[uiState.formData.developementphase] }}
              </b-dropdown-text>
              <b-dropdown-text>
                <span class="attributes">Metric user: </span>{{ uiState.formData.metricUser }}
              </b-dropdown-text>
              <b-dropdown-text>
                <span class="attributes">Metric producer: </span>{{ uiState.formData.metricProducer }}
              </b-dropdown-text>
              <b-dropdown-text>
                <span class="attributes">Id joint: </span>{{ uiState.formData.idJoint }}
              </b-dropdown-text>
              <b-dropdown-text>
                <span class="attributes">Min Value: </span>{{ uiState.formData.minValue }}
              </b-dropdown-text>
              <b-dropdown-text>
                <span class="attributes">Max Value: </span>{{ uiState.formData.maxValue }}
              </b-dropdown-text>
            </b-dropdown>
            <b-dropdown no-caret=true dropleft size="sm" variant="outline-secondary" class="editButton"
              @show="() => { loadFormDataById(metricStoreItem._id); }" ref="dropDownRef">
              <template #button-content><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg></template>
              <EditItem :dropDownRef="() => dropDownRef" />
            </b-dropdown>
            <b-button size="sm" variant="outline-secondary" class="deleteButton"
              @click="() => deleteItemById(metricStoreItem._id)"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
              </svg></b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-row>
</template>
<style scoped>
.list-table {
  height: 0;
}

div {
  text-align: center;
}

.metricList {
  height: 100%;
}

.metricList {
  padding-top: 0.5em;
  padding-left: 0.8em;
}

.metricOptions {
  padding-top: 0.5em;
  padding-left: 0.8em;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.actions {
  text-align: end;
}

.actions .btn {
  margin-right: 1em;
}

.actions .b-dropdown {
  margin-right: 1em;
}

.check {
  text-align: left;
  padding-right: 0;
}

.col-title {
  max-width: 100px;
}

.col-description {
  max-width: 200px;
}

.attributes {
  font-weight: bold;
}
</style>
<style>
.metricList .b-dropdown-text {
  overflow: hidden;
  max-width: 30rem;
  min-width: 20rem;
  text-overflow: ellipsis;
}
</style>