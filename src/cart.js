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
    shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemData.find((y) => y.id === id) || [];
        return `
      <div class="cart-item">
          <div onclick="removeItem(${id})" class="close-icon">
            <img src="/icons/close.svg" alt="Close" />
          </div>
          <img src=${search.img} alt=${search.name} />
          <div class="details">
            <h3 class="title">${search.name}</h3>
            <p class="description">${search.desc}</p>
            <div class="price-quantity">
              <h2>$ ${search.price}</h2>
              <div class="quantity-button">
              <img onclick="decrement(${id})" src="/icons/Minus.png" alt="Minus" />
              <div id=${id} class="quantity">${item}</div>
              <img onclick="increment(${id})" src="/icons/Plus.png" alt="Plus" />
            </div>
            </div>
          </div>
          <div id=total-price-${id} class="total-price">
          Total price: $${item * search.price}
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

let increment = (id) => {
  let selectedItem = id;
  console.log(selectedItem);
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  // ! It should solve (generate the whole page with every increment is awful!)
  generateCartItems();
  updateQuantity(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined || search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }
  // ! It should solve (generate the whole page with every decrement is awful!)
  generateCartItems();
  updateQuantity(selectedItem.id);
  if (search.item === 0) {
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
  }
  localStorage.setItem("data", JSON.stringify(basket));
};

let updateQuantity = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  cartAmountCalc();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  totalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
  console.log("in totalAmount");
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
      <h2>Total Bill: $${amount}</h2>
      <a class="checkoutLink" href="#">
        <button class="checkout">Checkout</button>
      </a>
      <a class="clearCartLink" href="#">
        <button onclick="clearCart()" class="clearCart">Clear Cart</button>
      </a>
    `;
  } else return;
};
totalAmount();
