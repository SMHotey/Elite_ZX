(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=a(o);fetch(o.href,s)}})();const k=[{name:"Food",basePrice:40,variance:15,icon:"🌾"},{name:"Textiles",basePrice:80,variance:30,icon:"🧵"},{name:"Radioactives",basePrice:150,variance:50,icon:"☢️"},{name:"Slaves",basePrice:200,variance:80,icon:"⛓️"},{name:"Liquor",basePrice:300,variance:100,icon:"🍷"},{name:"Luxuries",basePrice:500,variance:200,icon:"💎"},{name:"Narcotics",basePrice:2500,variance:400,icon:"💊"},{name:"Computers",basePrice:100,variance:40,icon:"💻"},{name:"Machinery",basePrice:500,variance:150,icon:"⚙️"},{name:"Alloys",basePrice:800,variance:200,icon:"🔩"},{name:"Firearms",basePrice:1200,variance:300,icon:"🔫"},{name:"Furs",basePrice:1500,variance:400,icon:"🦊"},{name:"Minerals",basePrice:250,variance:70,icon:"🪨"},{name:"Ores",basePrice:60,variance:20,icon:"ite"},{name:"Water",basePrice:20,variance:10,icon:"💧"}],B=[{name:"Sidewinder",price:0,cargo:15,maxSpeed:18,laser:1,shield:1,description:"Стартовый корабль",color:"#4a9eff",shape:"fighter"},{name:"Adder",price:14e3,cargo:20,maxSpeed:16,laser:1,shield:1,description:"Фреighter",color:"#6aff6a",shape:"freighter"},{name:"Mamba",price:16e3,cargo:15,maxSpeed:22,laser:1,shield:1,description:"Гонщик",color:"#ff6b6b",shape:"racer"},{name:"Cobra III",price:26e3,cargo:20,maxSpeed:20,laser:2,shield:2,description:"Универсальный",color:"#ffa500",shape:"multi"},{name:"Anaconda",price:8e4,cargo:80,maxSpeed:14,laser:2,shield:3,description:"Тяжёлый фрахтовщик",color:"#9370db",shape:"heavy"},{name:"Python",price:12e4,cargo:40,maxSpeed:20,laser:3,shield:3,description:"Крейсер",color:"#ff69b4",shape:"cruiser"},{name:"Fer-de-Lance",price:2e5,cargo:30,maxSpeed:28,laser:3,shield:4,description:"Истребитель",color:"#00ced1",shape:"fighter"},{name:"Krait",price:35e4,cargo:25,maxSpeed:24,laser:3,shield:4,description:"Охотник",color:"#da70d6",shape:"hunter"},{name:"Eagle II",price:5e5,cargo:50,maxSpeed:30,laser:4,shield:5,description:"Элитный истребитель",color:"#ffd700",shape:"elite"}],v=[{name:"Импульсный",price:0,damage:10,color:"#00ff00",rate:500},{name:"Лучевой",price:5e3,damage:20,color:"#00ffff",rate:400},{name:"Военный",price:15e3,damage:35,color:"#ff6600",rate:300},{name:"Военный II",price:4e4,damage:50,color:"#ff00ff",rate:200}],y=[{name:"Mk I",price:0,level:1,color:"#4a9eff",recharge:.5},{name:"Mk II",price:8e3,level:2,color:"#6aff6a",recharge:.8},{name:"Mk III",price:2e4,level:3,color:"#ffa500",recharge:1.2},{name:"Mk IV",price:5e4,level:4,color:"#ff69b4",recharge:1.8},{name:"Mk V",price:1e5,level:5,color:"#ffd700",recharge:2.5}],C=[{name:"Анархия",color:"g0",aggression:.8,police:.1},{name:"Феодализм",color:"g1",aggression:.5,police:.4},{name:"Мульти-прав",color:"g2",aggression:.3,police:.5},{name:"Диктатура",color:"g3",aggression:.4,police:.7},{name:"Коммунизм",color:"g4",aggression:.2,police:.6},{name:"Федерация",color:"g5",aggression:.1,police:.9},{name:"Демократия",color:"g6",aggression:.15,police:.8},{name:"Корпорация",color:"g7",aggression:.35,police:.5}],H=["Alphix","Bethe","Gammix","Deltix","Epsilon","Zeta","Eta","Theta","Iota","Kappa","Lambda","Mu","Nu","Xi","Omicron","Pi","Rho","Sigma","Tau","Upsilon","Phi","Chi","Psi","Omega","Andor","Betel","Caph","Deneb","Elara","Fomal","Gienah","Hadar","Izar","Kocab","Markab","Nunki","Orion","Polaris","Rigel","Sirius","Vega","Altair","Achernar","Canopus","Castor","Denebola","Elnath","Fenir","Aldebaran","Arcturus","Capella","Procyon","Spica","Regulus","Pollux","Mirfak","Shaula","Wezen","Hamal","Menkar"],L=[{name:"Безвредный",kills:0,bonus:0},{name:"Почти безвредный",kills:5,bonus:.05},{name:"Бедняк",kills:10,bonus:.1},{name:"Средний",kills:20,bonus:.15},{name:"Выше среднего",kills:35,bonus:.2},{name:"Компетентный",kills:50,bonus:.25},{name:"Опасный",kills:75,bonus:.3},{name:"Смертельный",kills:100,bonus:.4},{name:"Элита",kills:150,bonus:.5}],N=[{name:"Пират",baseHealth:30,damage:5,speed:1,reward:150,color:"#ff4444",aggression:.8},{name:"Контрабандист",baseHealth:40,damage:8,speed:1.2,reward:200,color:"#ff8800",aggression:.5},{name:"Охотник",baseHealth:50,damage:10,speed:.9,reward:300,color:"#ff00ff",aggression:.9},{name:"Убийца",baseHealth:70,damage:15,speed:1.1,reward:500,color:"#8800ff",aggression:1},{name:"Наёмник",baseHealth:60,damage:12,speed:1,reward:400,color:"#00ff88",aggression:.7}],D=32;function O(e,t){const a={};return k.forEach((n,o)=>{let s=n.basePrice+(t-7)*10+(e-4)*5+(Math.random()-.5)*n.variance;a[o]=Math.max(10,Math.floor(s))}),a}function I(){const e=[],t=new Set;for(let a=0;a<D;a++){let n;do n=H[a%H.length]+(a>=24?"-"+Math.floor(a/24):"");while(t.has(n));t.add(n),e.push({id:a,name:n,government:Math.floor(Math.random()*8),economy:Math.floor(Math.random()*8),techLevel:Math.floor(Math.random()*14)+1,x:(Math.random()-.5)*100,y:(Math.random()-.5)*100,prices:O(Math.floor(Math.random()*8),Math.floor(Math.random()*14)+1)})}return e}function z(e,t){const a=t.x-e.x,n=t.y-e.y;return Math.sqrt(a*a+n*n)}function j(e,t){return Math.ceil(z(e,t)*2)}function P(e,t){return e.find(a=>a.id===t)}function T(e){return{name:e,credits:1e3,rank:0,kills:0,currentShip:"Sidewinder",cargo:{},cargoCapacity:15,fuel:100,maxFuel:100,hull:100,maxHull:100,shields:100,maxShields:100,laser:0,shield:0,hasScoop:!1,visitedSystems:[0]}}function $(e){return Object.values(e.cargo).reduce((t,a)=>t+a,0)}function R(e){return L.find((t,a)=>a===e.rank)||L[0]}const q="eg",Y="ep_";let r={user:null,player:null,galaxy:[],currentSystem:0,docked:!0,inCombat:!1,speed:0,flightTime:0,enemies:[],projectiles:[],stars:[],particles:[],animationId:null,lastUpdate:0,policeLevel:0,missions:[],combatLog:[]};function J(e){const t=I();return r={...r,user:e,player:T(e),galaxy:t,currentSystem:0,docked:!0,inCombat:!1,speed:0,flightTime:0,enemies:[],projectiles:[],stars:[],particles:[],policeLevel:0,missions:[],combatLog:[]},r}function K(e){try{const t=localStorage.getItem(q);t?r.galaxy=JSON.parse(t):r.galaxy=I();const a=localStorage.getItem(Y+e);a?r.player=JSON.parse(a):r.player=T(e),r.user=e,r.currentSystem=r.player.visitedSystems[0]||0,r.galaxy.forEach(n=>{n.prices=O(n.economy,n.techLevel)})}catch(t){console.error("Load error:",t),r.player=T(e),r.galaxy=I()}return r}function m(){if(!(!r.player||!r.user))try{localStorage.setItem(storage_KEY_PLAYER+r.user,JSON.stringify(r.player)),localStorage.setItem(q,JSON.stringify(r.galaxy))}catch(e){console.warn("Save failed:",e)}}function l(){return r}function W(e){const t=P(r.galaxy,r.currentSystem),a=P(r.galaxy,e);if(!t||!a)return{success:!1,error:"Invalid system"};if(e===r.currentSystem)return{success:!1,error:"Already there"};const n=j(t,a);if(r.player.fuel<n)return{success:!1,error:`Need ${n}% fuel`};r.player.fuel-=n,r.player.visitedSystems.includes(e)||r.player.visitedSystems.push(e);const o=Math.random()<.3;return r.currentSystem=e,r.docked=!o,r.inCombat=o,o&&X(),m(),{success:!0,encounter:o,systemName:a.name}}function X(){const e=M();e&&r.galaxy[e.id]?.government;const t=Math.floor(Math.random()*3)+1,a=Math.floor(r.player.rank/2),n=Math.min(5,t+a);r.enemies=[],r.particles=[];for(let o=0;o<n;o++){const s=N[Math.floor(Math.random()*N.length)],i=r.player.rank*5;r.enemies.push({...s,id:o,health:s.baseHealth+i+Math.floor(Math.random()*40),maxHealth:s.baseHealth+i+Math.floor(Math.random()*40),alive:!0,lastAttack:0,x:(Math.random()-.5)*200,y:(Math.random()-.5)*150,vx:(Math.random()-.5)*s.speed,vy:(Math.random()-.5)*s.speed,targetX:0,targetY:0})}r.inCombat=!0,r.docked=!1,r.speed=2,r.projectiles=[],r.lastUpdate=Date.now(),F(`⚠️ АТАКА! ${n} врагов приближаются!`)}function F(e){r.combatLog.push({time:Date.now(),message:e}),r.combatLog.length>50&&r.combatLog.shift()}function U(){r.docked=!0,r.speed=0,r.inCombat=!1,r.enemies=[],r.projectiles=[];const e=y[r.player.shield]?.recharge||.5,t=Math.floor(r.player.maxShields*e);r.player.shields=Math.min(r.player.maxShields,r.player.shields+t),F("⚓ Швартовка на станции"),m()}function M(){return P(r.galaxy,r.currentSystem)}function V(e,t,a){const n=r.player,o=$(n),s=n.cargoCapacity-o;if(s<=0)return{success:!1,error:"No cargo space"};const i=Math.min(t,s),u=a*i;return n.credits<u?{success:!1,error:"Not enough credits"}:(n.credits-=u,n.cargo[e]=(n.cargo[e]||0)+i,m(),{success:!0,quantity:i,cost:u})}function Z(e,t,a){const n=r.player;if(!n.cargo[e]||n.cargo[e]<=0)return{success:!1,error:"No cargo"};const o=Math.min(t,n.cargo[e]),s=a*o;return n.cargo[e]-=o,n.cargo[e]<=0&&delete n.cargo[e],n.credits+=s,m(),{success:!0,quantity:o,revenue:s}}let g="cockpit",E=null,x=null;document.addEventListener("DOMContentLoaded",()=>{te(),Q()});function Q(){const e=localStorage.getItem("ep_");if(e)try{const t=JSON.parse(e);if(t.name){ee(t.name);return}}catch{}A()}function ee(e){if(document.getElementById("auth")){const a=document.getElementById("username");a&&(a.value=e),doLogin()}else A()}function A(){const e=document.getElementById("app");e.innerHTML=`
    <div id="auth">
      <div class="auth-box">
        <h1>ELITE</h1>
        <div class="subtitle">КОСМИЧЕСКАЯ ТОРГОВЛЯ И СРАЖЕНИЯ</div>
        
        <div class="tabs">
          <button class="active" data-tab="login">ВХОД</button>
          <button data-tab="register">РЕГИСТРАЦИЯ</button>
        </div>
        
        <div id="login-form">
          <div class="field">
            <label>ИМЯ ПИЛОТА</label>
            <input type="text" id="username" placeholder="Callsigh" autocomplete="off">
          </div>
          <div class="field">
            <label>ПАРОЛЬ</label>
            <input type="password" id="password" placeholder="Password">
          </div>
          <div class="error" id="login-error"></div>
          <button class="btn btn-primary" onclick="window.doLogin()">ВОЙТИ</button>
        </div>
        
        <div id="register-form" class="hidden">
          <div class="field">
            <label>ИМЯ ПИЛОТА</label>
            <input type="text" id="reg-username" placeholder="Callsigh" autocomplete="off">
          </div>
          <div class="field">
            <label>ПАРОЛЬ</label>
            <input type="password" id="reg-password" placeholder="Password">
          </div>
          <div class="field">
            <label>ПОВТОРИТЕ</label>
            <input type="password" id="reg-password2" placeholder="Confirm">
          </div>
          <div class="error" id="register-error"></div>
          <button class="btn btn-primary" onclick="window.doRegister()">СОЗДАТЬ</button>
        </div>
        
        <button class="btn btn-guest" onclick="window.guestLogin()">
          БЫСТРЫЙ СТАРТ (ГОСТЬ)
        </button>
      </div>
    </div>
  `,document.querySelectorAll(".tabs button").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".tabs button").forEach(n=>n.classList.remove("active")),t.classList.add("active");const a=t.dataset.tab;document.getElementById("login-form").classList.toggle("hidden",a!=="login"),document.getElementById("register-form").classList.toggle("hidden",a!=="register")})}),document.getElementById("password")?.addEventListener("keydown",t=>{t.key==="Enter"&&window.doLogin()})}window.doLogin=function(){const e=document.getElementById("username")?.value.trim(),t=document.getElementById("password")?.value,a=document.getElementById("login-error");if(!e||!t){a.textContent="Заполните все поля";return}const n=JSON.parse(localStorage.getItem("e_u")||"{}");if(!n[e]||n[e]!==t){a.textContent="Неверный пилот или пароль";return}a.textContent="",K(e),G()};window.doRegister=function(){const e=document.getElementById("reg-username")?.value.trim(),t=document.getElementById("reg-password")?.value,a=document.getElementById("reg-password2")?.value,n=document.getElementById("register-error");if(e.length<3){n.textContent="Минимум 3 символа";return}if(t.length<4){n.textContent="Минимум 4 символа";return}if(t!==a){n.textContent="Пароли не совпадают";return}const o=JSON.parse(localStorage.getItem("e_u")||"{}");if(o[e]){n.textContent="Имя занято";return}o[e]=t,localStorage.setItem("e_u",JSON.stringify(o)),n.textContent="",c("Аккаунт создан!","success"),document.querySelector('.tabs button[data-tab="login"]').click(),document.getElementById("username").value=e,document.getElementById("password").value=t};window.guestLogin=function(){const e="Guest_"+Math.floor(Math.random()*9999);J(e),G()};function G(){document.getElementById("auth")?.remove(),ae(),f(g),setInterval(()=>{l().player&&m()},6e4),c("Добро пожаловать, пилот!","success")}function te(){const e=document.getElementById("app");e.innerHTML=""}function ae(){const e=document.getElementById("app"),a=l().player,n=M();e.innerHTML=`
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
            <span class="stat-value">${R(a).name}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Система</span>
            <span class="stat-value">${n?.name||"Unknown"}</span>
          </div>
        </div>
        
        <nav class="nav">
          <button class="${g==="cockpit"?"active":""}" data-panel="cockpit">
            🚀 КАБИНА
          </button>
          <button class="${g==="station"?"active":""}" data-panel="station">
            🛸 СТАНЦИЯ
          </button>
          <button class="${g==="trade"?"active":""}" data-panel="trade">
            📦 РЫНОК
          </button>
          <button class="${g==="galaxy"?"active":""}" data-panel="galaxy">
            🗺️ КАРТА
          </button>
          <button class="${g==="ship"?"active":""}" data-panel="ship">
            🛩️ КОРАБЛЬ
          </button>
          <button class="${g==="rank"?"active":""}" data-panel="rank">
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
  `,document.querySelectorAll(".nav button").forEach(o=>{o.addEventListener("click",()=>{g=o.dataset.panel,document.querySelectorAll(".nav button").forEach(s=>s.classList.remove("active")),o.classList.add("active"),f(g)})})}function f(e){const t=document.getElementById("main-content");if(!t)return;const a=l();a.player;const n=M();switch(e){case"cockpit":t.innerHTML=ne(a,n),se();break;case"station":t.innerHTML=ie(a,n);break;case"trade":t.innerHTML=ce(a,n);break;case"galaxy":t.innerHTML=le(a);break;case"ship":t.innerHTML=de(a);break;case"rank":t.innerHTML=ue(a);break}}function ne(e,t){const a=e.player;return`
    <div class="panel cockpit">
      <div class="panel-header">
        <span class="panel-title">🚀 КОКПИТ</span>
      </div>
      <div class="starfield">
        <canvas id="cockpit-canvas"></canvas>
        <div class="hud-overlay">
          <div class="hud-item">📍 ${t?.name||"?"}</div>
          <div class="hud-item">⏱️ ${e.docked?"СТАНЦИЯ":"ПОЛЁТ"}</div>
        </div>
      </div>
      <div class="cockpit-stats">
        <div class="bar">
          <span>ЭНЕРГИЯ</span>
          <div class="statbar"><i style="width: 100%"></i></div>
        </div>
        <div class="bar">
          <span>ЩИТЫ</span>
          <div class="statbar"><i style="width: ${a.shields}%"></i></div>
        </div>
        <div class="bar">
          <span>КОРПУС</span>
          <div class="statbar"><i style="width: ${a.hull}%"></i></div>
        </div>
        <div class="bar">
          <span>ТОПЛИВО</span>
          <div class="statbar"><i style="width: ${a.fuel}%"></i></div>
        </div>
      </div>
    </div>
    
    <div class="panel controls">
      <div class="panel-header">
        <span class="panel-title">УПРАВЛЕНИЕ</span>
      </div>
      <div class="controls-grid">
        <button class="btn btn-primary" onclick="window.launch()">🚀 ПОЛЁТ</button>
        <button class="btn" onclick="window.dockAtStation()">⚓ ШВАРТОВКА</button>
        <button class="btn btn-danger" onclick="window.startCombat()">⚔️ БОЙ</button>
        <button class="btn" onclick="window.activateScoop()">🔥 СБОРКА</button>
      </div>
    </div>
    
    <div class="panel log">
      <div class="panel-header">
        <span class="panel-title">ЖУРНАЛ</span>
      </div>
      <div class="log-content" id="combat-log"></div>
    </div>
  `}function se(){const e=document.getElementById("cockpit-canvas");if(!e)return;const t=e.parentElement;e.width=t.clientWidth,e.height=t.clientHeight;function a(n){const o=e.getContext("2d"),s=e.width,i=e.height;o.fillStyle="#000",o.fillRect(0,0,s,i);for(let u=0;u<100;u++){const d=Math.random()*s,p=Math.random()*i,S=Math.random()*1.5+.5,h=Math.random()*.7+.3;o.fillStyle=`rgba(200, 220, 255, ${h})`,o.fillRect(d,p,S,S)}x=requestAnimationFrame(a)}x=requestAnimationFrame(a)}window.launch=function(){const e=l();if(e.inCombat){c("Сначала победа в бою!","error");return}e.docked=!1,e.speed=3,e.flightTime=0,c("Запущен двигатель...","info"),b("Двигатели запущены...");const t=document.getElementById("main-content");t&&(t.innerHTML=oe(),re()),setTimeout(()=>{const a=l();if(Math.random()<.3){a.inCombat=!0;const o=Math.floor(Math.random()*3)+1;a.enemies=[];const s=["Пират","Контрабандист","Охотник","Убийца"];for(let i=0;i<o;i++)a.enemies.push({name:s[Math.floor(Math.random()*s.length)],health:30+Math.floor(Math.random()*40),maxHealth:70,damage:5+Math.floor(Math.random()*10),alive:!0});c("⚠️ ВНИМАНИЕ! НАПАЛИ!","error"),b(`⚠️ АТАКА! ${o} врагов!`)}else a.docked=!0,c("Прибытие: "+M()?.name,"success"),b("Прибытие в "+M()?.name);f("cockpit")},2500)};function oe(){return`
    <div class="panel flight">
      <div class="flight-view">
        <canvas id="flight-canvas"></canvas>
        <div class="flight-hud">
          <div class="flight-status">🚀 ПОЛЁТ</div>
          <div class="flight-enemies" id="flight-enemies"></div>
        </div>
      </div>
    </div>
  `}function re(){const e=document.getElementById("flight-canvas");if(!e)return;const t=e.parentElement;e.width=t.clientWidth||600,e.height=t.clientHeight||400;const a=[];for(let s=0;s<150;s++)a.push({x:Math.random()*e.width,y:Math.random()*e.height,z:Math.random()*800+100,speed:Math.random()*3+1});const n=l();function o(){const s=e.getContext("2d"),i=e.width,u=e.height;if(s.fillStyle="#000",s.fillRect(0,0,i,u),s.fillStyle="#aaf",a.forEach(d=>{d.z-=d.speed*2.5,d.z<=0&&(d.z=900,d.x=Math.random()*i,d.y=Math.random()*u);const p=(d.x-i/2)*(400/d.z)+i/2,S=(d.y-u/2)*(400/d.z)+u/2,h=Math.max(.5,(900-d.z)/200),w=Math.min(1,(900-d.z)/250);s.globalAlpha=w,s.fillRect(p,S,h*1.5,h*1.5)}),s.globalAlpha=1,n.docked||n.flightTime>400){const d=i/2,p=u/2-20;s.strokeStyle="#0ff",s.lineWidth=1.5,s.shadowColor="#0ff",s.shadowBlur=8,s.beginPath(),s.ellipse(d,p,80,30,n.flightTime||0,0,Math.PI*2),s.stroke(),s.beginPath(),s.ellipse(d,p,30,12,(n.flightTime||0)*-1,0,Math.PI*2),s.stroke(),s.shadowBlur=0}if(n.inCombat&&n.enemies){const d=document.getElementById("flight-enemies");d&&(d.textContent=`ВРАГИ: ${n.enemies.filter(p=>p.alive).length}`),s.strokeStyle="#f44",s.shadowColor="#f44",s.shadowBlur=5,n.enemies.forEach((p,S)=>{if(!p.alive)return;const h=i/2+Math.sin(Date.now()/500+S*2)*100,w=u/2+Math.cos(Date.now()/400+S*3)*60;s.beginPath(),s.moveTo(h,w-15),s.lineTo(h-10,w+8),s.lineTo(h-5,w+12),s.lineTo(h,w+4),s.lineTo(h+5,w+12),s.lineTo(h+10,w+8),s.closePath(),s.stroke()}),s.shadowBlur=0}n.flightTime=(n.flightTime||0)+.01,x=requestAnimationFrame(o)}o()}window.dockAtStation=function(){U(),c("Швартовка выполнена!","success"),b("Швартовка!"),f("cockpit")};window.startCombat=function(){const e=l();if(e.inCombat){if(e.enemies&&e.enemies.length>0){const t=e.enemies.find(a=>a.alive);if(t){const a=v[e.player.laser].damage;if(t.health-=a,b(`Выстрел! -${a} HP врагу`),t.health<=0){t.alive=!1;const n=100+Math.floor(Math.random()*200);e.player.credits+=n,e.player.kills++,b(`Враг уничтожен! +${n} Cr`),e.enemies.filter(s=>s.alive).length===0&&(c("🏆 ПОБЕДА!","success"),b("ПОБЕДА! Все враги уничтожены!"),e.inCombat=!1,e.docked=!0)}f("cockpit")}}c("ОГОНЬ!","success")}else c("Нужно находиться в полёте!","info"),b("Сначала нужно взлететь")};window.activateScoop=function(){const e=l();if(!e.player.hasScoop){c("Нужен сборщик!","error");return}e.player.fuel=Math.min(e.player.maxFuel,e.player.fuel+25),c("Топливо собрано","success"),b("Сбор топлива.")};function ie(e,t){return e.player,`
    <div class="panel station">
      <div class="panel-header">
        <span class="panel-title">🛸 СТАНЦИЯ — ${t?.name||"?"}</span>
      </div>
      <div class="station-info">
        <p>Правительство: <span class="tag ${C[t?.government||0].color}">${C[t?.government||0].name}</span></p>
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
  `}window.showRepair=function(){const e=l().player,t=e.maxHull-e.hull;if(t<=0){c("Корпус целый!","info");return}const a=t;if(e.credits<a){c("Недостаточно кредитов!","error");return}e.credits-=a,e.hull=e.maxHull,m(),c("Ремонт завершён!","success"),f("cockpit")};window.showRefuel=function(){const e=l().player,t=e.maxFuel-e.fuel;if(t<=0){c("Бак полный!","info");return}const a=Math.ceil(t/10)*5;if(e.credits<a){c("Недостаточно кредитов!","error");return}e.credits-=a,e.fuel=e.maxFuel,m(),c("Заправка завершена!","success"),f("cockpit")};window.showEquip=function(){_("ОБОРУДОВАНИЕ",`
    <div class="equip-section">
      <h4>ЛАЗЕР</h4>
      <p>${v[l().player.laser].name} — ${v[l().player.laser].damage} урон</p>
      ${l().player.laser<v.length-1?`<button class="btn btn-primary" onclick="window.buyLaser()">${v[l().player.laser+1].name} (${v[l().player.laser+1].price} Cr)</button>`:"<p>Максимальный уровень</p>"}
    </div>
    <div class="equip-section">
      <h4>ЩИТ</h4>
      <p>${y[l().player.shield].name} — ур. ${y[l().player.shield].level}</p>
      ${l().player.shield<y.length-1?`<button class="btn btn-primary" onclick="window.buyShield()">${y[l().player.shield+1].name} (${y[l().player.shield+1].price} Cr)</button>`:"<p>Максимальный уровень</p>"}
    </div>
    <div class="equip-section">
      <h4>СБОРЩИК</h4>
      <p>${l().player.hasScoop?"✓ Установлен":"✗ Не установлен"}</p>
      ${l().player.hasScoop?"":'<button class="btn btn-primary" onclick="window.buyScoop()">Купить (5000 Cr)</button>'}
    </div>
    <button class="btn" onclick="window.closeModal()">ЗАКРЫТЬ</button>
  `)};window.buyLaser=function(){const e=l().player;if(e.laser>=v.length-1)return;const t=v[e.laser+1];if(e.credits<t.price){c("Недостаточно кредитов!","error");return}e.credits-=t.price,e.laser++,m(),c("Лазер улучшен!","success"),closeModal()};window.buyShield=function(){const e=l().player;if(e.shield>=y.length-1)return;const t=y[e.shield+1];if(e.credits<t.price){c("Недостаточно кредитов!","error");return}e.credits-=t.price,e.shield++,e.maxShields=50+y[e.shield].level*30,e.shields=e.maxShields,m(),c("Щит улучшен!","success"),closeModal()};window.buyScoop=function(){const e=l().player;if(e.credits<5e3){c("Недостаточно кредитов!","error");return}e.credits-=5e3,e.hasScoop=!0,m(),c("Сборщик куплен!","success"),closeModal()};window.showBar=function(){const e=l(),t=[`Цены на алмазы в ${e.galaxy[(e.currentSystem+1)%32].name} высокие!`,"Пираты в секторе!",`Дешёвая еда в ${e.galaxy[(e.currentSystem+3)%32].name}`,`Артефакты в ${e.galaxy[(e.currentSystem+5)%32].name}!`,`Платина в ${e.galaxy[(e.currentSystem+2)%32].name} x3 цены.`],a=t[Math.floor(Math.random()*t.length)];_("🍺 БАР",`
    <p class="rumor">"${a}"</p>
    <p class="bar-drink">Напиток: 50 Cr (+5 HP)</p>
    <button class="btn btn-primary" onclick="window.buyDrink()">ПИТЬ</button>
    <button class="btn" onclick="window.closeModal()">ВЫЙТИ</button>
  `)};window.buyDrink=function(){const e=l().player;if(e.credits<50){c("Недостаточно кредитов!","error");return}e.credits-=50,e.hull=Math.min(e.maxHull,e.hull+5),m(),c("+5 HP","success"),closeModal()};function ce(e,t){const a=e.player,n=$(a);let o=k.map((s,i)=>{const u=t?.prices[i]||s.basePrice,d=a.cargo[i]||0,p=Math.floor(u*.7);return`
      <tr>
        <td>${s.name}</td>
        <td class="price-buy">${u}</td>
        <td class="price-sell">${p}</td>
        <td>${d}</td>
        <td>
          <button class="btn" onclick="window.buyCommodity(${i}, 1)">+1</button>
          <button class="btn" onclick="window.buyCommodity(${i}, 5)">+5</button>
          <button class="btn btn-danger" onclick="window.sellCommodity(${i}, 1)">-1</button>
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
        <tbody>${o}</tbody>
      </table>
    </div>
  `}window.buyCommodity=function(e,t){const a=l(),n=M(),o=a.player,s=$(o);if(s>=o.cargoCapacity){c("Нет места в трюме!","error");return}const i=n?.prices[e]||k[e].basePrice,u=Math.min(t,o.cargoCapacity-s),d=i*u;if(o.credits<d){c("Недостаточно кредитов!","error");return}const p=V(e,u,i);p.success?(c(`Куплено ${p.quantity} ${k[e].name}`,"success"),f("trade")):c(p.error,"error")};window.sellCommodity=function(e,t){const a=l(),n=M(),o=a.player;if(!o.cargo[e]||o.cargo[e]<=0){c("Нет товара!","error");return}const s=Math.floor((n?.prices[e]||k[e].basePrice)*.7),i=Z(e,t,s);i.success&&(c(`Продано ${i.quantity} за ${i.revenue} Cr`,"success"),f("trade"))};function le(e){const t=e.player,a=M();let n=e.galaxy.map((o,s)=>{const i=Math.sqrt(Math.pow(o.x-a.x,2)+Math.pow(o.y-a.y,2)).toFixed(1),u=Math.ceil(i*2),d=t.fuel>=u,p=s===e.currentSystem;return`
      <div class="card ${p?"current":""}">
        <div class="card-header">
          <span class="card-name">${o.name}</span>
          <span class="card-distance">${i} св.л.</span>
        </div>
        <div class="card-info">
          <p>${C[o.government].name}</p>
          <p>Тех ${o.techLevel}</p>
        </div>
        <div class="card-action">
          ${p?'<span class="current-label">ЗДЕСЬ</span>':`<button class="btn btn-sm" onclick="window.travelTo(${s})" ${d?"":"disabled"}>
              ${d?"ЛЕТЕТЬ":"НЕТ ТОПЛИВА"}
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
  `}window.travelTo=function(e){const t=W(e);t.success?(c(t.encounter?"НАПАЛИ!":`Прибытие в ${t.systemName}`,t.encounter?"error":"success"),t.encounter?f("cockpit"):f("galaxy")):c(t.error,"error")};function de(e){const t=e.player,a=B.find(s=>s.name===t.currentShip)||B[0],n=$(t);let o=Object.entries(t.cargo).filter(([s,i])=>i>0).map(([s,i])=>`<tr><td>${k[s].name}</td><td>${i}</td></tr>`).join("");return`
    <div class="panel ship-info">
      <div class="panel-header">
        <span class="panel-title">🛩️ ${t.currentShip}</span>
      </div>
      <div class="ship-stats">
        <p><strong>Тип:</strong> ${a.description}</p>
        <p><strong>Трюм:</strong> ${n}/${t.cargoCapacity}</p>
        <p><strong>Щиты:</strong> ${t.shields}/${t.maxShields}</p>
        <p><strong>Лазер:</strong> ${v[t.laser].name}</p>
      </div>
    </div>
    
    <div class="panel cargo">
      <div class="panel-header">
        <span class="panel-title">ГРУЗ</span>
      </div>
      ${o?`<table class="table"><tbody>${o}</tbody></table>`:'<p class="empty">Пусто</p>'}
    </div>
  `}function ue(e){const t=e.player,a=R(t);let n=L.map((o,s)=>{const i=s<=t.rank;return`
      <tr class="${s===t.rank?"current":""} ${i?"achieved":""}">
        <td>${o.name}</td>
        <td>${i?"✓":"🔒"} ${o.kills}</td>
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
  `}function c(e,t="info"){const a=document.getElementById("toast-container");if(!a)return;const n=document.createElement("div");n.className=`toast toast-${t}`,n.textContent=e,a.appendChild(n),E&&clearTimeout(E),E=setTimeout(()=>{n.remove()},3e3)}function b(e){const t=document.getElementById("combat-log");if(!t)return;const a=document.createElement("div");a.className="log-entry",a.textContent=`[${new Date().toLocaleTimeString("ru")}] ${e}`,t.appendChild(a),t.scrollTop=t.scrollHeight}function _(e,t){const a=document.getElementById("modal");a&&(a.innerHTML=`
    <div class="dialog">
      <h3>${e}</h3>
      <div class="modal-content">${t}</div>
    </div>
  `,a.classList.remove("hidden"))}window.closeModal=function(){document.getElementById("modal")?.classList.add("hidden")};window.saveGame=function(){m(),c("Сохранено!","success")};window.logout=function(){x&&cancelAnimationFrame(x);const e=l();e.user=null,e.player=null,A()};
