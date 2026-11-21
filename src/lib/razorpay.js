const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

let loader = null;

function loadRazorpay() {
  if (typeof window !== "undefined" && window.Razorpay) {
    return Promise.resolve();
  }

  if (!loader) {
    loader = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = CHECKOUT_SRC;
      script.async = true;
      script.onload = resolve;
      script.onerror = () => {
        loader = null;
        reject(new Error("Failed to load payment gateway"));
      };
      document.body.appendChild(script);
    });
  }

  return loader;
}

// Opens the Razorpay checkout and resolves with the payment response, or
// rejects when the customer dismisses the modal.
export async function openRazorpay({ key, razorpayOrder, customer }) {
  await loadRazorpay();

  return new Promise((resolve, reject) => {
    const razorpay = new window.Razorpay({
      key,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      order_id: razorpayOrder.id,
      name: "Gemora",
      description: "Jewellery Purchase",
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.contact,
      },
      theme: { color: "#6B1A2A" },
      handler: resolve,
      modal: {
        ondismiss() {
          reject(new Error("Payment cancelled"));
        },
      },
    });

    razorpay.open();
  });
}
