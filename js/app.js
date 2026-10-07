const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const money = n => `Rs. ${Number(n).toLocaleString("en-PK")}`;

let selectedPreservation = "Flower";

function getCart() {
  return JSON.parse(localStorage.getItem("zareenCart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("zareenCart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const el = $("#cart-count");

  if (el) {
    el.textContent = getCart().reduce(
      (total, item) => total + Number(item.qty || 0),
      0
    );
  }
}

function getItemPrice(product, custom = {}) {
  if (
    custom.size &&
    product.sizePrices &&
    product.sizePrices[custom.size]
  ) {
    return Number(product.sizePrices[custom.size]);
  }

  return Number(product.price);
}

function addToCart(id, custom = {}, unitPrice = null) {
  const product = products.find(p => p.id === id);

  if (!product) {
    alert("Product not found.");
    return;
  }

  const price = unitPrice !== null
    ? Number(unitPrice)
    : getItemPrice(product, custom);

  const cart = getCart();

  const key = JSON.stringify(custom);

  const found = cart.find(
    item =>
      item.id === id &&
      JSON.stringify(item.custom || {}) === key
  );

  if (found) {
    found.qty += 1;
  } else {
    cart.push({
      id: id,
      qty: 1,
      unitPrice: price,
      custom: custom
    });
  }

  saveCart(cart);

  alert("Added to cart.");
}

function productCard(p) {
  const displayPrice =
    p.category === "cakes" && p.sizePrices
      ? Math.min(...Object.values(p.sizePrices))
      : p.price;

  return `
    <article class="product-card">

      <a href="product.html?id=${p.id}">
        <div class="product-image">
          <img src="${p.image}" alt="${p.name}">
        </div>
      </a>

      <div class="product-info">

        <h3>${p.name}</h3>

        <p>${p.description}</p>

        <strong class="price">
          From ${money(displayPrice)}
        </strong>

        <div class="product-actions">

          <a
            class="btn btn-light"
            href="product.html?id=${p.id}"
          >
            ${p.category === "cakes" ? "Select Size" : "Customize"}
          </a>

          ${
            p.category !== "cakes"
              ? `
                <button
                  class="btn"
                  onclick="addToCart(${p.id})"
                >
                  Add
                </button>
              `
              : ""
          }

        </div>

      </div>

    </article>
  `;
}

function renderHome() {
  const cakes = $("#cake-products");
  const resin = $("#resin-products");

  if (cakes) {
    cakes.innerHTML = products
      .filter(p => p.category === "cakes")
      .map(productCard)
      .join("");
  }

  if (resin) {
    resin.innerHTML = products
      .filter(p => p.category === "resin")
      .map(productCard)
      .join("");
  }
}

function renderShop() {
  const box = $("#all-products");

  if (!box) return;

  const queryCategory =
    new URLSearchParams(location.search).get("cat");

  if (queryCategory && $("#category")) {
    $("#category").value = queryCategory;
  }

  function draw() {
    const search =
      ($("#search")?.value || "").toLowerCase();

    const category =
      $("#category")?.value || "all";

    const filtered = products.filter(product => {
      const categoryMatch =
        category === "all" ||
        product.category === category;

      const searchMatch =
        product.name.toLowerCase().includes(search);

      return categoryMatch && searchMatch;
    });

    box.innerHTML =
      filtered.map(productCard).join("") ||
      "<p>No products found.</p>";
  }

  $("#search")?.addEventListener("input", draw);
  $("#category")?.addEventListener("change", draw);

  draw();
}

function selectPreservation(btn, type) {
  $$(".preservation-btn").forEach(button => {
    button.classList.remove("active");
  });

  btn.classList.add("active");

  selectedPreservation = type;

  const otherInput = $("#custom-preservation-other");

  if (otherInput) {
    otherInput.style.display =
      type === "Other" ? "block" : "none";
  }
}

function updateCakePrice(product) {
  const sizeSelect = $("#custom-size");
  const priceBox = $("#selected-product-price");

  if (!sizeSelect || !priceBox) return;

  const selectedSize = sizeSelect.value;

  const price =
    product.sizePrices?.[selectedSize] ??
    product.price;

  priceBox.textContent = money(price);
}

function renderProduct() {
  const box = $("#product-detail");

  if (!box) return;

  const id = Number(
    new URLSearchParams(location.search).get("id")
  );

  const product = products.find(
    p => p.id === id
  );

  if (!product) {
    box.innerHTML = "<h2>Product not found.</h2>";
    return;
  }

  const isResin =
  product.category === "resin";

selectedPreservation = "Flower";

const productSizes =
  product.sizePrices
    ? Object.entries(product.sizePrices)
    : [];

const defaultSize =
  productSizes.length
    ? productSizes[0][0]
    : "";

const defaultPrice =
  productSizes.length
    ? productSizes[0][1]
    : product.price;

  box.innerHTML = `
    <div class="product-detail">

      <div class="detail-image">
        <img
          src="${product.image}"
          alt="${product.name}"
        >
      </div>

      <div class="detail-info">

        <p class="eyebrow">
          ${isResin ? "RESIN ART" : "CAKE"}
        </p>

        <h1>${product.name}</h1>

        <p>${product.description}</p>

        <div
          id="selected-product-price"
          class="price"
        >
          ${money(defaultPrice)}
        </div>

        <div class="custom-box">

          <label>
            <strong>Customize your order</strong>
          </label>

         ${
  isResin
    ? `
      ${
        productSizes.length
          ? `
            <div class="size-section">

              <label for="custom-size">
                <strong>Select Option:</strong>
              </label>

              <select
                id="custom-size"
                class="custom-select"
              >
                ${productSizes
                  .map(
                    ([size, price]) => `
                      <option
                        value="${size}"
                        data-price="${price}"
                        ${size === defaultSize ? "selected" : ""}
                      >
                        ${size} - ${money(price)}
                      </option>
                    `
                  )
                  .join("")}
              </select>

            </div>
          `
          : ""
      }

      <div class="preservation-section">

        <label>
          <strong>Preservation Type:</strong>
        </label>

        <div class="preservation-options">

          <button
            type="button"
            class="btn btn-light preservation-btn active"
            onclick="selectPreservation(this, 'Flower')"
          >
            🌸 Flower
          </button>

          <button
            type="button"
            class="btn btn-light preservation-btn"
            onclick="selectPreservation(this, 'Blood')"
          >
            🩸 Blood
          </button>

          <button
            type="button"
            class="btn btn-light preservation-btn"
            onclick="selectPreservation(this, 'Other')"
          >
            ✨ Other
          </button>

        </div>

        <input
          id="custom-preservation-other"
          class="custom-input"
          placeholder="Specify other item..."
          style="display:none;margin-top:8px;"
        >

      </div>
    `
    : `
      <div class="size-section">

        <label for="custom-size">
          <strong>Select Cake Size:</strong>
        </label>

        <select
          id="custom-size"
          class="custom-select"
        >
          ${productSizes
            .map(
              ([size, price]) => `
                <option
                  value="${size}"
                  data-price="${price}"
                  ${size === defaultSize ? "selected" : ""}
                >
                  ${size} - ${money(price)}
                </option>
              `
            )
            .join("")}
        </select>

      </div>
    `
}

          <input
            id="custom-text"
            class="custom-input"
            placeholder="${
              isResin
                ? "Inscription, text, or details..."
                : "e.g. chocolate flavor, pink flowers, Happy Birthday..."
            }"
          >

          <input
            id="custom-color"
            class="custom-input"
            placeholder="Preferred color theme / foil accents"
          >

          <input
            id="custom-date"
            class="custom-input"
            type="date"
          >

        </div>

        <button
          class="btn"
          onclick="addCustom(${product.id})"
        >
          Add Customized Product
        </button>

      </div>

    </div>
  `;

  const sizeSelect = $("#custom-size");

if (sizeSelect) {
  sizeSelect.addEventListener(
    "change",
    () => updateCakePrice(product)
  );
}
}

function addCustom(id) {
  const product = products.find(
    p => p.id === id
  );

  if (!product) return;

  let preservation = "";

  if (product.category === "resin") {
    if (selectedPreservation === "Other") {
      preservation =
        $("#custom-preservation-other")?.value ||
        "Other";
    } else {
      preservation = selectedPreservation;
    }
  }

  const size =
    $("#custom-size")?.value || "";

  const custom = {
    preservation: preservation,
    size: size,
    text: $("#custom-text")?.value || "",
    color: $("#custom-color")?.value || "",
    date: $("#custom-date")?.value || ""
  };

  const unitPrice =
    getItemPrice(product, custom);

  addToCart(
    id,
    custom,
    unitPrice
  );
}

function getCartItemPrice(item) {
  const product = products.find(
    p => p.id === item.id
  );

  if (!product) return 0;

  if (
    item.unitPrice !== undefined &&
    item.unitPrice !== null
  ) {
    return Number(item.unitPrice);
  }

  return getItemPrice(
    product,
    item.custom || {}
  );
}

function renderCart() {
  const box = $("#cart-items");
  const summary = $("#cart-summary");

  if (!box) return;

  const cart = getCart();

  if (!cart.length) {
    box.innerHTML = `
      <p>
        Your cart is empty.
        <a href="products.html">
          Start shopping →
        </a>
      </p>
    `;

    if (summary) {
      summary.innerHTML = "";
    }

    return;
  }

  box.innerHTML = cart
    .map((item, index) => {
      const product =
        products.find(p => p.id === item.id);

      if (!product) return "";

      const details = [];

      if (item.custom?.preservation) {
        details.push(
          `Type: ${item.custom.preservation}`
        );
      }

      if (item.custom?.size) {
        details.push(
          `Size: ${item.custom.size}`
        );
      }

      if (item.custom?.text) {
        details.push(
          `Note: ${item.custom.text}`
        );
      }

      if (item.custom?.color) {
        details.push(
          `Color: ${item.custom.color}`
        );
      }

      const unitPrice =
        getCartItemPrice(item);

      const itemTotal =
        unitPrice * Number(item.qty);

      return `
        <div class="cart-item">

          <div class="cart-thumb">
            <img
              src="${product.image}"
              alt="${product.name}"
            >
          </div>

          <div>

            <strong>
              ${product.name}
            </strong>

            <small>
              ${
                details.join(" | ") ||
                "Standard order"
              }
            </small>

            <small>
              Unit price:
              ${money(unitPrice)}
            </small>

          </div>

          <div class="qty">

            <button
              onclick="changeQty(${index}, -1)"
            >
              −
            </button>

            ${item.qty}

            <button
              onclick="changeQty(${index}, 1)"
            >
              +
            </button>

          </div>

          <div class="price">
            ${money(itemTotal)}
          </div>

          <button
            class="remove"
            onclick="removeItem(${index})"
          >
            Remove
          </button>

        </div>
      `;
    })
    .join("");

  const total = cart.reduce(
    (sum, item) => {
      return (
        sum +
        getCartItemPrice(item) *
        Number(item.qty)
      );
    },
    0
  );

  if (summary) {
    summary.innerHTML = `
      <div class="cart-summary">

        <div>
          <span>Subtotal</span>
          <strong>
            ${money(total)}
          </strong>
        </div>

        <a
          class="btn"
          href="checkout.html"
        >
          Proceed to Checkout
        </a>

      </div>
    `;
  }
}

function changeQty(index, amount) {
  const cart = getCart();

  if (!cart[index]) return;

  cart[index].qty =
    Number(cart[index].qty) +
    Number(amount);

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  const cart = getCart();

  cart.splice(index, 1);

  saveCart(cart);
  renderCart();
}

async function submitReview(e) {
  e.preventDefault();

  const form = e.target;
  const message = $("#review-message");

  const data =
    Object.fromEntries(
      new FormData(form)
    );

  try {
    const response =
      await fetch("php/reviews.php", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(data)
      });

    const result =
      await response.json();

    message.textContent =
      result.message ||
      "Review submitted.";

    if (result.success) {
      form.reset();
      loadReviews();
    }

  } catch (error) {
    message.textContent =
      "Demo mode: review saved locally.";

    const reviews =
      JSON.parse(
        localStorage.getItem(
          "zareenReviews"
        ) || "[]"
      );

    reviews.unshift(data);

    localStorage.setItem(
      "zareenReviews",
      JSON.stringify(reviews)
    );

    form.reset();

    loadReviews();
  }
}

async function loadReviews() {
  const box = $("#reviews-list");

  if (!box) return;

  let reviews = [];

  try {
    const response =
      await fetch("php/reviews.php");

    reviews =
      await response.json();

  } catch (error) {}

  if (
    !Array.isArray(reviews) ||
    !reviews.length
  ) {
    reviews = [
      {
        name: "Ayesha",
        rating: 5,
        comment:
          "The cake looked exactly like the reference picture and tasted amazing."
      },
      {
        name: "Maham",
        rating: 5,
        comment:
          "Loved the resin tray. The flowers and finishing were beautiful."
      },
      {
        name: "Sara",
        rating: 4,
        comment:
          "Very cooperative with customization. I will order again."
      }
    ];
  }

  const localReviews =
    JSON.parse(
      localStorage.getItem(
        "zareenReviews"
      ) || "[]"
    );

  reviews = [
    ...localReviews,
    ...reviews
  ];

  box.innerHTML = reviews
    .slice(0, 6)
    .map(
      review => `
        <article class="review">

          <div class="stars">
            ${"★".repeat(
              Number(review.rating)
            )}

            ${"☆".repeat(
              5 -
              Number(review.rating)
            )}
          </div>

          <p>
            “${review.comment}”
          </p>

          <strong>
            ${review.name}
          </strong>

        </article>
      `
    )
    .join("");
}

function sendOrderToWhatsApp(e) {
  e.preventDefault();

  const messageBox = $("#order-message");
  const cart = getCart();

  if (!cart.length) {
    messageBox.textContent = "Your cart is empty.";
    return;
  }

  const data = Object.fromEntries(new FormData(e.target));
  const customerName = (data.customer_name || "").trim();
  const phone = (data.phone || "").trim();
  const city = (data.city || "").trim();
  const address = (data.address || "").trim();
  const deliveryDate = (data.delivery_date || "").trim();
  const paymentMethod = (data.payment_method || "").trim();
  const paymentReference = (data.payment_reference || "").trim();
  const email = (data.email || "").trim();
  const notes = (data.custom_notes || "").trim();

  if (!customerName || !phone || !city || !address || !deliveryDate || !paymentMethod) {
    messageBox.textContent = "Please fill in all required fields.";
    return;
  }

  let total = 0;

  const itemLines = cart.map((item, index) => {
    const product = products.find(p => p.id === item.id);

    if (!product) return "";

    const qty = Number(item.qty || 1);
    const unitPrice = getCartItemPrice(item);
    const itemTotal = unitPrice * qty;
    total += itemTotal;

    const details = [];

    if (item.custom?.size) details.push(`Size: ${item.custom.size}`);
    if (item.custom?.preservation) details.push(`Type: ${item.custom.preservation}`);
    if (item.custom?.text) details.push(`Note: ${item.custom.text}`);
    if (item.custom?.color) details.push(`Color: ${item.custom.color}`);
    if (item.custom?.date) details.push(`Custom date: ${item.custom.date}`);

    return `${index + 1}. ${product.name} x${qty} — ${money(itemTotal)}`
      + (details.length ? `\n   ${details.join(" | ")}` : "");
  }).filter(Boolean);

  const whatsappMessage =
`*ZAREEN ARTS — NEW ORDER*

*Customer Details*
Name: ${customerName}
Phone: ${phone}
Email: ${email || "Not provided"}
City: ${city}
Address: ${address}
Delivery Date: ${deliveryDate}

*Order*
${itemLines.join("\n")}

*Total: ${money(total)}*

Payment Method: ${paymentMethod}
${paymentReference ? `Payment Reference: ${paymentReference}` : ""}
${notes ? `Special Instructions: ${notes}` : ""}

Please confirm this order.`;

  // Zareen Arts WhatsApp number: 0303 4904218
  const whatsappNumber = "923034904218";
  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  localStorage.removeItem("zareenCart");
  updateCartCount();

  window.open(whatsappUrl, "_blank");

  messageBox.textContent =
    "WhatsApp opened with your order. Press Send to submit it.";
}

function setupPaymentMethod() {
  const paymentMethod =
    document.querySelector(
      '[name="payment_method"]'
    );

  const bankDetails =
    $("#bank-details");

  if (!paymentMethod || !bankDetails) {
    return;
  }

  function updateBankDetails() {
    bankDetails.style.display =
      paymentMethod.value ===
      "Bank Transfer"
        ? "block"
        : "none";
  }

  paymentMethod.removeEventListener(
    "change",
    updateBankDetails
  );

  paymentMethod.addEventListener(
    "change",
    updateBankDetails
  );

  updateBankDetails();
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    updateCartCount();

    renderHome();

    renderShop();

    renderProduct();

    renderCart();

    loadReviews();

    setupPaymentMethod();

    const reviewForm =
      $("#review-form");

    if (reviewForm) {
      reviewForm.addEventListener(
        "submit",
        submitReview
      );
    }

    const checkoutForm =
      $("#checkout-form");

    if (checkoutForm) {
      checkoutForm.addEventListener(
        "submit",
        sendOrderToWhatsApp
      );
    }
  }
);