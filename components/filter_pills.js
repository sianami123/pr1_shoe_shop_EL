import { El } from "../utils/El.js";

const pills = [
  { name: "All", active: true },
  { name: "Nike", active: false },
  { name: "Adidas", active: false },
  { name: "Puma", active: false },
  { name: "Asics", active: false },
  { name: "Reebok", active: false },
  { name: "CAT", active: false },
];

function Pill({ name, active }) {
  return El({
    element: "button",
    className: `px-4 py-1 rounded-full ${
      active ? "bg-black text-white" : "bg-white border"
    }`,
    children: [name],
  });
}

export function FilterPills() {
  return El({
    element: "div",
    className: "flex gap-2 mb-4 py-2 overflow-x-auto",
    children: pills.map((pill) => Pill(pill)),
  });
}
