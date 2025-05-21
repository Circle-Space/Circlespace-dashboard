import { apiConfig } from "../config";

export const downloadFile = (container: string, filename: string) => {

  const documentPath = `${apiConfig.baseUrl}/Blob/download-file/${container}/${filename}`;
  const link = document.createElement("a");
  link.href = documentPath;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
