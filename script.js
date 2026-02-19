// 🔥 EDIT THIS
const upiId = "paytosandeh@ibl";
const receiverName = "SANDESH UBALE";

let upiLink = "";

document.getElementById("name").innerText = receiverName;
document.getElementById("upi").innerText = upiId;

function generatePayment() {
  const amount = document.getElementById("amount").value;

  if (!amount || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  upiLink = upi://pay?pa=${upiId}&pn=${encodeURIComponent(receiverName)}&am=${amount}&cu=INR;

  document.getElementById("qr").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
    encodeURIComponent(upiLink);

  document.getElementById("qr").style.display = "block";
  document.getElementById("apps").style.display = "block";
}

function openApp(app) {
  if (!upiLink) return;

  let link = upiLink;

  // Android deep links
  if (app === "phonepe") {
    link = "phonepe://" + upiLink.replace("upi://", "");
  }
  if (app === "gpay") {
    link = "tez://upi/pay?" + upiLink.split("?")[1];
  }
  if (app === "fampay") {
    link = upiLink; // FamPay supports standard UPI
  }

  window.location.href = link;
}
