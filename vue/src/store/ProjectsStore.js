import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { BFormTags, BFormTag } from 'bootstrap-vue';
import { findIndex, remove } from 'lodash';
import api from '../api/api';

export const useProjectsStore = defineStore('projects', () => {
    //array with the items in it that are currently shown in the view
    const items = ref([])
    const _nextId = ref(0)
    const uiState = ref({
        showEdit: ref(false),
        //ref that stores data of one project
        //used for addform, edit
        formData: ref({
            title: ''
        }),
        //refs that store the selected project and its id
        selectedProject: ref(""),
        selectedProjectId: ref(null),
        //ref that stores if add button is visible, in maincatalogview add button is visible and in projectview it is hidden
        addButtonVisible: ref(true)
    })
    const count = computed(() => items.value.length)

    /**
     * resets the all the values in formdata to empty
     */
    function resetFormData() {
        uiState.value.formData.title = ""
    }

    /**
     * loads the project with the given id into formdata
     * @param {*} id 
     */
    function loadFormDataById(id) {
        resetFormData()
        if (null != id) {
            const itemIdx = findIndex(items.value, (item) => item._id == id)
            uiState.value.formData = { ...uiState.value.formData, ...items.value[itemIdx] }
        }
    }

    /**
     * send request to backend to add project with values of formdata to projects
     */
    async function addProject() {
        const project = {
            projName: uiState.value.formData.title
        }
        const res = await api.post('projects', project);
        if (res.status == 201) {
            //update view
            await getProjects();
        } else {
            //handle errors
        }
    }

    /**
     * send request to backend to delete project from projects
     * @param {*} projectId
     */
    async function deleteProject(projectId) {
        const res = await api.delete('projects/' + projectId);
        if (res.status == 200) {
            await getProjects();
        } else {
            //handle errors
        }
    }

     /**
     * send request to backend to load all the projects from projects
     */ 
    async function getProjects() {
        const res = await api.get('projects');
        if (res.status == 200) {
            items.value = res.data;
        } else {
            //handle errors
        }
    }

    /**
     * send request to backend to update project in projects
     * @param {*}projectId
     * @param {*} projName 
     */
    async function updateProject(projectId, projName) {
        const res = await api.put('projects/' + projectId, { title: projName });
        if (res.status == 200) {
            await getProjects();
        } else {
            //handle errors
        }
    }

    /**
     * resets the selected project and projectid and switches add button visbility 
     */
    function resetSeledtedProject(){
        uiState.value.selectedProject = ""
        uiState.value.selectedProjectId = null
        uiState.value.addButtonVisible = true
    }

    return { items, uiState, count, _nextId, resetFormData, loadFormDataById, getProjects, addProject, deleteProject, updateProject, resetSeledtedProject }
}, {
    persist: [
        {
            paths: ['_nextId'],
            storage: localStorage
        },
        {
            //uiState is stored in sessionstorage and stores its values for the session
            paths: ['uiState'],
            storage: sessionStorage
        }
    ]
})