// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Reveal observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.25
});

// Typing Effect
document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});

const words = [
    "a Web Developer.",
    "a Software Engineer.",
    "an IT Professional.",
    "a Problem Solver.",
    "always learning."
];

const typedText = document.getElementById("typed-text");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingSpeed = 60;
const deletingSpeed = 50;
const pauseAfterTyping = 1200;
const pauseAfterDeleting = 500;

function type() {
    const currentWord = words[wordIndex];

    if (!deleting) {
        typedText.textContent = currentWord.substring(0, charIndex++);
    } else {
        typedText.textContent = currentWord.substring(0, charIndex--);
    }

    let timeout = deleting ? deletingSpeed : typingSpeed;

    if (!deleting && charIndex > currentWord.length) {
        deleting = true;
        timeout = pauseAfterTyping;
    } else if (deleting && charIndex < 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timeout = pauseAfterDeleting;
    }

    setTimeout(type, timeout);
}

type();


// Navigation observer
const navItems = document.querySelectorAll("#sidebar li");

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navItems.forEach(item => item.classList.remove("active"));

        const activeItem = document.querySelector(
            `#sidebar li[data-section="${entry.target.id}"]`
        );

        if (activeItem) {
            activeItem.classList.add("active");
        }
    });
}, {
    rootMargin: "-40% 0px -40% 0px",
    threshold: 0
});

document
    .querySelectorAll("section[id]")
    .forEach(section => navObserver.observe(section));
