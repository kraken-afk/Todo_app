"use strict";

/* Base */
const list = document.querySelector(".list");
const item = document.querySelector(".input-wrapper");
const checkBtn = document.querySelectorAll(".check");
const sum = document.querySelector("#counter");
const nav = document.querySelectorAll(".nav span");
const clearComplete = document.querySelector("#clear");

if (!localStorage.mytodo) createDB();
let database = JSON.parse(localStorage.getItem("mytodo"));
render();

document.addEventListener("click", (e) => {
  if (e.target.id === "ch1") {
    e.target.classList.toggle("checked");
    e.target.parentNode.parentNode.classList.toggle("line");
    if (e.target.classList.contains("checked")) {
      let index = new Number();
      const item = database.find((item, i) => {
        index = i;
        return item.name === e.target.dataset.text;
      });
      item.check = true;
      database.splice(index, 1, item);
      post();
    } else {
      let index = new Number();
      const item = database.find((item, i) => {
        index = i;
        return item.name === e.target.dataset.text;
      });
      item.check = false;
      database.splice(index, 1, item);
      post();
    }
  }

  if (e.target.classList.contains("cross")) {
    let index = 0;
    const element = database.find((it, i) => {
      index = i;
      return (
        it.name === e.target.parentNode.firstChild.children[0].dataset.text
      );
    });
    database.splice(index, 1);
    clear();
    render();
    if (list.childElementCount === 0) {
      list.innerHTML =
        '<li class="empty" style="font-size: clamp(0.8rem, 2vw, 1rem);">' +
        "wow empty (∪.∪ )...zzZZ" +
        "</li>";
    }
    post();
  }
});

input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    if (!input.value) {
      return;
    } else {
      const currentData = {
        name: document.querySelector("#input").value,
        check: false,
      };

      database.push(currentData);
      const element = database.map((e) => getLiFragment(e));
      clear();
      element.forEach((e) => list.append(e));
      post();
      document.querySelector("#input").value = new String();
    }
  } else {
    return;
  }
});

item.addEventListener("dragstart", () => item.classList.add("dragging"));
list.addEventListener("dragover", (e) => e.preventDefault());
item.addEventListener("dragend", () => item.classList.remove("dragging"));
list.addEventListener("drop", () => {
  if (!input.value) {
    return;
  } else {
    const currentData = {
      name: document.querySelector("#input").value,
      check: false,
    };

    database.push(currentData);
    const element = database.map((e) => getLiFragment(e));
    clear();
    element.forEach((e) => list.append(e));
    post();
    document.querySelector("#input").value = new String();
  }
});

nav.forEach((e) => {
  e.addEventListener("click", () => {
    nav.forEach((act) => act.classList.remove("act"));
    e.classList.add("act");

    if (e.classList.contains("all")) {
      render();
    } else if (e.classList.contains("uncompleted")) {
      let unc = database.filter((e) => {
        return e.check === false;
      });
      clear();
      if (!unc.length) {
        list.innerHTML =
          '<li class="empty" style="font-size: clamp(0.8rem, 2vw, 1rem);">' +
          "wow empty (∪.∪ )...zzZZ" +
          "</li>";
      } else {
        unc.forEach((e) => {
          list.append(getLiFragment(e));
        });
      }
    } else {
      let comp = database.filter((e) => {
        return e.check === true;
      });
      clear();
      if (!comp.length) {
        list.innerHTML =
          '<li class="empty" style="font-size: clamp(0.8rem, 2vw, 1rem);">' +
          "wow empty (∪.∪ )...zzZZ" +
          "</li>";
      } else {
        comp.forEach((e) => {
          list.append(getLiFragment(e));
        });
      }
    }
  });
});

clearComplete.addEventListener("click", () => {
  database = database.filter((e) => e.check === false);
  render();
  post();
});

// function

function createDB() {
  localStorage.setItem("mytodo", "[]");
}

function post() {
  let session = new Array();
  database.forEach((e) => session.push(e));
  localStorage.mytodo = JSON.stringify(session);
  counter.textContent = database.length;
}

function render() {
  if (database[0] == undefined) {
    return;
  } else {
    let html = database.map((e) => getLiFragment(e));
    clear();
    html.forEach((li) => list.append(li));
  }
  counter.textContent = database.length;
}

function clear() {
  list.innerHTML = new String();
}

function getLiFragment(db) {
  const bb = c ? "bb-dark" : "bb-light";
  const br = c ? "border-dark" : "border-light";
  const li = document.createElement("li");
  li.classList.add("list-item", bb);
  li.innerHTML = `<div class="input-check"><div id="ch1" data-text="${db.name}" class="${br} check">
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none"
  stroke="#FFF"stroke-width="2"d="M1 4.304L3.696 7l6-6"/></svg>
  </div></div>${db.name}<div class="cross"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
  <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132
  8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
  </svg></div>`;

  if (db.check) {
    li.classList.add("line");
    li.children[0].children[0].classList.add("checked");
  }
  return li;
}
