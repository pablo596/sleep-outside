import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  /**
   * @param {string} productId — the ID from the URL (e.g. "880RR")
   * @param {ProductData} dataSource — instance to fetch product data
   */
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = null;
  }

  /**
   * 1) Load product data
   * 2) Render it into the page
   * 3) Wire up the Add to Cart button
   */
  async init() {
    // fetch the product
    this.product = await this.dataSource.findProductById(this.productId);
    if (!this.product) {
      console.error("Product not found:", this.productId);
      return;
    }

    // populate the DOM
    this.renderProductDetails();

    // bind the Add to Cart button
    const btn = document.getElementById("addToCart");
    if (btn) {
      // set the data-id so setLocalStorage knows which to add
      btn.dataset.id = this.product.Id;
      btn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  /**
   * Reads the cart array from localStorage, pushes this.product,
   * and writes it back.
   */
  addProductToCart() {
    const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
  }

  /**
   * Fills each element (by ID) with the corresponding product field.
   * Ensure your HTML has these IDs:
   *   prod-brand, prod-name, prod-image, prod-price, prod-color, prod-description
   */
  renderProductDetails() {
    // Brand (if available)
    const brandEl = document.getElementById("prod-brand");
    console.log({ product: this.product });

    if (brandEl) {
      brandEl.textContent = this.product.Brand.Name || "";
    }

    // Name / Title
    document.getElementById("prod-name").textContent =
      this.product.NameWithoutBrand;

    // Image & alt text
    const img = document.getElementById("prod-image");

    img.src = this.product.Image;
    img.alt = this.product.Name;

    // Price
    document.getElementById("prod-price").textContent =
      `$${this.product.FinalPrice.toFixed(2)}`;

    // Color
    const colorEl = document.getElementById("prod-color");
    if (colorEl) {
      colorEl.textContent = this.product.Colors[0].ColorName || "";
    }

    // Description
    document.getElementById("prod-description").innerHTML =
      this.product.DescriptionHtmlSimple;
  }
}
