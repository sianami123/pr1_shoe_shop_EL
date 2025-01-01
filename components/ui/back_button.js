import { El } from "../../utils/El.js";

export function BackButton() {
  return El({
    element: "img",
    className: "w-8 h-8",
    restAttrs: {
      src: "../../assets/back_arrow.svg",
      alt: "Back",
    },
  });
}
