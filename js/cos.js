function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Coșul este gol.</p>";
    totalEl.textContent = "0 lei";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const priceNumber = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
    total += priceNumber;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div style="text-align:left;">
        <h3>${item.name}</h3>
        <div class="price">${item.price}</div>
      </div>
    `;
    container.appendChild(div);
  });

  totalEl.textContent = total + " lei";
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  document.getElementById("clear-cart").addEventListener("click", () => {
    localStorage.removeItem(CART_KEY);
    renderCart();
  });
});