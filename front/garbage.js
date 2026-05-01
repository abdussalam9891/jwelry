//   // const wishlistBtn = document.getElementById("wishlistBtn");

//   // wishlistBtn?.addEventListener("click", async (e) => {
//   //   e.preventDefault();

//   //   let token = localStorage.getItem("token");

//   // if (!token) {

//   //    localStorage.setItem("redirectAfterLogin", "/front/pages/wishlist.html");

//   //   await openAuthModal();


//   //     return;
//   // }

//   // window.location.href = "/front/pages/wishlist.html";
//   // });







// //   const cartBtn = document.getElementById("cartBtn");

// // cartBtn?.addEventListener("click", async (e) => {
// //   e.preventDefault();

// //   const token = localStorage.getItem("token");

// //   if (!token) {
// //     // save redirect intent
// //     localStorage.setItem("redirectAfterLogin", "/front/pages/cart.html");

// //     await openAuthModal();
// //     return;
// //   }

// //   window.location.href = "/front/pages/cart.html";
// // });



































//  <!-- RIGHT ICONS -->
//     <div class="flex items-center gap-2">
//       <!-- Wishlist -->
//     <button
//   id="wishlistBtn"
//   class="relative  flex items-center gap-2 text-sm p-2 hover:bg-black/5 rounded-lg"
// >
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke-width="1.5"
//     stroke="currentColor"
//     class="w-7 h-7 text-[#6B1A2A]"
//   >
//     <path
//       stroke-linecap="round"
//       stroke-linejoin="round"
//       d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.74 0-3.27.86-4 2.09-.73-1.23-2.26-2.09-4-2.09-2.761 0-5 2.015-5 4.5 0 6 9 11.25 9 11.25s9-5.25 9-11.25Z"
//     />
//   </svg>
//    <span
//     id="wishlistCount"
//     class="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[#6B1A2A] text-white hidden"
//   >
//     0
//   </span>

// </button>

//       <!-- Cart -->
//       <button id="cartBtn" class="p-2 hover:bg-black/5 rounded-lg relative">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke-width="1.5"
//           stroke="currentColor"
//           class="w-8 h-8 text-[#6B1A2A]"
//         >
//           <path
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             d="M2.25 3h1.386a1.125 1.125 0 0 1 1.11.843l.383 1.437m0 0L6.75 14.25h10.5l1.621-6.072a1.125 1.125 0 0 0-1.088-1.428H5.13m0 0L4.5 3m2.25 11.25a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m9 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0"
//           />
//         </svg>
//       </button>

//       <!-- Mobile Search Icon -->
// <button id="mobileSearchBtn" class="md:hidden p-2 hover:bg-black/5 rounded-lg">
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#6B1A2A]">
//     <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.65 5.65a7.5 7.5 0 0 0 10.6 10.6Z"/>
//   </svg>
// </button>




// <!-- USER DROPDOWN -->
// <div class="relative hidden md:block">
//   <button data-user="trigger" class="p-2 hover:bg-black/5 rounded-lg">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke-width="1.5"
//       stroke="currentColor"
//       class="w-8 h-8 text-[#6B1A2A]"
//     >
//       <path
//         stroke-linecap="round"
//         stroke-linejoin="round"
//         d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0"
//       />
//     </svg>
//   </button>
//   <div
//     id="userDropdown"
//     class="absolute right-0 mt-2 w-40 bg-white border border-black/10 rounded-lg shadow-lg opacity-0 pointer-events-none transition-all duration-200 z-[1100]"
//   >
//     <a href="#" class="loginBtn  block px-4 py-2 text-sm hover:bg-black/5">Login/Signup</a>

//   </div>
