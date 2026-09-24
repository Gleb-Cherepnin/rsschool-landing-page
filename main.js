
const themeSwitcher = document.querySelector(".theme-switcher");
const body = document.body;

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark-theme");
}

themeSwitcher.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  const isDarkTheme = body.classList.contains("dark-theme");

  localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
});