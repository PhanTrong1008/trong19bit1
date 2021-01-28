// get variables and inputs
let uname = document.querySelector("#uname");
let pass1 = document.querySelector("#pass1");
let pass2 = document.querySelector("#pass2");
let email = document.querySelector("#email");
let age = document.querySelector("#age");
let form = document.querySelector('#classmateform');
let error = document.querySelectorAll("p.error");
let table = document.querySelector("table");
console.log("Script loaded");
let errors = {
  unameerr: false,
  pass1err: false,
  pass2err: false,
  emailerr: false,
  age: false
};
let edits = [];
// Add event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Form Submitted");
  checkName();
  checkPass1();
  matchPasswords();
  checkAge();
  checkEmail();
  let formfail = false;
  // loop through errors obj to check if any errors = true
  Object.keys(errors).forEach(function (item) {
    console.log(item + ": " + errors[item]);
    if (errors[item]) {
      //if an error is found set formfail to true
      formfail = true;
    }
  })
  if (formfail) {
    alert("The form failed, please correct errors");
  } else {
    alert("form submitted successfully");
    addClassmate();
  }
});

pass1.addEventListener("keyup", function () {
  console.log("key up event");
  checkLength();
})

let edits = [];

table.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains("edit") == true) {
    let basestate = e.target.closest("tr").cloneNode(true);
    edits.push(basestate);
    addEditInputs(e.target);
    addEditButtons(e.target);
  } else if (e.target.classList.contains("delete") == true) {
    deleteRow(e.target);
  } else if (e.target.classList.contains("update") == true) {
    updateRow(e.target);
    removeEditButtons(e.target);
  }
})

// Update DOM
// update row with user input
function updateRow(t) {
  let row = t.closest("tr");
  // 1st get input values
  let newname = row.children[1].firstChild.value;
  let newage = row.children[2].firstChild.value;
  // 2nd remove input els from td cells
  row.children[1].firstChild.remove();
  row.children[2].firstChild.remove();
  // 3rd insert new text values into the cells
  row.children[1].firstChild.innerText = newname;
  row.children[2].firstChild.innerText = newage;
}
// delete row
function removeEditButtons(t) {
  let row = t.closest("tr");
  let edit = "<a href='#' class='edit'>edit</a>";
  row.children[3].innerHTML = edit;
}

function deleteRow(t) {
  t.closest("tr").remove();
}
// add edit input to table row
function addEditInputs(t) {
  let row = t.closest("tr");
  console.log(row);
  let uname = row.children[1].textContent;
  let uage = row.children[2].textContent;
  // create html for inputs
  let nameinput = "<input type='text' value='" + uname + "'>";
  let ageinput = "<input type='number' value='" + uage + "'>";
  // insert inputs into td cells
  row.children[1].innerHTML = nameinput;
  row.children[2].innerHTML = ageinput;
}
// add edit buttons to table rowid
function addEditButtons(t) {
  console.log("button added");
  let btns = "<button class='btn btn-outline-success btn-sm update'>Update</button>";
  btns += "<button class='btn btn-outline-danger btn-sm delete mr-2 ml-2'>Delete</button>";
  btns += "<button class='btn btn-outline-warning btn-sm cancel'>Cancel</button>";
  t.parentElement.innerHTML = btns;
}








function addClassmate() {
  let tr = document.querySelectorAll("tr");
  let newrow = table.insertRow();
  let td = "<td>" + tr.length + "</td>";
  td += "<td>" + uname.value + "</td>";
  td += "<td>" + age.value + "</td>";
  td += "<td><a href='#' class='edit'>edit</a></td>";
  console.log(td);
  newrow.innerHTML = td;
}

// Perform Functions

//check username is between 5 - 20 chars
function checkName() {
  if (uname.value.length < 5 || uname.value.length > 20) {
    errors.unameerr = true;
    error[0].style = "display:initial";
  } else {
    errors.unameerr = false;
    error[0].style = "display:none";
  }
}

function checkPass1() {
  console.log("password check 1");
  if (pass1.value.length < 10 || pass1.value.length > 20) {
    errors.pass1err = true;
    error[2].style = "display:initial";
  } else {
    errors.pass1err = false;
    error[2].style = "display:none";
  }
}

function matchPasswords() {
  if (pass1.value != pass2.value) {
    errors.pass2err = true;
    error[3].style = "display:initial";
  } else {
    errors.pass2err = false;
    error[3].style = "display:none";
  }
}

function checkLength() {
  let passlen = pass1.value.length;
  let percent = (passlen / 10) * 100;
  let progressbar = document.querySelector(".progress-bar");
  progressbar.style = "width: " + percent + "%";
  if (percent >= 100 && percent <= 200) {
    progressbar.classList.add("bg-success");
    progressbar.classList.remove("bg-danger");
  } else if (percent > 200) {
    progressbar.classList.remove("bg-success");
    progressbar.classList.add("bg-danger");
  } else if (percent < 100) {
    progressbar.classList.remove("bg-success");
  }
  console.log(percent);
}

// check user email
function checkEmail() {
  let pattern = new RegExp(/^[+a-zA-Z1-9._-]+@[a-zA-Z1-9.-]+\.[a-zA-Z]{2,4}$/i);
  if (pattern.test(email.value)) {
    console.log("true, email valid");
    hideFalse(error[1], errors.emailerr);
  } else {
    console.log("false, email invalid");
    showTrue(error[1], errors.emailerr);
  }
}
// check age within range
function checkAge() {
  if (age.value < 15 || age.value > 40) {
    showTrue(error[4], errors.age);
  } else {
    hideFalse(error[4], errors.age);
  }
}

//Helper functions
function showTrue(el, err) {
  el.style = "display: initial";
  err = true;
}

function hideFalse(el, err) {
  el.style = "display: none";
  err = false;
}

console.log("modified");

console.log("Quan da o day");

console.log("Quan conflict")