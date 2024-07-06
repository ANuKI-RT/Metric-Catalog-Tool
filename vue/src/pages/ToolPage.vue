<script setup>
import Navigation from "../components/Navigation.vue";
import MetricList from "../components/toolpage/MetricList.vue"
import TopRightBar from "../components/TopRightBar.vue";

</script>

<template>
  <b-container fluid class="d-flex flex-grow-1">
    <b-row class="content-wrapper flex-grow-1">
      <!--Left side of the toolpage with navigation and functionbuttons-->
      <b-col cols="3" class="leftSide">
        <Navigation />
      </b-col>
      <!--Right side of the toolpage with filter and list of metrics-->
      <b-col cols="9">
        <TopRightBar/>
        <b-row>
          <MetricList />
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
div {
  text-align: center;
}

.leftSide {
  border-right: 0.1em solid black;
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