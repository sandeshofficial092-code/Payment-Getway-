const upiId = "paytosandesh@ibl";
const receiverName = "Sandesh Ubale";

let upiLink = "";

function generatePayment() {
  const amountField = document.getElementById("amount");
  const amount = amountField.value.trim();

  if (amount === "" || isNaN(amount) || Number(amount) <= 0) {
    alert("Enter valid amount");
    amountField.focus();
    return;
  }

  upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(receiverName)}&am=${amount}&cu=INR`;

  const qr = document.getElementById("qr");
  qr.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
    encodeURIComponent(upiLink);

  qr.style.display = "block";
  document.getElementById("apps").style.display = "flex";
}

function openApp(app) {
  if (!upiLink) return;

  let link = upiLink;

  if (app === "phonepe") {
    link = "phonepe://pay?" + upiLink.split("?")[1];
  }
  if (app === "gpay") {
    link = "tez://upi/pay?" + upiLink.split("?")[1];
  }
  if (app === "fampay") {
    link = upiLink;
  }

  window.location.href = link;
}
