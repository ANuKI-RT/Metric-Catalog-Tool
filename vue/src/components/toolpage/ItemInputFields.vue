<script setup>
import { useMetricItemStore } from "../../store/MetricItems";
import { storeToRefs } from "pinia";
import { FormTagsPlugin } from 'bootstrap-vue'

const metricItemsStore = useMetricItemStore();
const { uiState } = storeToRefs(metricItemsStore);
const { metricSourceOptions, metricTypeOptions, categoryOptions, subcategoryOptions, developementphaseOptions } = metricItemsStore;

function toggleVisibility(id) {
  const element = document.getElementById(id);
  element.hidden = !element.hidden;
}

function updateSelection(array, value, checked) {
  const index = array.indexOf(value);
  if (checked && index === -1) {
    array.push(value);
  } else if (!checked && index !== -1) {
    array.splice(index, 1);
  }
}

</script>

<template>
  <!-- Metric name -->
  <div class="mb-3">
    <b-form-input
      id="dropdown-form-metricname"
      placeholder="Name"
      v-model="uiState.formData.title">
    </b-form-input>
  </div>

  
  <!-- Description -->
  <div class="mb-3">
    <b-form-input
      id="dropdown-form-description"
      placeholder="Description"
      v-model="uiState.formData.description">
    </b-form-input>
  </div>


  <!-- Metric source -->
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


  <!-- Metric ID -->
  <div class="mb-3">
    <b-form-input
      id="dropdown-form-id"
      placeholder="Id"
      v-model="uiState.formData.metricId">
    </b-form-input>
  </div>


  <!-- Formula -->
  <div class="mb-3">
    <b-form-input
      id="dropdown-form-formula"
      placeholder="Formula"
      v-model="uiState.formData.formula">
    </b-form-input>
  </div>


  <!-- Metric type -->
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


  <!-- Category -->
  <div class="mb-3">
    <div class="d-grid gap-2">
      <b-button type="button" variant="outline-secondary" class="filterbutton" @click="toggleVisibility('selectcategory')">Category</b-button>
    </div>
  </div>

  <div class="mb-3" id="selectcategory" hidden>
    <div class="form-group">
      <div id="dropdown-category" class="dropdown-category mb-3">
        <div class="form-check checkfilter" v-for="category in categoryOptions" :key="category.value">
          <input
            class="form-check-input"
            type="checkbox"
            :value="category.value"
            :id="'dropdown-form-category-' + category.value"
            :checked="uiState.formData.category.includes(category.value)"
            @change="updateSelection(uiState.formData.category, category.value, $event.target.checked)"
          />
          <label class="form-check-label" :for="'dropdown-form-category-' + category.value">
            {{ category.text }}
          </label>
        </div>
      </div>
    </div>
  </div>


  <!-- Subcategory -->
  <div class="mb-3">
    <div class="d-grid gap-2">
      <b-button type="button" variant="outline-secondary" class="filterbutton" @click="toggleVisibility('selectsubcategory')">Subcategory</b-button>
    </div>
  </div>

  <div class="mb-3" id="selectsubcategory" hidden>
    <div class="form-group">
      <div id="dropdown-subcategory" class="dropdown-subcategory mb-3">
        <div class="form-check checkfilter" v-for="subcategory in subcategoryOptions" :key="subcategory.value">
          <input
            class="form-check-input"
            type="checkbox"
            :value="subcategory.value"
            :id="'dropdown-form-subcategory-' + subcategory.value"
            :checked="uiState.formData.subcategory.includes(subcategory.value)"
            @change="updateSelection(uiState.formData.subcategory, subcategory.value, $event.target.checked)"
          />
          <label class="form-check-label" :for="'dropdown-form-subcategory-' + subcategory.value">
            {{ subcategory.text }}
          </label>
        </div>
      </div>
    </div>
  </div>

  
  <!-- Development phase -->
  <div class="mb-3">
    <div class="d-grid gap-2">
      <b-button
        type="button"
        variant="outline-secondary"
        class="filterbutton"
        @click="toggleVisibility('selectdevelopmentphase')">Developmentphase</b-button>
    </div>
  </div>

  <div class="mb-3" id="selectdevelopmentphase" hidden>
    <div class="form-group">
      <div id="dropdown-developmentphase" class="dropdown-developmentphase mb-3">
        <div class="form-check checkfilter">
          <input
            class="form-check-input"
            type="checkbox"
            id="deselect-all-developmentphases"
            @change="deselectAll(uiState.formData.developementphase)"
          />
          <label class="form-check-label" for="deselect-all-developmentphases">
            Deselect All
          </label>
        </div>
        <div class="form-check checkfilter" v-for="phase in developementphaseOptions" :key="phase.value">
          <input
            class="form-check-input"
            type="checkbox"
            :value="phase.value"
            :id="'dropdown-form-' + phase.value"
            :checked="uiState.formData.developementphase.includes(phase.value)"
            @change="updateSelection(uiState.formData.developementphase, phase.value, $event.target.checked)"
          />
          <label class="form-check-label" :for="'dropdown-form-' + phase.value">
            {{ phase.text }}
          </label>
        </div>
      </div>
    </div>
  </div>


  <!-- Metric user -->
  <div class="mb-3">
    <b-form-input
      id="dropdown-form-metricuser"
      placeholder="Metric User"
      v-model="uiState.formData.metricUser">
    </b-form-input>
  </div>


  <!-- Metric producer -->
  <div class="mb-3">
    <b-form-input
      id="dropdown-form-mertricproducer"
      placeholder="Metric Producer"
      v-model="uiState.formData.metricProducer">
    </b-form-input>
  </div>


  <!-- Metric owner -->
  <div class="mb-3">
    <b-form-input
      id="dropdown-form-idjoint"
      placeholder="Id Joint"
      v-model="uiState.formData.idJoint">
    </b-form-input>
  </div>


  <!-- minValue -->
  <div class="mb-3">
    <b-form-input
      id="dropdown-form-minValue"
      placeholder="minValue"
      v-model="uiState.formData.minValue">
    </b-form-input>
  </div>


  <!-- maxValue -->
  <div class="mb-3">
    <b-form-input
      id="dropdown-form-maxValue"
      placeholder="maxValue"
      v-model="uiState.formData.maxValue">
    </b-form-input>
  </div>
</template>
