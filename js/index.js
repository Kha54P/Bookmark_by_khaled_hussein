var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submit = document.getElementById("submit");
var tbody = document.getElementById("tbody");
var boxIinfo = document.getElementById("poxInfo");
// supmit
var dataBooks = [];

if (localStorage.getItem("book") != null) {
  dataBooks = JSON.parse(localStorage.getItem("book"));
}

submit.onclick = function () {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var newBooks = {
      siteName: siteName.value,
      siteURL: siteURL.value,
    };
    var existed = false;
    for (var i = 0; i < dataBooks.length; i++) {
      if (dataBooks[i].siteName == newBooks.siteName) {
        existed = true;
        break;
      }
    }
    if (existed == true) {

      document.getElementById('poxInfo').classList.replace('d-none','d-block');
    } else {
      dataBooks.push(newBooks);
      localStorage.setItem("book", JSON.stringify(dataBooks));
      console.log(dataBooks);
      showDate();
      clraerData();
      siteName.classList.remove("is-valid");
      siteURL.classList.remove("is-valid");
    }
  } else {

    document.getElementById('poxInfo').classList.replace('d-none','d-block');
  }
};

boxIinfo.onclick = function () {

  document.getElementById('poxInfo').classList.replace('d-block','d-none');
};

function showDate() {
  table = "";
  for (var i = 0; i < dataBooks.length; i++) {
    table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataBooks[i].siteName}</td>
                <td>
                  <button onclick="visit(${i})" id = 'btnVisit '  class="btn btn-success" data-index="${i}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                <td><button onclick="deleteItem(${i})" type="button" class="btn btn-danger"> <i class="fa-solid fa-trash-can pe-2"></i>Dlete</button></td>
            
            </tr>    
            `;
  }
  tbody.innerHTML = table;
}
showDate();
// clear Data
function clraerData() {
  siteName.value = "";
  siteURL.value = "";
}

function deleteItem(i) {
  dataBooks.splice(i, 1);
  localStorage.setItem("book", JSON.stringify(dataBooks));
  showDate();
}

// visit

function visit(i) {
  window.open(dataBooks[i].siteURL);
}

// valid

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validate(siteURL, urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

