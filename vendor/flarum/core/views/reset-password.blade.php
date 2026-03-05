@extends('flarum.forum::layouts.basic')
@inject('url', 'Flarum\Http\UrlGenerator')
@section('title', $translator->trans('core.views.reset_password.title'))
@section('content')
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0b0d14;font-family:'DM Sans',sans-serif;color:#e2e8f0;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}
.rp-bg-mesh{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 80% 60% at 20% 20%,rgba(139,92,246,.12) 0%,transparent 60%),radial-gradient(ellipse 60% 80% at 80% 80%,rgba(6,182,212,.08) 0%,transparent 60%)}
.rp-grid{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:40px 40px;-webkit-mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%);mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)}
.rp-orb{position:fixed;border-radius:50%;filter:blur(60px);pointer-events:none;z-index:0}
.rp-orb1{width:300px;height:300px;background:rgba(139,92,246,.15);top:-100px;right:-50px;animation:rpfloat 8s ease-in-out infinite}
.rp-orb2{width:200px;height:200px;background:rgba(6,182,212,.1);bottom:-80px;left:-60px;animation:rpfloat 8s ease-in-out infinite;animation-delay:-4s}
@keyframes rpfloat{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(20px,-20px) scale(1.05)}66%{transform:translate(-10px,15px) scale(.97)}}
.rp-card{position:relative;z-index:1;width:100%;max-width:440px;margin:20px;background:#13151f;border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:44px 40px;box-shadow:0 30px 80px rgba(0,0,0,.5);animation:rpslide .6s cubic-bezier(.16,1,.3,1) both}
@keyframes rpslide{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
.rp-icon{width:60px;height:60px;background:linear-gradient(135deg,rgba(139,92,246,.2),rgba(6,182,212,.1));border:1px solid rgba(139,92,246,.3);border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:24px}
.rp-icon svg{width:28px;height:28px;stroke:#8b5cf6}
h1.rp-title{font-family:'Syne',sans-serif;font-size:1.65rem;font-weight:800;letter-spacing:-.02em;color:#e2e8f0;margin:0 0 8px;line-height:1.2}
p.rp-subtitle{color:#64748b;font-size:.92rem;line-height:1.6;margin-bottom:28px}
.rp-rules{background:rgba(139,92,246,.06);border:1px solid rgba(139,92,246,.15);border-radius:12px;padding:16px;margin-bottom:24px}
.rp-rules-title{font-size:.75rem;font-weight:500;text-transform:uppercase;letter-spacing:.08em;color:#8b5cf6;margin-bottom:10px}
.rp-rules ul{list-style:none;margin:0;padding:0}
.rp-rules ul li{font-size:.85rem;color:#64748b;padding:3px 0 3px 18px;position:relative;line-height:1.5}
.rp-rules ul li::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:6px;height:6px;border-radius:50%;background:#8b5cf6;opacity:.5}
.rp-field{margin-bottom:16px}
.rp-field label{display:block;font-size:.82rem;font-weight:500;color:#94a3b8;margin-bottom:7px}
.rp-input-wrap{position:relative}
.rp-input{width:100%;padding:13px 44px 13px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:10px;color:#e2e8f0;font-family:inherit;font-size:.95rem;outline:none;transition:border-color .2s,box-shadow .2s}
.rp-input::placeholder{color:#64748b}
.rp-input:focus{border-color:rgba(139,92,246,.5);box-shadow:0 0 0 3px rgba(139,92,246,.12);background:rgba(139,92,246,.05)}
.rp-eye{position:absolute;right:13px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#64748b;transition:color .2s;padding:4px;display:flex;align-items:center}
.rp-eye:hover{color:#e2e8f0}
.rp-eye svg{width:18px;height:18px;stroke:currentColor}
.rp-strength{margin-top:8px}
.rp-bars{display:flex;gap:4px;margin-bottom:4px}
.rp-bar{flex:1;height:3px;border-radius:4px;background:rgba(255,255,255,.08);transition:background .3s}
.rp-bar.weak{background:#f43f5e}
.rp-bar.medium{background:#f59e0b}
.rp-bar.strong{background:#10b981}
.rp-strength-label{font-size:.75rem;color:#64748b}
.rp-strength-label span{font-weight:500}
.rp-strength-label span.weak{color:#f43f5e}
.rp-strength-label span.medium{color:#f59e0b}
.rp-strength-label span.strong{color:#10b981}
.rp-match{margin-top:7px;font-size:.78rem;display:flex;align-items:center;gap:5px;min-height:18px}
.rp-match svg{width:14px;height:14px;stroke:currentColor;flex-shrink:0}
.rp-match.ok{color:#10b981}
.rp-match.bad{color:#f43f5e}
.rp-btn{margin-top:24px;width:100%;padding:14px;background:linear-gradient(135deg,#8b5cf6,#7c3aed);border:none;border-radius:10px;color:#fff;font-family:'Syne',sans-serif;font-size:.95rem;font-weight:700;letter-spacing:.02em;cursor:pointer;transition:transform .15s,box-shadow .2s;display:block;text-align:center}
.rp-btn:hover{transform:translateY(-1px);box-shadow:0 10px 30px rgba(139,92,246,.4)}
.rp-btn:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}
.rp-errors{background:rgba(244,63,94,.1);border:1px solid rgba(244,63,94,.3);border-radius:10px;padding:12px 16px;margin-bottom:20px;color:#f43f5e;font-size:.85rem}
.rp-errors ul{list-style:none;margin:0;padding:0}
</style>

<div class="rp-bg-mesh"></div>
<div class="rp-grid"></div>
<div class="rp-orb rp-orb1"></div>
<div class="rp-orb rp-orb2"></div>

<div class="rp-card">
  <div class="rp-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  </div>

  <h1 class="rp-title">Nueva contraseña</h1>
  <p class="rp-subtitle">Crea una contraseña segura para proteger tu cuenta en el foro.</p>

  @if ($errors->any())
  <div class="rp-errors">
    <ul>
      @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
      @endforeach
    </ul>
  </div>
  @endif

  <div class="rp-rules">
    <div class="rp-rules-title">Requisitos de seguridad</div>
    <ul>
      <li>Mínimo 8 caracteres de longitud</li>
      <li>Al menos una letra mayúscula y una minúscula</li>
      <li>Al menos un número o símbolo especial</li>
      <li>Ambas contraseñas deben coincidir exactamente</li>
    </ul>
  </div>

  <form method="POST" action="{{ $url->to('forum')->route('savePassword') }}">
    <input type="hidden" name="csrfToken" value="{{ $csrfToken }}">
    <input type="hidden" name="passwordToken" value="{{ $passwordToken }}">

    <div class="rp-field">
      <label for="rp-password">Contraseña nueva</label>
      <div class="rp-input-wrap">
        <input id="rp-password" type="password" name="password" class="rp-input" placeholder="Ingresa tu nueva contraseña" autocomplete="new-password" oninput="checkStrength()">
        <button type="button" class="rp-eye" onclick="toggleVis('rp-password',this)">
          <svg id="eye1" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="rp-strength" id="strengthWrap" style="display:none">
        <div class="rp-bars">
          <div class="rp-bar" id="b1"></div>
          <div class="rp-bar" id="b2"></div>
          <div class="rp-bar" id="b3"></div>
          <div class="rp-bar" id="b4"></div>
        </div>
        <div class="rp-strength-label">Seguridad: <span id="stext"></span></div>
      </div>
    </div>

    <div class="rp-field">
      <label for="rp-confirm">Confirmar contraseña</label>
      <div class="rp-input-wrap">
        <input id="rp-confirm" type="password" name="password_confirmation" class="rp-input" placeholder="Repite tu nueva contraseña" autocomplete="new-password" oninput="checkMatch()">
        <button type="button" class="rp-eye" onclick="toggleVis('rp-confirm',this)">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="rp-match" id="matchHint"></div>
    </div>

    <button type="submit" class="rp-btn" id="submitBtn">Guardar nueva contraseña</button>
  </form>
</div>

<script>
const eyeOpen='<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
const eyeClosed='<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>';
function toggleVis(id,btn){const i=document.getElementById(id);const s=btn.querySelector('svg');i.type=i.type==='password'?(s.innerHTML=eyeClosed,'text'):(s.innerHTML=eyeOpen,'password')}
function getStrength(p){let s=0;if(p.length>=8)s++;if(p.length>=12)s++;if(/[A-Z]/.test(p)&&/[a-z]/.test(p))s++;if(/[0-9]/.test(p)||/[^A-Za-z0-9]/.test(p))s++;return s}
function checkStrength(){
  const p=document.getElementById('rp-password').value;
  const w=document.getElementById('strengthWrap');
  if(!p){w.style.display='none';checkMatch();return}
  w.style.display='block';
  const s=getStrength(p);
  const cls=s<=1?'weak':s<=2?'medium':'strong';
  const labels={weak:'Débil',medium:'Moderada',strong:'Fuerte'};
  ['b1','b2','b3','b4'].forEach((id,i)=>{const b=document.getElementById(id);b.className='rp-bar';if(i<s)b.classList.add(cls)});
  const t=document.getElementById('stext');t.className=cls;t.textContent=labels[cls];
  checkMatch();
}
function checkMatch(){
  const p=document.getElementById('rp-password').value;
  const c=document.getElementById('rp-confirm').value;
  const h=document.getElementById('matchHint');
  if(!c){h.className='rp-match';h.innerHTML='';return}
  if(p===c){h.className='rp-match ok';h.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Las contraseñas coinciden</span>'}
  else{h.className='rp-match bad';h.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg><span>Las contraseñas no coinciden</span>'}
}
</script>
@endsection
