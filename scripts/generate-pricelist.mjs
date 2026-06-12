// Árlista PDF generálása a jelenlegi árszerkezetből.
// Futtatás:  node scripts/generate-pricelist.mjs
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const REG = "C:/Windows/Fonts/arial.ttf";
const BOLD = "C:/Windows/Fonts/arialbd.ttf";
const LOGO = "public/logo-mark.png";

const NAVY = "#0f172a";
const SLATE = "#1e293b";
const MUTED = "#64748b";
const LINE = "#e2e8f0";
const ZEBRA = "#f5f7fa";
const ACCENT = "#2563eb";
const EMER = "#0e9f6e";

const money = (n) => new Intl.NumberFormat("hu-HU").format(Math.round(n)) + " Ft";

const doc = new PDFDocument({ size: "A4", margin: 40, bufferPages: true });
const outDir = "public";
const outA = path.join(outDir, "maczko-web-arlista.pdf");
const streamA = fs.createWriteStream(outA);
doc.pipe(streamA);

doc.registerFont("reg", REG);
doc.registerFont("bold", BOLD);

const PAGE_W = doc.page.width; // 595.28
const M = 40;
const RIGHT = PAGE_W - M; // 555
const nameX = M;
const nameW = 270;
const onceX = 315;
const onceW = 110;
const monthlyX = 430;
const monthlyW = 125;
let y = M;

function ensure(h) {
  if (y + h > doc.page.height - 56) {
    doc.addPage();
    y = M;
  }
}

function header() {
  try {
    doc.image(LOGO, M, y, { width: 38, height: 38 });
  } catch {}
  doc.font("bold").fontSize(20).fillColor(NAVY).text("Maczkó Web", M + 50, y + 2);
  doc.font("reg").fontSize(9).fillColor(MUTED).text("maczkoweb.hu — Szolgáltatások és árak", M + 50, y + 26);
  doc.font("reg").fontSize(8).fillColor(MUTED).text(new Date().toLocaleDateString("hu-HU"), RIGHT - 120, y + 4, { width: 120, align: "right" });
  y += 52;

  // Akció + ÁFA sáv
  doc.roundedRect(M, y, RIGHT - M, 40, 6).fill("#ecfdf5");
  doc.font("bold").fontSize(10).fillColor(EMER).text("MOST AKCIÓ — egyszeri díjak −20%, havidíjak −10%", M + 12, y + 7);
  doc.font("reg").fontSize(8).fillColor(SLATE).text(
    "Az alábbi árak a lista-/alapárak. Az akciós (kedvezményes) árakat a maczkoweb.hu árkalkulátora mutatja. Alanyi adómentes — az árak ÁFA-t nem tartalmaznak.",
    M + 12,
    y + 22,
    { width: RIGHT - M - 24 }
  );
  y += 52;
}

function sectionTitle(text, sub) {
  ensure(46);
  doc.roundedRect(M, y, RIGHT - M, 22, 4).fill(SLATE);
  doc.font("bold").fontSize(11).fillColor("#ffffff").text(text, M + 10, y + 6);
  y += 26;
  if (sub) {
    doc.font("reg").fontSize(8).fillColor(MUTED).text(sub, M + 2, y, { width: RIGHT - M - 4 });
    y += doc.heightOfString(sub, { width: RIGHT - M - 4 }) + 4;
  }
  // oszlopfejléc
  doc.font("bold").fontSize(8).fillColor(MUTED);
  doc.text("SZOLGÁLTATÁS", nameX + 4, y);
  doc.text("EGYSZERI", onceX, y, { width: onceW, align: "right" });
  doc.text("BÉRLÉS / HÓ", monthlyX, y, { width: monthlyW, align: "right" });
  y += 13;
  doc.moveTo(M, y).lineTo(RIGHT, y).lineWidth(0.7).stroke(LINE);
  y += 3;
}

function row(item, i) {
  doc.font("reg").fontSize(9.5);
  const nameH = doc.heightOfString(item.name, { width: nameW });
  const subH = item.note ? doc.heightOfString(item.note, { width: nameW }) + 2 : 0;
  const rowH = Math.max(20, nameH + subH + 8);
  ensure(rowH);
  if (i % 2 === 1) doc.rect(M, y, RIGHT - M, rowH).fill(ZEBRA);
  doc.font("reg").fontSize(9.5).fillColor(NAVY).text(item.name, nameX + 4, y + 4, { width: nameW });
  if (item.note) doc.font("reg").fontSize(7.5).fillColor(MUTED).text(item.note, nameX + 4, y + 4 + nameH + 1, { width: nameW });
  doc.font("bold").fontSize(9.5).fillColor(NAVY);
  doc.text(item.once != null ? money(item.once) : item.onceText || "—", onceX, y + 4, { width: onceW, align: "right" });
  doc.text(item.monthly != null ? money(item.monthly) : item.monthlyText || "—", monthlyX, y + 4, { width: monthlyW, align: "right" });
  y += rowH;
}

function table(title, sub, items) {
  sectionTitle(title, sub);
  items.forEach((it, i) => row(it, i));
  y += 8;
}

function simpleTable(title, sub, rows, rightLabel) {
  ensure(46);
  doc.roundedRect(M, y, RIGHT - M, 22, 4).fill(SLATE);
  doc.font("bold").fontSize(11).fillColor("#ffffff").text(title, M + 10, y + 6);
  y += 26;
  if (sub) {
    doc.font("reg").fontSize(8).fillColor(MUTED).text(sub, M + 2, y, { width: RIGHT - M - 4 });
    y += doc.heightOfString(sub, { width: RIGHT - M - 4 }) + 4;
  }
  rows.forEach((r, i) => {
    const rowH = 18;
    ensure(rowH);
    if (i % 2 === 1) doc.rect(M, y, RIGHT - M, rowH).fill(ZEBRA);
    doc.font("reg").fontSize(9.5).fillColor(NAVY).text(r.label, nameX + 4, y + 4, { width: 380 });
    doc.font("bold").fontSize(9.5).fillColor(NAVY).text(r.value, monthlyX, y + 4, { width: monthlyW, align: "right" });
    y += rowH;
  });
  y += 8;
}

// ---- TARTALOM ----
header();

table("Weboldal csomagok", "Minden csomag tartalmazza az alap SEO-t és a reszponzív, mobil-first kódolást.", [
  { name: "Landing oldal — 1 oldalas céloldal, kapcsolat űrlap", once: 60000, monthly: 6000 },
  { name: "Alap bemutatkozó — bemutatkozás, szolgáltatások (max 5 oldal)", once: 110000, monthly: 9000 },
  { name: "Standard céges — több aloldal, blog, galéria, részletes SEO (max 10)", once: 190000, monthly: 12000 },
  { name: "Pro / egyedi — egyedi design, animációk, integrációk (max 15)", once: 325000, monthly: 18000 },
  { name: "Webshop — e-commerce, fizetés, készletkezelés (max 20)", once: 425000, monthly: 25000 },
  { name: "Extra aloldal a csomagon felül", once: 18000, monthlyText: "—" },
]);

table("Optimalizálás — SEO / GEO / sebesség", "Hogy gyors legyen az oldal, és megtaláljanak a Google-ben és az AI-keresőkben is.", [
  { name: "SEO audit (technikai + tartalmi átvilágítás)", once: 25000 },
  { name: "SEO alap (kulcsszavak, meta, sitemap, robots)", once: 30000 },
  { name: "On-page SEO finomhangolás (címek, headingek, belső linkek)", once: 20000 },
  { name: "Strukturált adatok (Schema.org jelölés)", once: 15000 },
  { name: "Sebesség optimalizálás (Page Speed / Core Web Vitals)", once: 18000 },
  { name: "Havi SEO karbantartás + tartalom", monthly: 8000 },
  { name: "GEO alap audit + beállítás (AI-keresős láthatóság)", once: 45000 },
  { name: "llms.txt + AI-olvasható FAQ blokkok", once: 18000 },
  { name: "Havi GEO monitoring + frissítés", monthly: 8000 },
]);

table(
  "Google & Meta hirdetések",
  "A havi hirdetési büdzsét a megrendelő állítja be, és közvetlenül a platformnak (Google/Meta) fizeti. A kezelési díj ebből számolódik.",
  [
    { name: "Hirdetés beállítás (fiók, követés, kampánystruktúra)", once: 30000 },
    { name: "Google Cégprofil létrehozása + beállítás", once: 25000 },
    { name: "Hirdetéskezelési díj", onceText: "—", monthlyText: "büdzsé 15%-a", note: "minimum 25 000 Ft / hó; a médiaköltség ezen felül, a platformnak fizetve" },
  ]
);

table("AI-automatizálás", "Ismétlődő, kézi folyamatok kiváltása — kevesebb adminisztráció, gyorsabb kiszolgálás.", [
  { name: "Folyamatfelmérés + automatizálási terv", once: 25000 },
  { name: "Foglalás-visszaigazoló + emlékeztető automatizálás", once: 25000 },
  { name: "Bejövő e-mailek osztályozása + sablonválaszok", once: 22000 },
  { name: "Számla- és dokumentumfeldolgozás automatizálás", once: 30000 },
  { name: "Automatikus vélemény-kérés vásárlás után", once: 15000 },
  { name: "AI chatbot / ügyfélasszisztens a weboldalra", once: 80000 },
  { name: "Egyszerű CRM + lead-automatizálás beállítás", once: 45000 },
  { name: "Vállalkozói dashboard (ügyfelek, bevétel, fizetések)", once: 60000, monthly: 6000 },
  { name: "Egyedi automatizálási folyamat", onceText: "egyedi" },
  { name: "Havi üzemeltetés, felügyelet, finomhangolás", monthly: 10000 },
]);

table("AI-használat betanítása", "A csapatod megtanul gyorsabban dolgozni AI-eszközökkel — valós, céges feladatokon.", [
  { name: "AI-workshop (résztvevőnként)", once: 12000, onceText: "12 000 Ft / fő", note: "1 fő a kezdő ár; minél többen, annál olcsóbb fejenként (2% / fő, max −50%)" },
  { name: "AI-eszközök bevezetése (ChatGPT/Copilot fiók, beállítás)", once: 20000 },
  { name: "AI beépítése egy konkrét munkafolyamatba", once: 25000 },
  { name: "Cégre szabott promptkönyvtár", once: 25000 },
  { name: "Utánkövető konzultáció", once: 12000, onceText: "12 000 Ft / óra" },
  { name: "Rögzített tananyag + kérdés-válasz lehetőség", once: 15000 },
]);

table(
  "Közösségimédia-kezelés",
  "Havi tartalomkezelés. Mennyiségi kedvezmény: 2% / darab — poszt és story max −40%, reel max −30%.",
  [
    { name: "Közösségimédia alapdíj (stratégia, ütemezés, közösségkezelés, riport)", monthly: 25000 },
    { name: "Poszt (grafika + szöveg)", monthly: 4500, monthlyText: "4 500 Ft / db" },
    { name: "Story", monthly: 2000, monthlyText: "2 000 Ft / db" },
    { name: "Reel / rövid videó (vágás + felirat)", monthly: 10000, monthlyText: "10 000 Ft / db" },
  ]
);

table("Kiegészítők", null, [
  { name: "Logó tervezés", once: 26300 },
  { name: "Fotózás (helyszíni)", once: 60000 },
  { name: "Blog modul", once: 18800 },
  { name: "Foglalási rendszer", once: 67500, monthly: 4500 },
  { name: "Hírlevél integráció (Mailchimp)", once: 18800, monthly: 1000 },
  { name: "Google Tag Manager + Analytics", once: 13500 },
  { name: "Social Media beágyazás", once: 5000 },
  { name: "Egyedi űrlap + email értesítés", once: 13500 },
  { name: "Vélemények / referenciák modul", once: 11300 },
  { name: "Galéria / portfólió", once: 13500 },
  { name: "Beágyazott térkép", once: 3800 },
  { name: "GDPR / cookie banner + adatkezelési tájékoztató", once: 6000 },
  { name: "Oktatás (1 óra)", once: 9000 },
]);

simpleTable("Ügyfél típus szorzók", "A végösszeg ezzel a szorzóval alakul.", [
  { label: "Magánszemély", value: "× 1" },
  { label: "Kisvállalkozás", value: "× 1,15" },
  { label: "Közepes cég", value: "× 1,4" },
  { label: "Nagyobb cég / hálózat", value: "× 1,8" },
]);

simpleTable("Iparág szorzók", null, [
  { label: "Általános", value: "× 1" },
  { label: "Szolgáltatás (szépség, étterem, fodrász)", value: "× 1" },
  { label: "IT / tech", value: "× 1,1" },
  { label: "Ipari / B2B", value: "× 1,2" },
  { label: "E-commerce / kereskedelem", value: "× 1,25" },
  { label: "Egészségügy / pénzügy / jogi", value: "× 1,35" },
]);

simpleTable("Számlázási ciklus kedvezmény (bérlésre)", null, [
  { label: "Havi", value: "0%" },
  { label: "Negyedéves", value: "−5%" },
  { label: "Éves", value: "−15%" },
]);

simpleTable("Egyéb", null, [{ label: "Óradíj (egyedi munka)", value: "12 000 Ft" }]);

// Lábléc minden oldalra
const range = doc.bufferedPageRange();
for (let i = 0; i < range.count; i++) {
  doc.switchToPage(range.start + i);
  doc.font("reg").fontSize(7.5).fillColor(MUTED).text(
    "Maczkó Web · maczkoweb.hu — Minden ár forintban (HUF), ÁFA-mentes. Az árak tájékoztató jellegűek; a végösszeg a szorzóktól és a számlázási ciklustól függ. Akció: egyszeri −20%, havi −10%.",
    M,
    doc.page.height - 44,
    { width: RIGHT - M, align: "center" }
  );
  doc.text(`${i + 1} / ${range.count}`, M, doc.page.height - 30, { width: RIGHT - M, align: "center" });
}

doc.end();
streamA.on("finish", () => {
  // Másolat a régi néven is (hogy a meglévő hivatkozás se törjön)
  fs.copyFileSync(outA, path.join(outDir, "arlista.pdf"));
  console.log("OK:", outA, "+ public/arlista.pdf");
});
