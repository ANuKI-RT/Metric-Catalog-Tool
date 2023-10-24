<script setup>
import { useMetricItemStore } from "../../store/MetricItems";
import { storeToRefs } from "pinia";
import { ref, computed, onMounted } from "vue";

const store = useMetricItemStore()
const { items, uiState, metricSourceTexts, metricTypeTexts, categoryTexts, subcategoryTexts, developementphaseTexts } = storeToRefs(store)
const { deleteItemById, loadFormDataById } = store
const selectedAll = ref(false);

const areAllSelected = computed(() => {
  return items.value.every((item) => item.selected);
});

const toggleAllCheckboxes = () => {
  selectedAll.value = !selectedAll.value;

  items.value.forEach((item) => {
    item.selected = selectedAll.value;
  });
};

const checkAllBoxes = () => {
  setTimeout(() => {
    const allSelected = areAllSelected.value;
    if (allSelected == true) {
      selectedAll.value = true
    } else selectedAll.value = false;

  }, 100);
};


onMounted(() => {
  // Check if all checkboxes are initially selected
  selectedAll.value = areAllSelected.value;
  console.log(metricSourceTexts)
});

</script>
<template>
  <div class="metricOptions">
    <b-button variant="outline-secondary" size="sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z" />
      </svg>
    </b-button>

    <b-button variant="outline-secondary" size="sm">
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
        <b-tr v-for="item in items">
          <b-td class="check"><input type="checkbox" @click="checkAllBoxes" v-model="item.selected" /></b-td>
          <b-td class="col-title">{{ item.title }}</b-td>
          <b-td class="col-description">{{ item.description }}</b-td>
          <b-td class="actions dropstart">
            <b-dropdown no-caret=true dropleft size="sm" variant="outline-secondary" class="formulaButton"
              @show="() => { loadFormDataById(item.id); }"><template #button-content>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-superscript" viewBox="0 0 16 16">
                  <path
                    d="m4.266 12.496.96-2.853H8.76l.96 2.853H11L7.62 3H6.38L3 12.496h1.266Zm2.748-8.063 1.419 4.23h-2.88l1.426-4.23h.035Zm5.132-1.797v-.075c0-.332.234-.618.619-.618.354 0 .618.256.618.58 0 .362-.271.649-.52.898l-1.788 1.832V6h3.59v-.958h-1.923v-.045l.973-1.04c.415-.438.867-.845.867-1.547 0-.8-.701-1.41-1.787-1.41C11.565 1 11 1.8 11 2.576v.06h1.146Z" />
                </svg>
              </template>
              <b-dropdown-item>Title: {{ uiState.formData.title }}</b-dropdown-item>
              <b-dropdown-item>Description: {{ uiState.formData.description }}</b-dropdown-item>
              <b-dropdown-item>Metric Source: {{ metricSourceTexts[uiState.formData.metricSource] }}</b-dropdown-item>
              <b-dropdown-item>Metric Id: {{ uiState.formData.metricId }}</b-dropdown-item>
              <b-dropdown-item>Formula: {{ uiState.formData.formula }}</b-dropdown-item>
              <b-dropdown-item>Metric Type: {{ metricTypeTexts[uiState.formData.metrictype] }}</b-dropdown-item>
              <b-dropdown-item>Category: {{ categoryTexts[uiState.formData.category] }}</b-dropdown-item>
              <b-dropdown-item>Subcategory: {{ subcategoryTexts[uiState.formData.subcategory] }}</b-dropdown-item>
              <b-dropdown-item>Developementphase: {{ developementphaseTexts[uiState.formData.developementphase] }}</b-dropdown-item>
              <b-dropdown-item>Metric user: {{ uiState.formData.metricuser }}</b-dropdown-item>
              <b-dropdown-item>Metric producer: {{ uiState.formData.metricproducer }}</b-dropdown-item>
              <b-dropdown-item>Id joint: {{ uiState.formData.idjoint }}</b-dropdown-item>

            </b-dropdown>
            <b-dropdown no-caret=true dropleft size="sm" variant="outline-secondary" class="editButton"
              @click="() => { loadFormDataById(item.id); }">
              <template #button-content><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg></template>

            </b-dropdown>
            <b-button size="sm" variant="outline-secondary" class="deleteButton"
              @click="() => deleteItemById(item.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
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
</style>