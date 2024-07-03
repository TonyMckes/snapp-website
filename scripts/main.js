const toggle = document.querySelector(".toggler");
toggle.addEventListener("click", () => {
  toggle.ariaExpanded = toggle.ariaExpanded !== "true";
});

// TODO: Detect client's language
document.querySelector(".toggle-lang").addEventListener("click", () => {
  const lang = document.documentElement.getAttribute("lang");
  const dir = document.documentElement.getAttribute("dir");

  if (lang === "en" && dir === "ltr") {
    document.documentElement.setAttribute("lang", "he");
    document.documentElement.setAttribute("dir", "rtl");
  } else {
    document.documentElement.setAttribute("lang", "en");
    document.documentElement.setAttribute("dir", "ltr");
  }
});

