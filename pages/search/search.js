import { ProductGrid } from "../../components/product_grid.js";
import { BackButton } from "../../components/ui/back_button.js";
import { El } from "../../utils/El.js";
import { searchProductsController } from "../../controller/controller.js";
import { showLoading, hideLoading } from "../../components/loading.js";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../controller/localStorage.js";
const searchDOM = document.getElementById("search");

searchDOM.append(
  BackButton({ text: "Back", backURL: "/home.html" }),
  SearchInput(),
  HistoryModal()
);

let searchValue = "";
let searchHistory = [];

function SearchInput() {
  return El({
    element: "div",
    className: "relative search-container",
    children: [
      El({
        element: "div",
        className:
          "flex gap-2 items-center justify-center border border-gray-600 rounded-xl p-2 mx-2",
        children: [
          El({
            element: "img",
            className: "ml-2",
            restAttrs: {
              src: "../../assets/search.svg",
              alt: "search",
            },
          }),
          El({
            element: "input",
            className: "w-full h-full border-none outline-none",
            restAttrs: {
              type: "text",
              placeholder: "Search",
              id: "search-input",
            },
            eventListener: [
              {
                event: "input",
                callback: (e) => {
                  searchValue = e.target.value;
                },
              },
              {
                event: "keypress",
                callback: (e) => {
                  if (e.key === "Enter") {
                    handleSearch(searchValue);
                    // console.log("Enter key pressed", searchValue);
                  }
                },
              },
              {
                event: "focus",
                callback: (e) => {
                  console.log("focus event");
                  e.preventDefault();
                  handleInputFocus();
                },
              },
            ],
          }),
          El({
            element: "button",
            className: "text-white rounded-xl",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  // console.log("Search button clicked", searchValue);
                  handleSearch(searchValue);
                },
              },
            ],
            children: [
              El({
                element: "img",
                className: "w-10 h-10",
                restAttrs: {
                  src: "../../pages/search/assets/search.svg",
                  alt: "search",
                },
              }),
            ],
          }),
          El({
            element: "div",
            id: "search-results",
            children: [""],
          }),
        ],
      }),
    ],
  });
}

function HistoryModal() {
  const searchHistory = JSON.parse(
    localStorage.getItem("searchHistory") || "[]"
  );
  console.log(
    "searchHistory in history modal:",
    searchHistory,
    typeof searchHistory
  );
  return El({
    element: "div",
    id: "history-modal",
    className: "p-2 mx-2 rounded-xl mt-1 hidden bg-gray-100",
    children: [
      // row 1
      El({
        element: "div",
        className: "flex justify-between items-center",
        children: [
          El({
            element: "h3",
            className: "font-medium",
            children: ["Recent Searches"],
          }),
          El({
            element: "button",
            className: "text-sm text-gray-500 hover:text-gray-700",
            children: ["Clear All"],
          }),
        ],
      }),
      // divider line
      El({
        element: "div",
        className: "w-full h-1 bg-gray-200 rounded-xl",
      }),

      // row 2 (search history)
      El({
        element: "div",
        className: "flex flex-col gap-2",
        children: searchHistory.map((search) => {
          return SearchHistoryItem(search);
        }),
      }),
    ],
  });
}

function SearchHistoryItem(search) {
  return El({
    element: "p",
    className: "flex items-center justify-between",
    children: [
      El({
        element: "span",
        eventListener: [
          {
            event: "click",
            callback: () => {
              const searchInput = document.getElementById("search-input");
              searchInput.value = search;
              // handleSearch(search);
            },
          },
        ],
        children: [search],
      }),
      El({
        element: "button",
        eventListener: [
          {
            event: "click",
            callback: () => {
              findRemoveFromHistory(search);
            },
          },
        ],
        children: ["X"],
      }),
    ],
  });
}

function findRemoveFromHistory(search) {
  const searchHistory = JSON.parse(
    localStorage.getItem("searchHistory") || "[]"
  );
  const index = searchHistory.indexOf(search);
  if (index !== -1) {
    searchHistory.splice(index, 1);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }
  rerenderUI();
}

function rerenderUI() {
  const historyModal = document.getElementById("history-modal");
  historyModal.innerHTML = "";
  historyModal.append(HistoryModal());
}

async function handleInputFocus() {
  const searchHistory = JSON.parse(
    localStorage.getItem("searchHistory") || "[]"
  );
  //  remove hidden class from history modal
  const historyModal = document.getElementById("history-modal");
  historyModal.classList.remove("hidden");
}

async function handleSearch(searchValue) {
  const loadingElement = showLoading();

  try {
    // Clear previous results first
    const existingResults = document.getElementById("search-results");
    if (existingResults) {
      existingResults.remove();
    }

    const searchResults = await searchProductsController(searchValue);
    if (searchResults.records.length) {
      let searchHistory = JSON.parse(
        localStorage.getItem("searchHistory") || "[]"
      );

      // Remove duplicate if exists
      searchHistory = searchHistory.filter((item) => item !== searchValue);

      localStorage.setItem(
        "searchHistory",
        searchHistory // Do I have gehtHistory or not?(it`s possible it didn`t exist the first time.)
          ? JSON.stringify([...searchHistory, searchValue])
          : JSON.stringify([searchHistory])
      );
    }

    // Remove any existing "not found" messages or previous results
    const allPreviousResults = searchDOM.querySelectorAll(
      "#search-results, .search-results-container"
    );
    allPreviousResults.forEach((element) => element.remove());

    const searchResultsElement = SearchResults(searchResults, searchValue);
    searchDOM.append(searchResultsElement);

    hideLoading(loadingElement);
  } catch (error) {
    hideLoading(loadingElement);
    console.error("Error loading products:", error);
  }
}

function SearchResults(searchResults, searchValue) {
  if (!searchResults?.records?.length) {
    return El({
      element: "div",
      id: "search-results",
      className:
        "search-results-container flex flex-col items-center justify-center p-8 text-center",
      children: [
        El({
          element: "div",
          className:
            "text-lg font-medium w-full flex justify-between items-center",
          children: [
            El({
              element: "div",
              className: "text-lg font-medium",
              children: [`Results for "${searchValue}"`],
            }),
            El({
              element: "div",
              className: "text-sm text-gray-500",
              children: ["0 found"],
            }),
          ],
        }),
        El({
          element: "img",
          className: "w-50 h-50 mb-4",
          restAttrs: {
            src: "../../pages/search/assets/not_found.png",
            alt: "Not Found",
          },
        }),
        El({
          element: "p",
          className: "text-lg font-medium mb-2",
          children: ["Not Found"],
        }),
        El({
          element: "p",
          className: "text-sm text-gray-500 text-center",
          children: [
            "Sorry, the keyword you entered cannot be found, please check again or search with another keyword.",
          ],
        }),
      ],
    });
  }

  return El({
    element: "div",
    id: "search-results",
    className: "search-results-container p-4",
    children: [
      El({
        element: "div",
        className:
          "text-lg font-medium w-full flex justify-between items-center",
        children: [
          El({
            element: "div",
            className: "text-lg font-medium",
            children: [`Results for "${searchValue}"`],
          }),
          El({
            element: "div",
            className: "text-sm text-gray-500",
            children: [`${searchResults.records.length} found`],
          }),
        ],
      }),
      ProductGrid({ products: searchResults.records }),
    ],
  });
}

function removeFromHistory(searchValue) {
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  searchHistory = searchHistory.filter((item) => item !== searchValue);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// Add this function to clear all history
function clearSearchHistory() {
  localStorage.removeItem("searchHistory");
}
