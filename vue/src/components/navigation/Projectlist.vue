<script setup>
import { ref } from "vue";
import { useProjectsStore } from "../../store/ProjectsStore";
import { useMetricItemStore } from "../../store/MetricItems";
import { storeToRefs } from "pinia";
import { XMLBuilder } from 'fast-xml-parser';
import fileDownload from 'js-file-download';
import { jsPDF } from 'jspdf';

const projectsStore = useProjectsStore();
const metricStore = useMetricItemStore();
const { items, uiState } = storeToRefs(projectsStore);
const { categoryTexts, subcategoryTexts } = storeToRefs(metricStore);
const { loadFormDataById, resetFormData, getProjects, deleteProject, updateProject } = projectsStore;
const { getProjectItems, getProjectExportItems } = metricStore;
const editDropDown = ref(null);

/**
 * Funktion zur Auswahl eines Projekts und zum Laden der Projektdaten
 */
const changeSelectedProject = (projectName, projectId) => {
    uiState.value.selectedProject = projectName;
    uiState.value.selectedProjectId = projectId;
    uiState.value.addButtonVisible = false;
    alert(`Das ausgewählte Projekt ist "${uiState.value.selectedProject}". Die Hauptansicht wird entsprechend geändert.`);
    getProjectItems(projectId);
};

function storeProject(event) {
    event.preventDefault();

    if (uiState.value.formData.title == null || uiState.value.formData.title === "") {
        alert("Ein Titel ist erforderlich.");
        return;
    }
    console.debug('Projekt wird aktualisiert: ', uiState.value.formData._id, ': ', uiState.value.formData);
    updateProject(uiState.value.formData._id, uiState.value.formData.title);

    resetFormData();
    editDropDown.value.forEach((e) => e.hide());
}

// Optionen für XML-Builder
const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "@",
    format: true
};

/**
 * Exportiert das Projekt als XML
 */
async function exportProject(projId, projTitle) {
    const metrics = {};
    const exportItems = await getProjectExportItems(projId);
    const builder = new XMLBuilder(options);

    exportItems.forEach((item) => {
        const metric = {
            "@name": item.title,
            "@id": item.metricId,
            "@desciption": item.description,
            "@metricSource": item.metricSource,
            "@formula": item.formula,
            "@metricType": item.metricType,
            "@category": categoryTexts.value[item.category],
            "@subcategory": subcategoryTexts.value[item.subcategory],
            "@developmentphase": item.developmentphase,
            "@metricUser": item.metricUser,
            "@metricProducer": item.metricProducer,
            "@idJoint": item.idJoint,
            "@minValue": item.minValue,
            "@maxValue": item.maxValue
        };
        metrics["metric_" + item.metricSource + "_" + item.metricId] = metric;
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
                        metrics
                    }
                }
            }
        }
    };

    const xmlDataStr = builder.build(exportObj);
    fileDownload(xmlDataStr, projTitle + ".xml");
    console.log(xmlDataStr);
}


/**
 * Exportiert das Projekt als PDF
 */
async function exportCatalogAsPDFFromButton(buttonElement) {
    const doc = new jsPDF();
    let yPosition = 20;
    let metricCount = 0;

    // Extrahiere projectId und projectName aus der Zeile des Buttons
    const rowElement = buttonElement.closest('tr'); // Annahme: Button ist in einer Tabellenzeile
    const projectId = rowElement.dataset.projectId; // Annahme: projectId wird als data-Attribut gespeichert
    const projectName = rowElement.dataset.projectName; // Annahme: projectName wird als data-Attribut gespeichert

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

    createHeader();
    createFooter();

    // Laden der Metriken des Projekts basierend auf der übergebenen projectId
    const metrics = await getProjectExportItems(projectId);

    metrics.forEach((item) => {
        if (metricCount === 3) {
            doc.addPage();
            createHeader();
            createFooter();
            metricCount = 0;
        }

        doc.text(10, yPosition, `Name: ${item.title}`);
        yPosition += 5;
        doc.text(10, yPosition, `Id: ${item.metricId}`);
        yPosition += 5;

        const descriptionLines = doc.splitTextToSize(`Description: ${item.description}`, 180); // Text auf eine Breite von 180 beschränken
        doc.text(10, yPosition, descriptionLines);
        yPosition += descriptionLines.length * 5; // Höhe je nach Anzahl der Zeilen anpassen

        doc.text(10, yPosition, `Source: ${item.metricSource}`);
        yPosition += 5;
        doc.text(10, yPosition, `Formula: ${item.formula}`);
        yPosition += 5;
        doc.text(10, yPosition, `Type: ${item.metricType}`);
        yPosition += 5;
        doc.text(10, yPosition, `Category: ${categoryTexts.value[item.category]}`);
        yPosition += 5;
        doc.text(10, yPosition, `Subcategory: ${subcategoryTexts.value[item.subcategory]}`);
        yPosition += 5;
        doc.text(10, yPosition, `Developmentphase: ${item.developmentphase}`);
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
        yPosition += 20;

        metricCount += 1;
    });

    createFooter();
    doc.save(`${projectName}_metrics.pdf`);
}


// Projekte laden
getProjects();
</script>

<template>
    <div class="projectList flex-grow-1">
        <!-- Liste der Projekte -->
        <b-table-simple class="table flex-grow-0" id="projectTable">
            <b-thead>
                <b-tr>
                    <b-th></b-th>
                    <b-th></b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr v-for="item in items" :key="item.id" :data-project-id="item._id" :data-project-name="item.title">
                    <b-td>
                        <button class="btn-project" @click="changeSelectedProject(item.title, item._id)">
                            {{ item.title }}
                        </button>
                    </b-td>
                    <b-td class="actions">
                        <!-- Bearbeiten -->
                        <b-dropdown no-caret=true dropright size="sm" variant="outline-secondary" class="editButton bbuttons" @show="() => { loadFormDataById(item._id); }" ref="editDropDown">
                            <template #button-content>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                            </template>
                            <b-dropdown-form class="editform">
                                <div class="mb-3">
                                    <b-form-input id="dropdown-form-title" type="text" v-model="uiState.formData.title" placeholder="Titel"></b-form-input>
                                </div>
                                <div class="mb-3">
                                    <div class="d-grid gap-2">
                                        <b-button type="submit" variant="secondary" @click="storeProject">Umbenennen</b-button>
                                    </div>
                                </div>
                            </b-dropdown-form>
                        </b-dropdown>
                        <!-- Löschen -->
                        <b-button size="sm" variant="outline-secondary" class="deleteButton bbuttons" @click="deleteProject(item._id)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg>
                        </b-button>
                        <!-- Exportieren als XML -->
                        <b-button size="sm" variant="outline-secondary" class="exportButton bbuttons" @click="exportProject(item._id, item.title)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z" />
                                <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z" />
                            </svg>
                        </b-button>
                        <!-- Importieren -->
                        <b-button size="sm" variant="outline-secondary" class="importButton bbuttons" @click="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z" />
                                <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z" />
                            </svg>
                        </b-button>
                        <!-- Exportieren als PDF -->
                        <b-button size="sm" variant="outline-secondary" class="exportCatalogAsPDFButton bbuttons" @click="exportCatalogAsPDFFromButton($event.target)">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-license">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11" />
                                <path d="M9 7l4 0" />
                                <path d="M9 11l4 0" />
                            </svg>
                        </b-button>
                        <!-- Weitere Aktionen -->
                        <b-button size="sm" variant="outline-secondary" class="harmonizeButton bbuttons" @click="">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
                                <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
                            </svg>
                        </b-button>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
    </div>
</template>

<style scoped>
.projectList {
    height: 100%;
    padding-top: 0.5em;
    padding-left: 0.8em;
}

.actions {
    text-align: end;
}

.actions .bbuttons {
    margin-right: 1em;
}

.btn-project {
    border: none;
    cursor: pointer;
    background-color: transparent;
    text-wrap: nowrap;
}

.editform {
    min-width: 15rem;
    overflow-y: auto;
}
</style>
