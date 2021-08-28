"use strict";
const themeBtn = document.querySelector(".theme-toggle");
const input = document.querySelector("#input");
const header = document.querySelector(".header-dark");
if (!localStorage.theme) localStorage.setItem("theme", true);
let c = JSON.parse(localStorage.theme);
if (!c) lightTheme();

themeBtn.addEventListener("click", () => toggleChange());
// function
function toggleChange() {
  c ? (c = false) : (c = true);
  c ? darkTheme() : lightTheme();
}

function darkTheme() {
  themeBtn.children[0].src = "./images/icon-sun.svg";
  themeBtn.style.transform = "rotate(0deg)";
  document.body.classList.replace("bg-light", "bg-dark");
  header.classList.replace("header-light", "header-dark");
  document
    .querySelector(".input-check")
    .classList.replace("app-light", "app-dark");
  input.classList.replace("app-light", "app-dark");
  document
    .querySelectorAll(".check")
    .forEach((el1) => el1.classList.replace("border-light", "border-dark"));
  document.querySelector(".body").classList.replace("app-light", "app-dark");
  document
    .querySelectorAll(".list-item")
    .forEach((el2) => el2.classList.replace("bb-light", "bb-dark"));
  document.querySelector(".nav").classList.replace("app-light", "app-dark");
  document
    .querySelector(".attribution")
    .classList.replace("app-light", "app-dark");
  document
    .querySelector(".checkFake")
    .classList.replace("border-light", "border-dark");
  localStorage.theme = JSON.stringify(c);
}

function lightTheme() {
  themeBtn.children[0].src = "./images/icon-moon.svg";
  themeBtn.style.transform = "rotate(360deg)";
  document.body.classList.replace("bg-dark", "bg-light");
  header.classList.replace("header-dark", "header-light");
  document
    .querySelector(".input-check")
    .classList.replace("app-dark", "app-light");
  input.classList.replace("app-dark", "app-light");
  document
    .querySelectorAll(".check")
    .forEach((el1) => el1.classList.replace("border-dark", "border-light"));
  document.querySelector(".body").classList.replace("app-dark", "app-light");
  document
    .querySelectorAll(".list-item")
    .forEach((el2) => el2.classList.replace("bb-dark", "bb-light"));
  document.querySelector(".nav").classList.replace("app-dark", "app-light");
  document
    .querySelector(".attribution")
    .classList.replace("app-dark", "app-light");
  document
    .querySelector(".checkFake")
    .classList.replace("border-dark", "border-light");
  localStorage.theme = JSON.stringify(c);
}
