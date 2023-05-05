let basket = JSON.parse(localStorage.getItem("data")) || [];

// * InnerHTML for Adding Items
let shop = document.getElementById("shop");
let generateShop = () => {
  return (shop.innerHTML = shopItemData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
        <img src=${img} alt=${name} />
        <div class="details">
          <h3 class="title">${name}</h3>
          <p class="description">
            ${desc}
          </p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="quantity-button">
              <img onclick="decrement(${id})" src="/icons/Minus.png" alt="Minus" />
              <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <img onclick="increment(${id})" src="/icons/Plus.png" alt="Plus" />
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};
generateShop();

// * Change the Quantity part
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
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
  updateQuantity(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

let updateQuantity = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  cartAmountCalc();
};

let cartAmountCalc = () => {
  let cartAmountNumber = document.getElementById("cartAmount");
  cartAmountNumber.innerHTML = basket
    .map((x) => x.item)
    .reduce((x, y) => x + y, 0);
};

cartAmountCalc();
