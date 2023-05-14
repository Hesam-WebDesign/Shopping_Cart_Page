let basket = JSON.parse(localStorage.getItem("data")) || [];

let cartAmountCalc = () => {
  let cartAmountNumber = document.getElementById("cartAmount");
  cartAmountNumber.innerHTML = basket
    .map((x) => x.item)
    .reduce((x, y) => x + y, 0);
};
cartAmountCalc();

let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let generateCartItems = () => {
  if (basket.length !== 0) {
    label.innerHTML = `
        <h2>Total Bill: $1000</h2>
        <a class="checkoutLink" href="#">
          <button class="checkout">Checkout</button>
        </a>
        <a class="clearCartLink" href="#">
          <button class="clearCart">Clear Cart</button>
        </a>
    `;
    shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemData.find((y) => y.id === id) || [];
        console.log(search);
        return `
      <div class="cart-item">
          <img src=${search.img} alt=${search.name} />
          <div class="details">
            <h3 class="title">${search.name}</h3>
            <p class="description">
            ${search.desc}            </p>
            <div class="price-quantity">
              <h2>$ ${search.price}</h2>
              <div class="quantity-button">
                <img src="/icons/Minus.png" alt="Minus" />
                <div class="quantity">0</div>
                <img src="/icons/Plus.png" alt="Plus" />
              </div>
            </div>
          </div>
          <div class="close-icon">
            <img src="/icons/close.svg" alt="Close" />
          </div>
        </div>
      `;
      })
      .join("");
  } else {
    label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="/index.html">
          <button class="homeBtn">Back to Home</button>
        </a>
    `;
    shoppingCart.innerHTML = ``;
  }
};
generateCartItems();
