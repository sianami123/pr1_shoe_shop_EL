import { El } from "../../utils/El.js";

export function BackButton({ text = "", backURL = "" }) {
  return El({
    element: "div",
    className: "flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100",
    eventListener: [
      {
        event: "click",
        callback: () => {
          window.location.href = backURL;
        },
      },
    ],
    children: [
      El({
        element: "img",
        className: "w-8 h-8",
        restAttrs: {
          src: "../../assets/back_arrow.svg",
          alt: "Back",
        },
      }),
      El({
        element: "a",
        className: "text-blue-500 hover:text-blue-700",
        children: [`${text}`],
      }),
    ],
  });
}
