import { El } from "../utils/El.js";

const brandItems = [
  { name: "Nike", image: "./assets/nike.png" },
  { name: "Adidas", image: "./assets/nike.png" },
  { name: "Rebook", image: "./assets/nike.png" },
  { name: "puma", image: "./assets/nike.png" },
  { name: "sia", image: "./assets/nike.png" },
  { name: "nami", image: "./assets/nike.png" },
  { name: "sami", image: "./assets/nike.png" },
  { name: "More", image: "./assets/nike.png" },
];

function BrandItem({ name, image }) {
  return El({
    element: "div",
    className: "flex flex-col items-center",
    children: [
      El({
        element: "div",
        className:
          "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center",
        children: [
          El({
            element: "img",
            className: "w-8 h-8",
            restAttrs: {
              src: image,
              alt: name,
            },
          }),
        ],
      }),
      El({
        element: "span",
        className: "text-sm mt-2",
        children: [name],
      }),
    ],
  });
}

export function Brands() {
  return El({
    element: "div",
    className: "p-4",
    children: [
      El({
        element: "div",
        className: "max-w-7xl mx-auto grid grid-cols-4 gap-6",
        children: brandItems.map((item) => BrandItem(item)),
      }),
    ],
  });
}
