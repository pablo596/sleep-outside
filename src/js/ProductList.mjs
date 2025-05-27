import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(p) {
  return `
    <li class="product-card">
      <a href="product_pages/?product=${p.Id}">
        <img src="${p.Image}" alt="${p.Name}">
        <h2 class="card__brand">${p.Brand.Name}</h2>
        <h3 class="card__name">${p.NameWithoutBrand}</h3>
        <p class="product-card__price">$${p.FinalPrice.toFixed(2)}</p>
      </a>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }
  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "beforeend",
      true, // limpiar primero
    );
  }
}
