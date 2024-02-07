import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { findIndex, remove } from 'lodash';
import api from '../api/api';

export const useMetricItemStore = defineStore('metricItems', () => {
    const items = ref([])
    const _nextId = ref(0)
    const uiState = ref({
        showEdit: ref(false),
        formData: ref({
            title: '',
            description: '',
            metricSource: '',
            metricId: '',
            formula: '',
            metricType: '',
            category: '',
            subcategory: '',
            developementphase: '',
            metricUser: '',
            metricProducer: '',
            idJoint: '',
            minValue: '',
            maxValue: ''
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


    function deleteSelectedMainCatalogItems() {
        var selectedItems = items.value.filter((item) => item.selected)
        selectedItems.forEach((item) => {
            deleteMainCatalogItem(item._id)
        })
    }
    function deleteSelectedProjectItems(projId) {
        var selectedItems = items.value.filter((item) => item.selected)
        selectedItems.forEach((item) => {
            deleteProjectItem(item._id, projId)
        })
    }

    function resetFormData() {
        uiState.value.formData._id = ""
        uiState.value.formData.projectId = ""
        uiState.value.formData.itemId = ""
        uiState.value.formData.title = ""
        uiState.value.formData.description = ""
        uiState.value.formData.metricSource = ""
        uiState.value.formData.metricId = ""
        uiState.value.formData.formula = ""
        uiState.value.formData.metricType = ""
        uiState.value.formData.category = ""
        uiState.value.formData.subcategory = ""
        uiState.value.formData.developementphase = ""
        uiState.value.formData.metricUser = ""
        uiState.value.formData.metricProducer = ""
        uiState.value.formData.idJoint = ""
        uiState.value.formData.minValue = ""
        uiState.value.formData.maxValue = ""
    }

    function resetFilters() {
        uiState.value.filterOptions.metricType = 'all'
        uiState.value.filterOptions.category = 'all'
        uiState.value.filterOptions.subcategory = 'all'
        uiState.value.filterOptions.developementphase = 'all'
        uiState.value.filterOptions.metricSource = 'all'
    }

    function loadFormDataById(id) {
        if (uiState.value.formData._id != id) {
            resetFormData()
            if (null != id) {
                const itemIdx = findIndex(items.value, (item) => item._id == id)
                uiState.value.formData = { ...uiState.value.formData, ...items.value[itemIdx] }
            }
        }
    }

    async function getProjectItems(projectId) {
        const res = await api.get('modifiedItems/' + projectId);
        if (res.status == 200) {
            items.value = res.data;
        } else {
            //handle errors
        }
    }
    async function getProjectExportItems(projectId) {
        const res = await api.get('modifiedItems/' + projectId);
        if (res.status == 200) {
            return res.data;
        } else {
            //handle errors
        }
    }

    async function getMainCatalogItems() {
        const res = await api.get('items');
        if (res.status == 200) {
            items.value = res.data;
        } else {
            //handle errors
        }
    }

    function copyMetricsToProject(projId){
        var selectedItems = items.value.filter((item) => item.selected)
        selectedItems.forEach((item) => {
            addProjectMetric(item, projId)
        })
    }

    async function addMetric() {
        const metric = {
            metricTitle: uiState.value.formData.title,
            metricDescription: uiState.value.formData.description,
            metricSource: uiState.value.formData.metricSource,
            metricId: uiState.value.formData.metricId,
            metricFormula: uiState.value.formData.formula,
            metricType: uiState.value.formData.metricType,
            metricCategory: uiState.value.formData.category,
            metricSubcategory: uiState.value.formData.subcategory,
            metricDevelopementphase: uiState.value.formData.developementphase,
            metricUser: uiState.value.formData.metricUser,
            metricProducer: uiState.value.formData.metricProducer,
            metricIdJoint: uiState.value.formData.idJoint,
            minValue: uiState.value.formData.minValue,
            maxValue: uiState.value.formData.maxValue
        }
        const res = await api.post('items', metric);
        if (res.status == 201) {
            resetFormData()
            await getMainCatalogItems();
        } else {
            //handle errors
        }
    }

    async function addProjectMetric(item, projId) {
        const metric = {
            itemId: item._id,
            metricTitle: item.title,
            metricDescription: item.description,
            metricSource: item.metricSource,
            metricId: item.metricId,
            metricFormula: item.formula,
            metricType: item.metricType,
            metricCategory: item.category,
            metricSubcategory: item.subcategory,
            metricDevelopementphase: item.developementphase,
            metricUser: item.metricUser,
            metricProducer: item.metricProducer,
            metricIdJoint: item.idJoint,
            minValue: item.minValue,
            maxValue: item.maxValue,
            projectId: projId
        }
        const res = await api.post('modifiedItems', metric);
        if (res.status == 201) {
            
        } else {
            if(res.status == 409){
                console.log("Metric " + res.data.itemId + " alreay exists in this Project");
            }
            //handle errors
        }
    }


    async function deleteMainCatalogItem(itemId) {
        const res = await api.delete('items/' + itemId);
        if (res.status == 200){
            await getMainCatalogItems();
        } else {
            //handle errors
        }
    }

    async function updateMainCatalogItem(itemId) {
        const metric = {
            metricTitle: uiState.value.formData.title,
            metricDescription: uiState.value.formData.description,
            metricSource: uiState.value.formData.metricSource,
            metricId: uiState.value.formData.metricId,
            metricFormula: uiState.value.formData.formula,
            metricType: uiState.value.formData.metricType,
            metricCategory: uiState.value.formData.category,
            metricSubcategory: uiState.value.formData.subcategory,
            metricDevelopementphase: uiState.value.formData.developementphase,
            metricUser: uiState.value.formData.metricUser,
            metricProducer: uiState.value.formData.metricProducer,
            metricIdJoint: uiState.value.formData.idJoint,
            minValue: uiState.value.formData.minValue,
            maxValue: uiState.value.formData.maxValue
        }
        const res = await api.put('items/' + itemId, metric);
        if (res.status == 200) {
            await getMainCatalogItems();
        } else {
            //handle errors
        }
    }

    async function updateProjectItem(itemId, projId) {
        const metric = {
            metricTitle: uiState.value.formData.title,
            metricDescription: uiState.value.formData.description,
            metricSource: uiState.value.formData.metricSource,
            metricId: uiState.value.formData.metricId,
            metricFormula: uiState.value.formData.formula,
            metricType: uiState.value.formData.metricType,
            metricCategory: uiState.value.formData.category,
            metricSubcategory: uiState.value.formData.subcategory,
            metricDevelopementphase: uiState.value.formData.developementphase,
            metricUser: uiState.value.formData.metricUser,
            metricProducer: uiState.value.formData.metricProducer,
            metricIdJoint: uiState.value.formData.idJoint,
            minValue: uiState.value.formData.minValue,
            maxValue: uiState.value.formData.maxValue
        }
        const res = await api.put('modifiedItems/' + itemId, metric);
        if (res.status == 200) {
            await getProjectItems(projId);
        } else {
            //handle errors
        }
    }

    async function deleteProjectItem(itemId, projId) {
        const res = await api.delete('modifiedItems/' + itemId);
        if (res.status == 200){
            await getProjectItems(projId);
        } else {
            //handle errors
        }
    }

    return { items, uiState, metricSourceOptions, metricSourceTexts, metricTypeOptions, metricTypeTexts, categoryOptions, categoryTexts, subcategoryOptions, subcategoryTexts, developementphaseOptions, developementphaseTexts, count, _nextId, resetFormData, loadFormDataById, resetFilters, getProjectItems, getMainCatalogItems, updateMainCatalogItem, deleteMainCatalogItem, addMetric, deleteProjectItem, updateProjectItem, deleteSelectedMainCatalogItems, deleteSelectedProjectItems, copyMetricsToProject, getProjectExportItems }
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