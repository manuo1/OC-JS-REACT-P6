import { allowToCloseWithEscapeKey, allowToCloseIfClicOutside, keepFocusInElement } from "../utils/utils.js";

function initSortDropdown() {
  const dropdown = document.getElementById("sort-dropdown");
  const sortButton = document.getElementById("sort-button");
  const sortList = document.getElementById("sort-list");

  function openDropdown() {
    dropdown.classList.add("is-open");
    sortButton.setAttribute("aria-expanded", "true");
    sortList.setAttribute("aria-hidden", "false");
    allowToCloseWithEscapeKey(closeDropdown);
    allowToCloseIfClicOutside(dropdown, closeDropdown);
    keepFocusInElement(sortList);
    document.getElementById("first-sort-option").focus();
  }

  function closeDropdown() {
    dropdown.classList.remove("is-open");
    sortButton.setAttribute("aria-expanded", "false");
    sortList.setAttribute("aria-hidden", "true");
  }

  // ==================== Event Listeners ====================

  dropdown.addEventListener("click", (e) => {
    e.preventDefault();
    const isOpen = dropdown.classList.contains("is-open");
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });
}

export { initSortDropdown };
