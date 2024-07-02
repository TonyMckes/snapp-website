const toggle = document.querySelector(".toggler");

toggle.addEventListener("click", () => {
  toggle.ariaExpanded = toggle.ariaExpanded !== "true";
});
