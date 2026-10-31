/* =========================================================
   ARAÚJO VIANA - CONFIGURAÇÕES DA LANDING PAGE
   1) Substitua o número de WhatsApp abaixo, usando DDI + DDD.
      Exemplo: "5587999999999" (apenas exemplo; não é um contato real).
   2) Edite a lista PRODUCTS com os itens reais do cardápio.
   3) Os nomes abaixo são exemplos, e os valores estão sob consulta.
   ========================================================= */
const WHATSAPP_NUMBER = ""; // Preencha para direcionar pedidos à lanchonete.

const PRODUCTS = [
  { id: "coxinha", name: "Coxinhas douradinhas", category: "salgados", description: "Uma sugestão clássica para um lanche cheio de sabor.", image: "assets/salgados.jpg" },
  { id: "salgados-festa", name: "Salgados para compartilhar", category: "salgados", description: "Uma opção para conversar e saborear bons momentos.", image: "assets/salgados.jpg" },
  { id: "torta-frango", name: "Torta salgada de frango", category: "tortas", description: "Uma fatia saborosa para deixar a pausa especial.", image: "assets/tortas.jpg" },
  { id: "torta-encomenda", name: "Tortas para ocasiões especiais", category: "tortas", description: "Consulte opções, sabores e tamanhos disponíveis.", image: "assets/tortas.jpg" },
  { id: "bolo-chocolate", name: "Bolo de chocolate", category: "bolos", description: "Uma ideia chocolatuda para os apaixonados por doces.", image: "assets/bolos.jpg" },
  { id: "bolos-encomenda", name: "Bolos para celebrar", category: "bolos", description: "Consulte sabores e possibilidades para sua comemoração.", image: "assets/bolos.jpg" }
];

const categoryNames = { salgados: "Salgados", tortas: "Tortas", bolos: "Bolos" };
const productGrid = document.getElementById('product-grid');
const cartItemsEl = document.getElementById('cart-items');
const backdrop = document.getElementById('drawer-backdrop');
const drawer = document.getElementById('cart-drawer');
const nameField = document.getElementById('client-name');
const noteField = document.getElementById('cart-notes');
const contactNotice = document.getElementById('contact-notice');
const checkoutBtn = document.getElementById('checkout-btn');
const toast = document.getElementById('toast');
let activeFilter = 'todos';
let lastFocus = null;
let toastTimer;

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem('av-lanchonete-cart') || '{}');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    return Object.fromEntries(Object.entries(raw).filter(([id, quantity]) => PRODUCTS.some(p => p.id === id) && Number.isInteger(quantity) && quantity > 0 && quantity <= 99));
  } catch (_) { return {}; }
}
let cart = loadCart();
function persistCart() { try { localStorage.setItem('av-lanchonete-cart', JSON.stringify(cart)); } catch (_) {} }
function countItems() { return Object.values(cart).reduce((sum, val) => sum + val, 0); }
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}
function renderProducts() {
  const products = PRODUCTS.filter(p => activeFilter === 'todos' || p.category === activeFilter);
  productGrid.innerHTML = products.map(p => `
    <article class="product-card">
      <div class="product-image"><img src="${p.image}" alt="Foto ilustrativa de ${p.name}" loading="lazy"><span class="product-category">${categoryNames[p.category]}</span></div>
      <div class="product-info"><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom"><span class="product-price">Valor sob consulta</span><button type="button" class="product-add" data-add="${p.id}" aria-label="Adicionar ${p.name} ao pedido"><span aria-hidden="true">+</span> Adicionar</button></div></div>
    </article>`).join('');
}
function updateCounters() {
  const total = countItems();
  document.querySelectorAll('[data-cart-count]').forEach(el => { el.textContent = total; });
  document.getElementById('floating-cart').hidden = total === 0;
}
function renderCart() {
  const items = Object.entries(cart);
  if (!items.length) {
    cartItemsEl.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">♡</div><h3>Seu pedido está vazio</h3><p>Que tal escolher uma delícia do nosso cardápio para começar?</p><button class="btn btn-cocoa" type="button" data-close-and-menu>Ver cardápio ↗</button></div>`;
  } else {
    cartItemsEl.innerHTML = items.map(([id, quantity]) => {
      const product = PRODUCTS.find(p => p.id === id);
      if (!product) return '';
      return `<div class="cart-item"><img src="${product.image}" alt="" loading="lazy"><div class="cart-item-info"><h3>${product.name}</h3><small>Valor sob consulta</small><div class="quantity-controls"><button type="button" data-quantity="${id}" data-delta="-1" aria-label="Diminuir quantidade de ${product.name}">−</button><span>${quantity}</span><button type="button" data-quantity="${id}" data-delta="1" aria-label="Aumentar quantidade de ${product.name}">+</button><button type="button" class="cart-remove" data-remove="${id}">Remover</button></div></div></div>`;
    }).join('');
  }
  updateCounters();
  checkoutBtn.disabled = !items.length;
  checkoutBtn.style.opacity = items.length ? '1' : '.5';
  document.getElementById('copy-btn').disabled = !items.length;
  document.getElementById('copy-btn').style.opacity = items.length ? '1' : '.5';
}
function addItem(id) {
  if (!PRODUCTS.find(p => p.id === id)) return;
  if ((cart[id] || 0) >= 99) { showToast('Limite de 99 unidades por item.'); return; }
  cart[id] = (cart[id] || 0) + 1;
  persistCart();
  renderCart();
  showToast('Adicionado ao seu pedido ♡');
}
function changeQuantity(id, delta) {
  if (!(id in cart)) return;
  const next = Math.max(0, Math.min(99, cart[id] + delta));
  if (!next) delete cart[id]; else cart[id] = next;
  persistCart(); renderCart();
}
function openCart() {
  lastFocus = document.activeElement;
  backdrop.hidden = false;
  document.body.classList.add('drawer-open');
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  renderCart();
  document.getElementById('close-cart').focus();
}
function closeCart() {
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  backdrop.hidden = true;
  document.body.classList.remove('drawer-open');
  if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
}
function orderMessage() {
  let lines = ['Olá! Gostaria de consultar um pedido na Araújo Viana Lanchonete. ♡', ''];
  if (nameField.value.trim()) lines.push(`Nome: ${nameField.value.trim()}`, '');
  lines.push('Itens de interesse:');
  for (const [id, quantity] of Object.entries(cart)) {
    const product = PRODUCTS.find(p => p.id === id);
    if (product) lines.push(`• ${quantity}x ${product.name}`);
  }
  if (noteField.value.trim()) lines.push('', `Observações: ${noteField.value.trim()}`);
  lines.push('', 'Poderiam confirmar os valores e a disponibilidade? Obrigado(a)!');
  return lines.join('\n');
}
async function copyOrder() {
  if (!countItems()) return;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(orderMessage());
    } else {
      const field = document.createElement('textarea'); field.value = orderMessage();
      field.style.position='fixed'; field.style.opacity='0'; document.body.appendChild(field);
      field.select(); const ok = document.execCommand('copy'); field.remove(); if (!ok) throw new Error('copy failed');
    }
    showToast('Mensagem do pedido copiada! ♡');
  } catch (_) { showToast('Não foi possível copiar automaticamente.'); }
}
function sendOrder() {
  if (!countItems()) return;
  const number = WHATSAPP_NUMBER.replace(/\D/g,'');
  if (number && number.length < 12) { showToast('Configure um número de WhatsApp válido.'); return; }
  const url = number ? `https://wa.me/${number}?text=${encodeURIComponent(orderMessage())}` : `https://api.whatsapp.com/send?text=${encodeURIComponent(orderMessage())}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  if (!number) showToast('Escolha o contato no WhatsApp. O número da loja ainda não foi definido.');
}
function setFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll('[data-filter]').forEach(btn => {
    const selected = btn.dataset.filter === filter;
    btn.classList.toggle('is-selected', selected);
    btn.setAttribute('aria-pressed', String(selected));
  });
  renderProducts();
}

renderProducts(); renderCart();
document.getElementById('current-year').textContent = new Date().getFullYear();
if (WHATSAPP_NUMBER.replace(/\D/g,'').length >= 12) {
  checkoutBtn.innerHTML = 'Enviar para a lanchonete <span>↗</span>';
  contactNotice.textContent = 'Seu pedido será enviado para o WhatsApp da lanchonete. Valores e disponibilidade sujeitos a confirmação.';
}
document.addEventListener('click', event => {
  const add = event.target.closest('[data-add]'); if (add) return addItem(add.dataset.add);
  const remove = event.target.closest('[data-remove]'); if (remove) { delete cart[remove.dataset.remove]; persistCart(); renderCart(); return; }
  const quantity = event.target.closest('[data-quantity]'); if (quantity) return changeQuantity(quantity.dataset.quantity, Number(quantity.dataset.delta));
  if (event.target.closest('[data-open-cart]')) return openCart();
  if (event.target.closest('[data-close-and-menu]')) { closeCart(); document.getElementById('cardapio').scrollIntoView({behavior:'smooth'}); return; }
  const filter = event.target.closest('[data-filter]'); if (filter) return setFilter(filter.dataset.filter);
  const cat = event.target.closest('[data-filter-link]'); if (cat) setFilter(cat.dataset.filterLink);
});
backdrop.addEventListener('click', closeCart);
document.getElementById('close-cart').addEventListener('click', closeCart);
checkoutBtn.addEventListener('click', sendOrder);
document.getElementById('copy-btn').addEventListener('click', copyOrder);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && drawer.classList.contains('is-open')) closeCart();
  if (event.key === 'Tab' && drawer.classList.contains('is-open')) {
    const controls = [...drawer.querySelectorAll('button:not(:disabled),input,textarea')].filter(el => el.offsetParent !== null);
    if (!controls.length) return;
    const first=controls[0], last=controls[controls.length-1];
    if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
    if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
  }
});
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
menuToggle.addEventListener('click', () => {
  const opening = mobileNav.hidden;
  mobileNav.hidden = !opening;
  menuToggle.setAttribute('aria-expanded',String(opening));
  menuToggle.setAttribute('aria-label',opening?'Fechar menu':'Abrir menu');
});
mobileNav.addEventListener('click', e => {
  if (e.target.closest('a,button')) { mobileNav.hidden=true; menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','Abrir menu'); }
});
