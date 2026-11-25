/*
 * Lotes Quinta Maria Betania — Preventa en pozo
 * - Agrega la tarjeta "Preventa en pozo" dentro de Precios (#precios).
 * - En el plano (#plano): marca con borde dorado los lotes en pozo, suma "En pozo" a la leyenda
 *   y muestra el precio en pozo en la ficha del lote.
 * Datos: Supabase, tabla mb_lotes, columna precio_pozo (NULL = el lote no está en pozo).
 * La tabla es CON RLS: la web solo lee; editar precios/estados solo administradores.
 * Idiomas: es, en, pt, it, de, fr (sigue el idioma elegido en la página).
 */
(function () {
  if (window.__mbPozo) return;
  window.__mbPozo = 1;

  var SB_URL = "https://mxzyqybvgeexxkjjytxp.supabase.co";
  var SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14enlxeWJ2Z2VleHhramp5dHhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2OTU1ODQsImV4cCI6MjEwMTI3MTU4NH0.36R5L0dkCl1lsCGybmV00NEH9HhwBjA4eRh4pemnnyY";
  var WA = "https://wa.me/595981174005?text=";

  var T = {
    es: { kick: "Preventa en pozo", off: "{d} % OFF al contado", title: "Comprá en pozo y pagá {d} % menos",
      desc: "Precio especial de preventa, solo para pago al contado. Elegís tu lote ahora, antes del lanzamiento, y te asegurás el mejor precio del loteamiento.",
      from: "Lote de 1.000 m² desde", before: "Precio de lista", save: "Ahorrás ₲ {s}",
      left: "Quedan {n} de {t} lotes en pozo", out: "Preventa en pozo agotada",
      cta: "Quiero mi lote en pozo →", map: "Ver los lotes en pozo en el plano →",
      legend: "En pozo · {d} % OFF", panel: "Precio en pozo (contado)", panelSave: "{d} % OFF · ahorrás ₲ {s}",
      wa: "Hola, me interesa la preventa en pozo de Lotes Quinta Maria Betania", waLot: "Hola, me interesa el lote {l} en pozo (₲ {p} al contado) de Lotes Quinta Maria Betania" },
    en: { kick: "Pre-sale (off-plan)", off: "{d}% OFF cash price", title: "Buy off-plan and pay {d}% less",
      desc: "Special pre-sale price, cash payment only. Choose your lot now, before the launch, and lock in the best price of the development.",
      from: "1,000 m² lot from", before: "List price", save: "You save ₲ {s}",
      left: "{n} of {t} off-plan lots left", out: "Off-plan pre-sale sold out",
      cta: "I want my off-plan lot →", map: "See the off-plan lots on the map →",
      legend: "Off-plan · {d}% OFF", panel: "Off-plan price (cash)", panelSave: "{d}% OFF · you save ₲ {s}",
      wa: "Hi, I'm interested in the off-plan pre-sale at Lotes Quinta Maria Betania", waLot: "Hi, I'm interested in off-plan lot {l} (₲ {p} cash) at Lotes Quinta Maria Betania" },
    pt: { kick: "Pré-venda na planta", off: "{d}% OFF à vista", title: "Compre na planta e pague {d}% menos",
      desc: "Preço especial de pré-venda, só para pagamento à vista. Escolha seu lote agora, antes do lançamento, e garanta o melhor preço do loteamento.",
      from: "Lote de 1.000 m² a partir de", before: "Preço de tabela", save: "Você economiza ₲ {s}",
      left: "Restam {n} de {t} lotes na planta", out: "Pré-venda na planta esgotada",
      cta: "Quero meu lote na planta →", map: "Ver os lotes na planta no mapa →",
      legend: "Na planta · {d}% OFF", panel: "Preço na planta (à vista)", panelSave: "{d}% OFF · você economiza ₲ {s}",
      wa: "Olá, tenho interesse na pré-venda na planta de Lotes Quinta Maria Betania", waLot: "Olá, tenho interesse no lote {l} na planta (₲ {p} à vista) de Lotes Quinta Maria Betania" },
    it: { kick: "Prevendita su progetto", off: "{d}% di sconto in contanti", title: "Compra su progetto e paghi il {d}% in meno",
      desc: "Prezzo speciale di prevendita, solo per pagamento in contanti. Scegli il tuo lotto ora, prima del lancio, e ti assicuri il miglior prezzo.",
      from: "Lotto da 1.000 m² da", before: "Prezzo di listino", save: "Risparmi ₲ {s}",
      left: "Restano {n} di {t} lotti su progetto", out: "Prevendita su progetto esaurita",
      cta: "Voglio il mio lotto su progetto →", map: "Vedi i lotti su progetto sulla mappa →",
      legend: "Su progetto · {d}% di sconto", panel: "Prezzo su progetto (contanti)", panelSave: "{d}% di sconto · risparmi ₲ {s}",
      wa: "Buongiorno, mi interessa la prevendita su progetto di Lotes Quinta Maria Betania", waLot: "Buongiorno, mi interessa il lotto {l} su progetto (₲ {p} in contanti) di Lotes Quinta Maria Betania" },
    de: { kick: "Vorverkauf", off: "{d} % Rabatt bei Barzahlung", title: "Im Vorverkauf kaufen und {d} % sparen",
      desc: "Sonderpreis im Vorverkauf, nur bei Barzahlung. Wählen Sie Ihr Grundstück jetzt, vor dem Start, und sichern Sie sich den besten Preis.",
      from: "Grundstück 1.000 m² ab", before: "Listenpreis", save: "Sie sparen ₲ {s}",
      left: "Noch {n} von {t} Grundstücken im Vorverkauf", out: "Vorverkauf ausverkauft",
      cta: "Mein Grundstück im Vorverkauf →", map: "Vorverkaufs-Grundstücke im Plan ansehen →",
      legend: "Vorverkauf · {d} % Rabatt", panel: "Vorverkaufspreis (bar)", panelSave: "{d} % Rabatt · Sie sparen ₲ {s}",
      wa: "Hallo, ich interessiere mich für den Vorverkauf von Lotes Quinta Maria Betania", waLot: "Hallo, ich interessiere mich für Grundstück {l} im Vorverkauf (₲ {p} bar) bei Lotes Quinta Maria Betania" },
    fr: { kick: "Prévente sur plan", off: "{d} % de remise au comptant", title: "Achetez sur plan et payez {d} % de moins",
      desc: "Prix spécial de prévente, uniquement au comptant. Choisissez votre lot maintenant, avant le lancement, et réservez le meilleur prix.",
      from: "Lot de 1 000 m² à partir de", before: "Prix catalogue", save: "Vous économisez ₲ {s}",
      left: "Plus que {n} sur {t} lots sur plan", out: "Prévente sur plan épuisée",
      cta: "Je veux mon lot sur plan →", map: "Voir les lots sur plan sur la carte →",
      legend: "Sur plan · {d} % de remise", panel: "Prix sur plan (comptant)", panelSave: "{d} % de remise · vous économisez ₲ {s}",
      wa: "Bonjour, la prévente sur plan de Lotes Quinta Maria Betania m'intéresse", waLot: "Bonjour, le lot {l} sur plan (₲ {p} comptant) de Lotes Quinta Maria Betania m'intéresse" }
  };

  var lots = {};        // id -> {estado, contado, pozo}
  var stats = null;     // {total, left, desc, minPozo, minContado}
  var lastLot = null;

  function lang() { var l = (document.documentElement.lang || "es").slice(0, 2).toLowerCase(); return T[l] ? l : "es"; }
  function t(k, v) { var s = T[lang()][k] || T.es[k]; v = v || {}; return s.replace(/\{(\w)\}/g, function (_, x) { return v[x] != null ? v[x] : ""; }); }
  function fmt(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function lotName(id) { var m = /^M(\d+)-L(\d+)$/.exec(id); return m ? "Mz " + m[1] + " · Lote " + m[2] : id; }

  var CSS =
    "#mbPozo{position:relative;margin:0 0 1.25rem;border:1px solid rgba(234,210,160,.75);border-radius:.8rem;padding:clamp(1.5rem,3vw,2.4rem);" +
    "background:linear-gradient(135deg,rgba(234,210,160,.16) 0%,rgba(234,210,160,.05) 60%,rgba(0,0,0,.08) 100%);color:#fbf8f0;overflow:hidden;box-sizing:border-box;max-width:100%}" +
    "#mbPozo *{box-sizing:border-box;font-family:'Lexend',system-ui,-apple-system,'Segoe UI',sans-serif}" +
    "#mbPozo .mbz-grid{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:clamp(1.25rem,3vw,2.5rem);align-items:center}" +
    "#mbPozo .mbz-kick{display:inline-flex;align-items:center;gap:.6rem;flex-wrap:wrap;margin:0 0 .9rem;font-size:.72rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#ead2a0}" +
    "#mbPozo .mbz-off{background:linear-gradient(135deg,#f0dbad 0%,#ead2a0 100%);color:#172f25;border-radius:999px;padding:.32rem .75rem;letter-spacing:.08em;font-weight:700}" +
    "#mbPozo h3{margin:0 0 .75rem;font-size:clamp(1.45rem,1.1rem + 1.3vw,2.1rem);font-weight:650;line-height:1.12;letter-spacing:-.03em;color:#fbf8f0}" +
    "#mbPozo .mbz-desc{margin:0;font-size:.96rem;font-weight:300;line-height:1.65;color:rgba(251,248,240,.82)}" +
    "#mbPozo .mbz-left{display:flex;align-items:center;gap:.55rem;margin:1.1rem 0 0;font-size:.88rem;font-weight:600;color:#ead2a0}" +
    "#mbPozo .mbz-left i{width:8px;height:8px;border-radius:50%;background:#ead2a0;box-shadow:0 0 0 4px rgba(234,210,160,.2);flex:none}" +
    "#mbPozo .mbz-bar{height:6px;margin-top:.6rem;border-radius:99px;background:rgba(251,248,240,.14);overflow:hidden;max-width:360px}" +
    "#mbPozo .mbz-bar b{display:block;height:100%;border-radius:99px;background:#ead2a0}" +
    "#mbPozo .mbz-price{border-radius:.7rem;background:rgba(23,47,37,.55);border:1px solid rgba(251,248,240,.12);padding:clamp(1.2rem,2.5vw,1.7rem)}" +
    "#mbPozo .mbz-from{margin:0;font-size:.74rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:rgba(251,248,240,.68)}" +
    "#mbPozo .mbz-amt{margin:.35rem 0 0;font-size:clamp(2rem,1.5rem + 2vw,2.8rem);font-weight:700;letter-spacing:-.035em;line-height:1.05;color:#fbf8f0;font-variant-numeric:tabular-nums;white-space:nowrap}" +
    "#mbPozo .mbz-was{margin:.5rem 0 0;font-size:.9rem;color:rgba(251,248,240,.62)}" +
    "#mbPozo .mbz-was s{text-decoration-thickness:1px}" +
    "#mbPozo .mbz-save{display:inline-block;margin-top:.55rem;font-size:.82rem;font-weight:600;color:#172f25;background:#ead2a0;border-radius:.35rem;padding:.25rem .55rem}" +
    "#mbPozo .mbz-cta{display:flex;align-items:center;justify-content:center;min-height:50px;margin-top:1.1rem;padding:0 1.2rem;border-radius:.45rem;" +
    "background:linear-gradient(135deg,#f0dbad 0%,#ead2a0 100%);color:#172f25;font-size:.84rem;font-weight:700;letter-spacing:.04em;text-decoration:none;text-align:center}" +
    "#mbPozo .mbz-cta:hover{filter:brightness(1.05)}" +
    "#mbPozo .mbz-map{display:inline-block;margin-top:.85rem;font-size:.8rem;font-weight:600;color:#ead2a0;text-decoration:none}" +
    "#mbPozo .mbz-map:hover{color:#fbf8f0}" +
    "#mbPozo.mbz-sold{opacity:.6}" +
    "@media(max-width:760px){#mbPozo .mbz-grid{grid-template-columns:1fr}#mbPozo .mbz-amt{white-space:normal}}" +
    /* Plano */
    "#plano .mbp-lot.mbz-lot{stroke:#E2B65C;stroke-width:2.6px;stroke-dasharray:5 3;paint-order:stroke}" +
    "#plano .mbz-leg i{display:inline-block;width:12px;height:12px;border-radius:3px;border:2px dashed #E2B65C;background:#3F8F5B;vertical-align:-2px;margin-right:6px}" +
    "#plano .mbz-box{margin:.75rem 0;padding:.8rem .9rem;border-radius:.55rem;border:1px solid #E2B65C;background:rgba(226,182,92,.14)}" +
    "#plano .mbz-box .mbz-bk{margin:0;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#b07d2b}" +
    "#plano .mbz-box .mbz-bp{margin:.25rem 0 0;font-size:22px;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums}" +
    "#plano .mbz-box .mbz-bs{margin:.2rem 0 0;font-size:12px;opacity:.8}" +
    "#plano .mbz-box a{display:inline-block;margin-top:.5rem;font-size:12px;font-weight:700;color:#b07d2b;text-decoration:none}";

  function addCSS() {
    if (document.getElementById("mbPozoCSS")) return;
    var st = document.createElement("style");
    st.id = "mbPozoCSS";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* ---------- Tarjeta en Precios ---------- */
  function renderCard() {
    if (!stats || !stats.total) return;
    var host = document.querySelector("#precios .container");
    if (!host) return;
    var box = document.getElementById("mbPozo");
    if (!box) {
      box = document.createElement("div");
      box.id = "mbPozo";
      var after = host.querySelector(".urgencia-banner");
      var grid = host.querySelector(".precios-grid");
      if (after && after.nextSibling) host.insertBefore(box, after.nextSibling);
      else if (grid) host.insertBefore(box, grid);
      else host.appendChild(box);
    }
    var d = stats.desc, sold = stats.left === 0;
    var pct = Math.max(4, Math.round((stats.left / stats.total) * 100));
    box.className = sold ? "mbz-sold" : "";
    box.innerHTML =
      '<div class="mbz-grid"><div>' +
      '<p class="mbz-kick">' + esc(t("kick")) + ' <span class="mbz-off">' + esc(t("off", { d: d })) + "</span></p>" +
      "<h3>" + esc(t("title", { d: d })) + "</h3>" +
      '<p class="mbz-desc">' + esc(t("desc")) + "</p>" +
      '<p class="mbz-left"><i></i>' + esc(sold ? t("out") : t("left", { n: stats.left, t: stats.total })) + "</p>" +
      '<div class="mbz-bar" aria-hidden="true"><b style="width:' + (sold ? 0 : pct) + '%"></b></div>' +
      '<a class="mbz-map" href="#plano">' + esc(t("map")) + "</a>" +
      '</div><div class="mbz-price">' +
      '<p class="mbz-from">' + esc(t("from")) + "</p>" +
      '<p class="mbz-amt">₲ ' + fmt(stats.minPozo) + "</p>" +
      '<p class="mbz-was">' + esc(t("before")) + ": <s>₲ " + fmt(stats.minContado) + "</s></p>" +
      '<span class="mbz-save">' + esc(t("save", { s: fmt(stats.minContado - stats.minPozo) })) + "</span>" +
      (sold ? "" : '<a class="mbz-cta" target="_blank" rel="noopener" href="' + WA + encodeURIComponent(t("wa")) + '">' + esc(t("cta")) + "</a>") +
      "</div></div>";
  }

  /* ---------- Plano ---------- */
  function markLots() {
    var plano = document.getElementById("plano");
    if (!plano) return;
    var paths = plano.querySelectorAll(".mbp-lot[data-id]");
    for (var i = 0; i < paths.length; i++) {
      var id = paths[i].getAttribute("data-id"), L = lots[id];
      var on = !!(L && L.estado === "disponible");
      if (on !== paths[i].classList.contains("mbz-lot")) paths[i].classList.toggle("mbz-lot", on);
    }
    var leg = plano.querySelector(".mbp-legend");
    if (leg && stats && stats.left > 0) {
      var it = leg.querySelector(".mbz-leg");
      var txt = t("legend", { d: stats.desc });
      if (!it) { it = document.createElement("span"); it.className = "mbz-leg"; leg.appendChild(it); }
      if (it.textContent !== txt) it.innerHTML = "<i></i>" + esc(txt);
    }
  }

  function fillPanel() {
    var plano = document.getElementById("plano");
    if (!plano) return;
    var panel = plano.querySelector(".mbp-panel");
    if (!panel) return;
    var old = panel.querySelector(".mbz-box");
    var L = lastLot && lots[lastLot];
    if (!L || L.estado !== "disponible" || !panel.classList.contains("open")) { if (old) old.remove(); return; }
    if (old && old.getAttribute("data-id") === lastLot + "|" + lang()) return;
    if (old) old.remove();
    var d = Math.round((1 - L.pozo / L.contado) * 100);
    var box = document.createElement("div");
    box.className = "mbz-box";
    box.setAttribute("data-id", lastLot + "|" + lang());
    box.innerHTML =
      '<p class="mbz-bk">' + esc(t("panel")) + "</p>" +
      '<p class="mbz-bp">₲ ' + fmt(L.pozo) + "</p>" +
      '<p class="mbz-bs">' + esc(t("panelSave", { d: d, s: fmt(L.contado - L.pozo) })) + "</p>" +
      '<a target="_blank" rel="noopener" href="' + WA + encodeURIComponent(t("waLot", { l: lotName(lastLot), p: fmt(L.pozo) })) + '">' + esc(t("cta")) + "</a>";
    var btn = panel.querySelector(".mbp-btn");
    if (btn) panel.insertBefore(box, btn); else panel.appendChild(box);
  }

  function watchPlano() {
    document.addEventListener("click", pick, true);
    document.addEventListener("keydown", pick, true);
    function pick(e) {
      var el = e.target && e.target.closest ? e.target.closest("#plano .mbp-lot[data-id]") : null;
      if (el) { lastLot = el.getAttribute("data-id"); setTimeout(fillPanel, 30); setTimeout(fillPanel, 250); }
    }
    var pending = false;
    new MutationObserver(function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () { pending = false; markLots(); fillPanel(); if (!document.getElementById("mbPozo")) renderCard(); });
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    new MutationObserver(function () { renderCard(); markLots(); var b = document.querySelector("#plano .mbz-box"); if (b) b.remove(); fillPanel(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  function load() {
    var url = SB_URL + "/rest/v1/mb_lotes?select=id,estado,precio_contado,precio_pozo&precio_pozo=not.is.null";
    fetch(url, { headers: { apikey: SB_KEY, Authorization: "Bearer " + SB_KEY } })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (rows) {
        if (!rows || !rows.length) return;
        var left = 0, minP = Infinity, minC = 0, ref = null;
        rows.forEach(function (r) {
          lots[r.id] = { estado: r.estado, contado: +r.precio_contado, pozo: +r.precio_pozo };
          if (r.estado === "disponible") {
            left++;
            if (+r.precio_pozo < minP) { minP = +r.precio_pozo; minC = +r.precio_contado; ref = r; }
          }
        });
        if (!ref) { rows.forEach(function (r) { if (+r.precio_pozo < minP) { minP = +r.precio_pozo; minC = +r.precio_contado; ref = r; } }); }
        stats = { total: rows.length, left: left, minPozo: minP, minContado: minC, desc: Math.round((1 - minP / minC) * 100) };
        addCSS(); renderCard(); markLots(); watchPlano();
      })
      .catch(function () {});
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load); else load();
})();
