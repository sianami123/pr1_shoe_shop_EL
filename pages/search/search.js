import { ProductGrid } from "../../components/product_grid.js";
import { BackButton } from "../../components/ui/back_button.js";
import { El } from "../../utils/El.js";

const search = document.getElementById("search");

search.append(BackButton(), SearchInput());
search.append(SearchResults({ searched: "hello" }));

function SearchInput() {
  return El({
    element: "div",
    className:
      "flex gap-2 items-center justify-center border border-gray-300 rounded-xl p-2 mx-2",
    children: [
      El({
        element: "img",
        className: "w-6 h-6 ml-2",
        restAttrs: {
          src: "../../assets/search.svg",
          alt: "search",
        },
      }),
      El({
        element: "input",
        type: "text",
        placeholder: "Search",
        className: "w-full h-full border-none outline-none ",
      }),
      El({
        element: "button",
        className: "bg-gray-100      text-white px-4 py-2 rounded-xl",
        children: [
          El({
            element: "img",
            className: "w-6 h-6",
            restAttrs: {
              src: "../../assets/search_btn.png",
              alt: "search",
            },
          }),
        ],
      }),
    ],
  });
}

function SearchResults({ searched }) {
  return El({
    element: "div",
    className: "flex flex-col gap-2",
    children: [
      // search results header
      El({
        element: "div",
        className: "flex justify-between items-center mb-4",
        children: [
          El({
            element: "p",
            className: "text-gray-500 whitespace-nowrap",
            children: [`Results for "${searched}"`],
          }),
          El({
            element: "p",
            className: "text-gray-500",
            children: [`${searched} found`],
          }),
        ],
      }),
      // search results
      El({
        element: "div",
        className: "flex flex-col gap-2",
        children: [ProductGrid()],
      }),
    ],
  });
}
