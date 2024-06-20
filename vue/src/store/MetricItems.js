import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { findIndex, remove } from 'lodash';
import api from '../api/api';

export const useMetricItemStore = defineStore('metricItems', () => {
    //array with the items in it that are currently shown in the view
    const items = ref([])
    const _nextId = ref(0)
    const uiState = ref({
        showEdit: ref(false),
        //ref that stores data of one item
        //used for addform, edit, formulabutton
        formData: ref({
            title: '',
            description: '',
            metricSource: '',
            metricId: '',
            formula: '',
            metricType: '',
            category: [],
            subcategory: [],
            developementphase: [],
            metricUser: '',
            metricProducer: '',
            idJoint: '',
            minValue: '',
            maxValue: ''
        }),
        //ref that stores filter
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
        { value: 'developmentphase1', text: 'Requirements analysis' },
        { value: 'developmentphase2', text: 'Design' },
        { value: 'developmentphase3', text: 'Implementation' },
        { value: 'developmentphase4', text: 'Testing' },
        { value: 'developmentphase5', text: 'Operation' }
    ]

    const count = computed(() => items.value.length)

    //get the text of the different fields that belongs to the different values
    const metricSourceTexts = computed(() => metricSourceOptions.reduce(function (val, o) { val[o.value] = o.text; return val }, {}))
    const metricTypeTexts = computed(() => metricTypeOptions.reduce(function (val, o) { val[o.value] = o.text; return val }, {}))
    const categoryTexts = computed(() => categoryOptions.reduce(function (val, o) { val[o.value] = o.text; return val }, {}))
    const subcategoryTexts = computed(() => subcategoryOptions.reduce(function (val, o) { val[o.value] = o.text; return val }, {}))
    const developementphaseTexts = computed(() => developementphaseOptions.reduce(function (val, o) { val[o.value] = o.text; return val }, {}))

    /**
     * function that deletes items that are selected from the maincatalog if delete selected button is clicked
     */
    function deleteSelectedMainCatalogItems() {
        var selectedItems = items.value.filter((item) => item.selected)
        selectedItems.forEach((item) => {
            deleteMainCatalogItem(item._id)
        })
    }

    /**
     * function that deletes items that are selected from the selected project if delete selected button is clicked
     */
    function deleteSelectedProjectItems(projId) {
        var selectedItems = items.value.filter((item) => item.selected)
        selectedItems.forEach((item) => {
            deleteProjectItem(item._id, projId)
        })
    }

    /**
     * resets the all the values in formdata to empty
     */
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

    /**
     * resets all the filters
     */
    function resetFilters() {
        uiState.value.filterOptions.metricType = 'all'
        uiState.value.filterOptions.category = 'all'
        uiState.value.filterOptions.subcategory = 'all'
        uiState.value.filterOptions.developementphase = 'all'
        uiState.value.filterOptions.metricSource = 'all'
    }

    /**
     * loads the item with the given id into formdata
     * @param {*} id 
     */
    function loadFormDataById(id) {
        if (uiState.value.formData._id != id) {
            resetFormData()
            if (null != id) {
                const itemIdx = findIndex(items.value, (item) => item._id == id)
                uiState.value.formData = { ...uiState.value.formData, ...items.value[itemIdx] }
            }
        }
    }

    /**
     * sends request to backend to load all the items of the selected project to items
     */ 
    async function getProjectItems(projectId) {
        const res = await api.get('modifiedItems/' + projectId);
        if (res.status == 200) {
            items.value = res.data;
        } else {
            //handle errors
        }
    }

    /**
     * sends request to backend to load all the items of the selected project and returns them
     */ 
    async function getProjectExportItems(projectId) {
        const res = await api.get('modifiedItems/' + projectId);
        if (res.status == 200) {
            return res.data;
        } else {
            //handle errors
        }
    }

    /**
     * sends request to backend to load all the items of the maincatalog to items
     */
    async function getMainCatalogItems() {
        const res = await api.get('items');
        if (res.status == 200) {
            items.value = res.data;
        } else {
            //handle errors
        }
    }

    /**
     * copy selected items from maincatalog to selected project
     * @param {*} projId 
     */
    function copyMetricsToProject(projId){
        var selectedItems = items.value.filter((item) => item.selected)
        selectedItems.forEach((item) => {
            addProjectMetric(item, projId)
        })
    }

    /**
     * send request to backend to add metric with values of formdata to items
     */
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
            //view gets updated
            await getMainCatalogItems();
        } else {
            //handle errors
        }
    }

    /**
     * send request to backend to add metric with values of item to modifieditems with selected project id
     */
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
            //check if item already exits in the project
            if(res.status == 409){
                console.log("Metric " + res.data.itemId + " alreay exists in this Project");
            }
            //handle errors
        }
    }

    /**
     * send request to backend to delete item from items
     * @param {*} itemId 
     */
    async function deleteMainCatalogItem(itemId) {
        const res = await api.delete('items/' + itemId);
        if (res.status == 200){
            //view gets updated
            await getMainCatalogItems();
        } else {
            //handle errors
        }
    }

    /**
     * send request to backend to update item in items
     * @param {*} itemId 
     */
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
            //view gets updated
            await getMainCatalogItems();
        } else {
            //handle errors
        }
    }

    /**
     * send request to backend to update item in modifieditems with given itemid
     * @param {*} itemId 
     * @param {*} projId 
     */
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
            //view gets updated
            await getProjectItems(projId);
        } else {
            //handle errors
        }
    }

    /**
     * send request to backend to delete item in modifieditems with given itemid
     * @param {*} itemId 
     * @param {*} projId 
     */
    async function deleteProjectItem(itemId, projId) {
        const res = await api.delete('modifiedItems/' + itemId);
        if (res.status == 200){
            //view gets updated
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
            //uiState is stored in sessionstorage and stores its values for the session
            paths: ['uiState'],
            storage: sessionStorage
        }
    ]
})