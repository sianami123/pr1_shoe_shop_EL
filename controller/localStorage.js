async function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

async function getLocalStorage(key) {
  if (localStorage.getItem(key)) {
    return localStorage.getItem(key);
  } else {
    console.error(`${key} not found in localStorage`);
    return null;
  }
}

export { setLocalStorage, getLocalStorage };
