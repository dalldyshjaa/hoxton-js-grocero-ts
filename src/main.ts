// import "./style.css";
// import "./reset.css";

type storeItem = {
  id: number;
  name: string;
  price: number;
  quantityOnCart: number;
  cartProductQuantityElement?: HTMLSpanElement;
};
let state: storeItem[] = [
  {
    id: 1,
    name: "beetroot",
    price: 0.35,
    quantityOnCart: 0,
  },
  {
    id: 2,
    name: "carrot",
    price: 0.45,
    quantityOnCart: 0,
  },
  {
    id: 3,
    name: "apple",
    price: 0.7,
    quantityOnCart: 0,
  },
  {
    id: 4,
    name: "apricot",
    price: 0.25,
    quantityOnCart: 0,
  },
  {
    id: 5,
    name: "avocado",
    price: 0.5,
    quantityOnCart: 0,
  },
  {
    id: 6,
    name: "bananas",
    price: 0.8,
    quantityOnCart: 0,
  },
  {
    id: 7,
    name: "bell-pepper",
    price: 1,
    quantityOnCart: 0,
  },
  {
    id: 8,
    name: "berry",
    price: 0.95,
    quantityOnCart: 0,
  },
  {
    id: 9,
    name: "blueberry",
    price: 0.35,
    quantityOnCart: 0,
  },
  {
    id: 10,
    name: "eggplant",
    price: 1.2,
    quantityOnCart: 0,
  },
];
let total: number = 0.0;

function renderProducts() {
  for (let product of state) {
    let item = document.createElement("li");

    let productImageWrapper = document.createElement("div");
    productImageWrapper.className = "store--item-icon";

    let productImage = document.createElement("img");
    productImage.src =
      product.id < 10
        ? `../icons/00${product.id}-${product.name}.svg`
        : `../icons/0${product.id}-${product.name}.svg`;
    productImage.alt = product.name;

    let addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to cart";
    addToCartBtn.addEventListener("click", () => {
      addProductToCart(product);
    });

    productImageWrapper.appendChild(productImage);
    item.append(productImageWrapper, addToCartBtn);

    document.querySelector(".store--item-list").appendChild(item);
  }
}
function incrementQuantityOnCart(product: storeItem) {
  product.quantityOnCart++;
  total += product.price;
  document.querySelector(".total-number").textContent = `£${total.toFixed(2)}`;
  return product.quantityOnCart;
}
function addProductToCart(product) {
  if (product.quantityOnCart === 0) {
    let cartItem = document.createElement("li");
    let cartProductImage = document.createElement("img");
    cartProductImage.className = "cart--item-icon";
    cartProductImage.src =
      product.id < 10
        ? `../icons/00${product.id}-${product.name}.svg`
        : `../icons/0${product.id}-${product.name}.svg`;
    cartProductImage.alt = product.name;

    let cartProductName = document.createElement("p");
    cartProductName.textContent = product.name;

    let decrementQuantity = document.createElement("button");
    decrementQuantity.className = "quantity-btn remove-btn center";
    decrementQuantity.textContent = "-";
    decrementQuantity.addEventListener("click", () => {
      decrementQuantityOnCart(product);
    });

    let cartProductQuantity = document.createElement("span");
    cartProductQuantity.className = "quantity-text center";
    cartProductQuantity.textContent = incrementQuantityOnCart(product);
    product.cartProductQuantityElement = cartProductQuantity;

    let incrementQuantity = document.createElement("button");
    incrementQuantity.className = "quantity-btn add-btn center";
    incrementQuantity.textContent = "+";
    incrementQuantity.addEventListener("click", () => {
      product.cartProductQuantityElement.textContent =
        incrementQuantityOnCart(product);
    });

    cartItem.append(
      cartProductImage,
      cartProductName,
      decrementQuantity,
      product.cartProductQuantityElement,
      incrementQuantity
    );
    document.querySelector(".cart--item-list").appendChild(cartItem);
  } else {
    product.cartProductQuantityElement.textContent =
      incrementQuantityOnCart(product);
  }
}
function decrementQuantityOnCart(product: storeItem): number {
  product.quantityOnCart--;
  total -= product.price;
  document.querySelector(".total-number").textContent = `£${total.toFixed(2)}`;
  if (product.quantityOnCart === 0) {
    product.cartProductQuantityElement.parentNode.remove();
  }
  product.cartProductQuantityElement.textContent = product.quantityOnCart;
  return product.quantityOnCart;
}

renderProducts();
