import { El } from "../utils/El.js";
import { FilterPills } from "./filter_pills.js";
import { ProductGrid } from "./product_grid.js";

export function MostPopular() {
  return El({
    element: "div",
    className: "p-4",
    children: [
      El({
        element: "div",
        className: "max-w-7xl mx-auto",
        children: [
          // Header
          El({
            element: "div",
            className: "flex justify-between items-center ",
            children: [
              El({
                element: "h2",
                className: "text-xl font-semibold",
                children: ["Most Popular"],
              }),
              El({
                element: "a",
                className: "text-gray-500",
                restAttrs: { href: "#" },
                children: ["See All"],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
