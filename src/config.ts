const baseUrl = import.meta.env.VITE_BASE_API_URL;

export const apiConfig = {
  baseUrl: baseUrl,
  campaignDownloadUrl:`${baseUrl}${import.meta.env.VITE_CAMPAIGN_DOWNLOAD_PATH}`,
};

export const apiHubConfig = {
  baseUrl: import.meta.env.VITE_HUB_URL,
};
