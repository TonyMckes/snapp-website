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
    setLandingLang(heLang);
    setAppsLang(heLang);
    setCategoriesLang(heLang);
    setAboutLang(heLang);
    setDeliveryLang(heLang);
  } else {
    document.documentElement.setAttribute("lang", "en");
    document.documentElement.setAttribute("dir", "ltr");

    setNavLang(enLang);
    setLandingLang(enLang);
    setAppsLang(enLang);
    setCategoriesLang(enLang);
    setAboutLang(enLang);
    setDeliveryLang(enLang);
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

function setLandingLang(lang) {
  const ladingHeader = document.querySelector(".landing header");

  const heading = document.createElement("h1");
  const paragraph = document.createElement("p");
  const nav = document.createElement("nav");

  heading.textContent = lang.landing.heading;
  paragraph.textContent = lang.landing.paragraph;

  lang.landing.cta.forEach((label) => {
    const anchorElement = document.createElement("a");
    anchorElement.setAttribute("href", "#");
    anchorElement.classList.add("cta");
    anchorElement.textContent = label;

    nav.appendChild(anchorElement);
  });

  ladingHeader.replaceChildren(heading, paragraph, nav);
}

function setAppsLang(lang) {
  const appsHeader = document.querySelector(".app header");

  const heading = document.createElement("h2");
  const list = document.createElement("ul");

  heading.textContent = lang.landing.heading;

  lang.app.apps.forEach(({ title, icon, href }) => {
    const listItemElement = document.createElement("li");
    const anchorElement = document.createElement("a");
    const imgElement = document.createElement("img");

    imgElement.setAttribute("src", icon);

    anchorElement.setAttribute("href", href);
    anchorElement.setAttribute("dir", "auto");
    anchorElement.classList.add("cta", "featured");
    anchorElement.append(imgElement, title);

    listItemElement.appendChild(anchorElement);
    list.appendChild(listItemElement);
  });

  const anchorElement = document.createElement("a");
  anchorElement.setAttribute("href", lang.app.cta.href);
  anchorElement.classList.add("cta", "primary");
  anchorElement.textContent = lang.app.cta.title;

  appsHeader.replaceChildren(heading, list, anchorElement);
}

function setCategoriesLang(lang) {
  const categoriesContainer = document.querySelector(".categories .container");

  const heading = categoriesContainer.querySelector("h2");
  const list = categoriesContainer.querySelector("ul");

  heading.textContent = lang.categories.heading;

  const listItems = lang.categories.cta.map(({ icon, title }) => {
    const listElement = document.createElement("li");
    const imgElement = document.createElement("img");

    imgElement.setAttribute("src", icon);
    listElement.append(imgElement, title);

    return listElement;
  });

  list.replaceChildren(...listItems);
}

function setAboutLang(lang) {
  const aboutHeader = document.querySelector(".about header");

  const heading = aboutHeader.querySelector("h2");
  const paragraph = aboutHeader.querySelector("p");

  heading.textContent = lang.about.heading;
  paragraph.textContent = lang.about.paragraph;
}

function setDeliveryLang(lang) {
  const deliveryHeader = document.querySelector(".delivery header");

  const heading = deliveryHeader.querySelector("h2");
  const paragraph = deliveryHeader.querySelector("p");
  const anchor = deliveryHeader.querySelector("a");

  heading.textContent = lang.delivery.heading;
  paragraph.textContent = lang.delivery.paragraph;
  anchor.setAttribute("href", lang.delivery.cta.href);
  anchor.textContent = lang.delivery.cta.title;
}
