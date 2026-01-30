import axios from 'axios';
import { toast } from 'sonner';

/**
 * Reusable API service for file conversions
 * Handles multipart uploads, progress tracking, and user-friendly error handling.
 */
const api = {
    /**
     * Upload a file for processing
     * @param {File} file - The file object to upload
     * @param {string} endpoint - The backend API endpoint (e.g., '/api/convert/pdf-to-word')
     * @param {Function} onProgress - Callback for progress updates (0-100)
     * @returns {Promise<Object>} - The response data (containing downloadUrl)
     */
    async uploadFile(file, endpoint, onProgress) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${baseUrl}${endpoint}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    if (onProgress) onProgress(percentCompleted);
                },
            });

            return response.data;
        } catch (error) {
            // Extract user-friendly error message
            const message = error.response?.data?.error || "Connection to conversion server failed. Please try again.";

            // Use Sonner toast for a premium feel
            toast.error("Conversion Error", {
                description: message,
                duration: 5000,
            });

            throw new Error(message);
        }
    },
};

export default api;
