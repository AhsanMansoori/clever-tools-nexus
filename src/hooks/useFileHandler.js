import { useState, useCallback } from 'react';
import api from '../services/api';
import { toast } from 'sonner';

/**
 * Custom hook to manage the lifecycle of a file conversion task.
 * Handles file state, upload progress, loading states, and retrieval of processed files.
 */
const useFileHandler = (endpoint) => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadUrl, setDownloadUrl] = useState('');

    /**
     * Triggers the upload and processing workflow
     * @param {File} selectedFile - The file to be processed
     */
    const handleUpload = useCallback(async (selectedFile) => {
        if (!selectedFile) {
            toast.error("Please select a file first");
            return;
        }

        setFile(selectedFile);
        setIsLoading(true);
        setProgress(0);
        setDownloadUrl('');

        try {
            // Step 1: Upload and get processing info
            const data = await api.uploadFile(selectedFile, endpoint, (percent) => {
                setProgress(percent);
            });

            // Step 2: Update state with the backend-provided download URL
            if (data.downloadUrl) {
                const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const fullUrl = data.downloadUrl.startsWith('http')
                    ? data.downloadUrl
                    : `${baseUrl}${data.downloadUrl}`;

                setDownloadUrl(fullUrl);
                toast.success("Ready for download!", {
                    description: "Your file has been processed successfully.",
                });
            }
        } catch (err) {
            // api.js handles the toast notification
        } finally {
            setIsLoading(false);
        }
    }, [endpoint]);

    /**
     * Resets the hook state for a new conversion
     */
    const reset = () => {
        setFile(null);
        setIsLoading(false);
        setProgress(0);
        setDownloadUrl('');
    };

    return {
        file,
        isLoading,
        progress,
        downloadUrl,
        handleUpload,
        reset,
    };
};

export default useFileHandler;
