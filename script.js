/* =========================================================
   NØMIA — boutique (catalogue, panier, comptes, points, commande)
   Tout est enregistré dans le navigateur (localStorage) :
   c'est une boutique de démonstration, sans serveur ni vrai paiement.
   ========================================================= */

/* ---------- Réglages ---------- */
const SHIPPING_STD = 4.9;
const SHIPPING_EXPRESS = 9.9;
const FREE_SHIPPING_FROM = 80;
const SIGNUP_POINTS = 100;
const POINTS_STEP = 100;        // 100 points…
const POINTS_STEP_VALUE = 5;    // … = 5 €
const PROMO_CODES = { NOMIA10: 0.10 };

/* ---------- Visuels ----------
   Photos : recadrages des photos du hoodie (m.jpg et C15C…jpg).
   Autres articles : illustrations SVG générées plus bas (à remplacer par tes photos).
   Pour mettre une vraie photo : { photo: 'images/ma-photo.jpg' } */
const PHOTO = {
  hoodieFront: { photo: 'images/hoodie-fracture.jpg', size: '200% auto', pos: '0% 50%' },
  hoodieBack:  { photo: 'images/hoodie-fracture.jpg', size: '200% auto', pos: '100% 50%' },
  hoodieTag:   { photo: 'images/hoodie-details.jpg',  size: '200% auto', pos: '0% 100%' },
  hoodieCuff:  { photo: 'images/hoodie-details.jpg',  size: '200% auto', pos: '100% 100%' },
  teeFront:    { photo: 'images/tshirt-fissure.jpg',  size: '200% auto', pos: '2% 50%' },
  teeBack:     { photo: 'images/tshirt-fissure.jpg',  size: '200% auto', pos: '98% 50%' },
  short:       { photo: 'images/short-fracture.jpg' },
  jogging:     { photo: 'images/jogging-nocturne.jpg' },
  cap:         { photo: 'images/casquette-nomia.jpg', pos: '58% 50%' },
  beanie:      { photo: 'images/bonnet-nomia.jpg' },
  tote:        { photo: 'images/tote-fracture.jpg' },
  backpack:    { photo: 'images/sac-fracture.jpg', pos: '29% 50%' },
  socks:       { photo: 'images/chaussettes-nomia.jpg' },
};

const C = { noir: '#151515', anthracite: '#3a3a3a', gris: '#8e8e8e', blanc: '#ececec', sable: '#cbbfa8' };

/* ---------- Catalogue ---------- */
const CATEGORIES = [
  { id: 'hoodies',     name: 'Hoodies',          visual: PHOTO.hoodieFront },
  { id: 't-shirts',    name: 'T-shirts',         visual: PHOTO.teeFront },
  { id: 'bas',         name: 'Bas',              visual: PHOTO.jogging },
  { id: 'accessoires', name: 'Accessoires',      visual: PHOTO.backpack },
];

const CLOTHES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const PRODUCTS = [
  {
    id: 'hoodie-fracture', name: 'Hoodie Fracture', color: 'Noir', cat: 'hoodies',
    price: 69, badge: 'NEW', isNew: true, rank: 1,
    sizes: CLOTHES, out: ['XS'],
    images: [PHOTO.hoodieFront, PHOTO.hoodieBack, PHOTO.hoodieTag, PHOTO.hoodieCuff],
    desc: "La pièce signature. Logo NØMIA brodé sur la poitrine, grande fissure imprimée dans le dos et patch IØ tissé sur la manche.",
    details: ['Coton bio molletonné 400 g/m²', 'Coupe oversize, épaules tombantes', 'Poche kangourou, capuche doublée', 'Patch IØ tissé sur la manche']
  },
  {
    id: 'tee-fissure', name: 'T-shirt oversize Fissure', color: 'Noir', cat: 't-shirts',
    price: 39, badge: 'NEW', isNew: true, rank: 3,
    sizes: CLOTHES, out: [],
    images: [PHOTO.teeFront, PHOTO.teeBack],
    desc: "Oversize, logo NØMIA fissuré sur la poitrine et la grande fissure Fracture sur tout le dos.",
    details: ['Coton 260 g/m², aspect délavé', 'Coupe très oversize', 'Impression dos grand format', 'Étiquette Ø tissée en bas']
  },
  {
    id: 'jogger-nocturne', name: 'Jogging Nocturne', color: 'Noir', cat: 'bas',
    price: 55, rank: 4,
    sizes: CLOTHES, out: [],
    images: [PHOTO.jogging],
    desc: "Jogging molletonné assorti aux hoodies : logo NØMIA sur la cuisse et fissure imprimée le long de la jambe.",
    details: ['Coton molletonné 350 g/m²', 'Taille élastique avec cordon', 'Chevilles resserrées', 'Patch Ø tissé à la cheville']
  },
  {
    id: 'short-fracture', name: 'Short Fracture', color: 'Noir', cat: 'bas',
    price: 45, badge: 'NEW', isNew: true, rank: 5,
    sizes: CLOTHES, out: [],
    images: [PHOTO.short],
    desc: "Short molletonné, logo NØMIA fissuré sur la jambe et patch Ø tissé en bas.",
    details: ['Coton molletonné 320 g/m²', 'Taille élastique avec cordon', 'Deux poches côté', 'Patch Ø tissé']
  },
  {
    id: 'cap-nomia', name: 'Casquette NØMIA', color: 'Noir', cat: 'accessoires',
    price: 29, rank: 9,
    sizes: ['Unique'], out: [],
    images: [PHOTO.cap],
    desc: "Casquette 6 pans, logo NØMIA fissuré brodé devant et fissure sur le côté.",
    details: ['Sergé de coton', 'Fermeture réglable en métal', 'Broderie blanche', 'Patch Ø sur la visière']
  },
  {
    id: 'backpack-fracture', name: 'Sac à dos Fracture', color: 'Noir', cat: 'accessoires',
    price: 59, badge: 'NEW', isNew: true, rank: 8,
    sizes: ['Unique'], out: [],
    images: [PHOTO.backpack],
    desc: "Sac à dos en toile épaisse, logo NØMIA et grande fissure imprimés devant.",
    details: ['Toile polyester recyclé déperlante', 'Poche avant zippée', 'Compartiment ordinateur 15"', 'Patch Ø tissé']
  },
  {
    id: 'beanie-fracture', name: 'Bonnet NØMIA', color: 'Noir', cat: 'accessoires',
    price: 25, isNew: true, rank: 10,
    sizes: ['Unique'], out: [],
    images: [PHOTO.beanie],
    desc: "Bonnet en maille côtelée, logo NØMIA fissuré brodé sur le revers et étiquette Ø.",
    details: ['Maille acrylique et laine', 'Revers large', 'Broderie blanche', 'Étiquette Ø tissée']
  },
  {
    id: 'tote-nomia', name: 'Tote bag Fracture', color: 'Noir', cat: 'accessoires',
    price: 19, rank: 11,
    sizes: ['Unique'], out: [],
    images: [PHOTO.tote],
    desc: "Grand tote bag en toile épaisse noire, fissure imprimée et patch Ø.",
    details: ['Toile de coton 340 g/m²', '38 × 42 cm', 'Anses longues']
  },
  {
    id: 'socks-nomia', name: 'Chaussettes NØMIA', color: 'Noir', cat: 'accessoires',
    price: 15, rank: 12,
    sizes: ['36-40', '41-45'], out: [],
    images: [PHOTO.socks],
    desc: "Chaussettes hautes côtelées, logo NØMIA fissuré et petite étiquette Ø.",
    details: ['Coton peigné', 'Semelle bouclette', 'Bord côtelé']
  },
];

/* ---------- Illustrations SVG (vêtements) ---------- */
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const f = v => Math.max(0, Math.min(255, v + amt));
  return '#' + [f(n >> 16), f((n >> 8) & 255), f(n & 255)].map(v => v.toString(16).padStart(2, '0')).join('');
}
function isLight(hex) { return parseInt(hex.slice(1, 3), 16) > 150; }

function printArt(kind, cx, cy, ink, scale = 1) {
  const s = scale;
  if (kind === 'logo') return `<text x="${cx}" y="${cy}" text-anchor="middle" font-family="Manrope, Arial" font-weight="300" font-size="${22 * s}" letter-spacing="${3 * s}" fill="${ink}">NØMIA</text>`;
  if (kind === 'small') return `<text x="${cx + 34}" y="${cy - 10}" text-anchor="middle" font-family="Manrope, Arial" font-weight="300" font-size="${12 * s}" letter-spacing="2" fill="${ink}">NØMIA</text>`;
  if (kind === 'io') return `<text x="${cx}" y="${cy + 10 * s}" text-anchor="middle" font-family="Georgia, serif" font-size="${38 * s}" fill="${ink}">IØ</text>`;
  if (kind === 'crack') return `<path d="M${cx + 40} ${cy - 90} L${cx + 18} ${cy - 30} L${cx + 28} ${cy - 18} L${cx} ${cy + 40} L${cx + 10} ${cy + 52} L${cx - 30} ${cy + 140}" stroke="${ink}" stroke-width="5" fill="none" stroke-linejoin="bevel"/>`;
  if (kind === 'patch') return `<rect x="${cx - 26}" y="${cy - 11}" width="52" height="22" rx="2" fill="#ddd"/><text x="${cx}" y="${cy + 5}" text-anchor="middle" font-family="Manrope, Arial" font-size="10" letter-spacing="1.5" fill="#111">NØMIA</text>`;
  return '';
}

let svgUid = 0;
function garmentSVG({ svg, color, print, back }) {
  const dark = shade(color, -22), darker = shade(color, -40), light = shade(color, 18);
  const ink = isLight(color) ? '#151515' : '#f2f2f2';
  const gid = 'bg' + (++svgUid);
  const bg = `<defs><radialGradient id="${gid}" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="#b9b9b9"/><stop offset="1" stop-color="#7d7d7d"/></radialGradient></defs><rect width="400" height="500" fill="url(#${gid})"/>`;
  let body = '';
  if (svg === 'tshirt') {
    body = `<path d="M128 112 L166 92 Q200 ${back ? 100 : 122} 234 92 L272 112 L340 168 L306 210 L280 192 L282 410 L118 410 L120 192 L94 210 L60 168 Z" fill="${color}" stroke="${dark}" stroke-width="2"/>
      <path d="M166 92 Q200 ${back ? 100 : 122} 234 92" stroke="${darker}" stroke-width="6" fill="none"/>
      ${printArt(print === 'small' && back ? 'crack' : print, 200, back ? 220 : 190, ink)}`;
  } else if (svg === 'hoodie' || svg === 'crew') {
    const hood = svg === 'hoodie';
    body = `<path d="M118 132 L160 108 Q200 ${hood ? 116 : 128} 240 108 L282 132 L338 352 L304 362 L284 230 L286 420 L114 420 L116 230 L96 362 L62 352 Z" fill="${color}" stroke="${dark}" stroke-width="2"/>
      <rect x="114" y="398" width="172" height="22" fill="${dark}"/>
      <rect x="62" y="340" width="34" height="22" transform="rotate(-6 79 351)" fill="${dark}"/><rect x="304" y="340" width="34" height="22" transform="rotate(6 321 351)" fill="${dark}"/>
      ${hood ? (back
        ? `<path d="M150 112 Q150 50 200 46 Q250 50 250 112 Q200 150 150 112 Z" fill="${dark}"/><path d="M200 50 L200 140" stroke="${darker}" stroke-width="2"/>`
        : `<path d="M148 116 Q146 56 200 52 Q254 56 252 116 Q226 96 200 96 Q174 96 148 116 Z" fill="${dark}"/><path d="M162 116 Q200 90 238 116 Q200 150 162 116 Z" fill="${darker}"/>
           <path d="M186 128 L184 196 M214 128 L216 196" stroke="${light}" stroke-width="3"/>
           <path d="M150 330 L250 330 L266 390 L134 390 Z" fill="${dark}" opacity=".6"/>`)
        : `<path d="M160 108 Q200 128 240 108" stroke="${darker}" stroke-width="8" fill="none"/>`}
      ${back && print === 'crack' ? printArt('crack', 200, 250, ink) : printArt(print, back ? 200 : (hood ? 248 : 200), back ? 240 : (hood ? 200 : 220), ink, hood && !back ? .8 : 1)}`;
  } else if (svg === 'pants') {
    body = `<path d="M128 70 H272 L300 448 H218 L200 190 L182 448 H100 Z" fill="${color}" stroke="${dark}" stroke-width="2"/>
      <rect x="128" y="70" width="144" height="26" fill="${dark}"/>
      <path d="M190 96 L190 130 M210 96 L210 130" stroke="${light}" stroke-width="3"/>
      ${print === 'cargo'
        ? `<rect x="112" y="250" width="56" height="70" rx="4" fill="${dark}"/><rect x="232" y="250" width="56" height="70" rx="4" fill="${dark}"/><path d="M112 268 H168 M232 268 H288" stroke="${darker}" stroke-width="3"/>`
        : `<path d="M104 430 H180 M220 430 H296" stroke="${darker}" stroke-width="16"/>${printArt('logo', 150, 170, ink, .6)}`}`;
  } else if (svg === 'cap') {
    body = `<path d="M110 290 Q108 160 200 154 Q292 160 290 290 Z" fill="${color}" stroke="${dark}" stroke-width="2"/>
      <path d="M200 154 L200 290 M150 168 Q140 230 146 290 M250 168 Q260 230 254 290" stroke="${dark}" stroke-width="2" fill="none"/>
      <circle cx="200" cy="156" r="6" fill="${dark}"/>
      <path d="M100 290 Q200 306 336 296 Q314 342 200 336 Q118 330 100 290 Z" fill="${dark}"/>
      ${printArt(print, 200, 238, ink, .9)}`;
  } else if (svg === 'beanie') {
    body = `<path d="M118 330 Q112 160 200 154 Q288 160 282 330 Z" fill="${color}" stroke="${dark}" stroke-width="2"/>
      ${Array.from({ length: 13 }, (_, i) => `<path d="M${130 + i * 12} 190 L${128 + i * 12} 300" stroke="${dark}" stroke-width="2"/>`).join('')}
      <rect x="112" y="290" width="176" height="70" rx="10" fill="${dark}"/>
      ${Array.from({ length: 15 }, (_, i) => `<path d="M${122 + i * 11.5} 296 V354" stroke="${darker}" stroke-width="2"/>`).join('')}
      ${printArt('patch', 200, 325, ink)}`;
  } else if (svg === 'tote') {
    body = `<path d="M160 180 Q160 90 200 90 Q240 90 240 180" stroke="${dark}" stroke-width="12" fill="none"/>
      <rect x="112" y="170" width="176" height="230" rx="4" fill="${color}" stroke="${dark}" stroke-width="2"/>
      ${printArt('logo', 200, 270, '#151515', .9)}${printArt('crack', 200, 300, '#151515', .5).replace('stroke-width="5"', 'stroke-width="3"')}`;
  } else if (svg === 'socks') {
    const sock = (x, r) => `<g transform="rotate(${r} ${x} 250)"><path d="M${x - 32} 110 H${x + 32} V300 Q${x + 32} 330 ${x + 62} 345 Q${x + 92} 362 ${x + 80} 392 Q${x + 66} 418 ${x + 20} 400 L${x - 20} 380 Q${x - 34} 372 ${x - 32} 350 Z" fill="${color}" stroke="${dark}" stroke-width="2"/><rect x="${x - 32}" y="110" width="64" height="34" fill="${dark}"/>${printArt('io', x, 200, ink, .6)}</g>`;
    body = sock(150, -6) + sock(240, 6);
  }
  return `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${bg}${body}</svg>`;
}

/* Rend un visuel (photo recadrée ou SVG) */
function visualHTML(v, extraClass = '') {
  if (v.photo) {
    return `<div class="visual ${extraClass}" style="background-image:url('${v.photo}');background-size:${v.size || 'cover'};background-position:${v.pos || 'center'}"></div>`;
  }
  return `<div class="visual ${extraClass}">${garmentSVG(v)}</div>`;
}

/* ---------- Utilitaires ---------- */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const euro = n => n.toFixed(2).replace('.', ',').replace(',00', '') + ' €';
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const byId = id => PRODUCTS.find(p => p.id === id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ---------- État ---------- */
let cart = load('nomia_cart', []);           // [{ id, size, qty }]
let wishlist = load('nomia_wishlist', []);   // [id]
let users = load('users', []);               // [{ username, email, pass, points, orders }]
let currentName = (load('currentUser', null) || {}).username || null;
const filters = { cat: 'all', q: '', sort: 'featured' };

const currentUser = () => users.find(u => u.username === currentName) || null;
function saveUsers() { save('users', users); }

/* =========================================================
   Catalogue
   ========================================================= */
function renderCategories() {
  $('#categories').innerHTML = CATEGORIES.map(c => {
    const n = PRODUCTS.filter(p => p.cat === c.id).length;
    return `<button class="cat-card" data-cat="${c.id}">${visualHTML(c.visual)}<span>${c.name}<small>${n} article${n > 1 ? 's' : ''}</small></span></button>`;
  }).join('');
}

function renderChips() {
  const chips = [['all', 'Tout'], ['new', 'Nouveautés'], ...CATEGORIES.map(c => [c.id, c.name]), ['wish', '♥ Favoris']];
  $('#chips').innerHTML = chips.map(([id, label]) =>
    `<button class="chip ${filters.cat === id ? 'active' : ''}" data-chip="${id}" role="tab" aria-selected="${filters.cat === id}">${label}</button>`
  ).join('');
}

function filteredProducts() {
  const q = filters.q.trim().toLowerCase();
  let list = PRODUCTS.filter(p => {
    if (filters.cat === 'new' && !p.isNew) return false;
    if (filters.cat === 'wish' && !wishlist.includes(p.id)) return false;
    if (!['all', 'new', 'wish'].includes(filters.cat) && p.cat !== filters.cat) return false;
    if (q && !(p.name + ' ' + p.color + ' ' + p.cat + ' ' + p.desc).toLowerCase().includes(q)) return false;
    return true;
  });
  const sorts = {
    featured: (a, b) => a.rank - b.rank,
    new: (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || a.rank - b.rank,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
  };
  return list.sort(sorts[filters.sort]);
}

function cardHTML(p) {
  const fav = wishlist.includes(p.id);
  const badge = p.badge ? `<span class="badge ${p.old ? 'sale' : ''}">${p.badge}</span>` : '';
  return `
    <article class="card">
      <div class="card-media" data-open="${p.id}">
        ${badge}
        <button class="wish ${fav ? 'on' : ''}" data-wish="${p.id}" aria-label="${fav ? 'Retirer des' : 'Ajouter aux'} favoris" aria-pressed="${fav}">
          <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>
        </button>
        ${visualHTML(p.images[0])}
        ${p.images[1] ? visualHTML(p.images[1], 'alt') : ''}
        <button class="quick" data-open="${p.id}">Voir l'article</button>
      </div>
      <div class="card-info">
        <div>
          <h3 data-open="${p.id}">${p.name}</h3>
          <p>${p.color}</p>
        </div>
        <div class="price">${p.old ? `<span class="now-sale">${euro(p.price)}</span><s>${euro(p.old)}</s>` : euro(p.price)}</div>
      </div>
    </article>`;
}

function renderGrid() {
  const list = filteredProducts();
  $('#grid').innerHTML = list.map(cardHTML).join('');
  $('#empty').hidden = list.length > 0;
  $('#empty').textContent = filters.cat === 'wish' && !filters.q
    ? "Tu n'as pas encore de favoris : clique sur le ♥ d'un article."
    : 'Aucun article ne correspond à ta recherche.';
  $('#resultCount').textContent = list.length + (list.length > 1 ? ' articles' : ' article');
  renderChips();
}

function setCategory(cat, scroll = true) {
  filters.cat = cat;
  renderGrid();
  if (scroll) $('#boutique').scrollIntoView();
}

/* =========================================================
   Favoris
   ========================================================= */
function toggleWish(id) {
  const had = wishlist.includes(id);
  wishlist = had ? wishlist.filter(x => x !== id) : [...wishlist, id];
  save('nomia_wishlist', wishlist);
  toast(had ? 'Retiré des favoris' : 'Ajouté aux favoris ♥');
  updateBadges();
  renderGrid();
  if (pm.product && pm.product.id === id) $('#pmWish').classList.toggle('on', !had);
}

/* =========================================================
   Fenêtre produit
   ========================================================= */
const pm = { product: null, size: null, qty: 1, img: 0 };

function openProduct(id) {
  const p = byId(id);
  if (!p) return;
  Object.assign(pm, { product: p, size: p.sizes.length === 1 ? p.sizes[0] : null, qty: 1, img: 0 });
  $('#pmCat').textContent = (CATEGORIES.find(c => c.id === p.cat) || {}).name || '';
  $('#pmName').textContent = p.name + ' — ' + p.color;
  $('#pmPrice').innerHTML = euro(p.price) + (p.old ? `<s>${euro(p.old)}</s>` : '');
  $('#pmDesc').textContent = p.desc;
  $('#pmDetails').innerHTML = p.details.map(d => `<li>${d}</li>`).join('');
  $('#pmPoints').textContent = `+${Math.floor(p.price)} points avec cet article`;
  $('#pmWish').classList.toggle('on', wishlist.includes(p.id));
  $('#pmGuide').hidden = !p.sizes.some(s => CLOTHES.includes(s));
  renderPmImages();
  renderPmSizes();
  $('#qtyVal').textContent = 1;
  $('#productModal').showModal();
}

function renderPmImages() {
  const p = pm.product;
  $('#pmMain').innerHTML = visualHTML(p.images[pm.img]);
  $('#pmThumbs').innerHTML = p.images.length > 1
    ? p.images.map((v, i) => `<button class="${i === pm.img ? 'active' : ''}" data-img="${i}" aria-label="Image ${i + 1}">${visualHTML(v)}</button>`).join('')
    : '';
}

function renderPmSizes() {
  const p = pm.product;
  $('#pmSizes').innerHTML = p.sizes.map(s => {
    const out = p.out.includes(s);
    return `<button class="size ${pm.size === s ? 'active' : ''}" data-size="${s}" ${out ? 'disabled title="Épuisé"' : ''}>${s}</button>`;
  }).join('');
  $('#pmAdd').textContent = pm.size ? `Ajouter au panier · ${euro(p.price * pm.qty)}` : 'Choisis une taille';
}

/* =========================================================
   Panier
   ========================================================= */
const cartCount = () => cart.reduce((n, i) => n + i.qty, 0);
const subtotal = () => cart.reduce((s, i) => s + (byId(i.id)?.price || 0) * i.qty, 0);

function saveCart() { save('nomia_cart', cart); updateBadges(); renderCart(); }

function addToCart(id, size, qty) {
  const line = cart.find(i => i.id === id && i.size === size);
  if (line) line.qty = Math.min(10, line.qty + qty);
  else cart.push({ id, size, qty });
  saveCart();
}

function renderCart() {
  const sub = subtotal();
  const left = FREE_SHIPPING_FROM - sub;
  $('#shipBar').innerHTML = cart.length
    ? (left > 0 ? `Plus que <b>${euro(left)}</b> pour la livraison offerte` : '🎉 Livraison offerte !')
      + `<div class="bar"><i style="width:${Math.min(100, sub / FREE_SHIPPING_FROM * 100)}%"></i></div>`
    : '';
  $('#shipBar').hidden = !cart.length;
  $('#cartFoot').hidden = !cart.length;
  $('#cartSubtotal').textContent = euro(sub);

  if (!cart.length) {
    $('#cartItems').innerHTML = `<div class="cart-empty"><p>Ton panier est vide.</p><button class="btn" data-close data-goto-shop>Voir la boutique</button></div>`;
    return;
  }
  $('#cartItems').innerHTML = cart.map((i, idx) => {
    const p = byId(i.id);
    if (!p) return '';
    return `
      <div class="cart-item">
        <div class="thumb">${visualHTML(p.images[0])}</div>
        <div>
          <h4>${p.name}</h4>
          <p>${p.color} · Taille ${i.size}</p>
          <div class="qty">
            <button data-cart-minus="${idx}" aria-label="Moins">−</button>
            <span>${i.qty}</span>
            <button data-cart-plus="${idx}" aria-label="Plus">+</button>
          </div>
        </div>
        <div class="right">
          <b>${euro(p.price * i.qty)}</b>
          <button class="remove" data-cart-remove="${idx}">Retirer</button>
        </div>
      </div>`;
  }).join('');
}

function updateBadges() {
  const n = cartCount();
  $('#cartCount').hidden = n === 0;
  $('#cartCount').textContent = n;
  $('#wishCount').hidden = wishlist.length === 0;
  $('#wishCount').textContent = wishlist.length;
  const u = currentUser();
  $('#accountLabel').textContent = u ? `${u.username} · ${u.points} pts` : 'Connexion';
}

/* =========================================================
   Comptes
   ========================================================= */
async function hash(text) {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('nomia:' + text));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  } catch { return 'plain:' + text; } // si le navigateur bloque crypto (rare)
}

function openAuth(tab = 'login') {
  switchTab(tab);
  $('#loginError').textContent = $('#registerError').textContent = '';
  $('#authModal').showModal();
}
function switchTab(tab) {
  $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  $$('[data-pane]').forEach(f => f.hidden = f.dataset.pane !== tab);
}

function setCurrent(name) {
  currentName = name;
  save('currentUser', name ? { username: name } : null);
  updateBadges();
}

function openAccount() {
  const u = currentUser();
  if (!u) return openAuth('login');
  $('#accName').textContent = 'Salut ' + u.username;
  $('#accPoints').textContent = u.points;
  const value = Math.floor(u.points / POINTS_STEP) * POINTS_STEP_VALUE;
  $('#accPointsValue').textContent = value
    ? `soit ${euro(value)} de réduction disponibles`
    : `encore ${POINTS_STEP - u.points} points pour ${POINTS_STEP_VALUE} € de réduction`;
  const orders = u.orders || [];
  $('#accOrders').innerHTML = orders.length
    ? orders.slice().reverse().map(o => `<div class="order"><b>${o.number} · ${euro(o.total)}</b><span class="muted">${new Date(o.date).toLocaleDateString('fr-FR')} · ${o.items} article${o.items > 1 ? 's' : ''} · +${o.earned} pts</span></div>`).join('')
    : '<p class="muted small">Aucune commande pour le moment.</p>';
  $('#accountModal').showModal();
}

/* =========================================================
   Commande
   ========================================================= */
const co = { promo: 0, promoCode: '', usePoints: false };

function computeTotals() {
  const sub = subtotal();
  const promo = Math.round(sub * co.promo * 100) / 100;
  const u = currentUser();
  const ship = document.querySelector('input[name=ship]:checked')?.value === 'express'
    ? SHIPPING_EXPRESS
    : (sub - promo >= FREE_SHIPPING_FROM ? 0 : SHIPPING_STD);
  let pointsUsed = 0, pointsValue = 0;
  if (co.usePoints && u) {
    const maxSteps = Math.floor(u.points / POINTS_STEP);
    const affordable = Math.floor((sub - promo) / POINTS_STEP_VALUE);
    const steps = Math.min(maxSteps, affordable);
    pointsUsed = steps * POINTS_STEP;
    pointsValue = steps * POINTS_STEP_VALUE;
  }
  const total = Math.max(0, sub - promo - pointsValue + ship);
  return { sub, promo, ship, pointsUsed, pointsValue, total };
}

function renderCheckout() {
  const t = computeTotals();
  $('#coItems').innerHTML = cart.map(i => {
    const p = byId(i.id);
    return `<div class="co-item"><div class="thumb">${visualHTML(p.images[0])}</div><div>${p.name}<p>${p.color} · ${i.size} · ×${i.qty}</p></div><b>${euro(p.price * i.qty)}</b></div>`;
  }).join('');

  const u = currentUser();
  const canUse = u && u.points >= POINTS_STEP;
  $('#usePointsWrap').hidden = !canUse;
  if (canUse) $('#usePointsLabel').textContent = `Utiliser mes points (${u.points} pts disponibles)`;

  $('#shipStdPrice').textContent = t.sub - t.promo >= FREE_SHIPPING_FROM ? 'Offerte' : euro(SHIPPING_STD);
  $('#coLines').innerHTML = `
    <div class="line"><span>Sous-total</span><span>${euro(t.sub)}</span></div>
    ${t.promo ? `<div class="line minus"><span>Code ${co.promoCode}</span><span>−${euro(t.promo)}</span></div>` : ''}
    ${t.pointsValue ? `<div class="line minus"><span>Points (${t.pointsUsed} pts)</span><span>−${euro(t.pointsValue)}</span></div>` : ''}
    <div class="line"><span>Livraison</span><span>${t.ship ? euro(t.ship) : 'Offerte'}</span></div>
    <div class="line total"><span>Total</span><span>${euro(t.total)}</span></div>
    <p class="small muted">${u ? `Tu gagneras ${Math.floor(t.total)} points avec cette commande.` : 'Connecte-toi pour gagner des points avec cette commande.'}</p>`;
}

function openCheckout() {
  if (!cart.length) return;
  $('#cartDrawer').close();
  $('#coStep').hidden = false;
  $('#coDone').hidden = true;
  const u = currentUser();
  if (u && u.email) $('#checkoutForm').email.value = u.email;
  renderCheckout();
  $('#checkoutModal').showModal();
}

function placeOrder() {
  const t = computeTotals();
  const number = 'NOM-' + Date.now().toString(36).toUpperCase().slice(-6);
  const items = cartCount();
  const u = currentUser();
  let earned = 0;
  if (u) {
    earned = Math.floor(t.total);
    u.points = u.points - t.pointsUsed + earned;
    u.orders = [...(u.orders || []), { number, total: t.total, items, earned, date: new Date().toISOString() }];
    saveUsers();
  }
  const email = $('#checkoutForm').email.value;
  cart = [];
  co.promo = 0; co.promoCode = ''; co.usePoints = false;
  $('#usePoints').checked = false;
  $('#promoInput').value = '';
  $('#promoMsg').textContent = '';
  saveCart();
  $('#checkoutForm').reset();

  $('#doneText').innerHTML = `Commande <b>${number}</b> enregistrée pour un total de <b>${euro(t.total)}</b>. `
    + `Une confirmation serait envoyée à ${esc(email)}.`
    + (u ? `<br>Tu as gagné <b>${earned} points</b> : tu en as maintenant ${u.points}.` : `<br>Crée un compte pour gagner des points sur tes prochaines commandes.`);
  $('#coStep').hidden = true;
  $('#coDone').hidden = false;
}

/* =========================================================
   Événements
   ========================================================= */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-wish],[data-open],[data-cat],[data-chip],[data-img],[data-size],[data-cart-minus],[data-cart-plus],[data-cart-remove],[data-open-auth],[data-close],[data-goto-shop]');
  if (!el) return;
  const d = el.dataset;

  if (d.wish) { e.stopPropagation(); return toggleWish(d.wish); }
  if (d.open) return openProduct(d.open);
  if (d.chip) return setCategory(d.chip, false);
  if (d.cat) { e.preventDefault(); closeMenu(); return setCategory(d.cat); }
  if (d.img) { pm.img = +d.img; return renderPmImages(); }
  if (d.size) { pm.size = d.size; return renderPmSizes(); }
  if (d.cartMinus) { const i = cart[+d.cartMinus]; i.qty--; if (i.qty < 1) cart.splice(+d.cartMinus, 1); return saveCart(); }
  if (d.cartPlus) { const i = cart[+d.cartPlus]; i.qty = Math.min(10, i.qty + 1); return saveCart(); }
  if (d.cartRemove) { cart.splice(+d.cartRemove, 1); return saveCart(); }
  if (d.openAuth !== undefined) return currentUser() ? openAccount() : openAuth(d.openAuth || 'login');
  if (d.close !== undefined) {
    el.closest('dialog')?.close();
    if (d.gotoShop !== undefined) $('#boutique').scrollIntoView();
  }
});

// Fermer une fenêtre en cliquant sur le fond
$$('dialog').forEach(dlg => dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); }));

// Fenêtre produit
$('#qtyMinus').onclick = () => { pm.qty = Math.max(1, pm.qty - 1); $('#qtyVal').textContent = pm.qty; renderPmSizes(); };
$('#qtyPlus').onclick = () => { pm.qty = Math.min(10, pm.qty + 1); $('#qtyVal').textContent = pm.qty; renderPmSizes(); };
$('#pmWish').onclick = () => toggleWish(pm.product.id);
$('#pmAdd').onclick = () => {
  if (!pm.size) {
    $('#pmSizes').animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 300 });
    return toast('Choisis une taille');
  }
  addToCart(pm.product.id, pm.size, pm.qty);
  $('#productModal').close();
  toast(`${pm.product.name} ajouté au panier`);
  $('#cartDrawer').showModal();
};
$('#pmGuide').onclick = e => {
  e.preventDefault();
  $('#productModal').close();
  $('#sizeGuide').open = true;
  $('#sizeGuide').scrollIntoView();
};
$('#sizeGuideLink').onclick = () => { $('#sizeGuide').open = true; };

// En-tête
$('#cartBtn').onclick = () => { renderCart(); $('#cartDrawer').showModal(); };
$('#wishBtn').onclick = () => setCategory('wish');
$('#accountBtn').onclick = () => currentUser() ? openAccount() : openAuth('login');
$('#searchBtn').onclick = () => { $('#boutique').scrollIntoView(); setTimeout(() => $('#searchInput').focus({ preventScroll: true }), 350); };
$('#searchInput').oninput = e => { filters.q = e.target.value; renderGrid(); };
$('#sortSelect').onchange = e => { filters.sort = e.target.value; renderGrid(); };

// Menu mobile
function closeMenu() { $('#nav').classList.remove('open'); $('#burger').setAttribute('aria-expanded', 'false'); }
$('#burger').onclick = () => {
  const open = $('#nav').classList.toggle('open');
  $('#burger').setAttribute('aria-expanded', open);
};
$$('#nav a').forEach(a => a.addEventListener('click', closeMenu));

// Connexion / inscription
$$('.tab').forEach(t => t.onclick = () => switchTab(t.dataset.tab));

$('#registerForm').onsubmit = async e => {
  e.preventDefault();
  const username = $('#regName').value.trim();
  const email = $('#regEmail').value.trim();
  if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    $('#registerError').textContent = 'Ce nom est déjà pris.';
    return;
  }
  users.push({ username, email, pass: await hash($('#regPass').value), points: SIGNUP_POINTS, orders: [] });
  saveUsers();
  setCurrent(username);
  e.target.reset();
  $('#authModal').close();
  toast(`Bienvenue ${username} ! +${SIGNUP_POINTS} points 🎁`);
};

$('#loginForm').onsubmit = async e => {
  e.preventDefault();
  const name = $('#loginName').value.trim();
  const pass = $('#loginPass').value;
  const u = users.find(x => x.username.toLowerCase() === name.toLowerCase());
  const ok = u && (u.pass === await hash(pass) || u.password === pass); // u.password : anciens comptes
  if (!ok) { $('#loginError').textContent = 'Nom ou mot de passe incorrect.'; return; }
  if (u.password) { u.pass = await hash(pass); delete u.password; } // mise à niveau des anciens comptes
  u.points = u.points ?? 0;
  saveUsers();
  setCurrent(u.username);
  e.target.reset();
  $('#authModal').close();
  toast(`Content de te revoir, ${u.username} !`);
};

$('#logoutBtn').onclick = () => { setCurrent(null); $('#accountModal').close(); toast('Tu es déconnecté'); };

// Commande
$('#checkoutBtn').onclick = openCheckout;
$$('input[name=ship]').forEach(r => r.onchange = renderCheckout);
$('#usePoints').onchange = e => { co.usePoints = e.target.checked; renderCheckout(); };
$('#promoBtn').onclick = () => {
  const code = $('#promoInput').value.trim().toUpperCase();
  if (PROMO_CODES[code]) {
    co.promo = PROMO_CODES[code]; co.promoCode = code;
    $('#promoMsg').textContent = `Code ${code} appliqué : −${PROMO_CODES[code] * 100} %`;
    $('#promoMsg').style.color = 'var(--ok)';
  } else {
    co.promo = 0; co.promoCode = '';
    $('#promoMsg').textContent = code ? 'Ce code n\'est pas valide.' : '';
    $('#promoMsg').style.color = 'var(--sale)';
  }
  renderCheckout();
};
$('#checkoutForm').onsubmit = e => { e.preventDefault(); placeOrder(); };

// Newsletter (enregistrée dans le navigateur)
$('#newsletterForm').onsubmit = e => {
  e.preventDefault();
  const mails = load('nomia_newsletter', []);
  mails.push(e.target.querySelector('input').value);
  save('nomia_newsletter', mails);
  e.target.reset();
  toast('Merci ! Tu seras prévenu du prochain drop.');
};

/* ---------- Démarrage ---------- */
// Compatibilité avec les comptes créés avec l'ancienne version du site
users.forEach(u => { u.points = u.points ?? SIGNUP_POINTS; u.orders = u.orders || []; });
// Retire du panier / des favoris les articles qui n'existent plus dans le catalogue
cart = cart.filter(i => byId(i.id)); save('nomia_cart', cart);
wishlist = wishlist.filter(id => byId(id)); save('nomia_wishlist', wishlist);
if (!currentUser()) currentName = null;
renderCategories();
renderGrid();
renderCart();
updateBadges();
