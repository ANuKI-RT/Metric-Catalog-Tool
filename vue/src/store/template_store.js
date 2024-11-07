import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../api/api';

export const useConfigurationFileStore = defineStore('configurationFiles', () => {
    const uiState = ref({
        selectedProjectId: null,
        uploadButtonVisible: true
    });

    async function uploadConfigurationFile(file, projectId) {
        try {
            if (!file || !projectId) {
                throw new Error('Datei und Projekt-ID sind erforderlich');
            }

            console.log(file, projectId)
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('projectId', projectId);



            const res = await api.post('configurationfiles/', formData);
            if (res.status != 201) {
                throw new Error('Fehler beim Hochladen der Datei');
            }
        } catch (error) {
            console.error('Fehler beim Hochladen der Datei store: ', error);
            console.error('Fehlerdetails: ', error.message, error.name, error.stack);
        }
    }
    async function getConfigurationFile(projectId) {
        try {
            const res = await api.get('configurationfiles/' + projectId);
            if (res.status != 200) {
                throw new Error('Fehler beim Abrufen der Datei');
            }
            const csvData = res.data;
            return csvData;
        } catch (error) {
            console.error('Fehler beim Abrufen der Datei: ', error);
        }
    }



    return { uiState, uploadConfigurationFile, getConfigurationFile, };
}, {
    persist: [
        {
            paths: ['uiState'],
            storage: sessionStorage
        }
    ]
});