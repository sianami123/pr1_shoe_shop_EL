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
                callback: () => {
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

async function handleInputFocus() {
  const searchHistory = localStorage.getItem("searchHistory");
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
      saveSearchToHistory(searchValue);
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

function HistoryModal() {
  const searchHistory = JSON.parse(
    localStorage.getItem("searchHistory") || "[]"
  );
  return El({
    element: "div",
    id: "history-modal",
    className: "p-2 mx-2 bg-white rounded-xl mt-1 hidden ",
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

      // row 2
      El({
        element: "div",
        className: "flex items-center justify-between",
        children: searchHistory.map((search) => {
          return El({
            element: "p",
            className: "",
            children: [search, "X"],
          });
        }),
      }),
    ],
  });
}

// Add this function to handle saving searches
function saveSearchToHistory(searchValue) {
  // Get existing searches or initialize empty array
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");

  // Remove duplicate if exists
  searchHistory = searchHistory.filter((item) => item !== searchValue);

  // Add new search to beginning of array
  searchHistory.unshift(searchValue);

  // Keep only last 10 searches
  searchHistory = searchHistory.slice(0, 10);

  // Save back to localStorage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
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
