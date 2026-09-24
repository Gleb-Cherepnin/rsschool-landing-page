if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", () => {
  window.scrollTo(0, 0);
});

const burger = document.querySelector(".header__burger");
const navigation = document.querySelector(".header__nav");

if (burger && navigation) {
  burger.addEventListener("click", () => {
    navigation.classList.toggle("header__nav--open");
  });
}

// ====================
// Theme
// ====================

const themeSwitcher = document.querySelector(".theme-switcher");
const body = document.body;

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark-theme");
}

if (themeSwitcher) {
  themeSwitcher.addEventListener("click", () => {
    body.classList.toggle("dark-theme");

    const isDarkTheme = body.classList.contains("dark-theme");

    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  });
}

// ====================
// Favorite coffee slider
// ====================

const coffees = [
  {
    name: "S'mores Frappuccino",
    description:
      "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
    price: "$5.50",
    image: "assets/coffee-slider-1.png",
    alt: "S'mores Frappuccino",
  },
  {
    name: "Caramel Macchiato",
    description:
      "Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.",
    price: "$5.00",
    image: "assets/coffee-slider-2.png",
    alt: "Caramel Macchiato",
  },
  {
    name: "Ice coffee",
    description:
      "A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.",
    price: "$4.50",
    image: "assets/coffee-slider-3.png",
    alt: "Ice coffee",
  },
];

const previousButton = document.querySelector(".favorite-coffee__arrow--prev");
const nextButton = document.querySelector(".favorite-coffee__arrow--next");

const paginationButtons = document.querySelectorAll(
  ".favorite-coffee__pagination-item"
);

const coffeeImage = document.querySelector(".favorite-coffee__image");
const coffeeName = document.querySelector(".favorite-coffee__name");
const coffeeDescription = document.querySelector(
  ".favorite-coffee__description"
);
const coffeePrice = document.querySelector(".favorite-coffee__price");

let currentCoffeeIndex = 0;

function showCoffee(index) {
  const coffee = coffees[index];

  coffeeImage.src = coffee.image;
  coffeeImage.alt = coffee.alt;
  coffeeName.textContent = coffee.name;
  coffeeDescription.textContent = coffee.description;
  coffeePrice.textContent = coffee.price;

  paginationButtons.forEach((button, buttonIndex) => {
    button.classList.toggle(
      "favorite-coffee__pagination-item--active",
      buttonIndex === index
    );
  });
}

function showNextCoffee() {
  currentCoffeeIndex = (currentCoffeeIndex + 1) % coffees.length;
  showCoffee(currentCoffeeIndex);
}

function showPreviousCoffee() {
  currentCoffeeIndex =
    (currentCoffeeIndex - 1 + coffees.length) % coffees.length;
  showCoffee(currentCoffeeIndex);
}

if (nextButton && previousButton) {
  nextButton.addEventListener("click", showNextCoffee);
  previousButton.addEventListener("click", showPreviousCoffee);
}

paginationButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    currentCoffeeIndex = index;
    showCoffee(currentCoffeeIndex);
  });
});

// ====================
// Product modal
// ====================

const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal__overlay");
const modalClose = document.querySelector(".modal__close");
const modalCloseButton = document.querySelector(".modal__close-button");

const modalImage = document.querySelector(".modal__image");
const modalTitle = document.querySelector(".modal__title");
const modalDescription = document.querySelector(".modal__description");
const modalTotalPrice = document.querySelector(".modal__total-price");

const productCards = document.querySelectorAll(".product-card");

const sizeButtons = document.querySelectorAll(".modal__size-button");

const additiveButtons = document.querySelectorAll(
  ".modal__additive-button"
);

// ====================
// Modal options
// ====================

const modalOptions = {
  coffee: {
    sizes: ["200 ml", "300 ml", "400 ml"],
    additives: ["Sugar", "Cinnamon", "Syrup"],
  },

  tea: {
    sizes: ["200 ml", "300 ml", "400 ml"],
    additives: ["Sugar", "Lemon", "Syrup"],
  },

  dessert: {
    sizes: ["50 gr", "100 gr", "200 gr"],
    additives: ["Berries", "Nuts", "Jam"],
  },
};
// ====================
// Product modal
// ====================
if (
  modal &&
  modalOverlay &&
  modalCloseButton &&
  modalImage &&
  modalTitle &&
  modalDescription &&
  modalTotalPrice
) {
  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      const image = card.querySelector(".product-card__image");
      const title = card.querySelector(".product-card__title");
      const description = card.querySelector(
        ".product-card__description"
      );
      const price = card.querySelector(".product-card__price");

      if (!image || !title || !description || !price) {
        return;
      }

      const grid = card.closest(".menu-page__grid");

      let category = "";

      if (grid) {
        if (grid.classList.contains("menu-page__grid--coffee")) {
          category = "coffee";
        }

        if (grid.classList.contains("menu-page__grid--tea")) {
          category = "tea";
        }

        if (grid.classList.contains("menu-page__grid--dessert")) {
          category = "dessert";
        }
      }

      const options = modalOptions[category];

      if (!options) {
        return;
      }

      modalImage.src = image.src;
      modalImage.alt = image.alt;
      modalTitle.textContent = title.textContent;
      modalDescription.textContent = description.textContent;
      modalTotalPrice.textContent = price.textContent;

      sizeButtons.forEach((button, index) => {
        const volume = button.querySelector(".modal__size-volume");

        if (volume) {
          volume.textContent = options.sizes[index];
        }

        button.classList.toggle(
          "modal__size-button--active",
          index === 0
        );
      });

      additiveButtons.forEach((button, index) => {
        const name = button.querySelector(".modal__additive-name");

        if (name) {
          name.textContent = options.additives[index];
        }

        button.classList.remove("modal__additive-button--active");
        button.classList.remove("modal__additive-button--large");
      });

      if (category === "dessert") {
        additiveButtons[0]?.classList.add(
          "modal__additive-button--large"
        );
      } else {
        additiveButtons[1]?.classList.add(
          "modal__additive-button--large"
        );
      }

      modal.classList.add("modal--open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("modal--open");
    document.body.style.overflow = "";
  }

  modalCloseButton.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);

  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sizeButtons.forEach((item) => {
        item.classList.remove("modal__size-button--active");
      });

      button.classList.add("modal__size-button--active");
    });
  });

  additiveButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle(
        "modal__additive-button--active"
      );
    });
  });
}