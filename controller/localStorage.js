function getLocalStorage(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (value) {
      return value;
    } else {
      console.error(`${key} not found in localStorage`);
      return "[]"; // Return empty array string as default
    }
  } catch (error) {
    console.error("Get local storage failed", error);
    return "[]"; // Return empty array string as default
  }
}

function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Set local storage failed", error);
  }
}

export { getLocalStorage, setLocalStorage };
