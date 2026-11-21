/**
 * Portfolio interactions: navigation, section highlighting,
 * contact validation, and small UI helpers.
 */

const CONTACT_EMAIL = "biruktaye01@gmail.com";

const NAME_PATTERN = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ' -]{1,79}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function setYear() {
  const yearEl = qs("#year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function setupMobileNav() {
  const toggle = qs(".nav-toggle");
  const nav = qs("#site-nav");
  if (!toggle || !nav) {
    return;
  }

  const closeNav = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  qsa(".nav-link", nav).forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
}

function setupSmoothScroll() {
  qsa('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") {
        return;
      }

      const target = qs(id);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });
}

function setupActiveNav() {
  const sections = qsa("main section[id]");
  const links = qsa(".nav-link");
  if (!sections.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const id = entry.target.id;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
  );

  sections.forEach((section) => observer.observe(section));
}

function fieldError(input, message) {
  const field = input.closest(".field");
  const errorEl = qs(`#${input.id}-error`);
  if (field) {
    field.classList.toggle("is-invalid", Boolean(message));
  }
  if (errorEl) {
    errorEl.textContent = message || "";
  }
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

function validateName(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "Please enter your name.";
  }
  if (trimmed.length < 2) {
    return "Name must be at least 2 characters.";
  }
  if (!NAME_PATTERN.test(trimmed)) {
    return "Use letters, spaces, hyphens, or apostrophes only.";
  }
  return "";
}

function validateEmail(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "Please enter your email address.";
  }
  if (!EMAIL_PATTERN.test(trimmed)) {
    return "Enter a valid email such as name@example.com.";
  }
  return "";
}

function validateSubject(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "Please add a subject.";
  }
  if (trimmed.length < 3) {
    return "Subject must be at least 3 characters.";
  }
  return "";
}

function validateMessage(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "Please write a message.";
  }
  if (trimmed.length < 20) {
    return "Message must be at least 20 characters.";
  }
  return "";
}

const validators = {
  name: validateName,
  email: validateEmail,
  subject: validateSubject,
  message: validateMessage,
};

function validateForm(form) {
  let firstInvalid = null;
  const values = {};

  Object.keys(validators).forEach((name) => {
    const input = form.elements[name];
    const error = validators[name](input.value);
    fieldError(input, error);
    values[name] = input.value.trim();
    if (error && !firstInvalid) {
      firstInvalid = input;
    }
  });

  return { valid: !firstInvalid, firstInvalid, values };
}

function buildMailto({ name, email, subject, message }) {
  const body = [
    message,
    "",
    "---",
    `From: ${name}`,
    `Email: ${email}`,
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function setupContactForm() {
  const form = qs("#contact-form");
  const status = qs("#form-status");
  if (!form || !status) {
    return;
  }

  Object.keys(validators).forEach((name) => {
    const input = form.elements[name];
    input.addEventListener("blur", () => {
      fieldError(input, validators[name](input.value));
    });
    input.addEventListener("input", () => {
      if (input.closest(".field")?.classList.contains("is-invalid")) {
        fieldError(input, validators[name](input.value));
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";
    status.classList.remove("is-error");

    const result = validateForm(form);
    if (!result.valid) {
      status.textContent = "Please fix the highlighted fields before continuing.";
      status.classList.add("is-error");
      result.firstInvalid.focus();
      return;
    }

    const mailto = buildMailto(result.values);
    status.textContent =
      "Your email app should open with this message ready to send. If nothing opens, email biruktaye01@gmail.com directly.";
    window.location.href = mailto;
  });
}

function init() {
  setYear();
  setupMobileNav();
  setupSmoothScroll();
  setupActiveNav();
  setupContactForm();
}

document.addEventListener("DOMContentLoaded", init);
