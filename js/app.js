// ===========================
// COS DE CUMPARATURI (localStorage)
// ===========================
const CART_KEY = "carpshop_cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
}

function updateCartBadge() {
  const cart = getCart();
  const badge = document.querySelector(".cart-badge");
  if (badge) badge.textContent = cart.length;
}

// ===========================
// BUTOANE "ADAUGA IN COS"
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  document.querySelectorAll(".btn-buy").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product-card");
      const name = card.querySelector("h3")?.innerText.trim();
      const priceText = card.querySelector(".product-price, .price")?.innerText.trim();
      const img = card.querySelector("img")?.getAttribute("src");

      if (name && priceText && img) {
        addToCart({ name, price: priceText, img });
      }
    });
  });
});