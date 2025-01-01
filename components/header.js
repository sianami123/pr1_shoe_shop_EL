import { El } from "../utils/El.js";

export function Header() {
  return El({
    element: "header",
    children: [
      El({
        element: "div",
        className: "flex justify-between items-center max-w-7xl mx-auto p-4",
        children: [
          // Left side - Profile and Greeting
          El({
            element: "div",
            className: "flex items-center gap-3",
            children: [
              // Profile Image
              El({
                element: "div",
                className:
                  "w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-sm",
                children: ["1:1"],
              }),
              // Greeting Text
              El({
                element: "div",
                className: "flex flex-col",
                children: [
                  El({
                    element: "div",
                    className: "flex items-center gap-2",
                    children: [
                      El({
                        element: "span",
                        className: "text-gray-600",
                        children: ["Good Morning"],
                      }),
                      El({
                        element: "span",
                        className: "text-yellow-500",
                        children: ["👋"],
                      }),
                    ],
                  }),
                  El({
                    element: "span",
                    className: "font-semibold",
                    children: ["Saeed Abdilar"],
                  }),
                ],
              }),
            ],
          }),
          // Right side - Icons
          El({
            element: "div",
            className: "flex ",
            children: [
              // Notification Bell
              El({
                element: "button",
                className: "p-2",
                children: [
                  El({
                    innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>`,
                  }),
                ],
              }),
              // Heart Icon
              El({
                element: "button",
                className: "p-2",
                children: [
                  El({
                    innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>`,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
