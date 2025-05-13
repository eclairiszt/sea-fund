/*modules*/
import { addToCart, calculateCartQuantity } from "../javascript/cart.js";
import { products } from "./items/products.js";
import { currency } from "./utility/price.js";

/*for each loop to loop through the array*/
let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
  <div class="products-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>
  
          <div class="product-name text-limit">
            ${product.name}
          </div>
  
          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/${product.ratings.stars * 10}-rating.png">
            <div class="product-ratings link-primary">
              ${product.ratings.score}
            </div>
          </div>
  
          <div class="product-price">
            ₱${currency(product.priceCents)}
          </div>
  
          <div class="product-spacer"></div>
  
          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/checkmark.png">
            Added
          </div>
  
          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`
        ;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity () {
  /* calculates the total quantity of items inside the cart*/
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

updateCartQuantity();

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
  });
});

