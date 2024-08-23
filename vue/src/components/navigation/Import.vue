<!--TODO: connect import function with backend and database-->
<script setup>
import { useMetricItemStore } from "../../store/MetricItems";
import { storeToRefs } from "pinia";
import { ref } from 'vue';
import { XMLParser } from 'fast-xml-parser'

const files = ref([]);
const importDropDown = ref(null)
const metricItemsStore = useMetricItemStore()
const { uiState, items } = storeToRefs(metricItemsStore)
const { addItem, resetFormData } = metricItemsStore

//options for xml parser
const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
    allowBooleanAttributes: true,
    alwaysCreateTextNode: true
}

/**
 * filereader parses xml from files into text and xml parser uses this text to create items from xml file
 * @param {*} event 
 */
function importFile(event) {
    event.preventDefault()
    files.value.forEach(file => {
        let reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function () {
            console.log(reader.result);
            let parser = new XMLParser(options)
            const output = parser.parse(reader.result)
            const delivery = output["ns2:aeneasLanguage"].project.component.delivery
            for (const property in delivery) {
                if (property.substring(0, 6) == "metric") {
                    uiState.value.formData.title = delivery[property].name
                    uiState.value.formData.metricId = delivery[property].id
                    let metricDuplicate = false
                    items.value.forEach(function(item) {
                        if (item.title == delivery[property].name && item.metricId == delivery[property].id) {
                            metricDuplicate = true;
                        }
                    });
                    if (metricDuplicate == false) {
                        console.debug('Adding item: ', uiState.value.formData)
                        addItem(uiState.value.formData)
                    }
                    resetFormData()
                    clearFiles()
                }
            }
        };

        reader.onerror = function () {
            console.log(reader.error);
        };
    });
    importDropDown.value.hide()
}
function clearFiles(){
    files.value = []
}
</script>
