<script setup>
import { XMLBuilder } from 'fast-xml-parser';
import fileDownload from 'js-file-download';
import path from 'path';
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useMetricItemStore } from "../../store/MetricItems";
import { useProjectsStore } from "../../store/ProjectsStore";
import { useConfigurationFileStore } from '../../store/template_store';
import { jsPDF } from 'jspdf';
import { escapeXmlChars } from '../../api/utils';

const projectsStore = useProjectsStore()
const metricStore = useMetricItemStore()
const { items, uiState } = storeToRefs(projectsStore)
const { categoryTexts, subcategoryTexts } = storeToRefs(metricStore)
const { loadFormDataById, resetFormData, getProjects, deleteProject, updateProject } = projectsStore
const { getProjectItems, getProjectExportItems, addItemsToProject } = metricStore
const editDropDown = ref(null)

/**
 * change to the project that was selected and load project items to view
 * @param {*} projectName 
 * @param {*} projectId 
 */
const changeSelectedProject = (projectName, projectId) => {
    uiState.value.selectedProject = projectName;
    uiState.value.selectedProjectId = projectId;
    uiState.value.addButtonVisible = false;
    getProjectItems(projectId)
};

function storeProject(event) {
    event.preventDefault()

    //check if title is set
    if (!uiState.value.formData.title) {
        alert("Title is required");
        return;
    }
    console.debug('Updating item with id: ', uiState.value.formData._id, ': ', uiState.value.formData)
    updateProject(uiState.value.formData._id, uiState.value.formData.title)

    resetFormData()
    //hide input field
    editDropDown.value.forEach((e) => e.hide())

}

//options for xml builder
const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "@",
    format: true
}

/**
 * exports project, xml builder uses items form backend of the project and builds xml string and xml file is downloaded
 * @param {*} projId 
 * @param {*} projTitle 
 */
async function exportProject(projId, projTitle) {
    const metrics = {}
    const date = new Date()

    const exportItems = await getProjectExportItems(projId)

    const builder = new XMLBuilder(options)
    exportItems.forEach(function (item) {
        console.log({ item })

        const metric = {
            "@Name": item.title,
            "@Id": item.metricId,
            "@Description": item.description,
            "@MetricSource": item.metricSource,
            "@Formula": item.formula,
            "@MetricType": item.metricType,
            "@AutomatedProcessCapability": item.apc == null ? "" : item.apc,
            "@Category": categoryTexts.value[item.category] == null ? "" : categoryTexts.value[item.category],
            "@Subcategory": subcategoryTexts.value[item.subcategory] == null ? "" : subcategoryTexts.value[item.subcategory],
            "@DevelopementPhase": item.developementphase == null ? "" : item.developementphase,
            "@MetricUser": item.metricUser,
            "@MetricProducer": item.metricProducer,
            "@IdJoint": item.idJoint,
            "@MinValue": item.minValue == null ? "" : item.minValue,
            "@MaxValue": item.maxValue == null ? "" : item.maxValue,
            "@Scheme": item.scheme ? escapeXmlChars(item.scheme) : ""
        }
        metrics["metric_" + item.metricSource + "_" + item.metricId] = metric
    });
    const exportObj = {
        "ns2:aeneasLanguage": {
            "@xmlns:ns2": "http://www.xml.ohb.de/aeneas",
            "format": { "@version": "2.0" },
            "project": {
                "@name": projTitle,
                "component": {
                    "@name": "ExampleComp",
                    "delivery": {
                        //"@date": date.toISOString(),
                        metrics
                    }
                }
            }
        }
    }

    let xmlDataStr = builder.build(exportObj)
    fileDownload(xmlDataStr, projTitle + ".xml")
    console.log(xmlDataStr);
}

//load projects to view
getProjects();

async function exportCSVBasedOnProjectID(projectId, title) {
    const projectItems = await getProjectExportItems(projectId);
    const metricIds = [];
    projectItems.forEach(item => {
        console.log(item.metricId);
        metricIds.push(item.metricId);
    });
    console.log(metricIds);
    processFile(metricIds, title, projectId);
}

async function processFile(metricIDs, title, projectId) {
    const templateStore = useConfigurationFileStore();

    try {
        const csvData = await templateStore.getConfigurationFile(projectId);
        if (!csvData) {
            alert('Please upload a file first');
            return;
        }

        const lines = csvData.split('\n');

        let data = '';
        lines.forEach(line => {
            let shouldUncomment = false;
            let shouldComment = false;
            if (line.startsWith('#run') || line.startsWith('# run')) {
                const values = line.split(';');
                for (let value of values) {
                    if (metricIDs.includes(value)) {
                        shouldUncomment = true;
                        break;
                    }
                }
            } else if (line.startsWith('run')) {
                const values = line.split(';');
                let arrayValueFound = values.some(value => metricIDs.includes(value));
                shouldComment = !arrayValueFound;
            }
            const newLine = shouldUncomment ? line.slice(1) : (shouldComment ? `# ${line}` : line);
            data += newLine + '\n';
        });

        const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = title + '_CColl.csv';
        link.click();
    } catch (error) {
        console.error('Fehler beim Abrufen der Datei: ', error);
        alert('Ein Fehler ist aufgetreten: ' + error.message);
    }
}

async function handleFileUpload(projectId) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xml';
    fileInput.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file.name.endsWith('.xml')) {
            alert('Bitte laden Sie eine XML-Datei hoch.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");

            // IDs aus der hochgeladenen XML-Datei extrahieren
            const metrics = xmlDoc.querySelectorAll("metrics > *");
            const xmlIds = Array.from(metrics).map(metric => metric.getAttribute("id"));
            console.log("XML IDs:", xmlIds);

            // Verwenden Sie getProjectExportItems mit dem übergebenen projectId-Parameter
            const modifiedItems = await getProjectExportItems(projectId);
            const modifiedIds = modifiedItems.map(item => item.metricId);

            // IDs filtern, die in modifiedIds enthalten sind
            const matchingIds = xmlIds.filter(metricId => modifiedIds.includes(metricId));
            console.log("Übereinstimmende IDs:", matchingIds);

            // IDs aus xmlIds, die nicht in matchingIds enthalten sind, ausgeben
            const remainingIds = xmlIds.filter(metricId => !matchingIds.includes(metricId));
            console.log("Verbleibende IDs aus XML:", remainingIds);

            await addItemsToProject(remainingIds, projectId);
            await getProjectItems(projectId);
        };
        reader.onerror = (e) => {
            alert('Fehler beim Lesen der Datei: ' + e.target.error.message);
        };
        reader.readAsText(file);
    };
    fileInput.click();
}

async function exportCatalogAsPDFFromButton(buttonElement) {
    const doc = new jsPDF();
    let yPosition = 20;
    let metricCount = 0;

    // Extrahiere projectId und projectName aus der Zeile des Buttons
    const rowElement = buttonElement.closest('tr'); // Annahme: Button ist in einer Tabellenzeile
    const projectId = rowElement.getAttribute('data-project-id'); // Annahme: projectId wird als data-Attribut gespeichert
    const projectName = rowElement.getAttribute('data-project-name'); // Annahme: projectName wird als data-Attribut gespeichert

    if (!projectId || !projectName) {
        alert('Fehler: Projekt-ID oder Projektname nicht gefunden.');
        return;
    }

    const createHeader = () => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text('Measurement package of the project: ' + projectName, doc.internal.pageSize.getWidth() / 2, 10, { align: "center" });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        yPosition = 30;
    };

    const createFooter = () => {
        const disclaimerText = 'This is not a legally-binding document and is not for execution. It is intended purely to provide an overview of the existing and potential functionality of the metric catalog tool prototype.';
        const disclaimerLines = doc.splitTextToSize(disclaimerText, 180); // Text auf eine Breite von 180 beschränken
        doc.setFontSize(10);
        doc.text(disclaimerLines, doc.internal.pageSize.getWidth() / 2, 290, { align: "center" });
    };

    // Laden der Metriken des Projekts basierend auf der übergebenen projectId
    const metrics = await getProjectExportItems(projectId);

    metrics.forEach((item) => {
 
        createHeader();

        doc.text(10, yPosition, `Name: ${item.title}`);
        yPosition += 5;
        doc.text(10, yPosition, `Id: ${item.metricId}`);
        yPosition += 5;

        const descriptionLines = doc.splitTextToSize(`Description: ${item.description}`, 180); // Text auf eine Breite von 180 beschränken
        doc.text(10, yPosition, descriptionLines);
        yPosition += descriptionLines.length * 5; // Höhe je nach Anzahl der Zeilen anpassen

        doc.text(10, yPosition, `Source: ${item.metricSource}`);
        yPosition += 5;
        doc.text(10, yPosition, `Formula: ${item.formula ? item.formula : ""}`);
        yPosition += 5;
        doc.text(10, yPosition, `Type: ${item.metricType ? item.metricType : ""}`);
        yPosition += 5;
        doc.text(10, yPosition, `Category: ${categoryTexts.value[item.category] ? categoryTexts.value[item.category] : ""}`);
        yPosition += 5;
        doc.text(10, yPosition, `Subcategory: ${subcategoryTexts.value[item.subcategory] ? subcategoryTexts.value[item.subcategory] : ""}`);
        yPosition += 5;
        doc.text(10, yPosition, `Developmentphase: ${item.developmentphase ? item.developmentphase : ""}`);
        yPosition += 5;
        doc.text(10, yPosition, `AutomatedProcessCapability: ${item.apc ? item.apc : ""}`);
        yPosition += 5;
        doc.text(10, yPosition, `User: ${item.metricUser}`);
        yPosition += 5;
        doc.text(10, yPosition, `Producer: ${item.metricProducer}`);
        yPosition += 5;
        doc.text(10, yPosition, `Joint ID: ${item.idJoint}`);
        yPosition += 5;
        doc.text(10, yPosition, `Min Value: ${item.minValue}`);
        yPosition += 5;
        doc.text(10, yPosition, `Max Value: ${item.maxValue}`);
        yPosition += 5;
        doc.text(10, yPosition, `XML Schema: ${item.scheme}`);
        
        metricCount += 1;

        createFooter();

        if (metricCount != metrics.length) {
            doc.addPage();
        }

    });

    doc.save(`${projectName}_metrics.pdf`);
}



</script>

<template>
    <div class="projectList flex-grow-1">
        <!-- List of the metrics -->
        <b-table-simple class="table flex-grow-0" id="projectTable">
            <b-thead>
                <b-tr>
                    <b-th></b-th>
                    <b-th></b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <!-- Hier fügst du die data-project-id und data-project-name Attribute hinzu -->
                <b-tr v-for="item in items" :key="item.id" :data-project-id="item._id" :data-project-name="item.title">
                    <b-td>
                        <button class="btn-project" @click="changeSelectedProject(item.title, item._id)">
                            {{ item.title }}
                        </button>
                    </b-td>
                    <b-td class="actions">
                        <b-dropdown no-caret=true dropright size="sm" variant="outline-secondary"
                            class="editButton bbuttons" @show="() => { loadFormDataById(item._id); }"
                            ref="editDropDown">
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
                                        <b-button type="submit" variant="secondary"
                                            @click="storeProject">Rename</b-button>
                                    </div>
                                </div>
                            </b-dropdown-form>
                        </b-dropdown>
                        <b-button size="sm" variant="outline-secondary" class="deleteButton bbuttons"
                            @click="deleteProject(item._id)"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg></b-button>

                        <b-button size="sm" variant="outline-secondary" class="exportButton bbuttons"
                            @click="exportProject(item._id, item.title)"><svg xmlns="http://www.w3.org/2000/svg"
                                width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up"
                                viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z" />
                                <path fill-rule="evenodd"
                                    d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z" />
                            </svg></b-button>
                        <b-button size="sm" variant="outline-secondary" class="importButton bbuttons"
                            @click="handleFileUpload(item._id)"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                height="16" fill="currentColor" class="bi bi-box-arrow-in-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z" />
                                <path fill-rule="evenodd"
                                    d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                            </svg></b-button>
                        <b-button size="sm" variant="outline-secondary" class="exportCatalogAsPDFButton bbuttons"
                            @click="exportCatalogAsPDFFromButton($event.target)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-license">
                                <path stroke="none" d="M0 0h16v16H0z" fill="none" />
                                <path
                                    d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11" />
                                <path d="M9 7l4 0" />
                                <path d="M9 11l4 0" />
                            </svg>
                        </b-button>
                        <b-button size="sm" variant="outline-secondary" class="harmonizeButton bbuttons"
                            @click="exportCSVBasedOnProjectID(item._id, item.title)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-settings-up">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path
                                    d="M12.501 20.93c-.866 .25 -1.914 -.166 -2.176 -1.247a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.074 .26 1.49 1.296 1.252 2.158" />
                                <path d="M19 22v-6" />
                                <path d="M22 19l-3 -3l-3 3" />
                                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                            </svg>
                        </b-button>
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
