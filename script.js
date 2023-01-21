const form = document.querySelector("form");
const nlwSetup = new NLWSetup(form);
const addBtn = document.querySelector("#addBtn");
const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {};

addBtn.addEventListener("click", add);
form.addEventListener("change", save);

function checkDay() {
  const currentDate = new Date().toLocaleDateString("pt-BR").slice(0, -5);
  const dayExists = nlwSetup.dayExists(currentDate);
  if (dayExists) {
    addBtn.disabled = true;
    return;
  }
}

function add() {
  const currentDate = new Date().toLocaleDateString("pt-BR").slice(0, -5);
  nlwSetup.addDay(currentDate);
  checkDay();
  addBtn.blur();
}

function save() {
  localStorage.setItem("NLWSetup@habits", JSON.stringify(nlwSetup.data));
}

window.onload = function() {checkDay()};
nlwSetup.setData(data);
nlwSetup.load();

// Mockup
const mockupBtn = document.querySelector("#addMockup");
mockupBtn.addEventListener("click", addMockup);

const mockupData = {
  run: ["01-01", "01-02", "01-05", "01-09", "01-10", "01-12", "01-13", "01-14", "01-15", "01-17", "01-20", "01-22", "01-24", "01-26", "01-28", "01-30", "01-31"],
  water: ["01-02", "01-03", "01-06", "01-07", "01-08", "01-10", "01-12", "01-13", "01-15", "01-17", "01-18", "01-20", "01-22", "01-24", "01-28", "01-29"],
  exercise: ["01-03", "01-04", "01-07", "01-08", "01-09", "01-10", "01-12", "01-15", "01-16", "01-18", "01-19", "01-20", "01-21", "01-25", "01-27", "01-28", "01-30", "01-31"],
  sleep: ["01-02", "01-04", "01-06", "01-07", "01-09", "01-11", "01-12", "01-13", "01-14", "01-16", "01-17", "01-19", "01-21", "01-22", "01-23", "01-25", "01-26", "01-27", "01-30", "01-31"],
  dog: ["01-01", "01-03", "01-05", "01-06", "01-07", "01-11", "01-13", "01-14", "01-16", "01-17", "01-18", "01-19", "01-21", "01-22", "01-23", "01-27", "01-29", "01-30"],
  food: ["01-01", "01-04", "01-06", "01-08", "01-10", "01-11", "01-12", "01-13", "01-15", "01-18", "01-20", "01-27", "01-31"],
};

function addMockup() {
  nlwSetup.setData(mockupData);
  nlwSetup.load();
  mockupBtn.style.display = "none";
  addBtn.disabled = false;
  form.removeEventListener("change", save);
}
