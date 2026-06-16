// import {
//   jewelleryNavigation,
//   collections,
//   moreCategories,
// } from "./navbarNavigation.js";

// export function createCategoryNav() {
//  const linksHTML = jewelleryNavigation
//   .map((category) => {

//     const productTypeLinks =
//       category.productTypes
//         .map(
//           (type) => `
//             <a
//               href="/pages/products.html?category=${category.category}&productType=${type.value}"
//               class="
//                 block
//                 py-2
//                 text-sm
//                 hover:text-[#6B1A2A]
//                 transition
//               "
//             >
//               ${type.label}
//             </a>
//           `
//         )
//         .join("");

//     return `
//       <li class="relative group">

//         <a
//           href="/pages/products.html?category=${category.category}"
//           data-nav="${category.category}"
//           class="
//             text-[#1A1A1A]
//             text-[0.95rem]
//             font-medium
//             relative
//             hover:text-[#6B1A2A]
//             transition-colors
//           "
//         >
//           ${category.label}

//           <span
//             class="
//               absolute
//               bottom-[-4px]
//               left-0
//               w-0
//               h-0.5
//               bg-[#6B1A2A]
//               group-hover:w-full
//               transition-all
//               duration-300
//             "
//           ></span>
//         </a>

//         <div
//           class="
//             absolute
//             top-full
//             left-1/2
//             -translate-x-1/2
//             mt-4
//             w-[420px]
//             bg-white
//             rounded-[28px]
//             shadow-[0_20px_80px_rgba(0,0,0,0.12)]
//             border
//             border-black/5
//             p-6
//             opacity-0
//             invisible
//             group-hover:opacity-100
//             group-hover:visible
//             transition-all
//             duration-300
//             z-50
//           "
//         >

//           <div
//             class="
//               grid
//               grid-cols-[1fr_140px]
//               gap-6
//               items-start
//             "
//           >

//             <div>

//               <p
//                 class="
//                   text-[11px]
//                   uppercase
//                   tracking-[0.25em]
//                   text-black/40
//                   mb-4
//                 "
//               >
//                 Shop By Type
//               </p>

//               ${productTypeLinks}

//               <a
//                 href="/pages/products.html?category=${category.category}"
//                 class="
//                   block
//                   mt-4
//                   pt-4
//                   border-t
//                   border-black/10
//                   text-[#6B1A2A]
//                   font-medium
//                 "
//               >
//                 View All ${category.label}
//               </a>

//             </div>

//             <div>

//               <img
//                 src="${category.image}"
//                 class="
//                   w-full
//                   h-[140px]
//                   object-cover
//                   rounded-2xl
//                 "
//               />

//             </div>

//           </div>

//         </div>

//       </li>
//     `;
//   })
//   .join("");




//     const categoryCardsHTML = [
//   ...jewelleryNavigation,
//   ...moreCategories,
// ]
//   .map(
//     (item) => `
//       <a
//         href="/pages/products.html?category=${
//           item.category || item.slug
//         }"
//         class="
//           group
//           p-4
//           rounded-2xl
//           bg-[#FAF8F5]
//           hover:bg-[#F6EEF0]
//           transition
//         "
//       >

//         <img
//           src="${item.image}"
//           class="
//             w-full
//             h-24
//             object-cover
//             rounded-xl
//             mb-3
//           "
//         >

//         <p class="font-medium">
//           ${item.label}
//         </p>

//       </a>
//     `
//   )
//   .join("");





//     const collectionLinks =
//   collections
//     .map(
//       (collection) => `
//         <a
//           href="/pages/collection.html?slug=${collection.slug}"
//           class="
//             block
//             hover:text-[#6B1A2A]
//             transition
//           "
//         >
//           ${collection.name} Collection
//         </a>
//       `
//     )
//     .join("");

//     const collectionCardsHTML = collections
//   .map(
//     (collection) => `
//       <a
//         href="/pages/collection.html?slug=${collection.slug}"
//         class="group/card"
//       >

//         <div
//           class="
//             overflow-hidden
//             rounded-3xl
//           "
//         >

//           <img
//             src="${collection.image}"
//             class="
//               w-full
//               h-[160px]
//               object-cover
//               group-hover/card:scale-105
//               transition
//               duration-700
//             "
//           />

//         </div>

//         <h4
//           class="
//             mt-4
//             text-xl
//             font-light
//           "
//         >
//           ${collection.name} Collection
//         </h4>

//       </a>
//     `
//   )
//   .join("");

//  return `
//  <div
//   id="categoryNav"
//   class="
//     hidden md:flex
//     items-center
//     justify-center
//     gap-10
//     px-6
//     h-[44px]
//     fixed
//     left-0
//     right-0
//     bg-[#F9F6F2]
//     z-[999]
//     border-b
//     border-black/10
//     transition-[top]
//     duration-300
//   "
// >

//   <ul
//     class="
//       flex
//       items-center
//       justify-center
//       gap-8
//       list-none
//     "
//   >



// <li class="relative group">

//   <button
//     data-nav="all-jewellery"
//     class="
//       text-[#1A1A1A]
//       text-[0.95rem]
//       font-medium
//       hover:text-[#6B1A2A]
//     "
//   >
//     All Jewellery
//   </button>

// <div
//   class="
//     absolute
//     top-full
//     left-[-120px]
//     mt-4
//     w-[1100px]
//     max-w-[90vw]
//     bg-white
//     rounded-[32px]
//     shadow-[0_30px_100px_rgba(0,0,0,0.12)]
//     border
//     border-black/5
//     p-10
//     opacity-0
//     invisible
//     group-hover:opacity-100
//     group-hover:visible
//     transition-all
//     duration-300
//     z-50
//   "
// >

//   <div
//     class="
//       grid
//       grid-cols-[1.8fr_1fr_1fr_1.5fr]
//       gap-10
//     "
//   >

//     <!-- SHOP BY CATEGORY -->

//     <div>

//       <p
//         class="
//           text-[11px]
//           uppercase
//           tracking-[0.3em]
//           text-black/40
//           mb-6
//         "
//       >
//         Shop By Category
//       </p>

//        <div
//   class="
//     grid
//     grid-cols-4
//     gap-4
//   "
// >
//   ${categoryCardsHTML}
// </div>

//     </div>







//     <!-- COLLECTIONS -->

//     <div>

//       <p
//         class="
//           text-[11px]
//           uppercase
//           tracking-[0.3em]
//           text-black/40
//           mb-6
//         "
//       >
//         Collections
//       </p>

//       <div class="space-y-4">

//         ${collectionLinks}

//       </div>




//     </div>

//     <!-- DISCOVER -->

//     <div>

//       <p
//         class="
//           text-[11px]
//           uppercase
//           tracking-[0.3em]
//           text-black/40
//           mb-6
//         "
//       >
//         Discover
//       </p>

//       <div class="space-y-4">

//         <a
//           href="/pages/products.html?tag=best-seller"
//           class="block hover:text-[#6B1A2A]"
//         >
//           Best Sellers
//         </a>

//         <a
//           href="/pages/products.html?tag=new"
//           class="block hover:text-[#6B1A2A]"
//         >
//           New Arrivals
//         </a>

//         <a
//           href="/pages/products.html?tag=gifting"
//           class="block hover:text-[#6B1A2A]"
//         >
//           Gift Guide
//         </a>

//         <a
//           href="/pages/products.html?price=5000"
//           class="block hover:text-[#6B1A2A]"
//         >
//           Under ₹5,000
//         </a>

//       </div>

//     </div>



//   </div>

// </div>

// </li>

// ${linksHTML}



//     <!-- COLLECTIONS MEGA MENU -->
//     <li class="relative group">

//       <button
//         class="
//           text-[#1A1A1A]
//           text-[0.95rem]
//           font-medium
//           hover:text-[#6B1A2A]
//         "
//       >
//         Collections
//       </button>

//       <div
//  class="
//   absolute
//   top-full
//   right-0
//   mt-4
//   w-[1000px]
//   max-w-[90vw]
//   bg-white
//   rounded-[32px]
//   shadow-[0_30px_100px_rgba(0,0,0,0.12)]
//   border
//   border-black/5
//   p-8
//   opacity-0
//   invisible
//   group-hover:opacity-100
//   group-hover:visible
//   transition-all
//   duration-300
//   z-50
// "
// >



//   <div
//   class="
//     grid
//     grid-cols-3
//     gap-6
//   "
// >
//   ${collectionCardsHTML}
// </div>







// </div>

//     </li>

//   </ul>

// </div>
//  `;
// }


















































import {
  jewelleryNavigation,
  collections,
  moreCategories,
} from "./navbarNavigation.js";

export function createCategoryNav() {
 const linksHTML = jewelleryNavigation
  .map((category) => {

    const productTypeLinks =
      category.productTypes
        .map(
          (type) => `
            <a
              href="/pages/products.html?category=${category.category}&productType=${type.value}"
              class="
                block
                py-2
                text-sm
                hover:text-[#6B1A2A]
                transition
              "
            >
              ${type.label}
            </a>
          `
        )
        .join("");

    return `
      <li class="relative group">

        <a
          href="/pages/products.html?category=${category.category}"
          data-nav="${category.category}"
          class="
            text-[#1A1A1A]
            text-[0.95rem]
            font-medium
            relative
            hover:text-[#6B1A2A]
            transition-colors
          "
        >
          ${category.label}

          <span
            class="
              absolute
              bottom-[-4px]
              left-0
              w-0
              h-0.5
              bg-[#6B1A2A]
              group-hover:w-full
              transition-all
              duration-300
            "
          ></span>
        </a>

        <div
          class="
            absolute
            top-full
            left-1/2
            -translate-x-1/2
            mt-4
            w-[420px]
            bg-white
            rounded-[28px]
            shadow-[0_20px_80px_rgba(0,0,0,0.12)]
            border
            border-black/5
            p-6
            opacity-0
            invisible
            group-hover:opacity-100
            group-hover:visible
            transition-all
            duration-300
            z-50
          "
        >

          <div
            class="
              grid
              grid-cols-[1fr_140px]
              gap-6
              items-start
            "
          >

            <div>

              <p
                class="
                  text-[11px]
                  uppercase
                  tracking-[0.25em]
                  text-black/40
                  mb-4
                "
              >
                Shop By Type
              </p>

              ${productTypeLinks}

              <a
                href="/pages/products.html?category=${category.category}"
                class="
                  block
                  mt-4
                  pt-4
                  border-t
                  border-black/10
                  text-[#6B1A2A]
                  font-medium
                "
              >
                View All ${category.label}
              </a>

            </div>

            <div>

              <img
                src="${category.image}"
                class="
                  w-full
                  h-[140px]
                  object-cover
                  rounded-2xl
                "
              />

            </div>

          </div>

        </div>

      </li>
    `;
  })
  .join("");



const categoryCardsHTML = [...jewelleryNavigation, ...moreCategories]
  .map(
    (item) => `
      <a
        href="/pages/products.html?category=${item.category || item.slug}"
        class="
          group
          p-2
          rounded-xl
          bg-[#FAF8F5]
          hover:bg-[#F6EEF0]
          transition
        "
      >

        <img
          src="${item.image}"
          class="
            w-full
            h-[110px]
            object-cover
            rounded-xl
          "
        >

        <p
          class="
            mt-2
            text-center
            font-medium
          "
        >
          ${item.label}
        </p>

      </a>
    `
  )
  .join("");





    const collectionLinks =
  collections
    .map(
      (collection) => `
        <a
          href="/pages/collection.html?slug=${collection.slug}"
          class="
            block
            hover:text-[#6B1A2A]
            transition
          "
        >
          ${collection.name} Collection
        </a>
      `
    )
    .join("");

    const collectionCardsHTML = collections
  .map(
    (collection) => `
      <a
        href="/pages/collection.html?slug=${collection.slug}"
        class="group/card"
      >

        <div
          class="
            overflow-hidden
            rounded-3xl
          "
        >

          <img
            src="${collection.image}"
            class="
              w-full
              h-[160px]
              object-cover
              group-hover/card:scale-105
              transition
              duration-700
            "
          />

        </div>

        <h4
          class="
            mt-4
            text-xl
            font-light
          "
        >
          ${collection.name} Collection
        </h4>

      </a>
    `
  )
  .join("");

 return `
 <div
  id="categoryNav"
  class="
    hidden md:flex
    items-center
    justify-center
    gap-10
    px-6
    h-[44px]
    fixed
    left-0
    right-0
    bg-[#F9F6F2]
    z-[999]
    border-b
    border-black/10
    transition-[top]
    duration-300
  "
>

  <ul
    class="
      flex
      items-center
      justify-center
      gap-8
      list-none
    "
  >



<li class="relative group">

  <button
    data-nav="all-jewellery"
    class="
      text-[#1A1A1A]
      text-[0.95rem]
      font-medium
      hover:text-[#6B1A2A]
    "
  >
    All Jewellery
  </button>

  <div
   class="
  fixed
  top-[100px]
  left-1/2
  -translate-x-1/2
  w-[1280px]
  max-w-[95vw]
  bg-white
  rounded-[24px]
  shadow-[0_30px_100px_rgba(0,0,0,0.12)]
  border
  border-black/5
  p-6
  opacity-0
  invisible
  group-hover:opacity-100
  group-hover:visible
  transition-all
  duration-300
  z-[9999]
"
  >

    <div class="flex flex-col gap-6">

      <!-- SHOP BY CATEGORY -->

      <div>

        <p
          class="
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-black/40
            mb-4
          "
        >
          Shop By Category
        </p>

        <div
          class="
            grid
            grid-cols-4
            gap-4
          "
        >
          ${categoryCardsHTML}
        </div>

      </div>

      <!-- COLLECTIONS + DISCOVER -->

      <div
        class="
          grid
          grid-cols-2
          gap-10
        "
      >

        <div>

          <p
            class="
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-black/40
              mb-4
            "
          >
            Collections
          </p>

          <div
            class="
              grid
              grid-cols-2
              gap-y-4
              gap-x-8
            "
          >
            ${collectionLinks}
          </div>

        </div>

        <div>

          <p
            class="
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-black/40
              mb-4
            "
          >
            Discover
          </p>

          <div
            class="
              grid
              grid-cols-2
              gap-y-4
              gap-x-8
            "
          >

            <a
              href="/pages/products.html?tag=best-seller"
              class="hover:text-[#6B1A2A]"
            >
              Best Sellers
            </a>

            <a
              href="/pages/products.html?tag=new"
              class="hover:text-[#6B1A2A]"
            >
              New Arrivals
            </a>

            <a
              href="/pages/products.html?tag=gifting"
              class="hover:text-[#6B1A2A]"
            >
              Gift Guide
            </a>

            <a
              href="/pages/products.html?price=5000"
              class="hover:text-[#6B1A2A]"
            >
              Under ₹5,000
            </a>

          </div>

        </div>

      </div>





    </div>

  </div>

</li>

${linksHTML}



    <!-- COLLECTIONS MEGA MENU -->
    <li class="relative group">

      <button
        class="
          text-[#1A1A1A]
          text-[0.95rem]
          font-medium
          hover:text-[#6B1A2A]
        "
      >
        Collections
      </button>

      <div
 class="
  absolute
  top-full
  right-0
  mt-4
  w-[1000px]
  max-w-[90vw]
  bg-white
  rounded-[32px]
  shadow-[0_30px_100px_rgba(0,0,0,0.12)]
  border
  border-black/5
  p-8
  opacity-0
  invisible
  group-hover:opacity-100
  group-hover:visible
  transition-all
  duration-300
  z-50
"
>



  <div
  class="
    grid
    grid-cols-3
    gap-6
  "
>
  ${collectionCardsHTML}
</div>







</div>

    </li>

  </ul>

</div>
 `;
}





































































































