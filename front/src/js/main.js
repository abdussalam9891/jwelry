


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














 