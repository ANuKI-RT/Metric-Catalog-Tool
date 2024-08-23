<script setup>
import { useMetricItemStore } from "../../store/MetricItems";
import { storeToRefs } from "pinia";
import { FormTagsPlugin } from 'bootstrap-vue'

const metricItemsStore = useMetricItemStore();
const { uiState } = storeToRefs(metricItemsStore);
const { metricSourceOptions, metricTypeOptions, categoryOptions, subcategoryOptions, developmentphaseOptions } = metricItemsStore;


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
    <b-form-select
      class="form-select"
      id="dropdown-form-category"
      v-model="uiState.formData.category"
      :options="categoryOptions" multiple>
      <template #first>
        <b-form-select-option value="" disabled>Category</b-form-select-option>
      </template>
    </b-form-select>
  </div>


  <!-- Subcategory -->
  <div class="mb-3">
    <b-form-select
      class="form-select"
      id="dropdown-form-subcategory"
      v-model="uiState.formData.subcategory"
      :options="subcategoryOptions" multiple>
      <template #first>
        <b-form-select-option value="" disabled>Subcategory</b-form-select-option>
      </template>
    </b-form-select>
  </div>


  <!-- Developmentphase -->
  <div class="mb-3">
    <b-form-select
      class="form-select"
      id="dropdown-form-developmentphase"
      v-model="uiState.formData.developmentphase"
      :options="developmentphaseOptions" multiple>
      <template #first>
        <b-form-select-option value="" disabled>Development Phase</b-form-select-option>
      </template>
    </b-form-select>
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
