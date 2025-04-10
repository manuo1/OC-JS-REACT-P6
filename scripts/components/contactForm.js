import { pageScrollBarIsActive } from "../utils/utils.js";

const modal = document.getElementById("contact-modal");
const overlay = document.getElementById("modal-overlay");
const form = document.forms["contact-photograph"];

function displayModal(show) {
  const display = show ? "flex" : "none";
  modal.style.display = display;
  overlay.style.display = display;
}

function setPageAriaHiddenExceptModal(hidden) {
  const value = hidden ? "true" : "false";
  document.getElementById("header").setAttribute("aria-hidden", value);
  document.getElementById("main").setAttribute("aria-hidden", value);
  modal.setAttribute("aria-hidden", !value);
}

function acceptEscapeToCloseModal() {
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

function openModal() {
  form.reset();
  displayModal(true);
  pageScrollBarIsActive(false);
  setPageAriaHiddenExceptModal(true);
  keepFocusInModal();
  acceptEscapeToCloseModal();
}

function closeModal() {
  displayModal(false);
  pageScrollBarIsActive(true);
  setPageAriaHiddenExceptModal(false);
}

// Prevent exit modal
function keepFocusInModal() {
  document.getElementById("modal-close-icon").focus();
  document.addEventListener("keydown", (key) => {
    if (key.key !== "Tab") return;

    const focusables = modal.querySelectorAll("button");
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    // Shift key returns the tab order
    if (key.shiftKey && document.activeElement === first) {
      key.preventDefault();
      last.focus();
    } else if (!key.shiftKey && document.activeElement === last) {
      key.preventDefault();
      first.focus();
    }
  });
}

// Submit form
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  console.log(JSON.stringify(Object.fromEntries(formData.entries())));
  closeModal();
});
export { openModal, closeModal };
