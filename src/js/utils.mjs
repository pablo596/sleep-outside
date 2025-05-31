// src/js/utils.mjs

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

export function renderListWithTemplate(
  templateFn,
  parent,
  list,
  position = "afterbegin",
  clear = false,
) {
  if (clear) parent.textContent = "";
  const html = list.map(templateFn).join("");
  parent.insertAdjacentHTML(position, html);
}

export function cartCount() {
  const cartItems = getLocalStorage("so-cart");
  const cartBadge = document.getElementById("cart-badge");
  if (cartItems && cartItems.length > 0 && cartBadge) {
    cartBadge.style.display = "inline-block";
    cartBadge.textContent = cartItems.length;
  }
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (typeof callback === "function") {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to load template from ${path}: ${res.statusText}`);
  }
  return await res.text();
}

export async function loadHeaderFooter({
  headerPath = "/partials/header.html",
  footerPath = "/partials/footer.html",
  headerCallback = null,
  footerCallback = null,
} = {}) {
  const headerTemplate = await loadTemplate(headerPath);
  const footerTemplate = await loadTemplate(footerPath);

  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerEl, null, headerCallback);
  renderWithTemplate(footerTemplate, footerEl, null, footerCallback);
}
