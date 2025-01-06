export function initSwiper() {
  const swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
    },
    loop: false,
  });
  return swiper;
}
