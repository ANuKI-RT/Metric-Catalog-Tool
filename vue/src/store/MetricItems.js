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
        { value: 'category1', text: 'Category 1' },
        { value: 'category2', text: 'Category 2' },
        { value: 'category3', text: 'Category 3' }
    ]
    const subcategoryOptions = [
        { value: 'subcategory1', text: 'Subcategory 1' },
        { value: 'subcategory2', text: 'Subcategory 2' },
        { value: 'subcategory3', text: 'Subcategory 3' }
    ]
    const developementphaseOptions = [
        { value: 'requirement', text: 'Requirement' },
        { value: 'design', text: 'Design' },
        { value: 'implementation', text: 'Implementation' },
        { value: 'v&v', text: 'V&V' },
        { value: 'operation', text: 'Operation' },
        { value: 'maintenance', text: 'Maintenance' }
    ]

    const count = computed(() => items.value.length)

    const metricSourceTexts = computed(() => metricSourceOptions.reduce(function (val, o) { val[o.value] = o.text; return val}, {}))
    const metricTypeTexts = computed(() => metricTypeOptions.reduce(function (val, o) { val[o.value] = o.text; return val}, {}))
    const categoryTexts = computed(() => categoryOptions.reduce(function (val, o) { val[o.value] = o.text; return val}, {}))
    const subcategoryTexts = computed(() => subcategoryOptions.reduce(function (val, o) { val[o.value] = o.text; return val}, {}))
    const developementphaseTexts = computed(() => developementphaseOptions.reduce(function (val, o) { val[o.value] = o.text; return val}, {}))

    function addItem(item) {
        const id = _nextId.value
        _nextId.value++;
        items.value.push({ ...item, id })
        resetFormData()
    }

    function deleteItemById(id) {
        remove(items.value, (item) => item.id == id)
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

    function loadFormDataById(id) {
        resetFormData()
        const itemIdx = findIndex(items.value, (item) => item.id == id)
        uiState.value.formData = { ...uiState.value.formData, ...items.value[itemIdx] }
    }

    return { items, uiState, metricSourceOptions, metricSourceTexts, metricTypeOptions, metricTypeTexts, categoryOptions, categoryTexts, subcategoryOptions, subcategoryTexts, developementphaseOptions, developementphaseTexts, count, _nextId, addItem, deleteItemById, updateItemById, resetFormData, loadFormDataById }
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