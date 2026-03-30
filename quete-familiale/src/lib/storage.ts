export const isLocalStorageAvailable = (): boolean => {
  try {
    const key = "__quete_test__";
    localStorage.setItem(key, "1");
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};
