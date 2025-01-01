import { El } from "../utils/El.js";
import { ProductCard } from "./product_card.js";

const products = [
  {
    name: "1_K-Swiss ista Trainer",
    price: "85.00",
    image: "./assets/shoe_card.png",
  },
  {
    name: "2_K-Swiss ista Trainer",
    price: "85.00",
    image: "./assets/shoe_card.png",
  },
  {
    name: "3_K-Swiss ista Trainer",
    price: "85.00",
    image: "./assets/shoe_card.png",
  },
  {
    name: "4_K-Swiss ista Trainer",
    price: "85.00",
    image: "./assets/shoe_card.png",
  },
];

export function ProductGrid() {
  return El({
    element: "div",
    className: "grid grid-cols-2 gap-2",
    children: products.map((product) => ProductCard(product)),
  });
}
