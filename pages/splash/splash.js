const swiper = new Swiper(".swiper", {
  loop: false,
  navigation: false,
  pagination: {
    el: ".swiper-pagination",
  },
  on: {
    slideChange: function () {
      const customNextBtn = document.getElementById("custom-next");
      if (swiper.isEnd) {
        customNextBtn.textContent = "Get Started";
      } else {
        customNextBtn.textContent = "Next";
      }
    },
  },
});

const customNextBtn = document.getElementById("custom-next");

customNextBtn.addEventListener("click", () => {
  if (swiper.isEnd) {
    window.location.href = "./login.html";
  } else {
    swiper.slideNext();
  }
});
