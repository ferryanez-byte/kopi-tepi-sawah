// ===== Data awal =====
const menu = [
  { nama: "Kopi susu gula aren", harga: 18000, kategori: "Kopi" },
  { nama: "Americano",           harga: 15000, kategori: "Kopi" },
  { nama: "Es teh tarik",        harga: 12000, kategori: "Non-kopi" },
  { nama: "Cokelat panas",       harga: 16000, kategori: "Non-kopi" },
  { nama: "Roti bakar cokelat",  harga: 15000, kategori: "Camilan" },
  { nama: "Pisang goreng keju",  harga: 13000, kategori: "Camilan" },
];
const ikon = { "Kopi": "☕", "Non-kopi": "🥤", "Camilan": "🍞" };
const warna = { "Kopi": "#6b4a35", "Non-kopi": "#3f7d5c", "Camilan": "#c08a3e" };

const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");

// Gambar ilustrasi SVG (ganti dengan foto asli bila ada)
function gambar(m) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="${warna[m.kategori]}"/><text x="200" y="185" font-size="110" text-anchor="middle">${ikon[m.kategori]}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// ===== Render menu & baris pesanan =====
const daftarMenu = document.getElementById("daftar-menu");
const barisPesan = document.getElementById("baris-pesan");
menu.forEach((m, i) => {
  daftarMenu.insertAdjacentHTML("beforeend", `
    <article class="kartu">
      <img src="${gambar(m)}" alt="Ilustrasi ${m.nama}, kategori ${m.kategori}" loading="lazy">
      <div><h3>${m.nama}</h3><p class="kat">${m.kategori}</p><p class="harga">${rupiah(m.harga)}</p></div>
    </article>`);
  barisPesan.insertAdjacentHTML("beforeend", `
    <div class="baris">
      <label for="qty-${i}">${m.nama} (${rupiah(m.harga)})</label>
      <input type="number" id="qty-${i}" min="0" value="0" inputmode="numeric">
    </div>`);
});

// ===== Interaksi 1: kalkulator pesanan =====
function hitungOngkir(jarak, subtotal) {
  if (subtotal >= 100000) return 0;
  if (jarak <= 3) return 5000;
  return 5000 + Math.ceil(jarak - 3) * 2000;
}

document.getElementById("form-pesan").addEventListener("submit", (e) => {
  e.preventDefault();
  const hasil = document.getElementById("hasil");
  const jarak = parseFloat(document.getElementById("jarak").value);
  let subtotal = 0, rincian = "";
  menu.forEach((m, i) => {
    const q = parseInt(document.getElementById("qty-" + i).value, 10) || 0;
    if (q > 0) {
      subtotal += q * m.harga;
      rincian += `<div class="r"><span>${m.nama} × ${q}</span><span>${rupiah(q * m.harga)}</span></div>`;
    }
  });
  hasil.className = "hasil tampil";
  if (subtotal === 0) { hasil.classList.add("gagal"); hasil.textContent = "Pilih minimal satu menu dengan jumlah lebih dari 0."; return; }
  if (isNaN(jarak) || jarak < 0) { hasil.classList.add("gagal"); hasil.textContent = "Isi jarak antar dengan angka 0 atau lebih."; return; }
  if (jarak > 8) { hasil.classList.add("gagal"); hasil.textContent = "Maaf, jarak " + jarak + " km di luar jangkauan (maksimal 8 km)."; return; }
  const ongkir = hitungOngkir(jarak, subtotal);
  hasil.innerHTML = `${rincian}
    <div class="r"><span>Subtotal</span><span>${rupiah(subtotal)}</span></div>
    <div class="r"><span>Ongkir (${jarak} km)</span><span>${ongkir === 0 ? "Gratis" : rupiah(ongkir)}</span></div>
    <div class="r total"><span>Total</span><span>${rupiah(subtotal + ongkir)}</span></div>`;
});

