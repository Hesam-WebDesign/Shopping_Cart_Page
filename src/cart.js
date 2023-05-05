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
    console.log("basket full");
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
