import { cart, calculateCartQuantity } from '../../javascript/cart.js';
import { getProduct } from '../items/products.js';
import { currency } from '../utility/price.js';

export function paymentSummary() {

  let productPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
  });

  const paymentSummaryHTML = `
  <div class="payment-summary-title">
            Order Summary
          </div>
      
          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">
              ₱${currency(productPriceCents)}
            </div>
          </div>
      
          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
              ₱${currency(productPriceCents)}
            </div>
          </div>
      
          <button class="place-reservation-button button-primary js-place-reservation">
            Place reservation
          </button>
        </div>
      </div>`;

      document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

      document.querySelector('.js-place-reservation').addEventListener('click', () => {
        window.location.href = 'orders.html';

        paymentSummary();
    });
}