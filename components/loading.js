import { El } from "../utils/El.js";

export function Loading() {
  return El({
    element: "div",
    className:
      "fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50",
    children: [
      El({
        element: "div",
        className: "flex flex-col items-center gap-3",
        children: [
          // Spinner
          El({
            element: "div",
            className:
              "w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin",
          }),
          // Loading text
          El({
            element: "p",
            className: "text-gray-600 text-sm",
            text: "Loading...",
          }),
        ],
      }),
    ],
  });
}

export function showLoading() {
  const loading = Loading();
  document.body.appendChild(loading);
  return loading;
}

export function hideLoading(loadingElement) {
  if (loadingElement && loadingElement.parentNode) {
    loadingElement.parentNode.removeChild(loadingElement);
  }
}
