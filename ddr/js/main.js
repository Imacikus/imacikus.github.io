document.addEventListener("DOMContentLoaded", function() {
  const slogans = [
   "MEHR BASS FÜR DAS VOLK",
   "PLANWIRTSCHAFT AKTIV",
   "VINYL IST VOLKSEIGENTUM",
   "KULTUR NACH FÜNFJAHRESPLAN",
   "STAATLICH GEPRÜFTE BEATS",
   "KEIN WESTLICHER EINFLUSS",
   "REVOLUTION IN 128 BPM",
   "EIGENTUM WIRD VERSTÄRKT",
   "PROLETEN AUF DIE TANZFLÄCHE",
   "MUSIK UNTER KONTROLLE"
  ];

  const sublines = [
   "☭ DIGITAL SEIT 1989",
   "☭ GENEHMIGT VOM ZENTRALKOMITEE",
   "☭ PRESSEWERK OST",
   "☭ VOLKSEIGENER GROOVE",
   "☭ ARCHIVNUMMER 001"
  ];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  document.getElementById("slogan").innerText = pick(slogans);
  document.getElementById("subline").innerText = pick(sublines);

  console.log("☭ DIGITAL DISK RECORDS ☭");
});
