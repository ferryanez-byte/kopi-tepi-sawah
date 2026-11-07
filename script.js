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

