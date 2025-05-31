import { cartCount, getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import ProductDetails from "./ProductDetails.mjs";

const listEl = document.getElementById("product-list");
const dataSource = new ProductData("tents");
const productList = new ProductList("tents", dataSource, listEl);

productList.init();

const productId = getParam("product");

if (productId) {
  const details = new ProductDetails(productId, dataSource);
  details.init();
}

loadHeaderFooter().then(() => cartCount());
