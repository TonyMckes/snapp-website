const heLang = await fetch("../locales/he.json").then((res) => res.json());
const enLang = await fetch("../locales/en.json").then((res) => res.json());

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

    setNavLang(heLang);
  } else {
    document.documentElement.setAttribute("lang", "en");
    document.documentElement.setAttribute("dir", "ltr");

    setNavLang(enLang);
  }
});

function setNavLang(lang) {
  const navigationItems = lang.navigation.map((element) => {
    const listElement = document.createElement("li");
    const anchorElement = document.createElement("a");

    anchorElement.setAttribute("href", element.href);
    anchorElement.textContent = element.title;
    listElement.appendChild(anchorElement);

    return listElement;
  });
  document.querySelector(".navbar #menu").replaceChildren(...navigationItems);
}
