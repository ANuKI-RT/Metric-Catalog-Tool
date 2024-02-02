import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { findIndex, remove } from 'lodash';
import api from '../api/api';

export const useProjectsStore = defineStore('projects', () => {
    const items = ref([])
    const _nextId = ref(0)
    const uiState = ref({
        showEdit: ref(false),
        formData: ref({
            title: ''
        }),
        selectedProject: ref(""),
        selectedProjectId: ref(null),
        addButtonVisible: ref(true)
    })
    const count = computed(() => items.value.length)

    function resetFormData() {
        uiState.value.formData.title = ""
    }

    function loadFormDataById(id) {
        resetFormData()
        if (null != id) {
            const itemIdx = findIndex(items.value, (item) => item._id == id)
            uiState.value.formData = { ...uiState.value.formData, ...items.value[itemIdx] }
        }
    }

    async function addProject() {
        const project = {
            projName: uiState.value.formData.title
        }
        const res = await api.post('projects', project);
        if (res.status == 201) {
            await getProjects();
        } else {
            //handle errors
        }
    }

    async function deleteProject(projectId) {
        const res = await api.delete('projects/' + projectId);
        if (res.status == 200) {
            await getProjects();
        } else {
            //handle errors
        }
    }

    async function getProjects() {
        const res = await api.get('projects');
        if (res.status == 200) {
            items.value = res.data;
        } else {
            //handle errors
        }
    }

    async function updateProject(projectId, projName) {
        const res = await api.put('projects/' + projectId, { title: projName });
        if (res.status == 200) {
            await getProjects();
        } else {
            //handle errors
        }
    }

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
            paths: ['uiState'],
            storage: sessionStorage
        }
    ]
})