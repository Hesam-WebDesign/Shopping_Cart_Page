let shopItemData = [
  {
    id: "a",
    name: "T-Shirt",
    price: 50,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "/images/T-Shirt.jpg",
  },
  {
    id: "b",
    name: "Tie",
    price: 15,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "/images/Tie.jpg",
  },
  {
    id: "c",
    name: "Jeans",
    price: 60,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "/images/Jeans.jpg",
  },
  {
    id: "d",
    name: "Cap",
    price: 20,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "/images/Cap.png",
  },
  {
    id: "e",
    name: "Socks",
    price: 5,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "/images/Socks.jpg",
  },
  {
    id: "f",
    name: "Jacket",
    price: 120,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "/images/Jacket.jpg",
  },
  {
    id: "g",
    name: "Coat",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "/images/Coat.jpg",
  },
];

let basket = [];

// * InnerHTML for Adding Items
let shop = document.getElementById("shop");
let generateShop = () => {
  return (shop.innerHTML = shopItemData
    .map((x) => {
      let { id, name, price, desc, img } = x;
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
              <div id=${id} class="quantity">0</div>
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
