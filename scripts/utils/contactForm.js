const modal = document.getElementById("contact-modal");
const overlay = document.getElementById("modal-overlay");
const form = document.forms["contact-photograph"];

function toggleModal(display) {
  modal.style.display = display;
  overlay.style.display = display;
}

function displayModal() {
  form.reset();
  toggleModal("flex");
}

function closeModal() {
  toggleModal("none");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  console.log(form);
  console.log(JSON.stringify(Object.fromEntries(formData.entries())));
  closeModal();
});

export { displayModal, closeModal };
