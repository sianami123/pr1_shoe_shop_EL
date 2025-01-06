import { El } from "../utils/El.js";

export function showToast({ message, type = "error" }) {
  const toast = El({
    element: "div",
    className: `fixed top-4 right-4 p-4 rounded-lg shadow-lg transform transition-transform duration-300 z-50 ${
      type === "error" ? "bg-red-500" : "bg-green-500"
    }`,
    children: [
      El({
        element: "div",
        className: "flex items-center gap-2 text-white",
        children: [
          // Icon
          El({
            element: "span",
            className: "text-xl",
            innerText: type === "error" ? "❌" : "✅",
          }),
          // Message
          El({
            element: "p",
            className: "text-sm font-medium",
            innerText: message,
          }),
        ],
      }),
    ],
  });

  document.body.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.transform = "translateX(150%)";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);

  return toast;
}
