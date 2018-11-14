var form = document.querySelector(".form-container");
var btn = document.querySelector(".btn");
var fields = document.querySelectorAll(".field");

var textVal = document.querySelectorAll(".textVal");
var emailVal = document.querySelector(".emailVal");
var passwordVal = document.querySelector(".passwordVal");


form.addEventListener("submit", function(event) {
  event.preventDefault();
  fields.forEach(element => {
    element.classList.remove("empty");
    if (element.value == 0) {
      element.classList.add("empty");
    } 
  });
  var emptyFieldsCounter = document.querySelectorAll(".empty").length;
  if (emptyFieldsCounter == 0) {
    form.submit();
  }
});

textVal.forEach(element => {
  element.addEventListener("input", function(event) {
    deleteErrors();
    var abs = element.value;
    this.style.border = "1px solid green";

    if(abs.match(/['"]/)) {
      addError(element, "This field can not include &#39 and &#34");
    }
  });
});

emailVal.addEventListener("input", function(event) {
  deleteErrors();
  var abs = this.value;
  this.style.border = "1px solid green";

  if(!(abs.match(/[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i))) {
    addError(emailVal, "This field should be like asd@asd.yu");
  }
});

passwordVal.addEventListener("input", function(event) {
  deleteErrors();
  var abs = this.value;
  this.style.border = "1px solid green";

  if(!(abs.match(/[0-9a-z_]{6}/i))) {
    addError(passwordVal, "At least six characters");
  }
});

function addError(element, errorMessage) {
  var error = document.createElement("div");
  error.className = "error";
  error.style.color = "red";
  error.innerHTML = errorMessage;
  element.parentElement.appendChild(error);
  element.style.border = "1px solid red";
}
function deleteErrors() {
  var errors = form.querySelectorAll(".error");
  for(var i = 0; i < errors.length; i++) {
    errors[i].remove();
  }
}


