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
  SearchInput()
);

let searchValue = "";
let searchHistory = [];

async function handleSearch(searchValue) {
  const loadingElement = showLoading();

  try {
    // Clear previous results first
    const existingResults = document.getElementById("search-results");
    if (existingResults) {
      existingResults.remove();
    }

    const searchResults = await searchProductsController(searchValue);
    console.log("search results", searchResults);

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

async function handleInputFocus() {
  // Remove existing modal if it exists
  const existingModal = document.querySelector(".search-history-modal");
  if (existingModal) existingModal.remove();

  const modal = SearchHistoryModal();
  modal.classList.add("search-history-modal");

  // Get the search container and append modal
  const searchContainer = document.querySelector(".search-container");
  if (searchContainer) {
    searchContainer.appendChild(modal);
  }
}

// Add this function to handle clicking outside the modal
document.addEventListener("click", (e) => {
  const modal = document.querySelector(".search-history-modal");
  const searchContainer = document.querySelector(".search-container");
  if (modal && searchContainer && !searchContainer.contains(e.target)) {
    modal.remove();
  }
});

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

function SearchHistoryModal() {
  const historyString = getLocalStorage("searchHistory");
  const history = JSON.parse(historyString);

  return El({
    element: "div",
    className:
      "absolute top-full left-0 right-0 bg-white shadow-lg rounded-xl mt-2 z-50 max-h-[70vh] overflow-auto mx-2",
    children: [
      // Header
      El({
        element: "div",
        className: "px-4 py-3 flex justify-between items-center",
        children: [
          El({
            element: "span",
            className: "text-base font-medium text-gray-900",
            children: ["Recent"],
          }),
          El({
            element: "button",
            className: "text-sm text-gray-500",
            children: ["Clear All"],
            eventListener: [
              {
                event: "click",
                callback: () => {
                  setLocalStorage("searchHistory", "[]");
                  document.querySelector(".search-history-modal").remove();
                },
              },
            ],
          }),
        ],
      }),
      // Search History List
      El({
        element: "div",
        className: "overflow-auto",
        children: history.map((term) =>
          El({
            element: "div",
            className:
              "flex items-center justify-between px-4 py-3 hover:bg-gray-50",
            children: [
              El({
                element: "span",
                className: "flex-1 text-gray-700",
                children: [term],
              }),
              El({
                element: "button",
                className: "ml-2 text-gray-400",
                innerHTML: `❌`,
                eventListener: [
                  {
                    event: "click",
                    callback: () => {
                      document.querySelector(".search-history-modal").remove();
                      handleSearch(term);
                    },
                  },
                ],
              }),
            ],
          })
        ),
      }),
    ],
  });
}
