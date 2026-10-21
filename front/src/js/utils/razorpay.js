export function openRazorpay({
  key,
  razorpayOrder,
  customer,
}) {
  return new Promise(
    (resolve, reject) => {
      const razorpay =
        new Razorpay({

          key,

          amount:
            razorpayOrder.amount,

          currency:
            razorpayOrder.currency,

          order_id:
            razorpayOrder.id,

          name: "Gemora",

          description:
            "Jewellery Purchase",

          prefill: {
            name:
              customer.name,

            email:
              customer.email,

            contact:
              customer.contact,
          },

          theme: {
            color:
              "#6B1A2A",
          },

          handler:
            resolve,

          modal: {
            ondismiss() {
              reject(
                new Error(
                  "Payment cancelled"
                )
              );
            },
          },
        });

      razorpay.open();
    }
  );
}
