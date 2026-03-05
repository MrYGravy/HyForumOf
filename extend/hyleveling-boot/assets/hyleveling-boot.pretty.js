(function(){
  
  const BOOT_MS = 900;
   // duración del loader
  const KEY = "hl_lang";
  

  function ensureOverlays(){
    
    if (document.getElementById("hlBoot")) return;
    

    const boot = document.createElement("div");
    
    boot.id = "hlBoot";
    
    boot.innerHTML = `
      <div class="hlBoot-bg"></div>
      <div class="hlBoot-card">
        <div class="hlBoot-ring"></div>
        <div class="hlBoot-title">Entrando a HyLeveling…</div>
        <div class="hlBoot-sub">Preparando la aventura</div>
      </div>
    `;
    
    document.body.appendChild(boot);
    

    const gate = document.createElement("div");
    
    gate.id = "hlLangGate";
    
    gate.innerHTML = `
      <div class="hlBoot-bg"></div>
      <div class="hlBoot-card">
        <div class="hlBoot-title">Elige tu idioma</div>
        <div class="hlBoot-sub">Choose your language</div>
        <div class="hlLangBtns">
          <button class="hlLangBtn primary" data-lang="es">Español</button>
          <button class="hlLangBtn" data-lang="en">English</button>
        </div>
        <div class="hlBoot-note">Puedes cambiarlo después desde tu perfil.</div>
      </div>
    `;
    
    document.body.appendChild(gate);
    

    gate.addEventListener("click", (e)=>{
      
      const btn = e.target.closest("[data-lang]");
      
      if (!btn) return;
      
      const lang = btn.getAttribute("data-lang");
      
      localStorage.setItem(KEY, lang);
      
      gate.style.display = "none";
      
      applyLanguage(lang);
      
    }
    );
    
  }
  

  function applyLanguage(lang){
    
    const url = new URL(window.location.href);
    
    url.searchParams.set("locale", lang);
    
    window.location.replace(url.toString());
    
  }
  

  function start(){
    
    ensureOverlays();
    

    const chosen = localStorage.getItem(KEY);
    

    const boot = document.getElementById("hlBoot");
    
    boot.style.display = "block";
    

    setTimeout(()=>{
      
      boot.style.display = "none";
      
      if (!chosen){
        
        document.getElementById("hlLangGate").style.display = "block";
        
      }
      
    }
    , BOOT_MS);
    
  }
  

  if (document.readyState === "loading"){
    
    document.addEventListener("DOMContentLoaded", start);
    
  }
   else start();
  
}
)();


