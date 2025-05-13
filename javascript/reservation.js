import { storedCart, removeFromCart, calculateCartQuantity, updateQuantity, saveStorage } from "../javascript/cart.js";
import { getProduct } from "./items/products.js";
import { currency } from "./utility/price.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { paymentSummary } from "./orders/payment-summary.js";

/* to display the pickup date in the checkout page */
const now = dayjs();
const pickupDate = now.add(3, 'days').format('dddd, MMMM D YYYY');

paymentSummary();

let cartSummaryHTML = '';

storedCart.forEach((cartItem) => {

  const productId = cartItem.productId;

  const matchingProduct = getProduct(productId);

  cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="pickup-date">
              Pickup date: ${pickupDate}
            </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ₱${currency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingProduct.id}>
                    Add
                  </span>
                  <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}">
                  <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
              </div>
          </div>
        </div>
      </div>
        `;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

/*remove items from cart*/
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    container.remove();

    paymentSummary();

    updateCartQuantity();
  });
 });

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    
     document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
  }

  updateCartQuantity();

  /* lets the user add more quantity to their order*/
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(`.js-cart-item-container-${productId}`);

      container.classList.add('is-editing-quantity');
    });
  });

  /*reduces stock */
function reduceStockAfterCheckout() {
  let products = JSON.parse(localStorage.getItem('products')) || [];

  storedCart.forEach(cartItem => {
    const index = products.findIndex(product => product.name === getProduct(cartItem.productId).name);
    if (index !== -1) {
      products[index].quantity -= cartItem.quantity;
      if (products[index].quantity < 0) products[index].quantity = 0;
    }
  });

  localStorage.setItem('products', JSON.stringify(products));
}

  /*saves the updated quantity*/
  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
  
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const value = quantityInput.value.trim();
  
      if (value === '') {
        alert('Please enter a quantity.');
        return;
      }
  
      const newQuantity = Number(value);
      if (isNaN(newQuantity) || newQuantity < 0 || newQuantity >= 1000) {
        alert('Quantity must be between 0 and 100');
        return;
      }
  
      updateQuantity(productId, newQuantity);
      saveStorage();
  
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
  
      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity;
  
      updateCartQuantity();
    });
  });