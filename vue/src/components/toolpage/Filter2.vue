<script setup>
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
<template>
    <b-col cols="2" class="filter">
        <div class="dropdown-center d-grid gap-2">
            <b-dropdown no-caret=true variant="secondary" right text="Right align">
                <template #button-content>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel"
                        viewBox="0 0 16 16">
                        <path
                            d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                    </svg>
                    Filter
                </template>
                <div>
                    <ul class="treeview">
                        <li><span class="caret">All Filters</span>
                            <ul class="nested active">
                                <li><span class="caret">Metric type</span>
                                    <ul class="nested">
                                        <li><b-form-checkbox>Process</b-form-checkbox></li>
                                        <li><b-form-checkbox>Product</b-form-checkbox></li>
                                        <li><b-form-checkbox>Code</b-form-checkbox></li>
                                    </ul>
                                </li>
                                <li><span class="caret">Category</span>
                                    <ul class="nested">
                                        <li><b-form-checkbox>Category 1</b-form-checkbox></li>
                                        <li><b-form-checkbox>Category 2</b-form-checkbox></li>
                                        <li><b-form-checkbox>Category 3</b-form-checkbox></li>
                                    </ul>
                                </li>
                                <li><span class="caret">Subcategory</span>
                                    <ul class="nested">
                                        <li><b-form-checkbox>Subcategory 1</b-form-checkbox></li>
                                        <li><b-form-checkbox>Subcategory 2</b-form-checkbox></li>
                                        <li><b-form-checkbox>Subcategory 3</b-form-checkbox></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </div>

            </b-dropdown>
        </div>
    </b-col>
</template>