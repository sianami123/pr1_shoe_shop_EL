import { El } from "../utils/El.js";

export function ProductGrid({ products = [], wishlistIds = [] }) {
  return El({
    element: "div",
    className: "grid grid-cols-2 gap-2 mb-16",
    children: products.map((product) => ProductCard(product, wishlistIds)),
  });
}

function ProductCard(product, wishlistIds) {
  const { imageURL, name, price, id } = product;
  const isInWishlist = wishlistIds.includes(id);

  return El({
    element: "div",
    className: "bg-white p-2 rounded-xl relative",
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
        element: "div",
        className: "absolute top-4 right-4 z-10",
        children: [
          El({
            element: "svg",
            className: `w-6 h-6 ${
              isInWishlist ? "text-red-500" : "text-gray-400"
            }`,
            innerHTML: `
              <svg xmlns="http://www.w3.org/2000/svg" fill="${
                isInWishlist ? "currentColor" : "none"
              }" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            `,
          }),
        ],
      }),
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
