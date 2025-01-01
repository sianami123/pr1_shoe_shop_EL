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
    image:
      "https://assets.reebok.com/images/w_600,f_auto,q_auto/7ed0855435194229a525aae700d27efb_9366/Reebok_Logo.jpg",
  },
  {
    name: "PUMA",
    image: "https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png",
  },
  {
    name: "ASICS",
    image: "https://logos-world.net/wp-content/uploads/2020/04/Asics-Logo.png",
  },
  {
    name: "NEW BALANCE",
    image:
      "https://logos-world.net/wp-content/uploads/2020/09/New-Balance-Logo.png",
  },
  {
    name: "CONVERSE",
    image:
      "https://logos-world.net/wp-content/uploads/2020/04/Converse-Logo.png",
  },
  {
    name: "More",
    image: "./pages/products/assets/nike.png",
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
          window.location.href = `./brands.html?filterKey=brand&filterValue=${name}`;
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
