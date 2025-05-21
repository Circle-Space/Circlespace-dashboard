export const clearCookiesByPattern = (pattern: string): void => {
  document.cookie.split(";").forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();
    if (cookieName.includes(pattern)) {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  });
};

export const clearLocalStorageByPattern = (pattern: string): void => {
  Object.keys(localStorage).forEach((key) => {
    if (key.includes(pattern)) {
      localStorage.removeItem(key);
    }
  });
};

export const clearLocalStorageItems = (keys: string[]): void => {
  keys.forEach((key) => localStorage.removeItem(key));
};
