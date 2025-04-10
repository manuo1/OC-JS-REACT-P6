import { closeModalWithEscapeKey, keepFocusInModal, pageScrollBarIsActive } from "../utils/utils.js";

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

function openModal() {
  form.reset();
  displayModal(true);
  pageScrollBarIsActive(false);
  setPageAriaHiddenExceptModal(true);
  keepFocusInModal(modal);
  closeModalWithEscapeKey(modal, closeModal);
}

function closeModal() {
  displayModal(false);
  pageScrollBarIsActive(true);
  setPageAriaHiddenExceptModal(false);
}

// Submit form
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  console.log(JSON.stringify(Object.fromEntries(formData.entries())));
  closeModal();
});
export { openModal, closeModal };
