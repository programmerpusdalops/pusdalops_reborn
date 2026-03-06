/**
 * Helper function to generate full image URL from filename.
 * Uses standardized /images/ path for both local and production.
 * @param fileName - The image filename
 * @returns Full URL to the image
 */
export const getImageUrl = (fileName: string): string => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    return `${baseUrl}/images/${fileName}`;
};
