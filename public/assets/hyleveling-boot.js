/* HyLeveling Boot Screen v8: Float via TOP + Epic Welcome Transition */
(function () {
  const KEY = "hl_lang_choice";
  const SHOW_LOADER_MS = 1850;
  const FADE_MS = 220;

  const LOGO_URL = "/assets/logo-mrfqzluw.png";

  const tips = [
    "Tip: Check #Guides to get started fast.",
    "Tip: Found a bug? Post it in #Reports.",
    "Tip: Got an idea? Drop it in #Suggestions.",
    "Tip: Use the search bar to find anything.",
  ];

  function css() {
    return `
:root{
  --hlLogoW: min(380px, 72vw);
  --hlGap: 24px;
  --hlCardW: min(680px, calc(100% - 28px));

  --hlLogoOffsetPx: -95px; /* move logo up/down (negative = up) */
  --hlFloatAmp: 55px;      /* you tuned this – keep it! */
}

/* Overlay root */
#hlBoot, #hlLangGate, #hlWelcome{
  position: fixed; inset: 0; z-index: 999999; display:none;
  font-family: inherit;
  color: rgba(255,255,255,.92);
}

/* Background */
#hlBoot .hlBg, #hlLangGate .hlBg, #hlWelcome .hlBg{
  position:absolute; inset:0;
  background:
    radial-gradient(1200px 520px at 14% 0%, rgba(168,85,247,.20), transparent 62%),
    radial-gradient(900px 520px at 88% 10%, rgba(34,211,238,.16), transparent 58%),
    radial-gradient(1100px 900px at 50% 120%, rgba(168,85,247,.10), transparent 55%),
    linear-gradient(180deg, rgba(5,8,12,.86), rgba(5,8,12,.93));
  backdrop-filter: blur(12px);
}
#hlBoot .hlBg:after, #hlLangGate .hlBg:after, #hlWelcome .hlBg:after{
  content:"";
  position:absolute; inset:0;
  pointer-events:none;
  background:
    repeating-linear-gradient(
      to bottom,
      rgba(255,255,255,.030) 0px,
      rgba(255,255,255,.030) 1px,
      transparent 2px,
      transparent 7px
    ),
    radial-gradient(900px 220px at 50% 0%, rgba(255,255,255,.06), transparent 60%);
  opacity:.55;
}

/* Layout */
.hlWrap{
  position:absolute;
  inset:0;
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  gap: var(--hlGap);
  padding: 28px 14px;
}

/* Logo */
.hlTopLogo{
  width: var(--hlLogoW);
  max-width: 440px;
  opacity: .97;
  pointer-events: none;
  z-index: 2;
  filter:
    drop-shadow(0 34px 60px rgba(0,0,0,.78))
    drop-shadow(0 0 42px rgba(168,85,247,.12))
    drop-shadow(0 0 32px rgba(34,211,238,.10));
}
.hlTopLogo img{
  width: 100%;
  height: auto;
  display: block;
}

/* FLOAT (TOP-based) */
.hlFloatWrap{
  position: relative;
  top: var(--hlLogoOffsetPx);
  will-change: top;
}
.hlFloatWrap.hlFloat{
  animation: hlFloatTop 3.6s ease-in-out infinite !important;
}
@keyframes hlFloatTop{
  0%   { top: var(--hlLogoOffsetPx); }
  50%  { top: calc(var(--hlLogoOffsetPx) - var(--hlFloatAmp)); }
  100% { top: var(--hlLogoOffsetPx); }
}

/* Card */
.hlCard{
  width: var(--hlCardW);
  position: relative;
  padding: 18px 18px 16px;
  border-radius: 24px;
  background: rgba(0,0,0,.22);
  border: 1px solid rgba(255,255,255,.12);
  box-shadow:
    0 40px 140px rgba(0,0,0,.68),
    0 0 0 1px rgba(168,85,247,.10),
    0 0 42px rgba(34,211,238,.08);
  text-align: center;
  overflow: hidden;
}
.hlCard:before{
  content:"";
  position:absolute; left:14px; right:14px; top:12px; height:2px;
  background: linear-gradient(90deg,
    transparent,
    rgba(168,85,247,.70),
    rgba(34,211,238,.55),
    transparent
  );
  opacity:.95;
}
.hlCard:after{
  content:"";
  position:absolute; inset:-2px;
  background:
    radial-gradient(900px 240px at 25% 0%, rgba(168,85,247,.12), transparent 60%),
    radial-gradient(900px 240px at 75% 0%, rgba(34,211,238,.10), transparent 60%);
  opacity:.55;
  pointer-events:none;
}

/* Text */
.hlTitle{
  font-weight: 950;
  letter-spacing: .7px;
  margin: 10px 0 6px;
  color: rgba(255,255,255,.97);
  text-shadow: 0 18px 32px rgba(0,0,0,.72);
}
.hlSub{
  margin: 0 0 12px;
  color: rgba(255,255,255,.72);
}

/* Entrance */
.hlEnterAnim{ animation: hlPop .28s ease-out both; }
@keyframes hlPop{
  from{ opacity:0; transform: translateY(8px); }
  to{ opacity:1; transform: translateY(0); }
}

/* Spinner */
.hlSpinner{
  width: 76px; height: 76px;
  margin: 10px auto 8px;
  border-radius: 999px;
  border: 2px solid rgba(255,255,255,.10);
  border-top-color: rgba(168,85,247,.82);
  border-right-color: rgba(34,211,238,.62);
  animation: hlSpin 1s linear infinite;
  box-shadow: 0 0 45px rgba(168,85,247,.12);
}
@keyframes hlSpin{ to{ transform: rotate(360deg); } }

/* Progress */
.hlProgressWrap{
  margin: 12px auto 6px;
  width: min(520px, 92%);
  height: 10px;
  border-radius: 999px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.10);
  overflow: hidden;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
}
.hlProgress{
  height: 100%;
  width: 10%;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(168,85,247,.90), rgba(34,211,238,.78));
  box-shadow: 0 10px 26px rgba(34,211,238,.12);
  transition: width .2s ease;
}
.hlTip{
  margin-top: 10px;
  font-size: 12.9px;
  color: rgba(255,255,255,.62);
  text-shadow: 0 14px 24px rgba(0,0,0,.65);
}

/* Buttons */
.hlLangBtns{
  display:flex;
  gap: 12px;
  justify-content:center;
  flex-wrap: wrap;
  margin-top: 14px;
}
.hlBtn{
  appearance:none;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.05);
  color: rgba(255,255,255,.92);
  border-radius: 16px;
  padding: 11px 14px;
  font-weight: 950;
  letter-spacing: .2px;
  cursor: pointer;
  min-width: 200px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap: 10px;
  transition: transform .14s ease, box-shadow .14s ease, border-color .14s ease, background .14s ease, filter .14s ease;
  box-shadow: 0 16px 50px rgba(0,0,0,.32);
}
.hlBtn:hover{
  transform: translateY(-2px);
  border-color: rgba(34,211,238,.22);
  box-shadow: 0 22px 76px rgba(0,0,0,.48);
  filter: brightness(1.04);
}
.hlBtn.primary{
  background: linear-gradient(90deg, rgba(168,85,247,.98), rgba(34,211,238,.88));
  color: #0b0f16;
  border: 0;
}

/* Flags */
.hlFlag{
  width: 26px; height: 18px;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,.22);
  box-shadow: 0 10px 22px rgba(0,0,0,.35);
  overflow:hidden;
  flex: 0 0 auto;
}
.hlFlag.es{
  background:
    linear-gradient(#aa151b 0 0) top/100% 25% no-repeat,
    linear-gradient(#f1bf00 0 0) center/100% 50% no-repeat,
    linear-gradient(#aa151b 0 0) bottom/100% 25% no-repeat;
}
.hlFlag.gb{
  background: linear-gradient(#012169 0 0) center/100% 100% no-repeat;
  position: relative;
}
.hlFlag.gb:before{
  content:"";
  position:absolute; inset:-2px;
  background:
    linear-gradient(45deg, transparent 46%, #fff 46% 54%, transparent 54%),
    linear-gradient(-45deg, transparent 46%, #fff 46% 54%, transparent 54%),
    linear-gradient(#fff 0 0) center/100% 18% no-repeat,
    linear-gradient(#fff 0 0) center/18% 100% no-repeat;
  opacity:.95;
}
.hlFlag.gb:after{
  content:"";
  position:absolute; inset:-2px;
  background:
    linear-gradient(#c8102e 0 0) center/100% 10% no-repeat,
    linear-gradient(#c8102e 0 0) center/10% 100% no-repeat;
  opacity:.95;
}

.hlNote{
  margin-top: 12px;
  font-size: 12.7px;
  color: rgba(255,255,255,.58);
}

/* Fade out */
.hlFadeOut{ animation: hlFade .22s ease-in forwards; }
@keyframes hlFade{ to{ opacity:0; } }

/* ===== EPIC WELCOME EFFECT ===== */
#hlWelcome{
  display:none;
}
#hlWelcome .hlFx{
  position:absolute; inset:0;
  pointer-events:none;
}
#hlWelcome .hlFlash{
  position:absolute; inset:0;
  background: radial-gradient(900px 420px at 50% 45%,
    rgba(168,85,247,.22),
    rgba(34,211,238,.14),
    transparent 70%);
  opacity: 0;
  animation: hlFlash .7s ease-out forwards;
}
@keyframes hlFlash{
  0%{ opacity:0; }
  35%{ opacity:1; }
  100%{ opacity:0; }
}
#hlWelcome .hlShock{
  position:absolute;
  left:50%; top:52%;
  width: 18px; height: 18px;
  transform: translate(-50%,-50%);
  border-radius: 999px;
  border: 2px solid rgba(34,211,238,.35);
  box-shadow:
    0 0 0 2px rgba(168,85,247,.10),
    0 0 35px rgba(34,211,238,.14);
  opacity: 0;
  animation: hlShock 1.0s ease-out forwards;
}
@keyframes hlShock{
  0%{ opacity:0; transform: translate(-50%,-50%) scale(.4); }
  18%{ opacity:1; }
  100%{ opacity:0; transform: translate(-50%,-50%) scale(28); }
}
#hlWelcome .hlText{
  position:absolute;
  left:50%; top:52%;
  transform: translate(-50%,-50%);
  text-align:center;
  padding: 14px 18px;
  border-radius: 18px;
  background: rgba(0,0,0,.22);
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: 0 30px 120px rgba(0,0,0,.65);
  opacity: 0;
  animation: hlTextIn 1.0s ease-out forwards;
}
@keyframes hlTextIn{
  0%{ opacity:0; transform: translate(-50%,-46%) scale(.98); filter: blur(4px); }
  30%{ opacity:1; filter: blur(0px); }
  80%{ opacity:1; }
  100%{ opacity:0; transform: translate(-50%,-56%) scale(1.02); }
}
#hlWelcome .hlText .big{
  font-weight: 1000;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255,255,255,.98);
  text-shadow:
    0 18px 35px rgba(0,0,0,.72),
    0 0 22px rgba(168,85,247,.18),
    0 0 18px rgba(34,211,238,.12);
  font-size: clamp(18px, 2.2vw, 28px);
}
#hlWelcome .hlText .small{
  margin-top: 6px;
  color: rgba(255,255,255,.72);
  font-size: 13px;
}

/* Mobile */
@media (max-width: 680px){
  :root{
    --hlLogoW: min(320px, 78vw);
    --hlGap: 18px;
    --hlLogoOffsetPx: -82px;
  }
}

/* Motion safety */
@media (prefers-reduced-motion: reduce){
  .hlSpinner{ animation:none !important; }
  .hlEnterAnim{ animation:none !important; }
  .hlProgress{ transition:none !important; }
  .hlFloatWrap.hlFloat{ animation-duration: 6s !important; }

  /* welcome effects still shown but calmer */
  #hlWelcome .hlShock{ animation-duration: 1.4s !important; }
}
`;
  }

  function injectCSSOnce() {
    if (document.getElementById("hlBootCSS")) return;
    const style = document.createElement("style");
    style.id = "hlBootCSS";
    style.textContent = css();
    document.head.appendChild(style);
  }

  function createOverlay(id, inner) {
    const el = document.createElement("div");
    el.id = id;
    el.innerHTML = `<div class="hlBg"></div>${inner}`;
    return el;
  }

  function ensureOverlays() {
    if (document.getElementById("hlBoot")) return;

    const boot = createOverlay(
      "hlBoot",
      `
      <div class="hlWrap">
        <div class="hlFloatWrap hlFloat">
          <div class="hlTopLogo"><img src="${LOGO_URL}" alt="HyLeveling" /></div>
        </div>

        <div class="hlCard hlEnterAnim">
          <div class="hlSpinner"></div>
          <div class="hlTitle">Entering HyLeveling…</div>
          <div class="hlSub">Charging the portal</div>

          <div class="hlProgressWrap"><div class="hlProgress" id="hlProg"></div></div>
          <div class="hlTip" id="hlTip"></div>
        </div>
      </div>`
    );
    document.body.appendChild(boot);

    const gate = createOverlay(
      "hlLangGate",
      `
      <div class="hlWrap">
        <div class="hlFloatWrap hlFloat">
          <div class="hlTopLogo"><img src="${LOGO_URL}" alt="HyLeveling" /></div>
        </div>

        <div class="hlCard hlEnterAnim">
          <div class="hlTitle">Choose your language</div>
          <div class="hlSub">You can change it later</div>

          <div class="hlLangBtns">
            <button class="hlBtn primary" data-lang="en">
              <span class="hlFlag gb" aria-hidden="true"></span>
              <span>English</span>
            </button>

            <button class="hlBtn" data-lang="es">
              <span class="hlFlag es" aria-hidden="true"></span>
              <span>Español</span>
            </button>
          </div>

          <div class="hlNote">Tip: your choice is saved.</div>
        </div>
      </div>`
    );
    document.body.appendChild(gate);

    const welcome = createOverlay(
      "hlWelcome",
      `
      <div class="hlFx">
        <div class="hlFlash"></div>
        <div class="hlShock"></div>
        <div class="hlText">
          <div class="big">WELCOME TO HYLEVELING</div>
          <div class="small">Your adventure begins now.</div>
        </div>
      </div>`
    );
    document.body.appendChild(welcome);

    gate.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lang]");
      if (!btn) return;

      const lang = btn.getAttribute("data-lang");
      localStorage.setItem(KEY, lang);

      // Hide gate nicely
      gate.classList.add("hlFadeOut");
      setTimeout(() => {
        gate.style.display = "none";
        gate.classList.remove("hlFadeOut");

        // Show welcome FX then redirect
        showWelcomeThenApply(lang);
      }, FADE_MS);
    });
  }

  function showWelcomeThenApply(lang){
    const w = document.getElementById("hlWelcome");
    w.style.display = "block";

    // Give the FX time to play, then redirect
    setTimeout(() => applyLanguage(lang), 2000);
  }

  function showWelcomeOnly() {
    const w = document.getElementById("hlWelcome");
    w.style.display = "block";
    setTimeout(() => {
      w.style.display = "none";
    }, 2500);
  }

  function applyLanguage(lang) {
    localStorage.setItem(KEY, lang);
    console.log("Idioma guardado:", lang);
    
    const gate = document.getElementById("hlLangGate");
    if (gate) {
      gate.classList.add("hlFadeOut");
      setTimeout(() => {
        gate.style.display = "none";
        gate.classList.remove("hlFadeOut");
        showWelcomeOnly();
      }, FADE_MS);
    }
  }

  function runLoaderThenGate() {
    const chosen = localStorage.getItem(KEY);
    const boot = document.getElementById("hlBoot");
    const prog = document.getElementById("hlProg");
    const tipEl = document.getElementById("hlTip");

    boot.style.display = "block";

    const loadSteps = [
      { progress: 15, duration: 200, tip: tips[0] },
      { progress: 35, duration: 400, tip: tips[1] },
      { progress: 60, duration: 350, tip: tips[2] },
      { progress: 85, duration: 450, tip: tips[3] },
      { progress: 100, duration: 350, tip: "Ready!" }
    ];

    let currentStep = 0;
    let currentProgress = 10;

    function animateStep() {
      if (currentStep >= loadSteps.length) {
        finishLoading();
        return;
      }

      const step = loadSteps[currentStep];
      const startProgress = currentProgress;
      const targetProgress = step.progress;
      const startTime = Date.now();

      tipEl.textContent = step.tip;

      function tick() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / step.duration, 1);
        
        const eased = 1 - Math.pow(1 - progress, 3);
        currentProgress = startProgress + (targetProgress - startProgress) * eased;
        
        prog.style.width = Math.floor(currentProgress) + "%";

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          currentStep++;
          setTimeout(animateStep, 100);
        }
      }

      tick();
    }

    function finishLoading() {
      boot.classList.add("hlFadeOut");
      setTimeout(() => {
        boot.style.display = "none";
        boot.classList.remove("hlFadeOut");

        if (!chosen) {
          document.getElementById("hlLangGate").style.display = "block";
        }
      }, FADE_MS);
    }

    animateStep();
  }

  function start() {
    injectCSSOnce();
    ensureOverlays();
    runLoaderThenGate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  // ==== STICKY BADGES ====
  function addStickyBadge(targetEl) {
    if (!targetEl) return;
    if (targetEl.querySelector(".hl-sticky-badge")) return;

    const b = document.createElement("span");
    b.className = "hl-sticky-badge";
    b.textContent = "STICKY";
    targetEl.appendChild(b);
  }

  function applyStickyOnDiscussionList() {
    const items = document.querySelectorAll(".DiscussionListItem");
    items.forEach((item) => {
      const hasStickySignal =
        item.classList.contains("DiscussionListItem--sticky") ||
        item.querySelector(".Badge--sticky") ||
        item.querySelector(".fa-thumbtack") ||
        item.querySelector(".icon.fa-thumbtack");

      if (!hasStickySignal) return;

      const title = item.querySelector(
        ".DiscussionListItem-title, .DiscussionListItem-main .DiscussionListItem-title"
      );
      if (!title) return;

      addStickyBadge(title);
    });
  }

  function applyStickyOnPosts() {
    const posts = document.querySelectorAll(".Post");
    posts.forEach((post) => {
      const hasStickySignal =
        post.classList.contains("Post--sticky") ||
        post.querySelector(".Badge--sticky") ||
        post.querySelector(".fa-thumbtack") ||
        post.querySelector(".icon.fa-thumbtack");

      if (!hasStickySignal) return;

      const header = post.querySelector(".Post-header, header");
      if (!header) return;

      addStickyBadge(header);
    });
  }

  function runStickyBadge() {
    applyStickyOnDiscussionList();
    applyStickyOnPosts();
  }

  setTimeout(() => {
    runStickyBadge();

    const hlStickyObserver = new MutationObserver(() => {
      clearTimeout(window.__hlStickyBadgeT);
      window.__hlStickyBadgeT = setTimeout(runStickyBadge, 40);
    });

    hlStickyObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }, 2000);

})();
