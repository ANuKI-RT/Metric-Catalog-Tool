import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {findIndex, remove} from 'lodash';

export const useProjectsStore = defineStore('projects', () => {
    const items = ref([])
    const _nextId = ref(0)
    const uiState = ref({
        showEdit: ref(false),
        formData: ref({
            id: null,
            title: '',
        })
    })
    const count = computed(() => items.value.length)

    function addItem(item) {
        const id = _nextId.value
        _nextId.value++;
        items.value.push({...item, id})
    }

    function deleteItemById(id) {
        items.value = items.value.filter((item) => item.id !== id);

    }

    function updateItemById(id, item) {
        const updateIndex = findIndex(items.value, (item) => item.id == id)
        items.value[updateIndex] = {...items.value[updateIndex], ...item}
    }

    function resetFormData() {
        uiState.value.formData.id = null
        uiState.value.formData.title = ""
    }


    return {items, uiState, count, _nextId, addItem, deleteItemById, updateItemById, resetFormData}
}, {
    persist: [
        {
            paths: ['items', '_nextId'],
            storage: localStorage
        },
        {
            paths: ['uiState'],
            storage: sessionStorage
        }
    ]
})