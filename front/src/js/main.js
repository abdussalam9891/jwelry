


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));


// Heading reveal
const headingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("heading-revealed");
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll(".section-heading").forEach(el =>
  headingObserver.observe(el)
);



















document.addEventListener("click", (e) => {
  const btn = e.target.closest(".wishlist-btn");
  if (!btn) return;

  btn.classList.toggle("active");

  const id = btn.dataset.id;

  // 🔥 optional: store in localStorage
  let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  if (wishlist.includes(id)) {
    wishlist = wishlist.filter((item) => item !== id);
  } else {
    wishlist.push(id);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
});
