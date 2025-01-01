import { El } from "../utils/El.js";

export function ProductCard({ image, name, price }) {
  return El({
    element: "div",
    className: "bg-white p-2 rounded-xl",
    children: [
      El({
        element: "img",
        className: "w-full h-40 object-cover rounded-lg bg-gray-100",
        restAttrs: {
          src: image || "./assets/shoe_card.png",
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
