require("dotenv").config();

const config = {
  port: process.env.PORT || 5001,
  baseUrl: process.env.BASE_URL || "http://localhost:5001",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
};

/**
 * Generate full image URL from filename.
 * Uses standardized /images/ path for both local and production.
 * @param {string} fileName - The image filename
 * @returns {string} Full URL to the image
 */
const getImageUrl = (fileName) => {
  return `${config.baseUrl}/images/${fileName}`;
};

module.exports = { config, getImageUrl };
