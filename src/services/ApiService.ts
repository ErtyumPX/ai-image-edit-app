import { PromptData } from "@/components/prompts";

const BASE_URL = 'http://localhost:3000';


const fetchData = async (endpoint: string, method: string, body?: any, headers?: HeadersInit) => {
    try {
        const url = `${BASE_URL}/${endpoint}/`;
        const fetchOptions: RequestInit = { method };
        if (headers) {
            fetchOptions.headers = headers;
        }
        if (body) {
            fetchOptions.body = body;
        }

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response;
    } 
    catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export class ApiService {
    static async testConnection() {
        const headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json');
        const response = await fetchData('', 'GET', null, headers);
        return response.json();
    }


    static async testAiConnection() {
        const headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json');
        const response = await fetchData('editor/test', 'GET', null, headers);
        return response.json();
    }


    static async sendImageRequest(imageFile: File, promptData: PromptData) {
        const headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        const body = new FormData();
        body.append('image', imageFile);
        body.append('prompt', promptData.prompt);
        body.append('strength', promptData.strength.toString());
        body.append('style_preset', promptData.style_preset || '');
        body.append('cfg_scale', promptData.cfg_scale.toString());
        const response = await fetchData('editor/edit', 'POST', body, headers);
        return response.json();
    }


    static async getImageRequest(imageId: string, imageType: "raw" | "edited") {
        const headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json');
        const rawImageResponse = await fetchData(`storage/get/${imageId}/${imageType}`, 'GET', null, headers);
        return rawImageResponse.text();
    }

}
