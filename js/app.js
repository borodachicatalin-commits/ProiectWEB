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
  alert(product.name + " a fost adăugat în coș!");
}

function updateCartBadge() {
  const cart = getCart();
  const badge = document.querySelector(".cart-badge");
  if (badge) badge.textContent = cart.length;
}

function incarcaProduse(categorie = "") {
    const container = document.querySelector('.product-grid, .products-container');
    if (!container) return;

    let url = '../produse.php';
    if (categorie !== "") {
        url += '?categorie=' + categorie;
    }

    fetch(url)
        .then(response => response.json())
        .then(produse => {
            container.innerHTML = "";
            
            if (produse.length === 0) {
                container.innerHTML = "<p>Nu există produse.</p>";
                return;
            }

            produse.forEach(produs => {
                const div = document.createElement('div');
                div.classList.add('product-card');
                
                let etichetaHTML = '';
                if (produs.eticheta) {
                    etichetaHTML = `<div class="badge">${produs.eticheta}</div>`;
                }

                div.innerHTML = `
                    ${etichetaHTML}
                    <div class="product-image">
                        <img src="${produs.imagine}" alt="${produs.nume}">
                    </div>
                    <div class="product-info">
                        <h3>${produs.nume}</h3>
                        <p>${produs.descriere ? produs.descriere : ''}</p>
                        <div class="product-price">${produs.pret} lei</div>
                        <button class="btn-buy" data-nume="${produs.nume}" data-pret="${produs.pret}" data-img="${produs.imagine}">Adaugă în coș</button>
                    </div>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error(error));
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("btn-buy")) {
        const btn = e.target;
        const name = btn.getAttribute("data-nume");
        const price = btn.getAttribute("data-pret") + " lei";
        const img = btn.getAttribute("data-img");

        if (name && price && img) {
            addToCart({ name, price, img });
        }
    }
  });
});