import { El } from "../../utils/El.js";
import { BottomNav } from "../../components/bottom_nav/bottom_nav.js";

const orders = document.getElementById("orders");
let currentTab = "active"; // Track current tab state

// Sample data
const activeOrders = [
  {
    name: "Air Jordan 3 Retro",
    color: "Black",
    size: "42",
    price: "108.00",
    image: "./assets/shoe1.jpg",
    status: "active",
  },
  {
    name: "Running Sportwear",
    color: "Black",
    size: "42",
    price: "140.00",
    image: "./assets/shoe2.jpg",
    status: "active",
  },
  {
    name: "New Balance 996 V2",
    color: "Black",
    size: "42",
    price: "122.00",
    image: "./assets/shoe3.jpg",
    status: "active",
  },
  {
    name: "Fila Running Sneakers",
    color: "Black",
    size: "42",
    price: "85.00",
    image: "./assets/shoe4.jpg",
    status: "active",
  },
];

const completedOrders = [
  {
    name: "Nike Sport InfinityV2",
    color: "Red",
    size: "42",
    price: "240.00",
    image: "./assets/shoe5.jpg",
    status: "completed",
  },
  {
    name: "Nike Walking Sneakers",
    color: "Brown",
    size: "42",
    price: "180.00",
    image: "./assets/shoe6.jpg",
    status: "completed",
  },
  {
    name: "Adidas Air Max Series 2",
    color: "Blue",
    size: "42",
    price: "122.00",
    image: "./assets/shoe7.jpg",
    status: "completed",
  },
];

orders.appendChild(OrdersPage());

function OrdersPage() {
  return El({
    element: "div",
    className: "min-h-screen bg-gray-50",
    children: [Header(), TabBar(), OrdersList(), BottomNav()],
  });
}

function Header() {
  return El({
    element: "div",
    className: "flex justify-between items-center p-4 bg-white",
    children: [
      El({
        element: "h1",
        className: "text-lg font-semibold",
        children: ["My Orders"],
      }),
      El({
        element: "div",
        className: "flex gap-4",
        children: [
          El({
            element: "button",
            children: [
              El({
                element: "img",
                src: "./assets/search.svg",
                className: "w-5 h-5",
              }),
            ],
          }),
          El({
            element: "button",
            children: [
              El({
                element: "img",
                src: "./assets/more.svg",
                className: "w-5 h-5",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function TabBar() {
  return El({
    element: "div",
    className: "flex border-b bg-white",
    children: [
      El({
        element: "button",
        className: `flex-1 py-3.5 text-sm font-medium ${
          currentTab === "active"
            ? "border-b-2 border-black text-black"
            : "text-gray-400"
        }`,
        eventListener: [
          {
            event: "click",
            callback: () => {
              currentTab = "active";
              rerenderPage();
            },
          },
        ],
        children: ["Active"],
      }),
      El({
        element: "button",
        className: `flex-1 py-3.5 text-sm font-medium ${
          currentTab === "completed"
            ? "border-b-2 border-black text-black"
            : "text-gray-400"
        }`,
        eventListener: [
          {
            event: "click",
            callback: () => {
              currentTab = "completed";
              rerenderPage();
            },
          },
        ],
        children: ["Completed"],
      }),
    ],
  });
}

function OrdersList() {
  const orders = currentTab === "active" ? activeOrders : completedOrders;

  return El({
    element: "div",
    className: "px-4 py-2 space-y-3",
    children: orders.map((order) => OrderCard(order)),
  });
}

function OrderCard({ name, color, size, price, image, status }) {
  return El({
    element: "div",
    className: "bg-gray-50 rounded-2xl p-4",
    children: [
      El({
        element: "div",
        className: "flex justify-between items-start",
        children: [
          El({
            element: "div",
            className: "flex gap-3",
            children: [
              El({
                element: "img",
                className: "w-[72px] h-[72px] object-cover rounded-xl bg-white",
                src: image,
                alt: name,
              }),
              El({
                element: "div",
                className: "flex flex-col flex-1",
                children: [
                  El({
                    element: "h3",
                    className: "text-[15px] font-medium",
                    children: [name],
                  }),
                  El({
                    element: "div",
                    className: "flex items-center gap-1.5 mt-2",
                    children: [
                      El({
                        element: "div",
                        className: "w-1.5 h-1.5 rounded-full bg-gray-400",
                      }),
                      El({
                        element: "span",
                        className: "text-xs text-gray-500",
                        children: [`${color} • Size ${size} • Qty 1`],
                      }),
                    ],
                  }),
                  El({
                    element: "div",
                    className: "flex items-center mt-2",
                    children: [
                      El({
                        element: "span",
                        className: "text-xs text-gray-500",
                        children: ["In Delivery"],
                      }),
                    ],
                  }),
                  El({
                    element: "div",
                    className: "flex justify-between items-center mt-3",
                    children: [
                      El({
                        element: "span",
                        className: "text-[15px] font-medium",
                        children: [`$${price}`],
                      }),
                      El({
                        element: "button",
                        className:
                          "bg-black text-white text-xs font-medium px-5 py-2 rounded-full",
                        children: ["Track Order"],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function rerenderPage() {
  orders.innerHTML = "";
  orders.appendChild(OrdersPage());
}
