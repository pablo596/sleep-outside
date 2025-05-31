import { cartCount, getLocalStorage, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  // 1. Get raw array from localStorage (may contain duplicates)
  const cartItems = getLocalStorage("so-cart") || [];

  // 2. Aggregate by Id into an object: { [Id]: { …item, quantity } }
  const grouped = cartItems.reduce((acc, item) => {
    if (acc[item.Id]) {
      acc[item.Id].quantity += 1;
    } else {
      // clone the item and start quantity at 1
      acc[item.Id] = { ...item, quantity: 1 };
    }
    return acc;
  }, {});

  // 3. Turn that object into an array of unique items
  const uniqueItems = Object.values(grouped);

  // 4. Render with your template (which now expects a .quantity)
  const htmlItems = uniqueItems.map((item) => cartItemTemplate(item));

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

loadHeaderFooter().then(() => cartCount());
