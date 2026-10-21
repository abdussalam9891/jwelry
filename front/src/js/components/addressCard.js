export function createAddressCard(address) {

  return `

    <label
      class="
        block
        border
        rounded-2xl
        p-4
        cursor-pointer
        hover:border-[#6B1A2A]
        transition
      "
    >

      <div class="flex items-start gap-3">

        <input
          type="radio"
          name="selectedAddress"
          value="${address._id}"
          ${address.isDefault ? "checked" : ""}
          class="mt-1"
        />

        <div class="flex-1">

          <div class="flex items-center gap-2 mb-1">

            <p class="font-medium">
              ${address.fullName}
            </p>

            <span
              class="
                text-[11px]
                px-2
                py-0.5
                rounded-full
                bg-[#F4F4F4]
              "
            >
              ${address.addressType}
            </span>

          </div>

          <p class="text-sm text-black/65 leading-6">

            ${address.addressLine1},

            ${address.addressLine2},

            ${address.city},

            ${address.state}

            - ${address.pincode}

          </p>

          <p class="text-sm mt-2">

            Mobile:

            <span class="font-medium">
              ${address.phone}
            </span>

          </p>

        </div>

      </div>

    </label>

  `;
}
