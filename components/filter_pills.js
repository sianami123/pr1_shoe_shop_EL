import { El } from "../utils/El.js";

const pills = [
  { name: "All" },
  { name: "NIKE" },
  { name: "ADIDAS" },
  { name: "PUMA" },
  { name: "ASICS" },
  { name: "REEBOK" },
  { name: "CAT" },
];

const urlParams = new URLSearchParams(window.location.search);
const brandsParam = (urlParams.get("brands") || "all").toLowerCase();

export function FilterPills({ url }) {
  return El({
    element: "div",
    className: "flex gap-2 mb-4 py-2 overflow-x-auto",
    children: pills.map((pill) =>
      Pill({
        ...pill,
        active: brandsParam === pill.name.toLowerCase(),
        url,
      })
    ),
  });
}

function Pill({ name, active, url }) {
  return El({
    element: "button",
    className: `px-4 py-1 rounded-full ${
      active ? "bg-black text-white" : "bg-white border"
    }`,
    eventListener: [
      {
        event: "click",
        callback: () => {
          console.log("pill clicked", name);
          if (name === "All") {
            window.location.href = url;
          } else {
            window.location.href = `${url}?brands=${name}`;
          }
        },
      },
    ],
    children: [name],
  });
}
