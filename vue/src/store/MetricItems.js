import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {findIndex, remove} from 'lodash';

export const useMetricItemStore = defineStore('metricItems', () => {
    const items = ref([])
    const _nextId = ref(0)
    const uiState = ref({
        showEdit: ref(false),
        formData: ref({
            id: null,
            title: '',
            description: '',
        })
    })
    const count= computed(() => items.value.length)

    function addItem(item) {
        const id = _nextId.value
        _nextId.value++;
        items.value.push({...item, id})
    }

    function deleteItemById(id) {
        remove(items.value, (item) => item.id == id)
    }

    function updateItemById(id, item) {
        const updateIndex = findIndex(items.value, (item) => item.id == id)
        items.value[updateIndex] = {...items.value[updateIndex], ...item}
    }

    function resetFormData() {
        uiState.value.formData.id = null
        uiState.value.formData.title = "bla"
        uiState.value.formData.description = "blub"
    }

    function loadFormDataById(id) {
        resetFormData()
        const itemIdx = findIndex(items.value, (item) => item.id == id)
        uiState.value.formData = {...uiState.value.formData, ...items.value[itemIdx]}
    }

    return {items, uiState, count, _nextId, addItem, deleteItemById, updateItemById, resetFormData, loadFormDataById}
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