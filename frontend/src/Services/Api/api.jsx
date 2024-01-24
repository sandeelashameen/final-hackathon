import axios from "axios";

const API_URL = 'http://localhost:8080';

export const uploadFile = async (data) => {
    try {
        const formData = new FormData();

        // Append only the image file to the FormData object
        formData.append('projectImage', data.projectImage.file);

        // Append other form data
        formData.append('projectName', data.projectName);
        formData.append('developerName', data.developerName);
        formData.append('projectDescription', data.projectDescription);
        formData.append('projectUrl', data.projectUrl);

        // Make the API request
        const response = await axios.post(`${API_URL}/add_project`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for handling file uploads
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error while calling the API ", error.message);
        throw error; // Rethrow the error so that the calling code can handle it
    }
};
