// Hämta element
const varukorgKnapp = document.getElementById("varukorg-knapp");
const varukorgRuta = document.getElementById("varukorg-ruta");
const varukorgInnehåll = document.getElementById("varukorg-innehåll");
const totalprisElement = document.getElementById("totalpris");
const produktKnappar = document.querySelectorAll(".produkt-knapp");
const rensaVarukorgKnapp = document.getElementById("rensavarukorg");
const stängVarukorgKnapp = document.getElementById("stäng-varukorg");

// Variabler
let totalpris = 0;
let antalProdukter = {};

// Visa/dölja varukorg
varukorgKnapp.addEventListener("click", () => {
  varukorgRuta.style.display = varukorgRuta.style.display === "block" ? "none" : "block";
});

stängVarukorgKnapp.addEventListener("click", () => {
  varukorgRuta.style.display = "none";
});

// Hantera varukorg
varukorgInnehåll.addEventListener("click", (event) => {
  if (event.target.classList.contains("ta-bort-produkt")) {
    const produktLi = event.target.parentElement;
    const produktNamn = produktLi.textContent.split(" ")[0];
    const antal = antalProdukter[produktNamn];
    const produktPrisToRemove = parseFloat(produktLi.textContent.match(/\d+\.\d+/)[0]) * antal;

    antalProdukter[produktNamn] -= 1;
    if (antalProdukter[produktNamn] === 0) {
      delete antalProdukter[produktNamn];
    }

    varukorgInnehåll.removeChild(produktLi);

    totalpris -= produktPrisToRemove;
    totalprisElement.textContent = totalpris.toFixed(2);

    if (Object.keys(antalProdukter).length === 0) {
      varukorgRuta.style.display = "none";
    }
  }
});

produktKnappar.forEach((produktKnapp) => {
  produktKnapp.addEventListener("click", () => {
    const produktNamn = produktKnapp.getAttribute("data-namn");
    const produktPris = parseFloat(produktKnapp.getAttribute("data-pris"));

    antalProdukter[produktNamn] = (antalProdukter[produktNamn] || 0) + 1;

    varukorgInnehåll.innerHTML = "";
    for (const produkt in antalProdukter) {
      varukorgInnehåll.innerHTML += `<li>${produkt} (${antalProdukter[produkt]}) - ${produktPris.toFixed(2)} :-</li>`;
    }

    totalpris += produktPris;
    totalprisElement.textContent = totalpris.toFixed(2);

    if (varukorgRuta.style.display !== "block") {
      varukorgRuta.style.display = "block";
    }
  });
});

rensaVarukorgKnapp.addEventListener("click", () => {
  antalProdukter = {};
  varukorgInnehåll.innerHTML = "";
  totalpris = 0;
  totalprisElement.textContent = "0";
});


// Footer
const kontaktInfo = document.getElementById("kontakt-info");
const omInfo = document.getElementById("om-info");

kontaktInfo.style.display = "none";
omInfo.style.display = "none";

// Visa/dölja footern
document.getElementById("kontakt").addEventListener("click", () => {
  if (kontaktInfo.style.display === "none") {
    kontaktInfo.style.display = "block";
  } else {
    kontaktInfo.style.display = "none";
  }
});

document.getElementById("om").addEventListener("click", () => {
  if (omInfo.style.display === "none") {
    omInfo.style.display = "block";
  } else {
    omInfo.style.display = "none";
  }
});


