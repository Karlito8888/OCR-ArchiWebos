// src/utils/layout.js

function applyUserLayout(loggedIn) {
  const gallery = document.querySelector(".gallery");
  const categoriesContainer = document.querySelector(".categories");
  const loginButton = document.querySelector(".login-button");
  const headerContainer = document.querySelector(".header-container");
  const editModeHeader = document.querySelector("header .edit-mode");
  const modifyEditMode = document.querySelector(".modify-edit-mode");

  editModeHeader.style.height = loggedIn ? "59px" : "0";
  headerContainer.style.margin = loggedIn
    ? "38px auto 92px"
    : "50px auto 139px";
  loginButton.textContent = loggedIn ? "logout" : "login";
  loginButton.href = loggedIn ? "#" : "login.html";
  modifyEditMode.style.display = loggedIn ? "block" : "none";
  categoriesContainer.style.display = loggedIn ? "none" : "flex";
  gallery.style.marginTop = loggedIn ? "92px" : "0";
}

export { applyUserLayout };
