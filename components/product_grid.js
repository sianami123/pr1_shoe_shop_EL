import { El } from "../utils/El.js";

export function ProductGrid({ products = [] }) {
  return El({
    element: "div",
    className: "grid grid-cols-2 gap-2 mb-16",
    children: products.map((product) => ProductCard(product)),
  });
}

function ProductCard({ imageURL, name, price, id }) {
  return El({
    element: "div",
    className: "bg-white p-2 rounded-xl",
    eventListener: [
      {
        event: "click",
        callback: () => {
          window.location.href = `./detail.html?id=${id}`;
        },
      },
    ],
    children: [
      El({
        element: "img",
        className: "w-full h-40 object-cover rounded-lg bg-gray-100",
        restAttrs: {
          src: imageURL[0] || "./assets/shoe_card.png",
          alt: name,
        },
      }),
      El({
        element: "h3",
        className: "mt-2 font-medium",
        children: [name],
      }),
      El({
        element: "p",
        className: "text-gray-900",
        children: [`$ ${price}`],
      }),
    ],
  });
}
