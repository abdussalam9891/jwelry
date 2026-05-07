import { createAddressCard } from "../components/addressCard.js";
import { showToast } from "../components/toast.js";
import { createAddress, getAddresses } from "../features/address.js";
import { loadCart } from "../features/cart.js";
import { createOrder } from "../features/order.js";
import { renderSummary } from "./cartPage.js";
import { getCartState } from "../features/cart.js";

async function initCheckout() {

  setupAddressModal();

  setupAddressForm();

  // load cart first
  await loadCart();

  const cart =
    getCartState();

  // redirect if empty
  if (!cart.length) {

    window.location.href =
      "/front/pages/cart.html";

    return;

  }

  // render summary
  renderSummary({
    showCheckoutButton: false,
  });

  // render addresses
  await renderAddresses();

  // setup order logic LAST
  setupPlaceOrder();

}

async function renderAddresses() {
  const container = document.getElementById("addressContainer");

  if (!container) return;

  try {
    const data = await getAddresses();

    const addresses = data.addresses || [];
    // 🔥 EMPTY STATE
    if (!Array.isArray(addresses) || !addresses.length) {
      container.innerHTML = `

        <div
          class="
            border
            border-dashed
            border-black/10
            rounded-2xl
            p-10
            text-center
          "
        >

          <h3
            class="
              text-lg
              font-semibold
              mb-2
            "
          >
            No delivery address found
          </h3>

          <p
            class="
              text-sm
              text-black/50
              mb-5
            "
          >
            Add your address
            to continue checkout
          </p>

          <button
            id="emptyAddAddressBtn"
            class="
              h-11
              px-6
              rounded-xl
              bg-[#6B1A2A]
              text-white
              text-sm
              font-medium
            "
          >
            Add Address
          </button>

        </div>

      `;

      document
        .getElementById("emptyAddAddressBtn")
        ?.addEventListener("click", () => {
          document.getElementById("addressModal").classList.remove("hidden");
        });

      return;
    }

    // 🔥 render cards
    container.innerHTML = addresses.map(createAddressCard).join("");
  } catch (err) {
    console.error(err);

    container.innerHTML = `

      <p class="text-sm text-red-500">
        Failed to load addresses
      </p>

    `;
  }
}

function setupAddressModal() {
  const modal = document.getElementById("addressModal");

  const openBtns = [document.getElementById("openAddressModal")];

  const closeBtn = document.getElementById("closeAddressModal");

  openBtns.forEach((btn) => {
    if (!btn) return;

    btn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  });

  closeBtn?.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}

function setupAddressForm() {
  const form = document.getElementById("addressForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(form);

      const payload = Object.fromEntries(formData.entries());

      // 🔥 frontend validation
      if (!/^[0-9]{10}$/.test(payload.phone)) {
        showToast("Please enter a valid 10-digit phone number");

        return;
      }

      if (!/^[0-9]{6}$/.test(payload.pincode)) {
        showToast("Please enter a valid 6-digit pincode");

        return;
      }

      // 🔥 create address
      await createAddress(payload);

      // 🔥 success toast
      showToast("Address saved successfully");

      // 🔥 close modal
      document.getElementById("addressModal").classList.add("hidden");

      // 🔥 reset form
      form.reset();

      // 🔥 refresh address list
      await renderAddresses();
    } catch (err) {
      console.error(err);

      showToast(err.message || "Failed to save address");
    }
  });
}

function setupPlaceOrder() {
  const btn = document.getElementById("placeOrderBtn");

  if (!btn) return;

  btn.addEventListener("click", async () => {
    try {
      // 🔥 selected address
      const selectedAddress = document.querySelector(
        'input[name="selectedAddress"]:checked',
      );

      console.log(selectedAddress);

      if (!selectedAddress) {
        showToast("Please select an address");

        return;
      }

      // 🔥 selected payment
      const selectedPayment = document.querySelector(
        'input[name="payment"]:checked',
      );

      const paymentMethod = selectedPayment?.value || "COD";

      // 🔥 disable button
      btn.disabled = true;

      btn.textContent = "Placing Order...";

      // 🔥 create order
      const data = await createOrder({
        addressId: selectedAddress.value,

        paymentMethod,
      });

      // 🔥 success
      showToast("Order placed successfully");

      // 🔥 redirect
      setTimeout(() => {
        window.location.href = `/front/pages/orderSuccess.html?id=${data.order._id}`;
      }, 1000);
    } catch (err) {
      console.error(err);

      showToast(err.message || "Failed to place order");

      // 🔥 restore button
      btn.disabled = false;

      btn.textContent = "Place Order";
    }
  });
}

initCheckout();
