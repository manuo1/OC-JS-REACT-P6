import {
  allowToCloseWithEscapeKey,
  allowToCloseIfClicOutside,
  keepFocusInElement,
  pageScrollBarIsActive,
  getNextIndex,
  getPreviousIndex,
} from "../utils/utils.js";
import { updateMediaListDisplay } from "../services/photographer.js";

function initSortDropdown() {
  const dropdown = document.getElementById("sort-dropdown");
  const sortButton = document.getElementById("sort-button");
  const sortList = document.getElementById("sort-list");
  const sortOptions = document.querySelectorAll(".sort-container button");

  // List all data-value and textContent from buttons in dropdown
  function getCurrentOptions() {
    const curentOptions = [];
    sortOptions.forEach((option) => {
      const value = option.getAttribute("data-value");
      const text = option.textContent.trim();
      curentOptions.push({ value, text });
    });
    return curentOptions;
  }

  // Change order of options to place selected item at the top of the list
  function sortOptionsBySelectedValue(curentOptions, selectedDataValue) {
    const selectedOptionIndex = curentOptions.findIndex((option) => option.value === selectedDataValue);
    const selectedOption = curentOptions[selectedOptionIndex];
    curentOptions.splice(selectedOptionIndex, 1);
    return [selectedOption, ...curentOptions];
  }

  // Update data-value and textContent of sort-button and list option
  // to match the user's selected option
  function updateDropdownValues(selectedDataValue) {
    const newOptions = sortOptionsBySelectedValue(getCurrentOptions(), selectedDataValue);
    sortOptions.forEach((option, index) => {
      option.innerText = newOptions[index].text;
      option.setAttribute("data-value", newOptions[index].value);
    });
  }

  // ==================== open and Close ====================

  function openDropdown() {
    dropdown.classList.add("is-open");
    sortButton.setAttribute("aria-expanded", "true");
    sortList.setAttribute("aria-hidden", "false");
    allowToCloseWithEscapeKey(closeDropdown);
    allowToCloseIfClicOutside(dropdown, closeDropdown);
    keepFocusInElement(sortList);
    pageScrollBarIsActive(false);
    document.getElementById("first-sort-option").focus();
  }

  function closeDropdown() {
    dropdown.classList.remove("is-open");
    sortButton.setAttribute("aria-expanded", "false");
    sortList.setAttribute("aria-hidden", "true");
    pageScrollBarIsActive(true);
  }

  // ==================== Event Listeners ====================

  sortOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      if (dropdown.classList.contains("is-open")) {
        const selectedDataValue = e.target.getAttribute("data-value");
        closeDropdown();
        updateDropdownValues(selectedDataValue);
        updateMediaListDisplay();
      } else {
        openDropdown();
      }
    });
  });

  // Up and down keys navigation
  sortList.addEventListener("keydown", (e) => {
    const focusableOptions = Array.from(sortList.querySelectorAll(".sort-dropdown__button-option"));
    const currentOptionIndex = focusableOptions.findIndex((el) => el === document.activeElement);
    const focusableOptionsLength = focusableOptions.length;
    if (e.key === "ArrowDown") {
      focusableOptions[getNextIndex(currentOptionIndex, focusableOptionsLength - 1)].focus();
    } else if (e.key === "ArrowUp") {
      focusableOptions[getPreviousIndex(currentOptionIndex, focusableOptionsLength - 1)].focus();
    }
  });
}

export { initSortDropdown };
