import { El } from "../../utils/El.js";

const url = window.location.href;
const currentPage = url.split("/").pop();
// console.log(currentPage);

const navItems = [
  {
    name: "Home",
    route: "/home.html",
    whiteIcon: "Home.Icon.white.svg",
    blackIcon: "Home.Icon.Black.svg",
  },
  {
    name: "Cart",
    route: "/cart.html",
    whiteIcon: "Bag.white.Hollow.svg",
    blackIcon: "Bag.Black.Thick.svg",
  },
  {
    name: "Orders",
    route: "/orders.html",
    whiteIcon: "Shopping-white-Hollow.svg",
    blackIcon: "Shopping-Black-Tick.svg",
  },
  {
    name: "Wallet",
    route: "#",
    whiteIcon: "wallet.svg",
    blackIcon: "wallet.svg",
  },
  {
    name: "Profile",
    route: "#",
    whiteIcon: "profile.svg",
    blackIcon: "profile.svg",
  },
];

function NavItem({ name, whiteIcon, blackIcon, route }) {
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
        src: `./components/bottom_nav/IconNavigation/${
          currentPage === route.slice(1) ? blackIcon : whiteIcon
        }`,
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
