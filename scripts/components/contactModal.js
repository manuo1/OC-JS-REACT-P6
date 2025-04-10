import {
  allowToCloseModalWithEscapeKey,
  keepFocusInElement,
  pageScrollBarIsActive,
  setAriaVisible,
  displayPageOverlay,
} from "../utils/utils.js";

function initContactModal() {
  const header = document.getElementById("header");
  const main = document.getElementById("main");
  const contactModal = document.getElementById("contact-modal");
  const form = document.forms["contact-photograph"];

  // ==================== Open and Close Contact Modal ====================

  function openContactModal() {
    form.reset();
    displayPageOverlay(true);
    pageScrollBarIsActive(false);
    setAriaVisible([contactModal]);
    keepFocusInElement(contactModal);
    allowToCloseModalWithEscapeKey(contactModal, closeContactModal);
    contactModal.style.display = "flex";
    document.getElementById("modal-close-icon").focus();
  }

  function closeContactModal() {
    displayPageOverlay(false);
    pageScrollBarIsActive(true);
    setAriaVisible([header, main]);
    contactModal.style.display = "none";
  }

  function postData(formData) {
    console.log(JSON.stringify(Object.fromEntries(formData.entries())));
  }

  // ==================== Event Listeners ====================

  // Open Contact Modal
  document.getElementById("contact_button").addEventListener("click", openContactModal);

  // Close Contact Modal
  document.getElementById("modal-close-icon").addEventListener("click", closeContactModal);

  // Submit form
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    postData(formData);
    closeContactModal();
  });
}
export { initContactModal };
