import { El } from "../../utils/El.js";

const brandItems = [
  {
    name: "NIKE",
    image: "./components/brands/assets/nike.png",
  },
  {
    name: "ADIDAS",
    image: "./components/brands/assets/adidas.svg",
  },
  {
    name: "REEBOK",
    image: "./components/brands/assets/reebok.svg",
  },
  {
    name: "PUMA",
    image: "./components/brands/assets/Puma.svg",
  },
  {
    name: "ASICS",
    image: "./components/brands/assets/Asics.svg",
  },
  {
    name: "NEW BALANCE",
    image: "./components/brands/assets/newBalans.svg",
  },
  {
    name: "CONVERSE",
    image: "./components/brands/assets/Converse.svg",
  },
  {
    name: "More",
    image: "./components/brands/assets/more.svg",
  },
];

function BrandItem({ name, image }) {
  return El({
    element: "div",
    className: "flex flex-col items-center",
    eventListener: [
      {
        event: "click",
        callback: () => {
          console.log("brand clicked", name);
          window.location.href = `./brands.html?brands=${name}`;
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
