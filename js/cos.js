function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const checkoutSection = document.getElementById("checkout-section"); // Formularul

  if (!container || !totalEl) return;

  container.innerHTML = "";

  // Dacă coșul e gol, ascundem formularul
  if (cart.length === 0) {
    container.innerHTML = "<p>Coșul este gol.</p>";
    totalEl.textContent = "0 lei";
    if (checkoutSection) checkoutSection.style.display = "none";
    return;
  }

  // Dacă avem produse, afișăm formularul
  if (checkoutSection) checkoutSection.style.display = "block";

  let total = 0;

  cart.forEach((item) => {
    const priceNumber = parseFloat(item.price.toString().replace(/[^\d.]/g, "")) || 0;
    total += priceNumber;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" width="80">
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

  // Butonul de golire manuală a coșului
  const btnClear = document.getElementById("clear-cart");
  if (btnClear) {
    btnClear.addEventListener("click", () => {
      localStorage.removeItem(CART_KEY);
      renderCart();
      updateCartBadge();
    });
  }

  // === NOU: Trimiterea comenzii către Baza de Date ===
  const formComanda = document.getElementById("form-comanda");
  if (formComanda) {
    formComanda.addEventListener("submit", function(e) {
      e.preventDefault(); // Oprim reîncărcarea paginii

      const nume = document.getElementById("nume-client").value;
      const telefon = document.getElementById("telefon-client").value;
      const adresa = document.getElementById("adresa-client").value;
      const cart = getCart();

      // Calculăm din nou totalul ca să îl trimitem corect
      let total = 0;
      cart.forEach((item) => {
        const priceNumber = parseFloat(item.price.toString().replace(/[^\d.]/g, "")) || 0;
        total += priceNumber;
      });

      // Pachetul de date care pleacă spre PHP
      const dateComanda = {
        nume: nume,
        telefon: telefon,
        adresa: adresa,
        cos: cart,
        total: total
      };

      // Apelăm fișierul PHP
      fetch('http://localhost/carpshop/plaseaza_comanda.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dateComanda)
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          // Succes!
          alert("Felicitări! Comanda a fost plasată. Te vom contacta în curând.");
          localStorage.removeItem(CART_KEY); // Golim coșul
          formComanda.reset(); // Curățăm câmpurile text
          renderCart(); // Va ascunde formularul și va arăta "Coșul e gol"
          updateCartBadge();
        } else {
          // Eroare din baza de date
          alert("A apărut o problemă: " + data.message);
        }
      })
      .catch(error => console.error("Eroare:", error));
    });
  }
});