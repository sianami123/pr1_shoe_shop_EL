import { El } from "../../utils/El.js";

const url = window.location.href;
const currentPage = url.split("/").pop();
// console.log(currentPage);

const navItems = [
  {
    name: "Home",
    route: "/home.html",
    icon: "home.svg",
  },
  {
    name: "Cart",
    route: "/cart.html",
    icon: "cart.svg",
  },
  {
    name: "Orders",
    route: "/orders.html",
    icon: "orders.svg",
  },
  {
    name: "Wallet",
    route: "/wallet.html",
    icon: "wallet.svg",
  },
  {
    name: "Profile",
    route: "/profile.html",
    icon: "profile.svg",
  },
];

function NavItem({ name, icon, route }) {
  console.log(route.slice(1));
  return El({
    element: "button",
    className: "flex flex-col items-center",
    eventListener: [
      {
        event: "click",
        callback: () => {
          window.location.href = route;
        },
      },
    ],
    children: [
      El({
        element: "img",
        src: `./components/bottom_nav/${icon}`,
        className: "w-6 h-6 stroke-red-400",
      }),
      El({
        element: "span",
        className: `mt-1 ${
          currentPage === route.slice(1)
            ? "text-black text-medium"
            : "text-gray-400 text-xs"
        }`,
        children: [name],
      }),
    ],
  });
}

export function BottomNav() {
  return El({
    element: "nav",
    className: "fixed bottom-0 left-0 right-0 bg-white border-t",
    children: [
      El({
        element: "div",
        className: "flex justify-between items-center p-4",
        children: navItems.map((item) => NavItem(item)),
      }),
    ],
  });
}
