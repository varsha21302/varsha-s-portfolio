// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeIn');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-observe]').forEach(section => {
  observer.observe(section);
});

// Form submission handling


// Typing roles animation
const roles = [
  "Web Developer! ",
  "UI/UX Designer! ",
  "AI Enthusiast! ",
  "Problem Solver! "
];

let i = 0;
let j = 0;
let isDeleting = false;

function typeRole() {
  let currentRole = roles[i];
  document.getElementById("role").textContent = currentRole.substring(0, j);

  if (!isDeleting) {
    j++;
  } else {
    j--;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && j === currentRole.length) {
    speed = 600;
    isDeleting = true;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % roles.length;
    speed = 300;
  }

  setTimeout(typeRole, speed);
}

typeRole();

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("show");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });

  document.addEventListener("click", (e) => {
    const isClickInsideMenu = navLinks.contains(e.target);
    const isClickOnButton = menuBtn.contains(e.target);

    if (!isClickInsideMenu && !isClickOnButton) {
      navLinks.classList.remove("show");
    }
  });
}

// Active link scroll highlight
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
});

// Dark mode toggle
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });
}

// EmailJS form handling
emailjs.init("Bf5Ev0czwsSSmb__6");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form"); // ✅ same selector
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      
      
      emailjs.sendForm(
        "service_r8r8qfj",
        "template_ywdi33s",
        this
      ).then(() => {
        alert("Message sent successfully!");
        this.reset();
      }).catch((error) => {
        console.error(error);
        alert("Failed to send message");
      });
    });
  } else {
    console.error("contact-form element not found in DOM");
  }
});