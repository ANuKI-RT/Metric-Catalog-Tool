import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { findIndex, remove } from 'lodash';

export const useMetricItemStore = defineStore('metricItems', () => {
    const items = ref([])
    const _nextId = ref(0)
    const uiState = ref({
        showEdit: ref(false),
        formData: ref({
            id: null,
            title: '',
            description: '',
            metricSource: '',
            metricId: '',
            formula: '',
            metrictype: '',
            category: '',
            subcategory: '',
            developementphase: '',
            metricuser: '',
            metricproducer: '',
            idjoint: ''
        }),
        filterOptions: ref({
            metricType: 'all',
            category: 'all',
            subcategory: 'all',
            developementphase: 'all',
            metricSource: 'all',
        })
    })
    const metricSourceOptions = [
        { value: 'ecss', text: 'ECSS' },
        { value: 'iso25000', text: 'ISO25000' },
        { value: 'slr', text: 'SLR' }
    ]
    const metricTypeOptions = [
        { value: 'code', text: 'Code' },
        { value: 'product', text: 'Product' },
        { value: 'process', text: 'Process' }
    ]
    const categoryOptions = [
        { value: 'category1', text: 'Functionality' },
        { value: 'category2', text: 'Reliability' },
        { value: 'category3', text: 'Maintainability' },
        { value: 'category4', text: 'Reusability' },
        { value: 'category5', text: 'Suitability for safety' },
        { value: 'category6', text: 'Usability' },
        { value: 'category7', text: 'Software development effectiveness' }
    ]
    const subcategoryOptions = [
        { value: 'subcategory1', text: 'Completeness' },
        { value: 'subcategory2', text: 'Correctness' },
        { value: 'subcategory3', text: 'Efficiency' },
        { value: 'subcategory4', text: 'Reliability evidence' },
        { value: 'subcategory5', text: 'Modularity' },
        { value: 'subcategory6', text: 'Testability' },
        { value: 'subcategory7', text: 'Complexity' },
        { value: 'subcategory8', text: 'Reusability documentation' },
        { value: 'subcategory9', text: 'Portability' },
        { value: 'subcategory10', text: 'Reuse modification' },
        { value: 'subcategory11', text: 'Safety evidence' },
        { value: 'subcategory12', text: 'User documentation quality' },
        { value: 'subcategory13', text: 'User interface quality' },
        { value: 'subcategory14', text: 'Project development process level' },
        { value: 'subcategory15', text: 'Project management effectiveness' }
    ]
    const developementphaseOptions = [
        { value: 'requirement', text: 'Requirements analysis' },
        { value: 'design', text: 'Design' },
        { value: 'implementation', text: 'Implementation' },
        { value: 'v&v', text: 'Testing' },
        { value: 'operation', text: 'Operation' }
    ]

    const count = computed(() => items.value.length)

    const metricSourceTexts = computed(() => metricSourceOptions.reduce(function (val, o) { val[o.value] = o.text; return val }, {}))
    const metricTypeTexts = computed(() => metricTypeOptions.reduce(function (val, o) { val[o.value] = o.text; return val }, {}))
    const categoryTexts = computed(() => categoryOptions.reduce(function (val, o) { val[o.value] = o.text; return val }, {}))
    const subcategoryTexts = computed(() => subcategoryOptions.reduce(function (val, o) { val[o.value] = o.text; return val }, {}))
    const developementphaseTexts = computed(() => developementphaseOptions.reduce(function (val, o) { val[o.value] = o.text; return val }, {}))

    function addItem(item) {
        const id = _nextId.value
        _nextId.value++;
        items.value.push({ ...item, id })
        resetFormData()
    }

    function deleteItemById(id) {
        remove(items.value, (item) => item.id == id)
    }

    function deleteSelectedItems(){
        remove(items.value, (item) => item.selected)
    }

    function updateItemById(id, item) {
        const updateIndex = findIndex(items.value, (item) => item.id == id)
        items.value[updateIndex] = { ...items.value[updateIndex], ...item }
    }

    function resetFormData() {
        uiState.value.formData.id = null
        uiState.value.formData.title = ""
        uiState.value.formData.description = ""
        uiState.value.formData.metricSource = ""
        uiState.value.formData.metricId = ""
        uiState.value.formData.formula = ""
        uiState.value.formData.metrictype = ""
        uiState.value.formData.category = ""
        uiState.value.formData.subcategory = ""
        uiState.value.formData.developementphase = ""
        uiState.value.formData.metricuser = ""
        uiState.value.formData.metricproducer = ""
        uiState.value.formData.idjoint = ""
    }

    function resetFilters(){
        uiState.value.filterOptions.metricType = 'all'
        uiState.value.filterOptions.category = 'all'
        uiState.value.filterOptions.subcategory = 'all'
        uiState.value.filterOptions.developementphase = 'all'
        uiState.value.filterOptions.metricSource = 'all'
    }

    function loadFormDataById(id) {
        if (uiState.value.formData.id != id) {
            resetFormData()
            if (null != id) {
                const itemIdx = findIndex(items.value, (item) => item.id == id)
                uiState.value.formData = { ...uiState.value.formData, ...items.value[itemIdx] }
            }
        }
    }

    return { items, uiState, metricSourceOptions, metricSourceTexts, metricTypeOptions, metricTypeTexts, categoryOptions, categoryTexts, subcategoryOptions, subcategoryTexts, developementphaseOptions, developementphaseTexts, count, _nextId, addItem, deleteItemById, deleteSelectedItems, updateItemById, resetFormData, loadFormDataById, resetFilters }
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