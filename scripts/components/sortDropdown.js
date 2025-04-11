import { allowToCloseWithEscapeKey, allowToCloseIfClicOutside, keepFocusInElement } from "../utils/utils.js";

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
      const text = option.textContent;
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
  function updateDropdownValues(selectedElement) {
    const newOptions = sortOptionsBySelectedValue(getCurrentOptions(), selectedElement.getAttribute("data-value"));
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
    document.getElementById("first-sort-option").focus();
  }

  function closeDropdown() {
    dropdown.classList.remove("is-open");
    sortButton.setAttribute("aria-expanded", "false");
    sortList.setAttribute("aria-hidden", "true");
  }

  // ==================== Event Listeners ====================

  sortOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      if (dropdown.classList.contains("is-open")) {
        closeDropdown();
        updateDropdownValues(e.target);
      } else {
        openDropdown();
      }
    });
  });
}

export { initSortDropdown };
