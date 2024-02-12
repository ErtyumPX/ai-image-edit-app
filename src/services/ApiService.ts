const BASE_URL = 'http://localhost:3000';

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: object | File;
}

const JSONheaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
};

const fetchData = async (endpoint: string, method: string, body?: any, headers?: HeadersInit) => {
    try {
        const url = `${BASE_URL}/${endpoint}/`;
        const fetchOptions: RequestInit = {
            method,
        };
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
    
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            // If not JSON, assume it's plain text and return it as is
            return await response.text();
        }
    } 
    catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export class ApiService {
    static async testConnection() {
        return fetchData('', 'GET', {header: JSONheaders});
    }

    static async testAiConnection() {
        return fetchData('editor/test', 'GET', {header: JSONheaders});
    }

    static async sendImageRequest(imageFile: File) {
        const headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        const body = new FormData();
        body.append('image', imageFile);
        return fetchData(
            'editor/edit',
            'POST',
            body,
            headers
        );
    }

    static async getImageRequest(imageId: string) {
      return fetchData('editor/get', 'GET', {id: imageId}, JSONheaders);
    }

    /*
    static async sendEditRequest(image: File, prompt: string) {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('prompt', prompt);
        const headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        return fetchData('editor/edit', 'POST', formData, headers);
    }
    */
}
