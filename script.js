const d = document,
  $inptBill = d.getElementById("inpt-bill"),
  $inptPeople = d.getElementById("inpt-people"),
  $inptPercet = d.getElementById("input-grid"),
  $btnDefault = d.getElementById("btn-default"),
  $tipAmount = d.getElementById("tip-amount"),
  $btnPercent = d.querySelectorAll(".btn-grid"),
  $spanError = d.querySelector(".error-zero"),
  $totalAmount = d.getElementById("total");

let billTotal = 0.0,
  percentTip = 0.05,
  numberPeople = 1;

const getBill = () => {
  let amount = parseFloat($inptBill.value);
  return amount;
};
const getNumberPeople = () => {
  let people = parseInt($inptPeople.value);

  return people;
};

const showAmount = (bill, tip, people) => {
  let amountTip, amountTotal;

  amountTip = (bill * tip) / people;
  amountTotal = (amountTip + bill) / people;

  $tipAmount.textContent = `$${amountTip.toFixed(2)}`;
  $totalAmount.textContent = `$${amountTotal.toFixed(2)}`;
};

const updateData = () => {
  billTotal = 0.0;
  percentTip = 0.05;
  numberPeople = 1;
  $inptBill.value = "";
  $inptPeople.value = "";
  $inptPercet.value = "";
  $tipAmount.textContent = "$0.00";
  $totalAmount.textContent = "$0.00";
  $btnPercent.forEach((btn) => btn.classList.remove("is-active"));
  $btnDefault.classList.add("is-active");
};

d.addEventListener("onload", updateData());

d.addEventListener("input", (e) => {
  if (e.target.matches("#inpt-bill")) {
    billTotal = getBill();
    showAmount(billTotal, percentTip, numberPeople);
  } else if (e.target.matches("#input-grid")) {
    percentTip = parseFloat($inptPercet.value) / 100;
    showAmount(billTotal, percentTip, numberPeople);
  } else if (e.target.matches("#inpt-people")) {
    numberPeople = getNumberPeople();
    showAmount(billTotal, percentTip, numberPeople);
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-grid")) {
    $btnPercent.forEach((btn) => btn.classList.remove("is-active"));
    percentTip = parseInt(e.target.textContent) / 100;
    e.target.classList.add("is-active");
    showAmount(billTotal, percentTip, numberPeople);
  } else if (e.target.matches(".btn-reset")) {
    updateData();
  }
});

d.addEventListener("keyup", (e) => {
  if (e.target.matches("#inpt-people")) {
    if ($inptPeople.valueAsNumber <= 0) {
      $inptPeople.classList.add("error");
      $spanError.classList.remove("hidden");
    } else {
      $inptPeople.classList.remove("error");
      $spanError.classList.add("hidden");
    }
  }
});
