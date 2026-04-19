(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=a(i);fetch(i.href,s)}})();const E=[{name:"Food",basePrice:40,variance:15,icon:"🌾"},{name:"Textiles",basePrice:80,variance:30,icon:"🧵"},{name:"Radioactives",basePrice:150,variance:50,icon:"☢️"},{name:"Slaves",basePrice:200,variance:80,icon:"⛓️"},{name:"Liquor",basePrice:300,variance:100,icon:"🍷"},{name:"Luxuries",basePrice:500,variance:200,icon:"💎"},{name:"Narcotics",basePrice:2500,variance:400,icon:"💊"},{name:"Computers",basePrice:100,variance:40,icon:"💻"},{name:"Machinery",basePrice:500,variance:150,icon:"⚙️"},{name:"Alloys",basePrice:800,variance:200,icon:"🔩"},{name:"Firearms",basePrice:1200,variance:300,icon:"🔫"},{name:"Furs",basePrice:1500,variance:400,icon:"🦊"},{name:"Minerals",basePrice:250,variance:70,icon:"🪨"},{name:"Ores",basePrice:60,variance:20,icon:"ite"},{name:"Water",basePrice:20,variance:10,icon:"💧"}],I=[{name:"Sidewinder",price:0,cargo:15,maxSpeed:18,laser:1,shield:1,description:"Стартовый корабль",color:"#4a9eff",svg:'<path d="M16 2 L22 8 L22 12 L18 10 L18 18 L14 18 L14 10 L10 12 L10 8 Z" fill="currentColor"/>',stats:{agility:8,cargo:15,Lasers:1,shields:1,speed:18}},{name:"Adder",price:14e3,cargo:20,maxSpeed:16,laser:1,shield:1,description:"Грузовой корабль",color:"#6aff6a",svg:'<path d="M16 2 L24 8 L26 14 L24 20 L22 22 L18 20 L18 14 L14 14 L14 20 L10 22 L8 20 L6 14 L8 8 Z" fill="currentColor"/>',stats:{agility:5,cargo:20,lasers:1,shields:1,speed:16}},{name:"Mamba",price:16e3,cargo:15,maxSpeed:22,laser:1,shield:1,description:"Гоночный корабль",color:"#ff6b6b",svg:'<path d="M16 2 L20 6 L22 8 L20 12 L18 8 L18 18 L14 18 L14 8 L12 12 L10 8 L8 6 Z" fill="currentColor"/>',stats:{agility:9,cargo:15,lasers:1,shields:1,speed:22}},{name:"Cobra III",price:26e3,cargo:20,maxSpeed:20,laser:2,shield:2,description:"Универсальный корабль",color:"#ffa500",svg:'<path d="M16 2 L24 6 L24 10 L26 14 L24 18 L22 22 L18 20 L18 12 L14 12 L14 20 L10 22 L8 18 L6 14 L8 10 L8 6 Z" fill="currentColor"/>',stats:{agility:7,cargo:20,lasers:2,shields:2,speed:20}},{name:"Anaconda",price:8e4,cargo:80,maxSpeed:14,laser:2,shield:3,description:"Тяжёлый грузовик",color:"#9370db",svg:'<path d="M12 2 L20 4 L24 8 L26 14 L26 20 L24 24 L20 26 L12 26 L8 26 L4 24 L2 20 L2 14 L4 8 L8 4 Z M12 8 L16 10 L16 18 L12 20 Z" fill="currentColor"/>',stats:{agility:3,cargo:80,lasers:2,shields:3,speed:14}},{name:"Python",price:12e4,cargo:40,maxSpeed:20,laser:3,shield:3,description:"Военный крейсер",color:"#ff69b4",svg:'<path d="M12 2 L20 4 L24 8 L24 12 L28 16 L26 22 L22 24 L16 24 L14 20 L16 16 L16 12 L14 12 L14 16 L12 20 L10 24 L4 24 L2 22 L2 16 L6 12 L6 8 L8 4 Z" fill="currentColor"/>',stats:{agility:5,cargo:40,lasers:3,shields:3,speed:20}},{name:"Fer-de-Lance",price:2e5,cargo:30,maxSpeed:28,laser:3,shield:4,description:"Элитный истребитель",color:"#00ced1",svg:'<path d="M16 2 L20 6 L22 8 L20 12 L18 10 L18 18 L14 18 L14 10 L12 12 L10 8 L8 6 Z M10 12 L6 14 L6 16 L10 16 Z M22 12 L26 14 L26 16 L22 16 Z" fill="currentColor"/>',stats:{agility:9,cargo:30,lasers:3,shields:4,speed:28}},{name:"Krait",price:35e4,cargo:25,maxSpeed:24,laser:3,shield:4,description:"Охотник за головами",color:"#da70d6",svg:'<path d="M16 2 L22 8 L22 12 L24 16 L22 22 L18 20 L18 14 L16 14 L16 20 L12 22 L10 16 L12 12 L12 8 Z M14 14 L18 14 L18 18 L14 18 Z" fill="currentColor"/>',stats:{agility:8,cargo:25,lasers:3,shields:4,speed:24}},{name:"Eagle II",price:5e5,cargo:50,maxSpeed:30,laser:4,shield:5,description:"Элитный боевой",color:"#ffd700",svg:'<path d="M16 2 L22 6 L22 10 L26 14 L24 22 L20 24 L16 24 L12 24 L8 22 L6 14 L10 10 L10 6 Z M12 10 L16 12 L20 10 L16 16 Z" fill="currentColor"/>',stats:{agility:10,cargo:50,lasers:4,shields:5,speed:30}}],$={fuelTanks:[{name:"Доп. бак I",price:1500,capacity:20,description:"+20 к топливу",icon:"⛽"},{name:"Доп. бак II",price:3500,capacity:40,description:"+40 к топливу",icon:"⛽"},{name:"Доп. бак III",price:7e3,capacity:60,description:"+60 к топливу",icon:"⛽"}],cargoRacks:[{name:"Грузовой отсек +5",price:2e3,capacity:5,description:"+5 к грузу",icon:"📦"},{name:"Грузовой отсек +10",price:4500,capacity:10,description:"+10 к грузу",icon:"📦"},{name:"Грузовой отсек +20",price:1e4,capacity:20,description:"+20 к грузу",icon:"📦"}],energy:[{name:"Энергоячейка I",price:2500,capacity:20,description:"+20 энергия щитов",icon:"⚡"},{name:"Энергоячейка II",price:6e3,capacity:40,description:"+40 энергия щитов",icon:"⚡"},{name:"Энергоячейка III",price:12e3,capacity:60,description:"+60 энергия щитов",icon:"⚡"}]},P=[{name:"Импульсный",price:0,damage:10,color:"#00ff00",rate:500},{name:"Лучевой",price:5e3,damage:20,color:"#00ffff",rate:400},{name:"Военный",price:15e3,damage:35,color:"#ff6600",rate:300},{name:"Военный II",price:4e4,damage:50,color:"#ff00ff",rate:200}],O=[{name:"Mk I",price:0,level:1,color:"#4a9eff",recharge:.5},{name:"Mk II",price:8e3,level:2,color:"#6aff6a",recharge:.8},{name:"Mk III",price:2e4,level:3,color:"#ffa500",recharge:1.2},{name:"Mk IV",price:5e4,level:4,color:"#ff69b4",recharge:1.8},{name:"Mk V",price:1e5,level:5,color:"#ffd700",recharge:2.5}],A=[{name:"Анархия",color:"g0",aggression:.8,police:.1},{name:"Феодализм",color:"g1",aggression:.5,police:.4},{name:"Мульти-прав",color:"g2",aggression:.3,police:.5},{name:"Диктатура",color:"g3",aggression:.4,police:.7},{name:"Коммунизм",color:"g4",aggression:.2,police:.6},{name:"Федерация",color:"g5",aggression:.1,police:.9},{name:"Демократия",color:"g6",aggression:.15,police:.8},{name:"Корпорация",color:"g7",aggression:.35,police:.5}],Z=["Alphix","Bethe","Gammix","Deltix","Epsilon","Zeta","Eta","Theta","Iota","Kappa","Lambda","Mu","Nu","Xi","Omicron","Pi","Rho","Sigma","Tau","Upsilon","Phi","Chi","Psi","Omega","Andor","Betel","Caph","Deneb","Elara","Fomal","Gienah","Hadar","Izar","Kocab","Markab","Nunki","Orion","Polaris","Rigel","Sirius","Vega","Altair","Achernar","Canopus","Castor","Denebola","Elnath","Fenir","Aldebaran","Arcturus","Capella","Procyon","Spica","Regulus","Pollux","Mirfak","Shaula","Wezen","Hamal","Menkar"].filter(e=>e),F=[{name:"Безвредный",kills:0,bonus:0},{name:"Почти безвредный",kills:5,bonus:.05},{name:"Бедняк",kills:10,bonus:.1},{name:"Средний",kills:20,bonus:.15},{name:"Выше среднего",kills:35,bonus:.2},{name:"Компетентный",kills:50,bonus:.25},{name:"Опасный",kills:75,bonus:.3},{name:"Смертельный",kills:100,bonus:.4},{name:"Элита",kills:150,bonus:.5}],Y=[{name:"Пират",baseHealth:30,damage:5,speed:1,reward:150,color:"#ff4444",aggression:.8},{name:"Контрабандист",baseHealth:40,damage:8,speed:1.2,reward:200,color:"#ff8800",aggression:.5},{name:"Охотник",baseHealth:50,damage:10,speed:.9,reward:300,color:"#ff00ff",aggression:.9},{name:"Убийца",baseHealth:70,damage:15,speed:1.1,reward:500,color:"#8800ff",aggression:1},{name:"Наёмник",baseHealth:60,damage:12,speed:1,reward:400,color:"#00ff88",aggression:.7}],ee=32;function U(e,t){const a={};return E.forEach((n,i)=>{let s=n.basePrice+(t-7)*10+(e-4)*5+(Math.random()-.5)*n.variance;a[i]=Math.max(10,Math.floor(s))}),a}function N(){const e=[],t=new Set;for(let a=0;a<ee;a++){let n;do n=Z[a%Z.length]+(a>=24?"-"+Math.floor(a/24):"");while(t.has(n));t.add(n),e.push({id:a,name:n,government:Math.floor(Math.random()*8),economy:Math.floor(Math.random()*8),techLevel:Math.floor(Math.random()*14)+1,x:(Math.random()-.5)*100,y:(Math.random()-.5)*100,prices:U(Math.floor(Math.random()*8),Math.floor(Math.random()*14)+1)})}return e}function te(e,t){const a=t.x-e.x,n=t.y-e.y;return Math.sqrt(a*a+n*n)}function ae(e,t){return Math.ceil(te(e,t)*2)}function _(e,t){return e.find(a=>a.id===t)}function R(e){return{name:e,credits:1e3,rank:0,kills:0,currentShip:"Sidewinder",cargo:{},cargoCapacity:15,fuel:100,maxFuel:100,hull:100,maxHull:100,shields:100,maxShields:100,laser:0,shield:0,hasScoop:!1,visitedSystems:[0]}}function B(e){return Object.values(e.cargo).reduce((t,a)=>t+a,0)}function z(e){return F.find((t,a)=>a===e.rank)||F[0]}const W="eg",se="ep_";let r={user:null,player:null,galaxy:[],currentSystem:0,docked:!0,inCombat:!1,speed:0,flightTime:0,enemies:[],projectiles:[],stars:[],particles:[],animationId:null,lastUpdate:0,policeLevel:0,missions:[],combatLog:[]};function ne(e){const t=N();return r={...r,user:e,player:R(e),galaxy:t,currentSystem:0,docked:!0,inCombat:!1,speed:0,flightTime:0,enemies:[],projectiles:[],stars:[],particles:[],policeLevel:0,missions:[],combatLog:[]},r}function ie(e){try{const t=localStorage.getItem(W);t?r.galaxy=JSON.parse(t):r.galaxy=N();const a=localStorage.getItem(se+e);a?r.player=JSON.parse(a):r.player=R(e),r.user=e,r.currentSystem=r.player.visitedSystems[0]||0,r.galaxy.forEach(n=>{n.prices=U(n.economy,n.techLevel)})}catch(t){console.error("Load error:",t),r.player=R(e),r.galaxy=N()}return r}function v(){if(!(!r.player||!r.user))try{localStorage.setItem(storage_KEY_PLAYER+r.user,JSON.stringify(r.player)),localStorage.setItem(W,JSON.stringify(r.galaxy))}catch(e){console.warn("Save failed:",e)}}function u(){return r}function oe(){return r.galaxy.length===0?null:r.galaxy[r.currentSystem]||null}function ce(e){const t=_(r.galaxy,r.currentSystem),a=_(r.galaxy,e);if(!t||!a)return{success:!1,error:"Invalid system"};if(e===r.currentSystem)return{success:!1,error:"Already there"};const n=ae(t,a);if(r.player.fuel<n)return{success:!1,error:`Need ${n}% fuel`};r.player.fuel-=n,r.player.visitedSystems.includes(e)||r.player.visitedSystems.push(e);const i=Math.random()<.3;return r.currentSystem=e,r.docked=!i,r.inCombat=i,i&&re(),v(),{success:!0,encounter:i,systemName:a.name}}function re(){const e=oe();e&&r.galaxy[e.id]?.government;const t=Math.floor(Math.random()*3)+1,a=Math.floor(r.player.rank/2),n=Math.min(5,t+a);r.enemies=[],r.particles=[];for(let i=0;i<n;i++){const s=Y[Math.floor(Math.random()*Y.length)],c=r.player.rank*5;r.enemies.push({...s,id:i,health:s.baseHealth+c+Math.floor(Math.random()*40),maxHealth:s.baseHealth+c+Math.floor(Math.random()*40),alive:!0,lastAttack:0,x:(Math.random()-.5)*200,y:(Math.random()-.5)*150,vx:(Math.random()-.5)*s.speed,vy:(Math.random()-.5)*s.speed,targetX:0,targetY:0})}r.inCombat=!0,r.docked=!1,r.speed=2,r.projectiles=[],r.lastUpdate=Date.now(),j(`⚠️ АТАКА! ${n} врагов приближаются!`)}function j(e){r.combatLog.push({time:Date.now(),message:e}),r.combatLog.length>50&&r.combatLog.shift()}function le(){r.docked=!0,r.speed=0,r.inCombat=!1,r.enemies=[],r.projectiles=[];const e=O[r.player.shield]?.recharge||.5,t=Math.floor(r.player.maxShields*e);r.player.shields=Math.min(r.player.maxShields,r.player.shields+t),j("⚓ Швартовка на станции"),v()}function de(e,t,a){const n=r.player,i=B(n),s=n.cargoCapacity-i;if(s<=0)return{success:!1,error:"No cargo space"};const c=Math.min(t,s),o=a*c;return n.credits<o?{success:!1,error:"Not enough credits"}:(n.credits-=o,n.cargo[e]=(n.cargo[e]||0)+c,v(),{success:!0,quantity:c,cost:o})}function pe(e,t,a){const n=r.player;if(!n.cargo[e]||n.cargo[e]<=0)return{success:!1,error:"No cargo"};const i=Math.min(t,n.cargo[e]),s=a*i;return n.cargo[e]-=i,n.cargo[e]<=0&&delete n.cargo[e],n.credits+=s,v(),{success:!0,quantity:i,revenue:s}}function M(){return r.galaxy.length===0?null:r.galaxy[r.currentSystem]||null}let y="cockpit",H=null,T=null;document.addEventListener("DOMContentLoaded",()=>{ve(),ue()});function ue(){const e=localStorage.getItem("ep_");if(e)try{const t=JSON.parse(e);if(t.name){he(t.name);return}}catch{}D()}function he(e){if(document.getElementById("auth")){const a=document.getElementById("username");a&&(a.value=e),doLogin()}else D()}function D(){const e=document.getElementById("app");e.innerHTML=`
    <div id="auth">
      <canvas id="starfield-bg"></canvas>
      <div class="auth-container">
        <div class="auth-box">
          <div class="auth-header">
            <h1 class="title-glow">ELITE ZX</h1>
            <div class="subtitle-animated">КОСМИЧЕСКАЯ ТОРГОВЛЯ И СРАЖЕНИЯ</div>
          </div>
          
          <div class="auth-tabs">
            <button class="tab-btn active" data-tab="login">ВХОД</button>
            <button class="tab-btn" data-tab="register">РЕГИСТРАЦИЯ</button>
          </div>
          
          <div id="login-form" class="auth-form">
            <div class="input-group">
              <input type="text" id="username" placeholder=" " autocomplete="off">
              <label>ИМЯ ПИЛОТА</label>
              <span class="input-line"></span>
            </div>
            <div class="input-group">
              <input type="password" id="password" placeholder=" ">
              <label>ПАРОЛЬ</label>
              <span class="input-line"></span>
            </div>
            <div class="error" id="login-error"></div>
            <button class="btn-auth btn-login" onclick="window.doLogin()">
              <span>ВОЙТИ</span>
              <span class="btn-glow"></span>
            </button>
          </div>
          
          <div id="register-form" class="auth-form hidden">
            <div class="input-group">
              <input type="text" id="reg-username" placeholder=" " autocomplete="off">
              <label>ИМЯ ПИЛОТА</label>
              <span class="input-line"></span>
            </div>
            <div class="input-group">
              <input type="password" id="reg-password" placeholder=" ">
              <label>ПАРОЛЬ</label>
              <span class="input-line"></span>
            </div>
            <div class="input-group">
              <input type="password" id="reg-password2" placeholder=" ">
              <label>ПОВТОРИТЕ</label>
              <span class="input-line"></span>
            </div>
            <div class="error" id="register-error"></div>
            <button class="btn-auth btn-register" onclick="window.doRegister()">
              <span>СОЗДАТЬ АККАУНТ</span>
              <span class="btn-glow"></span>
            </button>
          </div>
          
          <div class="auth-divider">
            <span>или</span>
          </div>
          
          <button class="btn-guest" onclick="window.guestLogin()">
            <span class="guest-icon">⚡</span>
            <span>Быстрый старт</span>
          </button>
        </div>
        
        <div class="auth-footer">
          <span>© 1984 Original Elite • 2024 Elite ZX</span>
        </div>
      </div>
    </div>
  `,me(),document.querySelectorAll(".auth-tabs .tab-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".auth-tabs .tab-btn").forEach(s=>s.classList.remove("active")),t.classList.add("active");const a=t.dataset.tab,n=document.getElementById("login-form"),i=document.getElementById("register-form");a==="login"?(n.classList.remove("hidden"),i.classList.add("hidden"),n.style.opacity="0",n.style.transform="translateX(-20px)",setTimeout(()=>{n.style.opacity="1",n.style.transform="translateX(0)"},50)):(i.classList.remove("hidden"),n.classList.add("hidden"),i.style.opacity="0",i.style.transform="translateX(20px)",setTimeout(()=>{i.style.opacity="1",i.style.transform="translateX(0)"},50))})}),document.querySelectorAll(".input-group input").forEach(t=>{t.addEventListener("focus",()=>{t.parentElement.classList.add("focused")}),t.addEventListener("blur",()=>{t.value||t.parentElement.classList.remove("focused")})}),document.getElementById("password")?.addEventListener("keydown",t=>{t.key==="Enter"&&window.doLogin()})}function me(){const e=document.getElementById("starfield-bg");if(!e)return;e.parentElement,e.width=window.innerWidth,e.height=window.innerHeight;const t=[],a=200;for(let c=0;c<a;c++)t.push({x:Math.random()*e.width,y:Math.random()*e.height,z:Math.random()*2+.5,size:Math.random()*1.5+.5});let n=0,i=0;document.addEventListener("mousemove",c=>{n=(c.clientX-e.width/2)*.02,i=(c.clientY-e.height/2)*.02});function s(){const c=e.getContext("2d");c.fillStyle="rgba(5, 8, 16, 0.3)",c.fillRect(0,0,e.width,e.height),t.forEach(o=>{o.z-=.5,o.z<=0&&(o.z=2.5,o.x=Math.random()*e.width,o.y=Math.random()*e.height);const l=(o.x+n*o.z)%e.width,p=(o.y+i*o.z)%e.height,m=o.size*o.z,f=Math.min(1,o.z/2);c.fillStyle=`rgba(180, 220, 255, ${f})`,c.beginPath(),c.arc(l,p,m,0,Math.PI*2),c.fill()}),requestAnimationFrame(s)}s(),window.addEventListener("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight})}window.doLogin=function(){const e=document.getElementById("username")?.value.trim(),t=document.getElementById("password")?.value,a=document.getElementById("login-error");if(!e||!t){a.textContent="Заполните все поля";return}const n=JSON.parse(localStorage.getItem("e_u")||"{}");if(!n[e]||n[e]!==t){a.textContent="Неверный пилот или пароль";return}a.textContent="",ie(e),G()};window.doRegister=function(){const e=document.getElementById("reg-username")?.value.trim(),t=document.getElementById("reg-password")?.value,a=document.getElementById("reg-password2")?.value,n=document.getElementById("register-error");if(e.length<3){n.textContent="Минимум 3 символа";return}if(t.length<4){n.textContent="Минимум 4 символа";return}if(t!==a){n.textContent="Пароли не совпадают";return}const i=JSON.parse(localStorage.getItem("e_u")||"{}");if(i[e]){n.textContent="Имя занято";return}i[e]=t,localStorage.setItem("e_u",JSON.stringify(i)),n.textContent="",d("Аккаунт создан!","success"),document.querySelector('.tabs button[data-tab="login"]').click(),document.getElementById("username").value=e,document.getElementById("password").value=t};window.guestLogin=function(){const e="Guest_"+Math.floor(Math.random()*9999);ne(e),G()};function G(){document.getElementById("auth")?.remove(),X(),w(y),setInterval(()=>{u().player&&v()},6e4),d("Добро пожаловать, пилот!","success")}function ve(){const e=document.getElementById("app");e.innerHTML=""}function X(){const e=document.getElementById("app"),a=u().player,n=M();e.innerHTML=`
    <div class="layout">
      <aside class="sidebar">
        <h1>ELITE ZX</h1>
        
        <div class="sidebar-stats">
          <div class="stat">
            <span class="stat-label">Кредиты</span>
            <span class="stat-value">${a.credits.toLocaleString()} Cr</span>
          </div>
          <div class="stat">
            <span class="stat-label">Ранг</span>
            <span class="stat-value">${z(a).name}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Система</span>
            <span class="stat-value">${n?.name||"Unknown"}</span>
          </div>
        </div>
        
        <nav class="nav">
          <button class="${y==="cockpit"?"active":""}" data-panel="cockpit">
            🚀 КАБИНА
          </button>
          <button class="${y==="station"?"active":""}" data-panel="station">
            🛸 СТАНЦИЯ
          </button>
          <button class="${y==="trade"?"active":""}" data-panel="trade">
            📦 РЫНОК
          </button>
          <button class="${y==="galaxy"?"active":""}" data-panel="galaxy">
            🗺️ КАРТА
          </button>
          <button class="${y==="ship"?"active":""}" data-panel="ship">
            🛩️ КОРАБЛЬ
          </button>
          <button class="${y==="rank"?"active":""}" data-panel="rank">
            ⭐ РАНГ
          </button>
        </nav>
        
        <div class="sidebar-actions">
          <button class="btn" onclick="window.saveGame()">💾 СОХРАНИТЬ</button>
          <button class="btn btn-danger" onclick="window.logout()">✕ ВЫХОД</button>
        </div>
      </aside>
      
      <main class="content" id="main-content">
        <!-- Panel content rendered here -->
      </main>
    </div>
    
    <div id="toast-container"></div>
    <div id="modal" class="modal hidden"></div>
  `,document.querySelectorAll(".nav button").forEach(i=>{i.addEventListener("click",()=>{y=i.dataset.panel,document.querySelectorAll(".nav button").forEach(s=>s.classList.remove("active")),i.classList.add("active"),w(y)})}),w(y)}function w(e){const t=document.getElementById("main-content");if(!t)return;const a=u();a.player;const n=M();switch(e){case"cockpit":t.innerHTML=fe(a,n),ge(),be();break;case"station":t.innerHTML=Ee(a,n);break;case"trade":t.innerHTML=Pe(a,n);break;case"galaxy":t.innerHTML=Be(a);break;case"ship":t.innerHTML=He(a);break;case"rank":t.innerHTML=Ae(a);break}}function fe(e,t){const a=e.player;return`
    <div class="panel cockpit-full">
      <!-- Main view -->
      <div class="view-3d">
        <canvas id="cockpit-canvas"></canvas>
        
        <!-- HUD overlay -->
        <div class="hud-3d">
          <div class="hud-top">
            <div class="hud-sys">
              <span class="hud-label">СИСТЕМА</span>
              <span class="hud-val">${t?.name||"UNKNOWN"}</span>
            </div>
            <div class="hud-status">
              ${e.docked?'<span class="status-docked">🛸 СТАНЦИЯ</span>':'<span class="status-fly">🚀 ПОЛЁТ</span>'}
            </div>
            <div class="hud-rank">
              <span class="hud-label">РАНГ</span>
              <span class="hud-val">${z(a).name}</span>
            </div>
          </div>
          
          <div class="hud-bottom">
            <div class="ship-stats">
              <div class="sstat">
                <span>ENERGY</span>
                <div class="sbar"><div class="sfill e" style="width: 100%"></div></div>
              </div>
              <div class="sstat">
                <span>SHIELDS</span>
                <div class="sbar"><div class="sfill s" style="width: ${a.shields}%"></div></div>
              </div>
              <div class="sstat">
                <span>HULL</span>
                <div class="sbar"><div class="sfill h" style="width: ${a.hull}%"></div></div>
              </div>
              <div class="sstat">
                <span>FUEL</span>
                <div class="sbar"><div class="sfill f" style="width: ${a.fuel}%"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Local Scanner -->
      <div class="panel local-scanner">
        <div class="panel-header">
          <span class="panel-title">📡 СКАНЕР</span>
        </div>
        <canvas id="scanner-canvas"></canvas>
      </div>
    </div>
    
    <div class="panel controls">
      <div class="panel-header">
        <span class="panel-title">🚀 УПРАВЛЕНИЕ</span>
      </div>
      <div class="controls-grid">
        <button class="btn-fly" onclick="window.launch()">
          <span class="btn-icon">🚀</span>
          <span>ПОЛЁТ</span>
        </button>
        <button class="btn-dock" onclick="window.dockAtStation()">
          <span class="btn-icon">⚓</span>
          <span>СТЫКОВКА</span>
        </button>
        <button class="btn-combat" onclick="window.startCombat()">
          <span class="btn-icon">⚔️</span>
          <span>БОЙ</span>
        </button>
        <button class="btn-scoop" onclick="window.activateScoop()">
          <span class="btn-icon">🔥</span>
          <span>СБОР</span>
        </button>
      </div>
    </div>
    
    <div class="panel console">
      <div class="panel-header">
        <span class="panel-title">📟 КОНСОЛЬ</span>
      </div>
      <div class="console-log" id="cockpit-log"></div>
    </div>
`}function ge(){const e=document.getElementById("cockpit-canvas");if(!e)return;const t=e.parentElement;e.width=t.clientWidth,e.height=t.clientHeight;const a=[];for(let i=0;i<150;i++)a.push({x:Math.random()*e.width,y:Math.random()*e.height,z:Math.random()*2+.5,speed:Math.random()*2+1});function n(i){const s=e.getContext("2d"),c=e.width,o=e.height;s.fillStyle="rgba(0, 5, 10, 0.3)",s.fillRect(0,0,c,o),a.forEach(l=>{l.y+=l.speed*l.z,l.y>o&&(l.y=0,l.x=Math.random()*c);const p=l.z*.8,m=Math.min(1,l.z/2);s.fillStyle=`rgba(200, 220, 255, ${m})`,s.beginPath(),s.arc(l.x,l.y,p,0,Math.PI*2),s.fill()}),T=requestAnimationFrame(n)}T=requestAnimationFrame(n)}function be(){const e=document.getElementById("scanner-canvas");if(!e)return;const t=e.parentElement;t&&(e.width=Math.min(180,t.clientWidth),e.height=Math.min(120,t.clientHeight||120));const a=u(),n=M();if(!n)return;function i(){const s=e.getContext("2d"),c=e.width,o=e.height;s.fillStyle="rgba(0, 10, 20, 0.8)",s.fillRect(0,0,c,o),s.strokeStyle="rgba(0, 255, 204, 0.15)",s.lineWidth=1;for(let l=0;l<5;l++){const p=l/4*c,m=l/4*o;s.beginPath(),s.moveTo(p,0),s.lineTo(p,o),s.stroke(),s.beginPath(),s.moveTo(0,m),s.lineTo(c,m),s.stroke()}s.fillStyle="#00ffcc",s.shadowColor="#00ffcc",s.shadowBlur=8,s.beginPath(),s.arc(c/2,o/2,4,0,Math.PI*2),s.fill(),a.galaxy?.forEach(l=>{if(!l||l.id===n.id)return;const p=(l.x-n.x)*2,m=(l.y-n.y)*2;if(Math.sqrt(p*p+m*m)<30){const k=c/2+p*.8,h=o/2+m*.8;s.fillStyle=a.player.visitedSystems?.includes(l.id)?"#00ff66":"#ff8800",s.shadowBlur=3,s.beginPath(),s.arc(k,h,2,0,Math.PI*2),s.fill()}}),s.shadowBlur=0,requestAnimationFrame(i)}i()}window.launch=function(){const e=u();if(e.inCombat){d("Сначала победа в бою!","error");return}e.docked=!1,e.speed=3,e.flightTime=0,K()};function ye(){return`
  <div id="flight-screen">
    <canvas id="flight-canvas-full"></canvas>
    
    <!-- HUD Overlay -->
    <div class="flight-hud-top">
      <div class="hud-left">
        <span class="hud-label">СИСТЕМА</span>
        <span class="hud-value" id="flight-system">${M()?.name||"Unknown"}</span>
      </div>
      <div class="hud-center">
        <span class="flight-status-large">🚀 ПРОКЛАДЫВАЮ КУРС</span>
      </div>
      <div class="hud-right">
        <span class="hud-label">СКОРОСТЬ</span>
        <span class="hud-value" id="flight-speed"> LIGHT YEARS /SEC</span>
      </div>
    </div>
    
    <div class="flight-hud-bottom">
      <div class="hud-stats">
        <div class="stat-box">
          <span class="stat-label">ЭНЕРГИЯ</span>
          <div class="stat-bar"><div class="stat-fill energy" style="width: 100%"></div></div>
        </div>
        <div class="stat-box">
          <span class="stat-label">ЩИТЫ</span>
          <div class="stat-bar"><div class="stat-fill shield" style="width: ${u().player?.shields||100}%"></div></div>
        </div>
        <div class="stat-box">
          <span class="stat-label">КОРПУС</span>
          <div class="stat-bar"><div class="stat-fill hull" style="width: ${u().player?.hull||100}%"></div></div>
        </div>
        <div class="stat-box">
          <span class="stat-label">ТОПЛИВО</span>
          <div class="stat-bar"><div class="stat-fill fuel" style="width: ${u().player?.fuel||100}%"></div></div>
        </div>
      </div>
    </div>
    
    <!-- Combat Controls (shown when enemies present) -->
    <div class="combat-controls" id="combat-controls" style="display: none;">
      <div class="enemy-indicator">
        <span class="blink">⚠️ ВНИМАНИЕ! ВРАГ</span>
      </div>
      <button class="btn-fire" onclick="window.fireWeapon()">
        <span class="fire-icon">🔫</span>
        <span>ОГОНЬ!</span>
      </button>
      <div class="enemy-list" id="enemy-list"></div>
    </div>
    
    <!-- Log panel -->
    <div class="flight-log" id="flight-log"></div>
  </div>
  `}function K(){const e=document.getElementById("app");e&&(e.innerHTML=ye(),we())}let q=!1;function we(){const e=document.getElementById("flight-canvas-full");if(!e)return;e.width=window.innerWidth,e.height=window.innerHeight;const t=u(),a=[];for(let o=0;o<300;o++)a.push({x:(Math.random()-.5)*e.width*2,y:(Math.random()-.5)*e.height*2,z:Math.random()*800+100,speed:Math.random()*4+2});let n=Date.now(),i=0,s=!1;function c(){if(!q)return;const o=e.getContext("2d"),l=e.width,p=e.height,m=(Date.now()-n)/1e3,f=o.createRadialGradient(l/2,p/2,0,l/2,p/2,Math.max(l,p));f.addColorStop(0,"#0a0a18"),f.addColorStop(.5,"#050510"),f.addColorStop(1,"#020208"),o.fillStyle=f,o.fillRect(0,0,l,p),a.forEach(h=>{h.z-=h.speed*2,h.z<=0&&(h.z=900,h.x=(Math.random()-.5)*l*2,h.y=(Math.random()-.5)*p*2);const g=h.x/h.z*300+l/2,b=h.y/h.z*300+p/2,L=Math.max(.5,(900-h.z)/150),Q=Math.min(1,(900-h.z)/200);o.fillStyle=`rgba(200, 220, 255, ${Q})`,o.fillRect(g,b,L*2,L*2)}),o.strokeStyle="rgba(0, 255, 204, 0.1)",o.lineWidth=1;for(let h=0;h<8;h++){const g=h/8*Math.PI*2+m*.2,b=50+Math.sin(m+h)*20;o.beginPath(),o.moveTo(l/2+Math.cos(g)*b*2,p/2+Math.sin(g)*b),o.lineTo(l/2+Math.cos(g)*b*4,p/2+Math.sin(g)*b*2),o.stroke()}t.inCombat&&t.enemies&&t.enemies.forEach((h,g)=>{if(!h.alive)return;const b=m*.5+g*1.5,L=120+Math.sin(m*2+g)*40;h.x=l/2+Math.cos(b)*L,h.y=p/2+Math.sin(b*.7)*80-20,o.save(),o.translate(h.x,h.y),o.shadowColor=h.color||"#ff4444",o.shadowBlur=15,o.strokeStyle=h.color||"#ff4444",o.lineWidth=2,o.beginPath(),o.moveTo(0,-15),o.lineTo(-10,5),o.lineTo(0,10),o.lineTo(10,5),o.closePath(),o.stroke(),o.beginPath(),o.moveTo(-8,0),o.lineTo(-18,12),o.stroke(),o.beginPath(),o.moveTo(8,0),o.lineTo(18,12),o.stroke(),o.fillStyle=h.color||"#ff4444",o.beginPath(),o.arc(0,12,3,0,Math.PI*2),o.fill(),o.restore()}),i+=.8;const k=document.getElementById("flight-speed");if(k&&(k.textContent=` ${Math.floor(3+Math.sin(m*2))} LIGHT YEARS/SEC`),i>100&&!s&&(s=!0,t.inCombat=!0,Le()),i>600&&!t.inCombat){ke();return}t.inCombat&&(i+=.5),requestAnimationFrame(c)}q=!0,c(),x("━━━━━━━━━━"),x("🚀 ДВИГАТ��ЛИ ЗАПУЩЕНЫ"),x("Курс: "+M()?.name),x("━━━━━━━━━━")}function Le(){const e=u(),t=1+Math.floor(Math.random()*3);e.inCombat=!0,e.enemies=[];const a=["ПИРАТ","КОНТРАБАНДИСТ","ОХОТНИК","УБИЙЦА"],n=["#ff4444","#ff8800","#ff00ff","#8800ff"];for(let s=0;s<t;s++){const c=a[Math.floor(Math.random()*a.length)],o=a.indexOf(c);e.enemies.push({name:c,color:n[o],health:30+Math.floor(Math.random()*40),maxHealth:70,alive:!0,x:0,y:0})}const i=document.getElementById("combat-controls");i&&(i.style.display="flex"),Me(),x("⚠️ ВНИМАНИЕ! АТАКА!"),x(`Обнаружено ${t} вражеских кораблей!`)}function Me(){const e=document.getElementById("flight-canvas-full");if(!e)return;const t=u(),a=e.width,n=e.height,i=Date.now()/1e3;t.enemies.forEach((c,o)=>{if(!c.alive)return;const l=i*.8+o*2,p=100+Math.sin(i*2+o)*30;c.x=a/2+Math.cos(l)*p,c.y=n/2+Math.sin(l*.7)*60-20});const s=document.getElementById("enemy-list");s&&t.enemies&&(s.innerHTML=t.enemies.filter(c=>c.alive).map(c=>`
      <div class="enemy-item" style="border-color: ${c.color}">
        <span style="color: ${c.color}">${c.name}</span>
        <span>HP: ${c.health}/${c.maxHealth}</span>
      </div>
    `).join(""))}function ke(e){q=!1;const t=u();x("✅ ПРИБЫТИЕ В СИСТЕМУ "+M()?.name),t.docked=!0,X(),w(y||"cockpit")}function x(e){const t=document.getElementById("flight-log");if(!t)return;const a=document.createElement("div");a.className="log-entry",a.textContent=e,t.appendChild(a),t.scrollTop=t.scrollHeight}function xe(){return`
  <div id="docking-screen">
    <canvas id="docking-canvas"></canvas>
    
    <div class="dock-hud">
      <div class="dock-title">🛸 СТЫКОВКА СО СТАНЦИЕЙ</div>
      <div class="dock-progress">
        <div class="dock-bar"><div class="dock-fill" id="dock-fill"></div></div>
        <div class="dock-percent" id="dock-percent">0%</div>
      </div>
      <div class="dock-message" id="dock-message">Подготовка к стыковке...</div>
    </div>
  </div>
  `}function Se(){const e=document.getElementById("app");e&&(e.innerHTML=xe(),$e())}function $e(){const e=document.getElementById("docking-canvas");if(!e)return;e.width=window.innerWidth,e.height=window.innerHeight;const t=e.width,a=e.height;let n=0;function i(){const s=e.getContext("2d");s.fillStyle="#050810",s.fillRect(0,0,t,a);const c=t/2,o=a/2,l=Date.now()/1e3;s.strokeStyle="#00ffcc",s.lineWidth=2,s.shadowColor="#00ffcc",s.shadowBlur=10,s.beginPath(),s.ellipse(c,o,150,60,l*.3,0,Math.PI*2),s.stroke(),s.beginPath(),s.ellipse(c,o,60,25,l*-.5,0,Math.PI*2),s.stroke();for(let b=0;b<6;b++){const L=l*.5+b*Math.PI/3;s.beginPath(),s.moveTo(c+Math.cos(L)*40,o+Math.sin(L)*15),s.lineTo(c+Math.cos(L)*140,o+Math.sin(L)*55),s.stroke()}s.fillStyle="rgba(0, 255, 204, 0.3)",s.beginPath(),s.arc(c,o,15,0,Math.PI*2),s.fill(),s.stroke(),s.beginPath(),s.moveTo(c,o-15),s.lineTo(c,o-80),s.stroke(),s.shadowBlur=0;const p=200-n*1.5,m=c,f=o+p;p>30&&(s.fillStyle="#00aaff",s.beginPath(),s.moveTo(m,f-8),s.lineTo(m-6,f+4),s.lineTo(m-3,f+6),s.lineTo(m,f+2),s.lineTo(m+3,f+6),s.lineTo(m+6,f+4),s.closePath(),s.fill(),s.fillStyle="#00ffff",s.shadowColor="#00ffff",s.shadowBlur=10,s.beginPath(),s.arc(m,f+8,3+Math.sin(l*10)*1,0,Math.PI*2),s.fill(),s.shadowBlur=0),n+=.5;const k=document.getElementById("dock-fill"),h=document.getElementById("dock-percent"),g=document.getElementById("dock-message");k&&(k.style.width=Math.min(100,n)+"%"),h&&(h.textContent=Math.floor(Math.min(100,n))+"%"),g&&(n<30?g.textContent="Подготовка к стыковке...":n<60?g.textContent="Сближение со станцией...":n<90?g.textContent="Фиксация захватов...":g.textContent="СТЫКОВКА ЗАВЕРШЕНА!"),n<100?requestAnimationFrame(i):setTimeout(()=>{G()},500)}i()}window.launch=function(){const e=u();if(e.inCombat){d("Сначала победа в бою!","error");return}e.docked=!1,e.speed=3,d("🚀 ЗАПУСК ДВИГАТЕЛЕЙ!","info"),K()};window.dockAtStation=function(){Se()};window.dockAtStation=function(){le(),d("Швартовка выполнена!","success"),S("Швартовка!"),w("cockpit")};window.startCombat=function(){const e=u();if(e.inCombat){if(e.lastShot=Date.now(),e.hitFlash=Date.now(),e.enemies&&e.enemies.length>0){let t=0;e.enemies.forEach(n=>{if(n.alive){const i=P[e.player.laser].damage;if(n.health-=i,t+=i,n.health<=0){n.alive=!1;const s=n.reward||100+Math.floor(Math.random()*200);e.player.credits+=s,e.player.kills++,S(`Враг "${n.name}" уничтожен! +${s} Cr`)}}}),S(`Залп! -${t} HP врагам`),e.enemies.filter(n=>n.alive).length===0&&(d("🏆 ПОБЕДА!","success"),S("ПОБЕДА! Все враги уничтожены!"),e.inCombat=!1,e.docked=!0,e.flightTime=0)}d("ОГОНЬ!","success")}else d("Нужно находиться в полёте!","info"),S("Сначала нужно взлететь")};window.activateScoop=function(){const e=u();if(!e.player.hasScoop){d("Нужен сборщик!","error");return}e.player.fuel=Math.min(e.player.maxFuel,e.player.fuel+25),d("Топливо собрано","success"),S("Сбор топлива.")};function Ee(e,t){return e.player,`
    <div class="panel station">
      <div class="panel-header">
        <span class="panel-title">🛸 СТАНЦИЯ — ${t?.name||"?"}</span>
      </div>
      <div class="station-info">
        <p>Правительство: <span class="tag ${A[t?.government||0].color}">${A[t?.government||0].name}</span></p>
        <p>Технологии: ${t?.techLevel||1}</p>
      </div>
    </div>
    
    <div class="panel station-services">
      <div class="panel-header">
        <span class="panel-title">УСЛУГИ</span>
      </div>
      <div class="services-grid">
        <button class="service-btn" onclick="window.showRepair()">
          <span class="service-icon">🔧</span>
          <span>РЕМОНТ</span>
        </button>
        <button class="service-btn" onclick="window.showRefuel()">
          <span class="service-icon">⛽</span>
          <span>ЗАПРАВКА</span>
        </button>
        <button class="service-btn" onclick="window.showEquip()">
          <span class="service-icon">🔩</span>
          <span>ОБОРУДОВ.</span>
        </button>
        <button class="service-btn" onclick="window.showBar()">
          <span class="service-icon">🍺</span>
          <span>БАР</span>
        </button>
      </div>
    </div>
  `}window.showRepair=function(){const e=u().player,t=e.maxHull-e.hull;if(t<=0){d("Корпус целый!","info");return}const a=t;if(e.credits<a){d("Недостаточно кредитов!","error");return}e.credits-=a,e.hull=e.maxHull,v(),d("Ремонт завершён!","success"),w("cockpit")};window.showRefuel=function(){const e=u().player,t=e.maxFuel-e.fuel;if(t<=0){d("Бак полный!","info");return}const a=Math.ceil(t/10)*5;if(e.credits<a){d("Недостаточно кредитов!","error");return}e.credits-=a,e.fuel=e.maxFuel,v(),d("Заправка завершена!","success"),w("cockpit")};window.showEquip=function(){V("ОБОРУДОВАНИЕ",`
    <div class="equip-tabs">
      <button class="tab-btn active" onclick="showEquipTab('lasers')">ЛАЗЕРЫ</button>
      <button class="tab-btn" onclick="showEquipTab('shields')">ЩИТЫ</button>
      <button class="tab-btn" onclick="showEquipTab('ships')">КОРАБЛИ</button>
      <button class="tab-btn" onclick="showEquipTab('extra')">ДОП. ОБОРУД</button>
    </div>
    <div id="equip-content">
      ${J()}
    </div>
  `)};function J(){const e=u().player;return`<div class="shop-list">${P.map((a,n)=>{const i=n===e.laser;return`<div class="shop-item ${i?"current":""}">
      <div class="shop-item-icon" style="color: ${a.color}">🔫</div>
      <div class="shop-item-info">
        <div class="shop-item-name">${a.name}</div>
        <div class="shop-item-desc">Урон: ${a.damage} | Рate: ${a.rate}ms</div>
        <div class="shop-item-price">${a.price===0?"Бесплатно":a.price.toLocaleString()+" Cr"}</div>
      </div>
      <div class="shop-item-action">
        ${i?'<span class="installed">✓</span>':n>e.laser?`<button class="btn btn-sm" onclick="buyLaserUpgrade(${n})">Купить</button>`:'<span class="locked">🔒</span>'}
      </div>
    </div>`}).join("")}</div>`}function Ce(){const e=u().player;return`<div class="shop-list">${O.map((a,n)=>{const i=n===e.shield;return`<div class="shop-item ${i?"current":""}">
      <div class="shop-item-icon" style="color: ${a.color}">🛡️</div>
      <div class="shop-item-info">
        <div class="shop-item-name">${a.name}</div>
        <div class="shop-item-desc">Уровень: ${a.level} | Перезарядка: ${a.recharge}/с</div>
        <div class="shop-item-price">${a.price===0?"Бесплатно":a.price.toLocaleString()+" Cr"}</div>
      </div>
      <div class="shop-item-action">
        ${i?'<span class="installed">✓</span>':n>e.shield?`<button class="btn btn-sm" onclick="buyShieldUpgrade(${n})">Купить</button>`:'<span class="locked">🔒</span>'}
      </div>
    </div>`}).join("")}</div>`}function Ie(){const e=u().player;return I.find(a=>a.name===e.currentShip),`<div class="shop-list">${I.map((a,n)=>{const i=a.name===e.currentShip;return`<div class="shop-item ship-item ${i?"current":""}">
      <div class="shop-item-icon ship-icon" style="color: ${a.color}">
        <svg viewBox="0 0 24 24" width="32" height="32">${a.svg.replace("currentColor",a.color)}</svg>
      </div>
      <div class="shop-item-info">
        <div class="shop-item-name">${a.name}</div>
        <div class="shop-item-desc">
          <span class="stat">⚡${a.maxSpeed}</span>
          <span class="stat">📦${a.cargo}</span>
          <span class="stat">🔫${a.laser}</span>
          <span class="stat">🛡️${a.shield}</span>
        </div>
        <div class="shop-item-desc ship-desc">${a.description}</div>
        <div class="shop-item-price">${a.price===0?"Бесплатно":a.price.toLocaleString()+" Cr"}</div>
      </div>
      <div class="shop-item-action">
        ${i?'<span class="installed">✓ ВАШ</span>':e.credits>=a.price?`<button class="btn btn-sm" onclick="buyNewShip(${n})">Купить</button>`:'<button class="btn btn-sm" disabled>Нет Cr</button>'}
      </div>
    </div>`}).join("")}</div>`}function Te(){const e=u().player;let t='<div class="shop-section"><h4>⛽ ДОП. БАКИ</h4>';return $.fuelTanks.forEach((a,n)=>{const i=e.extraFuelTanks&&e.extraFuelTanks[n];t+=`<div class="shop-item ${i?"owned":""}">
      <div class="shop-item-icon">${a.icon}</div>
      <div class="shop-item-info">
        <div class="shop-item-name">${a.name}</div>
        <div class="shop-item-desc">${a.description}</div>
        <div class="shop-item-price">${a.price.toLocaleString()} Cr</div>
      </div>
      <div class="shop-item-action">
        ${i?'<span class="installed">✓</span>':e.credits>=a.price?`<button class="btn btn-sm" onclick="buyExtraFuel(${n})">Купить</button>`:"<button disabled>Нет Cr</button>"}
      </div>
    </div>`}),t+='</div><div class="shop-section"><h4>📦 ГРУЗОВЫЕ ОТСЕКИ</h4>',$.cargoRacks.forEach((a,n)=>{const i=e.extraCargo&&e.extraCargo[n];t+=`<div class="shop-item ${i?"owned":""}">
      <div class="shop-item-icon">${a.icon}</div>
      <div class="shop-item-info">
        <div class="shop-item-name">${a.name}</div>
        <div class="shop-item-desc">${a.description}</div>
        <div class="shop-item-price">${a.price.toLocaleString()} Cr</div>
      </div>
      <div class="shop-item-action">
        ${i?'<span class="installed">✓</span>':e.credits>=a.price?`<button class="btn btn-sm" onclick="buyExtraCargo(${n})">Купить</button>`:"<button disabled>Нет Cr</button>"}
      </div>
    </div>`}),t+='</div><div class="shop-section"><h4>⚡ ЭНЕРГОЯЧЕЙКИ</h4>',$.energy.forEach((a,n)=>{const i=e.extraEnergy&&e.extraEnergy[n];t+=`<div class="shop-item ${i?"owned":""}">
      <div class="shop-item-icon">${a.icon}</div>
      <div class="shop-item-info">
        <div class="shop-item-name">${a.name}</div>
        <div class="shop-item-desc">${a.description}</div>
        <div class="shop-item-price">${a.price.toLocaleString()} Cr</div>
      </div>
      <div class="shop-item-action">
        ${i?'<span class="installed">✓</span>':e.credits>=a.price?`<button class="btn btn-sm" onclick="buyExtraEnergy(${n})">Купить</button>`:"<button disabled>Нет Cr</button>"}
      </div>
    </div>`}),t+="</div>",t}function C(e){document.querySelectorAll(".tab-btn").forEach(a=>a.classList.remove("active")),event.target.classList.add("active");const t=document.getElementById("equip-content");if(t)switch(e){case"lasers":t.innerHTML=J();break;case"shields":t.innerHTML=Ce();break;case"ships":t.innerHTML=Ie();break;case"extra":t.innerHTML=Te();break}}window.buyLaserUpgrade=function(e){const t=u().player;if(e<=t.laser)return;const a=P[e];if(!a||t.credits<a.price){d("Недостаточно кредитов!","error");return}t.credits-=a.price,t.laser=e,v(),d(`Лазер "${a.name}" установлен!`,"success"),C("lasers")};window.buyShieldUpgrade=function(e){const t=u().player;if(e<=t.shield)return;const a=O[e];if(!a||t.credits<a.price){d("Недостаточно кредитов!","error");return}t.credits-=a.price,t.shield=e,t.maxShields=50+a.level*30,t.shields=t.maxShields,v(),d(`Щит "${a.name}" установлен!`,"success"),C("shields")};window.buyNewShip=function(e){const t=u().player,a=I[e];if(!a||t.credits<a.price){d("Недостаточно кредитов!","error");return}t.credits-=a.price,t.currentShip=a.name,t.cargoCapacity=a.cargo,t.maxHull=100,t.maxShields=50+a.shield*30,t.hull=t.maxHull,t.shields=t.maxShields,t.maxFuel=100,t.fuel=t.maxFuel,t.laser=Math.min(t.laser,a.laser),t.shield=Math.min(t.shield,a.shield),v(),d(`Корабль "${a.name}" куплен!`,"success"),C("ships")};window.buyExtraFuel=function(e){const t=u().player,a=$.fuelTanks[e];if(!a||t.credits<a.price){d("Недостаточно кредитов!","error");return}t.credits-=a.price,t.maxFuel+=a.capacity,t.fuel+=a.capacity,t.extraFuelTanks=t.extraFuelTanks||[],t.extraFuelTanks[e]=!0,v(),d(`Бак "${a.name}" установлен!`,"success"),C("extra")};window.buyExtraCargo=function(e){const t=u().player,a=$.cargoRacks[e];if(!a||t.credits<a.price){d("Недостаточно кредитов!","error");return}t.credits-=a.price,t.cargoCapacity+=a.capacity,t.extraCargo=t.extraCargo||[],t.extraCargo[e]=!0,v(),d("Грузовой отсек установлен!","success"),C("extra")};window.buyExtraEnergy=function(e){const t=u().player,a=$.energy[e];if(!a||t.credits<a.price){d("Недостаточно кредитов!","error");return}t.credits-=a.price,t.maxShields+=a.capacity,t.shields+=a.capacity,t.extraEnergy=t.extraEnergy||[],t.extraEnergy[e]=!0,v(),d("Энергоячейка установлена!","success"),C("extra")};window.buyScoop=function(){const e=u().player;if(e.credits<5e3){d("Недостаточно кредитов!","error");return}e.credits-=5e3,e.hasScoop=!0,v(),d("Сборщик куплен!","success"),closeModal()};window.showBar=function(){const e=u(),t=[`Цены на алмазы в ${e.galaxy[(e.currentSystem+1)%32].name} высокие!`,"Пираты в секторе!",`Дешёвая еда в ${e.galaxy[(e.currentSystem+3)%32].name}`,`Артефакты в ${e.galaxy[(e.currentSystem+5)%32].name}!`,`Платина в ${e.galaxy[(e.currentSystem+2)%32].name} x3 цены.`],a=t[Math.floor(Math.random()*t.length)];V("🍺 БАР",`
    <p class="rumor">"${a}"</p>
    <p class="bar-drink">Напиток: 50 Cr (+5 HP)</p>
    <button class="btn btn-primary" onclick="window.buyDrink()">ПИТЬ</button>
    <button class="btn" onclick="window.closeModal()">ВЫЙТИ</button>
  `)};window.buyDrink=function(){const e=u().player;if(e.credits<50){d("Недостаточно кредитов!","error");return}e.credits-=50,e.hull=Math.min(e.maxHull,e.hull+5),v(),d("+5 HP","success"),closeModal()};function Pe(e,t){const a=e.player,n=B(a);let i=E.map((s,c)=>{const o=t?.prices[c]||s.basePrice,l=a.cargo[c]||0,p=Math.floor(o*.7);return`
      <tr>
        <td>${s.name}</td>
        <td class="price-buy">${o}</td>
        <td class="price-sell">${p}</td>
        <td>${l}</td>
        <td>
          <button class="btn" onclick="window.buyCommodity(${c}, 1)">+1</button>
          <button class="btn" onclick="window.buyCommodity(${c}, 5)">+5</button>
          <button class="btn btn-danger" onclick="window.sellCommodity(${c}, 1)">-1</button>
        </td>
      </tr>
    `}).join("");return`
    <div class="panel trade">
      <div class="panel-header">
        <span class="panel-title">📦 РЫНОК — ${t?.name||"?"}</span>
      </div>
      <p class="cargo-info">Груз: ${n}/${a.cargoCapacity}</p>
      <table class="table">
        <thead>
          <tr>
            <th>ТОВАР</th>
            <th>ПОКУПКА</th>
            <th>ПРОДАЖА</th>
            <th>В ТРЮМЕ</th>
            <th>ДЕЙСТВИЕ</th>
          </tr>
        </thead>
        <tbody>${i}</tbody>
      </table>
    </div>
  `}window.buyCommodity=function(e,t){const a=u(),n=M(),i=a.player,s=B(i);if(s>=i.cargoCapacity){d("Нет места в трюме!","error");return}const c=n?.prices[e]||E[e].basePrice,o=Math.min(t,i.cargoCapacity-s),l=c*o;if(i.credits<l){d("Недостаточно кредитов!","error");return}const p=de(e,o,c);p.success?(d(`Куплено ${p.quantity} ${E[e].name}`,"success"),w("trade")):d(p.error,"error")};window.sellCommodity=function(e,t){const a=u(),n=M(),i=a.player;if(!i.cargo[e]||i.cargo[e]<=0){d("Нет товара!","error");return}const s=Math.floor((n?.prices[e]||E[e].basePrice)*.7),c=pe(e,t,s);c.success&&(d(`Продано ${c.quantity} за ${c.revenue} Cr`,"success"),w("trade"))};function Be(e){const t=e.player,a=M();let n=e.galaxy.map((i,s)=>{const c=Math.sqrt(Math.pow(i.x-a.x,2)+Math.pow(i.y-a.y,2)).toFixed(1),o=Math.ceil(c*2),l=t.fuel>=o,p=s===e.currentSystem;return`
      <div class="card ${p?"current":""}">
        <div class="card-header">
          <span class="card-name">${i.name}</span>
          <span class="card-distance">${c} св.л.</span>
        </div>
        <div class="card-info">
          <p>${A[i.government].name}</p>
          <p>Тех ${i.techLevel}</p>
        </div>
        <div class="card-action">
          ${p?'<span class="current-label">ЗДЕСЬ</span>':`<button class="btn btn-sm" onclick="window.travelTo(${s})" ${l?"":"disabled"}>
              ${l?"ЛЕТЕТЬ":"НЕТ ТОПЛИВА"}
            </button>`}
        </div>
      </div>
    `}).join("");return`
    <div class="panel galaxy">
      <div class="panel-header">
        <span class="panel-title">🗺️ КАРТА ГАЛАКТИКИ</span>
      </div>
      <p class="fuel-info">Топливо: ${t.fuel}%</p>
      <div class="galaxy-grid">${n}</div>
    </div>
  `}window.travelTo=function(e){const t=ce(e);t.success?(d(t.encounter?"НАПАЛИ!":`Прибытие в ${t.systemName}`,t.encounter?"error":"success"),t.encounter?w("cockpit"):w("galaxy")):d(t.error,"error")};function He(e){const t=e.player,a=I.find(s=>s.name===t.currentShip)||I[0],n=B(t);let i=Object.entries(t.cargo).filter(([s,c])=>c>0).map(([s,c])=>`<tr><td>${E[s].name}</td><td>${c}</td></tr>`).join("");return`
    <div class="panel ship-info">
      <div class="panel-header">
        <span class="panel-title">🛩️ ${t.currentShip}</span>
      </div>
      <div class="ship-stats">
        <p><strong>Тип:</strong> ${a.description}</p>
        <p><strong>Трюм:</strong> ${n}/${t.cargoCapacity}</p>
        <p><strong>Щиты:</strong> ${t.shields}/${t.maxShields}</p>
        <p><strong>Лазер:</strong> ${P[t.laser].name}</p>
      </div>
    </div>
    
    <div class="panel cargo">
      <div class="panel-header">
        <span class="panel-title">ГРУЗ</span>
      </div>
      ${i?`<table class="table"><tbody>${i}</tbody></table>`:'<p class="empty">Пусто</p>'}
    </div>
  `}function Ae(e){const t=e.player,a=z(t);let n=F.map((i,s)=>{const c=s<=t.rank;return`
      <tr class="${s===t.rank?"current":""} ${c?"achieved":""}">
        <td>${i.name}</td>
        <td>${c?"✓":"🔒"} ${i.kills}</td>
      </tr>
    `}).join("");return`
    <div class="panel rank">
      <div class="panel-header">
        <span class="panel-title">⭐ РАНГ</span>
      </div>
      <div class="rank-display">
        <div class="rank-icon">🏆</div>
        <div class="rank-name">${a.name}</div>
        <div class="rank-kills">${t.kills} убийств</div>
      </div>
      <table class="table">
        <tbody>${n}</tbody>
      </table>
    </div>
  `}function d(e,t="info"){const a=document.getElementById("toast-container");if(!a)return;const n=document.createElement("div");n.className=`toast toast-${t}`,n.textContent=e,a.appendChild(n),H&&clearTimeout(H),H=setTimeout(()=>{n.remove()},3e3)}function S(e){const t=document.getElementById("combat-log");if(!t)return;const a=document.createElement("div");a.className="log-entry",a.textContent=`[${new Date().toLocaleTimeString("ru")}] ${e}`,t.appendChild(a),t.scrollTop=t.scrollHeight}function V(e,t){const a=document.getElementById("modal");a&&(a.innerHTML=`
    <div class="dialog">
      <h3>${e}</h3>
      <div class="modal-content">${t}</div>
    </div>
  `,a.classList.remove("hidden"))}window.closeModal=function(){document.getElementById("modal")?.classList.add("hidden")};window.saveGame=function(){v(),d("Сохранено!","success")};window.logout=function(){T&&cancelAnimationFrame(T);const e=u();e.user=null,e.player=null,D()};
