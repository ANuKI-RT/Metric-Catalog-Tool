<script setup>
import { ref } from "vue";
import { useProjectsStore } from "../../store/ProjectsStore";
import { useMetricItemStore } from "../../store/MetricItems";
import { storeToRefs } from "pinia";


const projectsStore = useProjectsStore()
const metricStore = useMetricItemStore()
const { items, uiState } = storeToRefs(projectsStore)
const { loadFormDataById, resetFormData, getProjects, deleteProject, updateProject } = projectsStore
const { getProjectItems } = metricStore
const editDropDown = ref(null)

const changeSelectedProject = (projectName, projectId) => {
    uiState.value.selectedProject = projectName;
    uiState.value.selectedProjectId = projectId;
    uiState.value.addButtonVisible = false;
    alert(`The selected project is "${uiState.value.selectedProject}, we will need to change the main view through this click."`);
    getProjectItems(projectId)
};

function storeProject(event) {
    event.preventDefault()

    if (uiState.value.formData.title == null || uiState.value.formData.title == "") {
        alert("Title is required");
        return;
    }


    else {
        console.debug('Updating item with id: ', uiState.value.formData._id, ': ', uiState.value.formData)
        //updateItemById(uiState.value.formData.id, uiState.value.formData)
        updateProject(uiState.value.formData._id, uiState.value.formData.title)
    }
    resetFormData()
    editDropDown.value.forEach((e) => e.hide())

}

getProjects();

</script>


<template>
    <div class="projectList flex-grow-1">
        <!--List of the metrics-->
        <b-table-simple class="table flex-grow-0" id="projectTable">
            <b-thead>
                <b-tr>
                    <b-th></b-th>
                    <b-th></b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr v-for="item in items" :key="item.id">
                    <b-td>
                        <button class="btn-project" @click="changeSelectedProject(item.title, item._id)">
                            {{ item.title }}
                        </button>

                    </b-td>
                    <b-td class="actions">
                        <b-dropdown no-caret=true dropright size="sm" variant="outline-secondary"
                            class="editButton bbuttons" @show="() => { loadFormDataById(item._id); }" ref="editDropDown">
                            <template #button-content>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                            </template>
                            <b-dropdown-form class="editform">
                                <div class="mb-3">
                                    <b-form-input id="dropdown-form-title" type="text" v-model="uiState.formData.title"
                                        placeholder="Title"></b-form-input>
                                </div>
                                <div class="mb-3">
                                    <div class="d-grid gap-2">
                                        <b-button type="submit" variant="secondary" @click="storeProject">Rename</b-button>
                                    </div>
                                </div>
                            </b-dropdown-form>
                        </b-dropdown>
                        <b-button size="sm" variant="outline-secondary" class="deleteButton bbuttons"
                            @click="deleteProject(item._id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg></b-button>
                        <b-button size="sm" variant="outline-secondary" class="exportButton bbuttons" @click=""><svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-box-arrow-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z" />
                                <path fill-rule="evenodd"
                                    d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z" />
                            </svg></b-button>
                        <b-button size="sm" variant="outline-secondary" class="importButton bbuttons" @click=""><svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-box-arrow-in-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z" />
                                <path fill-rule="evenodd"
                                    d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                            </svg></b-button>
                        <b-button size="sm" variant="outline-secondary" class="harmonizeButton bbuttons" @click=""><svg
                                xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="24"
                                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
                                <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
                            </svg></b-button>

                    </b-td>
                </b-tr>

            </b-tbody>
        </b-table-simple>
    </div>
</template>
<style scoped>
.list-table {
    height: 0;
}

div {
    text-align: center;
}

.projectList {
    height: 100%;
}

.projectList {
    padding-top: 0.5em;
    padding-left: 0.8em;
}


.actions {
    text-align: end;
}

.actions .bbuttons {
    margin-right: 1em;
}

.actions .b-dropdown {
    margin-right: 1em;
}

.btn-project {
    border: none;
    cursor: pointer;
    background-color: transparent;
    text-wrap: nowrap;
}
</style>
<style>
.editform {
    min-width: 15rem;
    overflow-y: auto;
}
</style>