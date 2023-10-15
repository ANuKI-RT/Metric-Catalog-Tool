<script setup>
import Sort from "../components/toolpage/Sort.vue";
import Filter from "../components/toolpage/Filter.vue";
import AddItem from "./toolpage/AddItem.vue";
</script>
<template>
<div class="d-flex flex-column">
          <b-row class="topRightSide" id="topRightSide">
            <b-col cols="6" class="topRightSideHeader">
              <h4>Main Catalog</h4>
            </b-col>
            <AddItem />
            <Sort />
            <Filter />
          </b-row>
        </div>
</template>
<style>
.topRightSide {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border-bottom: 0.1em solid black;
}
.topRightSideHeader {
  text-align: left;
}
</style>