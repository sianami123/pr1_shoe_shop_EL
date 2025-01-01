import { El } from "../utils/El.js";

export function Search() {
  return El({
    element: "div",
    className: "p-4",
    children: [
      El({
        element: "div",
        className: "max-w-7xl mx-auto",
        children: [
          El({
            element: "div",
            className: "relative",
            children: [
              // Search Input
              El({
                element: "input",
                className: "w-full p-3 pl-10 bg-gray-100 rounded-lg",
                restAttrs: {
                  type: "search",
                  placeholder: "Search",
                },
                eventListener: [
                  {
                    event: "focus",
                    callback: (e) => {
                      window.location.href = "/search.html";
                    },
                  },
                ],
              }),
              // Search Icon
              El({
                innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
