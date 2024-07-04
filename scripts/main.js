const toggle = document.querySelector(".toggler");
toggle.addEventListener("click", () => {
  toggle.ariaExpanded = toggle.ariaExpanded !== "true";
});

document.addEventListener("DOMContentLoaded", () => {
  if (navigator.languages.length) {
    const browserLang = navigator.languages[0].slice(0, 2);
    setSiteLanguage(browserLang);
  }
});

const langSelectors = document.querySelectorAll(".lang-selector");
langSelectors.forEach((selector) => {
  selector.addEventListener("change", (event) => {
    setSiteLanguage(event.target.value);
  });
});

function setSiteLanguage(language = "en") {
  fetch(`../locales/${language}.json`)
    .then((res) => res.json())
    .then((langJSON) => {
      document.documentElement.setAttribute("lang", langJSON.locale.lang);
      document.documentElement.setAttribute("dir", langJSON.locale.dir);

      langSelectors.forEach((selectorElement) => {
        selectorElement.querySelector("label").textContent = langJSON.selector;
        selectorElement.querySelectorAll("option").forEach((option) => {
          option.value === langJSON.locale.lang
            ? option.setAttribute("selected", "selected")
            : option.removeAttribute("selected");
        });
      });

      setNavLang(langJSON);
      setLandingLang(langJSON);
      setAppsLang(langJSON);
      setCategoriesLang(langJSON);
      setAboutLang(langJSON);
      setDeliveryLang(langJSON);
      setFooterLang(langJSON);
    })
    .catch(console.error);
}

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

  const heading = ladingHeader.querySelector("h1");
  const paragraph = ladingHeader.querySelector("p");
  const nav = ladingHeader.querySelector("nav");

  heading.textContent = lang.landing.heading;
  paragraph.textContent = lang.landing.paragraph;

  const anchorElements = lang.landing.cta.map((label) => {
    const anchorElement = document.createElement("a");

    anchorElement.setAttribute("href", "#");
    anchorElement.classList.add("cta");
    anchorElement.textContent = label;

    return anchorElement;
  });

  nav.replaceChildren(...anchorElements);
}

function setAppsLang(lang) {
  const appsHeader = document.querySelector(".app header");

  const heading = appsHeader.querySelector("h2");
  const list = appsHeader.querySelector("ul");
  const anchor = appsHeader.querySelector(":scope > a");

  heading.textContent = lang.landing.heading;
  anchor.textContent = lang.app.cta.title;

  const listItems = lang.app.apps.map(({ title, icon, href }) => {
    const listItemElement = document.createElement("li");
    const anchorElement = document.createElement("a");
    const imgElement = document.createElement("img");

    imgElement.setAttribute("src", icon);

    anchorElement.setAttribute("href", href);
    anchorElement.setAttribute("dir", "auto");
    anchorElement.classList.add("cta", "featured");
    anchorElement.append(imgElement, title);

    listItemElement.appendChild(anchorElement);

    return listItemElement;
  });

  list.replaceChildren(...listItems);
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

function setFooterLang(lang) {
  const footerContainer = document.querySelector("footer .container");
  const navList = footerContainer.querySelector("nav ul");
  const list = footerContainer.querySelector(":scope > ul");

  const navItems = lang.footer.cta.map(({ title, href }) => {
    const listItemElement = document.createElement("li");
    const anchorElement = document.createElement("a");

    anchorElement.setAttribute("href", href);
    anchorElement.textContent = title;

    listItemElement.appendChild(anchorElement);

    return listItemElement;
  });

  const socialLinks = lang.footer.socials.map(({ title, icon, href }) => {
    const listItemElement = document.createElement("li");
    const anchorElement = document.createElement("a");
    const imgElement = document.createElement("img");

    imgElement.setAttribute("src", icon);
    imgElement.setAttribute("alt", title);

    anchorElement.setAttribute("href", href);
    anchorElement.appendChild(imgElement);

    listItemElement.appendChild(anchorElement);

    return listItemElement;
  });

  navList.replaceChildren(...navItems);
  list.replaceChildren(...socialLinks);
}
