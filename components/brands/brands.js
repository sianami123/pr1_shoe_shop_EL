import { El } from "../../utils/El.js";

const brandItems = [
  {
    name: "Nike",
    image: "./components/brands/assets/nike.png",
    brandParam: "NIKE",
  },
  {
    name: "Adidas",
    image: "./components/brands/assets/adidas.svg",
    brandParam: "ADIDAS",
  },
  {
    name: "Puma",
    image: "./components/brands/assets/Puma.svg",
    brandParam: "PUMA",
  },
  {
    name: "Asics",
    image: "./components/brands/assets/Asics.svg",
    brandParam: "ASICS",
  },
  {
    name: "Reebok",
    image: "./components/brands/assets/reebok.svg",
    brandParam: "REEBOK",
  },
  {
    name: "New Balance",
    image: "./components/brands/assets/newBalans.svg",
    brandParam: "NEW BALANCE",
  },
  {
    name: "Converse",
    image: "./components/brands/assets/Converse.svg",
    brandParam: "CONVERSE",
  },
  {
    name: "More",
    image: "./components/brands/assets/more.svg",
    brandParam: "MORE",
  },
];

function BrandItem({ name, image, brandParam }) {
  return El({
    element: "div",
    className: "flex flex-col items-center",
    eventListener: [
      {
        event: "click",
        callback: () => {
          console.log("brand clicked", name);
          window.location.href = `./brands.html?brands=${brandParam}`;
        },
      },
    ],
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
        className: "text-xs mt-2 truncate w-16 text-center",
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
