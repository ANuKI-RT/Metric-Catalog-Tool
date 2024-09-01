<script setup>
import Navigation from "../components/Navigation.vue";
import MetricList from "../components/toolpage/MetricList.vue";
import TopRightBar from "../components/TopRightBar.vue";
</script>

<template>
  <b-container fluid class="d-flex flex-grow-1 p-0">
    <div class="content-wrapper d-flex flex-grow-1">
      <!-- Left side of the toolpage with navigation and function buttons -->
      <div class="leftSide">
        <Navigation />
      </div>
      <!-- Right side of the toolpage with filter and list of metrics -->
      <div class="rightSide flex-grow-1 d-flex flex-column">
        <TopRightBar />
        <div class="metric-list-wrapper flex-grow-1">
          <MetricList />
        </div>
      </div>
    </div>
  </b-container>
</template>

<style scoped>
div {
  text-align: center;
}

.leftSide {
  border-right: 0.1em solid black;
  width: 600px;
  flex-shrink: 0;
  padding-right: 20px;
  padding-left: 20px;
}

.rightSide {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  padding-left: 20px;
}

.metric-list-wrapper {
  flex-grow: 1;
  overflow-y: auto;
}

.topRightSideshowedAddBar {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border-color: white;
}

.textDiv {
  text-align: left;
}
</style>
