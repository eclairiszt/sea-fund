/*converts the string back to an array*/
export let storedCart = JSON.parse(localStorage.getItem('cart'));

if(!storedCart) {
  storedCart = [{
    productId: '2025001',
    quantity: 1,
  }];
}

export const cart = storedCart;

/*JSON.stringify converts an array into a string.
  you can only save strings in local storage. */
export function saveStorage() {
  localStorage.setItem('cart', JSON.stringify(storedCart));
}

export function addToCart(productId) {
  let matchingItem;

    cart.forEach((cartItem) => {

      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {  /*to increase the quantity of items in the cart*/
      matchingItem.quantity += 1;
    } else {  /* to add an item in the cart */
      cart.push({
        productId: productId,
        quantity: 1
      });
    }

    saveStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  storedCart = newCart;

  saveStorage();
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

console.log(localStorage.getItem('cart'));