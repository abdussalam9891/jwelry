// export function initNavbarScroll() {
//   const mainNav =
//     document.getElementById(
//       "mainNav"
//     );

//   const categoryNav =
//     document.getElementById(
//       "categoryNav"
//     );

//   const announcementBar =
//     document.getElementById(
//       "announcementBar"
//     );

//   if (
//     !mainNav ||
//     !categoryNav
//   ) {
//     console.warn(
//       "[Navbar] initNavbarScroll: element not found",
//       {
//         mainNav,
//         categoryNav,
//       }
//     );

//     return;
//   }

//   const announcementHeight =
//     announcementBar
//       ?.offsetHeight || 0;

//   const navbarHeight =
//     mainNav.offsetHeight;

//   const ROW1_H =
//     announcementHeight +
//     navbarHeight;

//   // Initial position
//   categoryNav.style.top =
//     `${ROW1_H}px`;

//   let lastScrollY =
//     window.scrollY;

//   let isHidden = false;

//   function handleScroll() {
//     if (
//       document.body.classList.contains(
//         "overflow-hidden"
//       )
//     ) {
//       return;
//     }

//     const currentScrollY =
//       window.scrollY;

//     const scrollDiff =
//       currentScrollY -
//       lastScrollY;

//     if (
//       Math.abs(
//         scrollDiff
//       ) < 5
//     ) {
//       return;
//     }

//     // Scroll Down
//     if (
//       scrollDiff > 0 &&
//       currentScrollY > 80 &&
//       !isHidden
//     ) {
//       mainNav.style.transform =
//         "translateY(-100%)";

//       // Category nav moves just below announcement bar
//       categoryNav.style.top =
//         `${announcementHeight}px`;

//       isHidden = true;
//     }

//     // Scroll Up
//     else if (
//       scrollDiff < 0 &&
//       isHidden
//     ) {
//       mainNav.style.transform =
//         "translateY(0)";

//       categoryNav.style.top =
//         `${ROW1_H}px`;

//       isHidden = false;
//     }

//     lastScrollY =
//       currentScrollY;
//   }

//   window.addEventListener(
//     "scroll",
//     handleScroll,
//     {
//       passive: true,
//     }
//   );
// }






export function initNavbarScroll() {
  const mainNav =
    document.getElementById(
      "mainNav"
    );

  const categoryNav =
    document.getElementById(
      "categoryNav"
    );

  const announcementBar =
    document.getElementById(
      "announcementBar"
    );

  if (
    !mainNav ||
    !categoryNav
  ) {
    console.warn(
      "[Navbar] initNavbarScroll: element not found",
      {
        mainNav,
        categoryNav,
      }
    );

    return;
  }

  const announcementHeight =
    announcementBar
      ?.offsetHeight || 0;

  const navbarHeight =
    mainNav.offsetHeight;

  const ROW1_H =
    announcementHeight +
    navbarHeight;

  // Initial position
  categoryNav.style.top =
    `${ROW1_H}px`;

  let lastScrollY =
    window.scrollY;

  let isHidden = false;

  function handleScroll() {
    if (
      document.body.classList.contains(
        "overflow-hidden"
      )
    ) {
      return;
    }

    const currentScrollY =
      window.scrollY;

    const scrollDiff =
      currentScrollY -
      lastScrollY;

    if (
      Math.abs(
        scrollDiff
      ) < 5
    ) {
      return;
    }

    // Scroll Down
    if (
      scrollDiff > 0 &&
      currentScrollY > 80 &&
      !isHidden
    ) {
      mainNav.style.transform =
        "translateY(-100%)";

      // Category nav moves just below announcement bar
      categoryNav.style.top =
        `${announcementHeight}px`;

      isHidden = true;
    }

    // Scroll Up
    else if (
      scrollDiff < 0 &&
      isHidden
    ) {
      mainNav.style.transform =
        "translateY(0)";

      categoryNav.style.top =
        `${ROW1_H}px`;

      isHidden = false;
    }

    lastScrollY =
      currentScrollY;
  }

  window.addEventListener(
    "scroll",
    handleScroll,
    {
      passive: true,
    }
  );
}












