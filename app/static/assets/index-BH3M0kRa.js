import{r as Pe,g as Le,a as Oe,h as ze}from"./react-SqQLNXCU.js";import{W as Fe,S as Be,P as Ue,G as He,T as Ye,a as _e,M as je,b as be,c as $e,A as qe,D as we,d as Ve,C as Ge,e as Je,B as Ke,V as We,L as Xe,f as Qe,g as Ze}from"./three-BE1oDB7r.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();var ea=Pe();const de=Le(ea);var aa=Oe();const ue="/assets/earth.jpg",ce=864e5,Q={heat:{name:"Heatwaves",singular:"heatwave",color:"#ff895d",rgb:"255,137,93",icon:"☀",unit:"°C",definition:"3+ consecutive days above the baseline 95th percentile of daily maximum temperature."},rain:{name:"Heavy rainfall",singular:"heavy-rain event",color:"#74c7ff",rgb:"116,199,255",icon:"☂",unit:"mm",definition:"Consecutive days above the baseline wet-day 95th percentile of daily precipitation."},dry:{name:"Dry spells",singular:"dry spell",color:"#ddc986",rgb:"221,201,134",icon:"◌",unit:"days",definition:"14+ consecutive days with daily precipitation below 1 mm. A drought proxy, not a drought diagnosis."}},ta=[{name:"Andhra Pradesh",cities:[["Visakhapatnam",17.6868,83.2185],["Vijayawada",16.5062,80.648],["Tirupati",13.6288,79.4192],["Kurnool",15.8281,78.0373]]},{name:"Arunachal Pradesh",cities:[["Itanagar",27.0844,93.6053],["Tawang",27.5861,91.8594],["Pasighat",28.0662,95.3267]]},{name:"Assam",cities:[["Guwahati",26.1445,91.7362],["Dibrugarh",27.4728,94.912],["Silchar",24.8333,92.7789],["Jorhat",26.75,94.2167]]},{name:"Bihar",cities:[["Patna",25.5941,85.1376],["Gaya",24.7955,84.9994],["Muzaffarpur",26.1209,85.3647],["Bhagalpur",25.2425,86.9842]]},{name:"Chhattisgarh",cities:[["Raipur",21.2514,81.6296],["Bilaspur",22.0797,82.1409],["Jagdalpur",19.0748,82.008]]},{name:"Goa",cities:[["Panaji",15.4909,73.8278],["Margao",15.2832,73.9862],["Vasco da Gama",15.386,73.844]]},{name:"Gujarat",cities:[["Ahmedabad",23.0225,72.5714],["Surat",21.1702,72.8311],["Vadodara",22.3072,73.1812],["Rajkot",22.3039,70.8022]]},{name:"Haryana",cities:[["Gurugram",28.4595,77.0266],["Faridabad",28.4089,77.3178],["Hisar",29.1492,75.7217],["Ambala",30.3782,76.7767]]},{name:"Himachal Pradesh",cities:[["Shimla",31.1048,77.1734],["Dharamshala",32.219,76.3234],["Manali",32.2396,77.1887],["Mandi",31.708,76.932]]},{name:"Jharkhand",cities:[["Ranchi",23.3441,85.3096],["Jamshedpur",22.8046,86.2029],["Dhanbad",23.7957,86.4304],["Deoghar",24.485,86.6947]]},{name:"Karnataka",cities:[["Bengaluru",12.9716,77.5946],["Mysuru",12.2958,76.6394],["Mangaluru",12.9141,74.856],["Hubballi",15.3647,75.124]]},{name:"Kerala",cities:[["Thiruvananthapuram",8.5241,76.9366],["Kochi",9.9312,76.2673],["Kozhikode",11.2588,75.7804],["Thrissur",10.5276,76.2144]]},{name:"Madhya Pradesh",cities:[["Bhopal",23.2599,77.4126],["Indore",22.7196,75.8577],["Gwalior",26.2183,78.1828],["Jabalpur",23.1815,79.9864]]},{name:"Maharashtra",cities:[["Mumbai",19.076,72.8777],["Pune",18.5204,73.8567],["Nagpur",21.1458,79.0882],["Nashik",19.9975,73.7898]]},{name:"Manipur",cities:[["Imphal",24.817,93.9368],["Churachandpur",24.3333,93.6833],["Thoubal",24.638,94.0106]]},{name:"Meghalaya",cities:[["Shillong",25.5788,91.8933],["Tura",25.5142,90.2022],["Jowai",25.45,92.2]]},{name:"Mizoram",cities:[["Aizawl",23.7271,92.7176],["Lunglei",22.887,92.733],["Champhai",23.474,93.325]]},{name:"Nagaland",cities:[["Kohima",25.6751,94.1086],["Dimapur",25.8629,93.7537],["Mokokchung",26.322,94.517]]},{name:"Odisha",cities:[["Bhubaneswar",20.2961,85.8245],["Cuttack",20.4625,85.883],["Rourkela",22.2604,84.8536],["Sambalpur",21.4669,83.9812]]},{name:"Punjab",cities:[["Ludhiana",30.901,75.8573],["Amritsar",31.634,74.8723],["Jalandhar",31.326,75.576],["Patiala",30.3398,76.3869]]},{name:"Rajasthan",cities:[["Jaipur",26.9124,75.7873],["Jodhpur",26.2389,73.0243],["Udaipur",24.5854,73.7125],["Kota",25.2138,75.8648]]},{name:"Sikkim",cities:[["Gangtok",27.3389,88.6065],["Namchi",27.1667,88.3667],["Gyalshing",27.289,88.265]]},{name:"Tamil Nadu",cities:[["Chennai",13.0827,80.2707],["Coimbatore",11.0168,76.9558],["Madurai",9.9252,78.1198],["Tiruchirappalli",10.7905,78.7047]]},{name:"Telangana",cities:[["Hyderabad",17.3616667,78.4747222],["Warangal",17.9689,79.5941],["Nizamabad",18.6725,78.0941],["Khammam",17.2473,80.1514]]},{name:"Tripura",cities:[["Agartala",23.8315,91.2868],["Udaipur",23.533,91.483],["Dharmanagar",24.3667,92.1667]]},{name:"Uttar Pradesh",cities:[["Lucknow",26.8467,80.9462],["Kanpur",26.4499,80.3319],["Varanasi",25.3176,82.9739],["Agra",27.1767,78.0081],["Prayagraj",25.4358,81.8463]]},{name:"Uttarakhand",cities:[["Dehradun",30.3165,78.0322],["Haridwar",29.9457,78.1642],["Haldwani",29.2183,79.513],["Nainital",29.3919,79.4542]]},{name:"West Bengal",cities:[["Kolkata",22.5726,88.3639],["Siliguri",26.7271,88.3953],["Asansol",23.6739,86.9524],["Darjeeling",27.036,88.2627]]},{name:"Andaman and Nicobar Islands",cities:[["Port Blair (Sri Vijaya Puram)",11.6234,92.7265],["Diglipur",13.25,92.97]]},{name:"Chandigarh",cities:[["Chandigarh",30.7333,76.7794]]},{name:"Dadra and Nagar Haveli and Daman and Diu",cities:[["Silvassa",20.2763,73.0083],["Daman",20.3974,72.8328],["Diu",20.7144,70.9874]]},{name:"Delhi",cities:[["New Delhi",28.6139,77.209],["Delhi",28.6667,77.2167]]},{name:"Jammu and Kashmir",cities:[["Srinagar",34.0837,74.7973],["Jammu",32.7266,74.857],["Anantnag",33.7311,75.1487]]},{name:"Ladakh",cities:[["Leh",34.1526,77.5771],["Kargil",34.5539,76.1349]]},{name:"Lakshadweep",cities:[["Kavaratti",10.5667,72.6417],["Agatti",10.85,72.1833]]},{name:"Puducherry",cities:[["Puducherry",11.9416,79.8083],["Karaikal",10.9254,79.838],["Mahe",11.7,75.533],["Yanam",16.7333,82.2167]]}],G=ta.flatMap(({name:n,cities:t})=>t.map(([i,s,e])=>({country:"India",state:n,city:i,name:`${i}, ${n}, India`,lat:s,lon:e}))),na=[{country:"United Kingdom",state:"England",cities:[["London",51.5072,-.1276]]},{country:"United States",state:"Arizona",cities:[["Phoenix",33.4484,-112.074]]},{country:"Australia",state:"New South Wales",cities:[["Sydney",-33.8688,151.2093]]},{country:"Kenya",state:"Nairobi County",cities:[["Nairobi",-1.2921,36.8219]]}];for(const{country:n,state:t,cities:i}of na)for(const[s,e,r]of i)G.push({country:n,state:t,city:s,name:`${s}, ${t}, ${n}`,lat:e,lon:r});const ia=[...new Set(G.map(n=>n.country))],ra=G.find(n=>n.state==="Telangana"&&n.city==="Hyderabad");function sa(n){return G.find(t=>t.country===n.country&&t.state===n.state&&t.city===n.city)||G.find(t=>t.lat===n.lat&&t.lon===n.lon)||G.find(t=>t.name===n.name)||G.find(t=>`${t.city}, India`===n.name)}function Ne(n,t){return G.filter(i=>i.state===n&&i.country===t)}function Se(n){return G.filter(t=>t.country===n)}function oa(n){return[...new Set(Se(n).map(t=>t.state))]}function la(n,t){const i=n.filter(Number.isFinite).sort((r,o)=>r-o);if(!i.length)return null;const s=(i.length-1)*t,e=Math.floor(s);return i[e]+(i[Math.ceil(s)]-i[e])*(s-e)}function pe(n,t="events"){const i=n.filter(p=>p.valid&&Number.isFinite(p[t]));if(i.length<3)return{slope:null,r2:null,n:i.length};const s=i.reduce((p,k)=>p+k.year,0)/i.length,e=i.reduce((p,k)=>p+k[t],0)/i.length;let r=0,o=0,d=0;i.forEach(p=>{r+=(p.year-s)*(p[t]-e),o+=(p.year-s)**2,d+=(p[t]-e)**2});const b=r/o;return{slope:b,intercept:e-b*s,r2:d?r*r/(o*d):0,n:i.length}}function da(n,t,i=1961){let s=(Math.round((n.lat+90)*1e3)^Math.round((n.lon+180)*1e4))>>>0;const e=()=>(s=Math.imul(s,1664525)+1013904223>>>0,s/4294967296),r=[];let o=0,d=!1;const b=Math.abs(n.lat),p=32-b*.33,k=3+b*.17;for(let $=Date.UTC(Math.min(1961,i),0,1);$<=Date.UTC(Math.max(1990,t),11,31);$+=ce){const A=new Date($),v=A.getUTCFullYear(),y=Math.cos(2*Math.PI*(($-Date.UTC(v,0,1))/ce-172)/365.25)*(n.lat>=0?1:-1);o=o*.85+(e()-.46)*3.4,d=e()<(d?.53:.17);let P=p+k*y+(v-1961)*.034+o,O=d?Math.pow(e(),2)*55*(1+.25*y):e()*.6;const D=e()<.002;r.push({date:A.toISOString().slice(0,10),t:D?null:+P.toFixed(2),p:D?null:+O.toFixed(2)})}return r}function ca(n,t,i=1961){const s=new Map;let e=0,r=0;for(const d of n){if(!d||typeof d.date!="string"||!/^\d{4}-\d{2}-\d{2}$/.test(d.date)||!Number.isFinite(Date.parse(d.date))||new Date(d.date).toISOString().slice(0,10)!==d.date){r++;continue}s.has(d.date)&&e++;const b=typeof d.t=="number"&&Number.isFinite(d.t)&&d.t>=-90&&d.t<=65?d.t:null,p=typeof d.p=="number"&&Number.isFinite(d.p)&&d.p>=0&&d.p<=3e3?d.p:null;s.set(d.date,{date:d.date,t:b,p})}const o=[];for(let d=Date.UTC(Math.min(1961,i),0,1);d<=Date.UTC(Math.max(1990,t),11,31);d+=ce){let b=new Date(d).toISOString().slice(0,10);o.push(s.get(b)||{date:b,t:null,p:null})}return{rows:o,duplicates:e,invalid:r}}function xe(n,t){const{rows:i,duplicates:s,invalid:e}=ca(n,t.end,t.start),r=t.hazard==="heat"?"t":"p",o=i.filter(c=>c.date>="1961-01-01"&&c.date<"1991-01-01"),d=o.map(c=>c[r]).filter(Number.isFinite);if(d.length/o.length<.9)throw Error("Baseline coverage is below 90%. Supply daily data for 1961–1990.");const b=d.filter(c=>c>=1);if(t.hazard==="rain"&&b.length<30)throw Error("Too few wet days in the baseline to estimate a rainfall percentile.");const p=t.hazard==="dry"?1:la(t.hazard==="rain"?b:d,.95),k=t.hazard==="heat"?3:t.hazard==="dry"?14:1,$=[];for(let c=t.start;c<=t.end;c++)$.push({year:c,events:0,days:0,maxDuration:0,peak:null,observed:0,total:(Date.UTC(c+1,0,1)-Date.UTC(c,0,1))/ce,months:Array(12).fill(0)});const A=new Map($.map(c=>[c.year,c])),v=[];let y=[];function P(){if(y.length>=k){const c=+y[0].date.slice(0,4),E=y.filter(T=>A.has(+T.date.slice(0,4)));if(E.length){const T={start:y[0].date,end:y[y.length-1].date,duration:y.length,peak:t.hazard==="dry"?y.length:Math.max(...y.map(g=>g[r])),truncated:y[y.length-1].date===t.end+"-12-31"};v.push(T),A.has(c)&&A.get(c).events++;for(const g of E){const N=A.get(+g.date.slice(0,4));N.days++,N.months[+g.date.slice(5,7)-1]++,N.maxDuration=Math.max(N.maxDuration,y.length),N.peak=Math.max(N.peak??-1/0,T.peak)}}}y=[]}for(const c of i){if(c.date>t.end+"-12-31")break;const E=A.get(+c.date.slice(0,4)),T=c[r];E&&Number.isFinite(T)&&E.observed++,Number.isFinite(T)&&(t.hazard==="dry"?T<p:T>p)?y.push(c):P()}P(),$.forEach(c=>{c.coverage=c.observed/c.total,c.valid=c.coverage>=.9});const O=pe($),D=pe($,"maxDuration"),w=$.filter(c=>c.valid),m=5,M=$.slice(0,m),L=$.slice(-m),C=c=>c.reduce((E,T)=>E+T.events,0)/c.length,h=$.length>=10&&M.every(c=>c.valid)&&L.every(c=>c.valid),x=h?C(M):null,F=h?C(L):null,B=x>0?(F-x)/x*100:null;return{config:t,threshold:p,annual:$,events:v.reverse(),trend:O,durationTrend:D,change:B,comparison:{window:m,first:x,last:F,valid:h},totalEvents:w.reduce((c,E)=>c+E.events,0),totalDays:w.reduce((c,E)=>c+E.days,0),maxDuration:Math.max(0,...w.map(c=>c.maxDuration)),coverage:$.reduce((c,E)=>c+E.observed,0)/$.reduce((c,E)=>c+E.total,0),baselineCoverage:d.length/o.length,duplicates:s,invalid:e,excludedYears:$.filter(c=>!c.valid).map(c=>c.year),rows:i}}async function Ce(){return new Promise((n,t)=>{if(!window.indexedDB){t(Error("Storage unavailable"));return}const i=indexedDB.open("aether-climate-v2",1);i.onupgradeneeded=()=>i.result.createObjectStore("records"),i.onsuccess=()=>n(i.result),i.onerror=()=>t(i.error)})}async function ma(n){try{const t=await Ce();return await new Promise(i=>{const s=t.transaction("records").objectStore("records").get(n);s.onsuccess=()=>{t.close(),i(s.result)},s.onerror=()=>{t.close(),i(null)}})}catch{return null}}async function ua(n,t){try{const i=await Ce();return await new Promise((s,e)=>{const r=i.transaction("records","readwrite");r.objectStore("records").put(t,n),r.oncomplete=s,r.onerror=()=>e(r.error)}),i.close(),!0}catch{return!1}}const{useState:R,useEffect:U,useRef:ee,useMemo:xa}=de,u=ze.bind(de.createElement),Z=new Date().getUTCFullYear()-1,Ee={region:ra,hazard:"heat",start:1990,end:Z,mode:"backend"},_=(n,t=1)=>n==null||!Number.isFinite(n)?"—":Number(n).toLocaleString("en-US",{maximumFractionDigits:t,minimumFractionDigits:t}),he=n=>_(n*100,1)+"%";function ie(n,t,i="text/plain"){const s=URL.createObjectURL(new Blob([t],{type:i})),e=document.createElement("a");e.href=s,e.download=n,e.click(),setTimeout(()=>URL.revokeObjectURL(s),5e3)}function pa(n){return'"'+String(n??"").replaceAll('"','""')+'"'}function me(n){return"\uFEFF"+n.map(t=>t.map(pa).join(",")).join(`\r
`)}function ha(n){const{rows:t,...i}=n;return i}function va({motion:n}){const t=ee(),i=ee({motion:n});return U(()=>{i.current={motion:n}},[n]),U(()=>{const s=t.current;let e,r,o;try{let T=function(g){if(r=requestAnimationFrame(T),document.hidden||!O)return;const N=i.current,J=Math.min((g-h)/1e3,.04);h=g,N.motion&&!w&&(L+=J*.105);const W=L+(N.motion?x*6e-4:0);p.rotation.y+=(W-p.rotation.y)*.065,p.rotation.x+=(C+(N.motion?Math.sin(g*18e-5)*.025:0)-p.rotation.x)*.065,e.render(d,b)};e=new Fe({alpha:!0,antialias:!0,powerPreference:"low-power"}),e.setPixelRatio(Math.min(window.devicePixelRatio,1.6)),e.setClearColor(0,0),s.appendChild(e.domElement),e.domElement.setAttribute("aria-hidden","true");const d=new Be,b=new Ue(35,1,.1,100);b.position.set(0,.1,4.25);const p=new He;d.add(p);const k=new Ye().load(ue);k.colorSpace=_e;const $=new je({map:k,color:10795188,shininess:8,specular:4875882}),A=new be(new $e(1,72,48),$);p.add(A),d.add(new qe(10137275,.36));const v=new we(15134679,2.5);v.position.set(-3,2.5,3),d.add(v);const y=new we(4420730,.5);y.position.set(3,-2,1),d.add(y);const P=new be(new $e(1.025,64,48),new Ve({transparent:!0,side:Ke,blending:Je,depthWrite:!1,uniforms:{glow:{value:new Ge("#6b9ca0")}},vertexShader:"varying vec3 n; varying vec3 v; void main(){ vec4 p=modelViewMatrix*vec4(position,1.0); n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}",fragmentShader:"uniform vec3 glow;varying vec3 n;varying vec3 v;void main(){float i=pow(1.0-abs(dot(n,v)),3.0);gl_FragColor=vec4(glow,i*.52);}"}));p.add(P);for(let g=0;g<3;g++){const N=[];for(let W=0;W<=160;W++){let ae=W/160*Math.PI*2;N.push(new We(Math.cos(ae)*(1.22+g*.12),Math.sin(ae)*(1.22+g*.12),0))}const J=new Xe(new Qe().setFromPoints(N),new Ze({color:g===0?6717039:3690586,transparent:!0,opacity:g===0?.38:.2}));J.rotation.x=1+g*.3,J.rotation.y=.25+g*.4,d.add(J)}let O=!0;const D=new IntersectionObserver(g=>{O=g[0].isIntersecting});D.observe(s);let w=!1,m=0,M=0,L=.08,C=.08,h=0,x=window.scrollY;const F=g=>{w=!0,m=g.clientX,M=g.clientY,s.setPointerCapture(g.pointerId)},B=g=>{w&&(L+=(g.clientX-m)*.005,C=Math.max(-.7,Math.min(.7,C+(g.clientY-M)*.003)),m=g.clientX,M=g.clientY)},c=()=>w=!1,E=()=>x=window.scrollY;return s.addEventListener("pointerdown",F),s.addEventListener("pointermove",B),s.addEventListener("pointerup",c),s.addEventListener("pointercancel",c),window.addEventListener("scroll",E,{passive:!0}),o=new ResizeObserver(()=>{const g=s.clientWidth,N=s.clientHeight;e.setSize(g,N),b.aspect=g/N,b.updateProjectionMatrix()}),o.observe(s),r=requestAnimationFrame(T),()=>{cancelAnimationFrame(r),o.disconnect(),D.disconnect(),window.removeEventListener("scroll",E),s.removeEventListener("pointerdown",F),s.removeEventListener("pointermove",B),s.removeEventListener("pointerup",c),s.removeEventListener("pointercancel",c),d.traverse(g=>{var N;(N=g.geometry)==null||N.dispose(),g.material&&g.material.dispose()}),k.dispose(),e.dispose(),e.domElement.remove()}}catch{return s.style.backgroundImage=`url(${ue})`,s.classList.add("globe-fallback"),()=>{r&&cancelAnimationFrame(r),e==null||e.dispose()}}},[]),u`<div
    className="globe-wrap"
    ref=${t}
    role="img"
    aria-label="Automatically rotating three-dimensional Earth. No interaction is needed. Dragging is optional. Geographic selection is available in the map below."
  />`}function ga({region:n,onSelect:t,hazard:i}){const s=ee(),e=ee(),[r,o]=R(n.lat),[d,b]=R(n.lon),[p,k]=R("");U(()=>{o(n.lat),b(n.lon)},[n]),U(()=>{let v=!0;const y=new Image;y.onload=()=>{e.current=y,v&&O()},y.src=ue;const P=s.current;function O(){P.width=800,P.height=400;const m=P.getContext("2d");m.fillStyle="#0a1219",m.fillRect(0,0,800,400),e.current&&(m.globalAlpha=.48,m.drawImage(e.current,0,0,800,400),m.globalAlpha=1,m.fillStyle="#07131e66",m.fillRect(0,0,800,400)),m.strokeStyle="#738e9728",m.lineWidth=1;for(let C=0;C<800;C+=800/12)m.beginPath(),m.moveTo(C,0),m.lineTo(C,400),m.stroke();for(let C=0;C<400;C+=400/6)m.beginPath(),m.moveTo(0,C),m.lineTo(800,C),m.stroke();let M=(n.lon+180)/360*800,L=(90-n.lat)/180*400;m.strokeStyle=Q[i].color,m.beginPath(),m.arc(M,L,15,0,2*Math.PI),m.stroke(),m.fillStyle=Q[i].color,m.beginPath(),m.arc(M,L,5,0,2*Math.PI),m.fill(),m.strokeStyle="#e3ecd75a",m.beginPath(),m.moveTo(M-25,L),m.lineTo(M+25,L),m.moveTo(M,L-25),m.lineTo(M,L+25),m.stroke()}return O(),()=>v=!1},[n,i]);function $(){const v=Number(r),y=Number(d);if(String(r).trim()===""||String(d).trim()===""||!Number.isFinite(v)||!Number.isFinite(y)||Math.abs(v)>90||Math.abs(y)>180){k("Use latitude −90 to 90 and longitude −180 to 180.");return}k(""),t({name:"Custom location",lat:+v.toFixed(4),lon:+y.toFixed(4)})}function A(v){const y=s.current.getBoundingClientRect();t({name:"Custom location",lat:Math.max(-90,Math.min(90,+(90-(v.clientY-y.top)/y.height*180).toFixed(4))),lon:Math.max(-180,Math.min(180,+((v.clientX-y.left)/y.width*360-180).toFixed(4)))})}return u`<div>
    <canvas
      ref=${s}
      className="mapcanvas"
      onClick=${A}
      aria-label="World map. Click to choose coordinates, or use the latitude and longitude fields below."
      role="img"
    />
    <div className="map-caption">
      <span>POINT SELECTION · EQUIRECTANGULAR</span
      ><span>Click anywhere ↗</span>
    </div>
    <div className="coords">
      <label
        >Latitude<input
          aria-label="Latitude"
          type="number"
          min="-90"
          max="90"
          step="0.0001"
          value=${r}
          onChange=${v=>o(v.target.value)} /></label
      ><label
        >Longitude<input
          aria-label="Longitude"
          type="number"
          min="-180"
          max="180"
          step="0.0001"
          value=${d}
          onChange=${v=>b(v.target.value)} /></label
      ><button className="secondary" onClick=${$}>Set ↗</button>
    </div>
    ${p&&u`<p className="help" role="alert">${p}</p>`}
    <p className="help">
      Selects one reanalysis grid cell near this coordinate. Not a regional area
      average. Globe colour and rings are illustrative, not a hazard map.
    </p>
  </div>`}function ya({result:n,metric:t,setMetric:i,onYear:s}){const[e,r]=R(null);U(()=>r(null),[n,t]);const o=n.annual,d=t==="frequency"?"events":t==="duration"?"maxDuration":"days",b=t==="frequency"?"events":"days",p=pe(o,d),k=680,$=250,A=42,v=18,y=30,P=k-A-12,O=$-v-y,D=Math.max(2,...o.filter(h=>h.valid).map(h=>h[d]))*1.2,w=h=>A+(h+.5)/o.length*P,m=h=>v+O-h/D*O,M=o.map((h,x)=>{const F=o.slice(Math.max(0,x-4),x+1);return F.length===5&&F.every(B=>B.valid)?F.reduce((B,c)=>B+c[d],0)/5:null});let L="",C=!1;return M.forEach((h,x)=>{if(h==null){C=!1;return}L+=`${C?"L":"M"}${w(x)},${m(h)} `,C=!0}),u`<div className="panel panel-pad">
    <div className="panelhead">
      <div>
        <h3>Signals over time</h3>
        <p>Annual ${t} · ${b} · click a year to inspect</p>
      </div>
      <div className="seg" aria-label="Chart metric">
        ${[["frequency","Events"],["duration","Duration"],["days","Days"]].map(([h,x])=>u`<button
              key=${h}
              className=${t===h?"on":""}
              onClick=${()=>i(h)}
              aria-pressed=${t===h}
            >
              ${x}
            </button>`)}
      </div>
    </div>
    <div className="chart">
      <svg
        viewBox=${`0 0 ${k} ${$}`}
        role="img"
        aria-label=${`Annual ${t} from ${n.config.start} through ${n.config.end}. Full values available in annual CSV export.`}
      >
        ${[0,1,2,3,4].map(h=>u`<g key=${h}
              ><line
                x1=${A}
                x2=${k}
                y1=${m(D*h/4)}
                y2=${m(D*h/4)}
                stroke="#26323b"
                strokeDasharray="2 5"
              /><text x="1" y=${m(D*h/4)+4}
                >${_(D*h/4,0)}</text
              ></g
            >`)}${o.map((h,x)=>u`<g
              key=${h.year}
              onMouseEnter=${()=>r(x)}
              onMouseLeave=${()=>r(null)}
              onFocus=${()=>r(x)}
              onBlur=${()=>r(null)}
              onClick=${()=>s(h.year)}
              onKeyDown=${F=>{(F.key==="Enter"||F.key===" ")&&(F.preventDefault(),s(h.year))}}
              role="button"
              tabIndex="0"
              aria-label=${`${h.year}: ${h.valid?h[d]+" "+b:"insufficient coverage"}. Inspect events.`}
              ><rect
                x=${A+x/o.length*P}
                y=${v}
                width=${P/o.length}
                height=${O}
                fill="transparent"
              /><rect
                x=${w(x)-P/o.length*.28}
                y=${h.valid?m(h[d]):m(0)-4}
                width=${Math.max(2,P/o.length*.56)}
                height=${h.valid?Math.max(1,O*h[d]/D):4}
                fill=${h.valid?"var(--accent)":"#65727a"}
                opacity=${e===x?1:.5}
                rx="2"
              />${(x===0||x===o.length-1||h.year%5===0)&&u`<text x=${w(x)} y=${$-7} textAnchor="middle"
                >${h.year}</text
              >`}</g
            >`)}
        <path d=${L} fill="none" stroke="var(--lime)" strokeWidth="2.5" />
        ${p.slope!=null&&u`<line
          x1=${w(0)}
          y1=${m(p.intercept+p.slope*o[0].year)}
          x2=${w(o.length-1)}
          y2=${m(p.intercept+p.slope*o[o.length-1].year)}
          stroke="#89959d"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />`}
      </svg>
      <div className="charttip" aria-live="polite">
        ${e!=null?`${o[e].year} · ${o[e].valid?o[e][d]+" "+b:"excluded: coverage below 90%"} · coverage ${he(o[e].coverage)}`:`${p.slope==null?"Insufficient valid years":(p.slope>=0?"+":"")+_(p.slope*10,2)+" "+b+"/decade"} · OLS R² ${_(p.r2,2)}`}
      </div>
    </div>
    <div className="legend">
      <span>Annual ${t}</span><span>5-year trailing mean</span
      ><span>Linear fit</span>
    </div>
  </div>`}function fa({result:n}){const t=n.annual.slice(-12),i=Math.max(1,...t.flatMap(r=>r.months)),[s,e]=R("Hover or focus a cell to inspect hazard days.");return u`<div className="panel panel-pad">
    <div className="panelhead">
      <div>
        <h3>The seasonal fingerprint</h3>
        <p>Hazard days per month · most recent ${t.length} years</p>
      </div>
      <span className="unit">0 → ${i} days</span>
    </div>
    <div className="calendar">
      <div className="calendar-row">
        <span></span>${"JFMAMJJASOND".split("").map((r,o)=>u`<span key=${o}>${r}</span>`)}
      </div>
      ${t.map(r=>u`<div className="calendar-row" key=${r.year}>
            <span>${r.year}</span>${r.months.map((o,d)=>{const b=`${r.year}-${String(d+1).padStart(2,"0")}: ${o} hazard days${r.valid?"":" · annual coverage below 90%"}`;return u`<div
                key=${d}
                className="calendar-cell"
                tabIndex="0"
                role="img"
                aria-label=${b}
                onMouseEnter=${()=>e(b)}
                onFocus=${()=>e(b)}
                title=${b}
                style=${{background:r.valid?`rgba(${Q[n.config.hazard].rgb},${.06+.85*o/i})`:"#34404a"}}
              />`})}
          </div>`)}
    </div>
    <p className="help" aria-live="polite">${s}</p>
  </div>`}function ba({result:n,year:t,setYear:i}){const[s,e]=R(!1);U(()=>e(!1),[n,t]);const r=n.events.filter(o=>!t||+o.start.slice(0,4)<=t&&+o.end.slice(0,4)>=t);return u`<div className="panel panel-pad">
    <div className="panelhead">
      <div>
        <h3>Event log ${t?"· "+t:""}</h3>
        <p>
          Detected runs · latest first · ${r.length} events overlap the
          period
        </p>
      </div>
      ${t&&u`<button className="textbtn" onClick=${()=>i(null)}>
        Clear ×
      </button>`}
    </div>
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
            <th>Length</th>
            <th>Peak</th>
          </tr>
        </thead>
        <tbody>
          ${r.slice(0,s?r.length:15).map(o=>u`<tr key=${o.start}>
                <td>${o.start}</td>
                <td>${o.end}${o.truncated?"*":""}</td>
                <td>${o.duration} d</td>
                <td>
                  ${_(o.peak,n.config.hazard==="dry"?0:1)}
                  ${Q[n.config.hazard].unit}
                </td>
              </tr>`)}
        </tbody>
      </table>
      ${r.length===0&&u`<div className="empty">
        No qualifying events in this selection.
      </div>`}
    </div>
    ${r.length>15&&u`<button className="textbtn" onClick=${()=>e(!s)}>
      ${s?"Show latest 15":`Show all ${r.length} events`} ↓
    </button>`}
    <p className="help">
      * Run reaches the data boundary; its full duration is unknown. Missing
      days break a run. Low-coverage years remain visible here but are excluded
      from headline totals and trends.
    </p>
  </div>`}function $a(){const[n,t]=R("Observatory"),[i,s]=R(Ee),[e,r]=R({ready:!1,config:Ee,source:"Awaiting analysis",annual:[],events:[],rows:[],trend:{slope:null,r2:null,n:0},durationTrend:{slope:null,r2:null,n:0},threshold:null,change:null,comparison:{valid:!1,window:5,first:null,last:null},totalEvents:0,totalDays:0,maxDuration:0,coverage:0,baselineCoverage:0,duplicates:0,invalid:0,excludedYears:[]}),[o,d]=R(!1),[b,p]=R(""),[k,$]=R(""),[A,v]=R(""),[y,P]=R("frequency"),[O,D]=R(null),[w,m]=R(!window.matchMedia("(prefers-reduced-motion: reduce)").matches),[M,L]=R(null),[C,h]=R(()=>{try{return localStorage.getItem("aether-creator-v2")||"Likhitha Varma Chinta"}catch{return"Likhitha Varma Chinta"}}),[x,F]=R(()=>{try{return JSON.parse(localStorage.getItem("aether-snapshots-v2")||"[]")}catch{return[]}}),B=ee(),c=ee();U(()=>{let a=!0;return fetch("/api/health").then(l=>{if(!l.ok)throw Error();return l.json()}).then(l=>{a&&L(l)}).catch(()=>{a&&$("The Python service is unavailable. Start the application with the included launcher.")}),()=>{a=!1}},[]),U(()=>{if(!w||!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;let a=null,l=0,f=null;const S=".metric,.method-card,.download-item,.primary,.secondary,.hazard-tabs button,.navtabs button",I=()=>{a&&(a.style.setProperty("--rx","0deg"),a.style.setProperty("--ry","0deg"),a.style.setProperty("--mag-x","0px"),a.style.setProperty("--mag-y","0px"),a.removeAttribute("data-lit")),a=null};function H(j){f={target:j.target,x:j.clientX,y:j.clientY},!l&&(l=requestAnimationFrame(()=>{l=0;const z=f.target instanceof Element?f.target.closest(S):null;if(z!==a&&(I(),a=z),!z||z.disabled)return;const K=z.getBoundingClientRect(),X=f.x-K.left,te=f.y-K.top;z.style.setProperty("--pointer-x",X+"px"),z.style.setProperty("--pointer-y",te+"px"),z.style.setProperty("--rx",(.5-te/K.height)*5+"deg"),z.style.setProperty("--ry",(X/K.width-.5)*5+"deg"),z.style.setProperty("--mag-x",(X/K.width-.5)*7+"px"),z.style.setProperty("--mag-y",(te/K.height-.5)*5-2+"px"),z.setAttribute("data-lit","true")}))}function Y(){cancelAnimationFrame(l),l=0,I()}return document.addEventListener("pointermove",H,{passive:!0}),document.documentElement.addEventListener("pointerleave",Y),()=>{cancelAnimationFrame(l),I(),document.removeEventListener("pointermove",H),document.documentElement.removeEventListener("pointerleave",Y)}},[n,w]),U(()=>{if(!w||!("IntersectionObserver"in window))return;const a=new IntersectionObserver(l=>{var f,S;for(const I of l)I.isIntersecting&&((S=(f=I.target).animate)==null||S.call(f,[{opacity:.45,transform:"translateY(16px)"},{opacity:1,transform:"translateY(0)"}],{duration:650,easing:"cubic-bezier(.2,.7,.2,1)"}),a.unobserve(I.target))},{threshold:.07});return document.querySelectorAll(".metric,.panel,.insight,.method-card").forEach(l=>a.observe(l)),()=>a.disconnect()},[n,e,w]);const E=Q[e.config.hazard];U(()=>{document.documentElement.style.setProperty("--accent",E.color),document.documentElement.style.setProperty("--rgb",E.rgb)},[E]),U(()=>{document.body.classList.toggle("motion-off",!w)},[w]),U(()=>{if(!A)return;const a=setTimeout(()=>v(""),4500);return()=>clearTimeout(a)},[A]),U(()=>{function a(){window.matchMedia("(prefers-reduced-motion: reduce)").matches&&m(!1)}const l=window.matchMedia("(prefers-reduced-motion: reduce)");return l.addEventListener("change",a),()=>{var f;l.removeEventListener("change",a),(f=B.current)==null||f.abort()}},[]);function T(a){t(a),window.scrollTo({top:0,behavior:w?"smooth":"auto"})}function g(){t("Explorer"),window.scrollTo({top:0,behavior:w?"smooth":"auto"})}function N(a){s(l=>({...l,...a})),p("")}function J(a){if(!Number.isInteger(a.start)||!Number.isInteger(a.end)||a.start<1940||a.end>Z||a.end-a.start<2||a.start>a.end)throw Error(`Choose at least 3 complete years between 1940 and ${Z}.`);if(!Number.isFinite(a.region.lat)||!Number.isFinite(a.region.lon)||Math.abs(a.region.lat)>90||Math.abs(a.region.lon)>180)throw Error("Enter valid coordinates.")}async function W(a){if(o)return;const l={...i,...a};s(l),p(""),$("");try{if(J(l),l.mode==="import")throw Error("Choose Python analysis or Offline demonstration to run a new analysis.")}catch(I){p(I.message);return}d(!0);const f=new AbortController;B.current=f;const S=setTimeout(()=>f.abort(),135e3);try{let I;if(l.mode==="demo")await new Promise(H=>setTimeout(H,40)),I={...xe(da(l.region,l.end,l.start),l),source:"Synthetic demonstration",fetchedAt:new Date().toISOString()};else{const H=await fetch("/api/analyses",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...l,mode:"backend"}),signal:f.signal}),Y=await H.json().catch(()=>({}));if(!H.ok)throw Error(typeof Y.detail=="string"?Y.detail:`Analysis failed (HTTP ${H.status}).`);const j=await fetch("/api/analyses/"+encodeURIComponent(Y.id),{signal:f.signal});if(!j.ok)throw Error("Database readback failed. Please retry.");I=await j.json(),Y.cached?$("Loaded from the persistent analysis cache."):Y.weatherCached&&$("New analysis computed in Python from cached ERA5 weather.")}if(f.signal.aborted)throw new DOMException("Cancelled","AbortError");r({...I,ready:!0}),D(null),v(l.mode==="demo"?"Demonstration ready · simulated data":"Analysis complete · real ERA5 reanalysis")}catch(I){p(I.name==="AbortError"?"Request cancelled or timed out. Previous results are unchanged.":I.message+" Previous results are unchanged.")}finally{clearTimeout(S),d(!1),B.current=null}}function ae(a){if(!e.ready){v("Run an analysis first.");return}const l=e.config,f=`aether-${l.hazard}-${l.start}-${l.end}-${l.mode}`;a==="json"?ie(f+".json",JSON.stringify(ha(e),null,2),"application/json"):a==="events"?ie(f+"-events.csv",me([["source","location","hazard","start","end","duration_days","peak","peak_unit","boundary_truncated"],...e.events.map(S=>[e.source,l.region.name,l.hazard,S.start,S.end,S.duration,S.peak,E.unit,S.truncated])]),"text/csv"):a==="daily"?ie(f+"-daily.csv",me([["source","date","temperature_2m_max_C","precipitation_sum_mm"],...e.rows.map(S=>[e.source,S.date,S.t,S.p])]),"text/csv"):ie(f+"-annual.csv",me([["source","location","latitude","longitude","hazard","year","event_starts","hazard_days","longest_run_days","coverage","included_in_trend","threshold","baseline"],...e.annual.map(S=>[e.source,l.region.name,l.region.lat,l.region.lon,l.hazard,S.year,S.events,S.days,S.maxDuration,S.coverage,S.valid,e.threshold,"1961-1990"])]),"text/csv"),v("Export downloaded")}async function ve(){if(!e.ready){v("Run an analysis first.");return}if(e.backendId)try{const a=await fetch("/api/analyses/"+e.backendId+"/export/pdf");if(!a.ok)throw Error("PDF export failed.");ie("aether-climate-report.pdf",await a.arrayBuffer(),"application/pdf"),v("PDF report downloaded")}catch(a){v(a.message)}else t("Explorer"),setTimeout(()=>window.print(),300)}async function ge(){if(!e.ready){v("Run an analysis first.");return}const a="report:"+Date.now();if(!await ua(a,e)){v("Browser storage unavailable. Use JSON export instead.");return}const f=[{id:a,name:e.config.region.name,hazard:e.config.hazard,start:e.config.start,end:e.config.end,source:e.source},...x].slice(0,8);F(f);try{localStorage.setItem("aether-snapshots-v2",JSON.stringify(f)),v("Snapshot saved on this device")}catch{v("Snapshot saved for this session only")}}async function Ae(a){const l=await ma(a);if(!l){v("Snapshot no longer available.");return}r({...l,ready:!0}),s(l.config),D(null),T("Explorer")}async function Te(a){const l=a.target.files[0];if(a.target.value="",!!l)try{if(l.size>12*1024*1024)throw Error("Choose a CSV smaller than 12 MB.");const f=await l.text(),S=f.replace(/^\uFEFF/,"").trim().split(/\r?\n/),I=ne=>(ne.match(/(?:"(?:[^"]|"")*"|[^,]*)(?:,|$)/g)||[]).filter((V,oe,le)=>!(oe===le.length-1&&V==="")).map(V=>V.replace(/,$/,"").replace(/^"|"$/g,"").replaceAll('""','"')),H=I(S[0]),Y=H.indexOf("date"),j=H.indexOf("temperature_2m_max_C"),z=H.indexOf("precipitation_sum_mm");if([Y,j,z].some(ne=>ne<0))throw Error("Required columns: date, temperature_2m_max_C, precipitation_sum_mm.");const K=S.slice(1).map(ne=>{var oe,le;const V=I(ne);return{date:V[Y],t:(oe=V[j])!=null&&oe.trim()?Number(V[j]):null,p:(le=V[z])!=null&&le.trim()?Number(V[z]):null}}),X={...i,mode:"import"};J(X);const te={...xe(K,X),source:"User-imported CSV (unverified)",fetchedAt:new Date().toISOString()};r({...te,ready:!0}),s(X),D(null),v("CSV imported and analyzed"),T("Explorer")}catch(f){v(f.message)}}const ke=JSON.stringify(i)!==JSON.stringify(e.config),De=e.change==null?e.comparison.valid&&e.comparison.first===0?"The early comparison window has zero events, so a percentage change is undefined.":"This selection is too short or incomplete for a reliable first-versus-last window comparison.":`Average annual event counts ${e.change>=0?"increased":"decreased"} by ${_(Math.abs(e.change),0)}% between ${e.config.start}–${e.config.start+e.comparison.window-1} and ${e.config.end-e.comparison.window+1}–${e.config.end}.`,Me=u`<span
    className=${"badge "+(e.config.mode==="demo"?"demo":"")}
    >${e.config.mode==="demo"?"◌ SIMULATED DEMO":e.ready?e.config.mode==="import"?"↑ IMPORTED · UNVERIFIED":"● ERA5 REANALYSIS":"○ READY TO EXPLORE"}</span
  >`,q=sa(i.region),re=(q==null?void 0:q.country)||"",se=(q==null?void 0:q.state)||"",Ie=(q==null?void 0:q.city)||"",Re=oa(re),ye=Ne(se,re),fe=u`<section className="workspace" id="explorer">
    <div className="print-only">
      <h1>AETHER · Climate hazard report</h1>
      <p>
        ${e.source} · Generated ${new Date().toLocaleDateString()} ·
        ${e.config.region.name} (${e.config.region.lat},
        ${e.config.region.lon}). Baseline 1961–1990.
        ${e.config.mode==="demo"?"SIMULATED DATA — not observed climate evidence.":""}
      </p>
    </div>
    <div className="sectionhead">
      <div>
        <div className="eyebrow">01 / The climate explorer</div>
        <h2>Find the signal in the change.</h2>
        <p>
          Choose a place. Look back through time. See what the data reveals.
        </p>
      </div>
      ${Me}
    </div>
    <div className="config">
      <label
        >01 · Country<select
          aria-label="Country"
          value=${re}
          onChange=${a=>{const l=Se(a.target.value)[0];l&&N({region:l})}}
        >
          ${ia.map(a=>u`<option key=${a} value=${a}>
                ${a}
              </option>`)}
        </select></label
      ><label
        >02 · State / region<select
          aria-label="State or union territory"
          value=${se}
          onChange=${a=>{const l=Ne(a.target.value,re)[0];l&&N({region:l})}}
        >
          ${Re.map(a=>u`<option key=${a} value=${a}>
                ${a}
              </option>`)}
        </select></label
      ><label
        >03 · Prominent city<select
          aria-label="Prominent city"
          value=${Ie}
          disabled=${!se}
          onChange=${a=>{const l=ye.find(f=>f.city===a.target.value);l&&N({region:l})}}
        >
          ${se?ye.map(a=>u`<option key=${a.city} value=${a.city}>
                    ${a.city}
                  </option>`):u`<option value="">Choose a state first</option>`}
        </select></label
      >
      <div className="dates">
        <label
          >04 · From<input
            type="number"
            min="1940"
            max=${Z-2}
            value=${i.start}
            onChange=${a=>N({start:Number(a.target.value)})} /></label
        ><label
          >To<input
            type="number"
            min="1942"
            max=${Z}
            value=${i.end}
            onChange=${a=>N({end:Number(a.target.value)})}
        /></label>
      </div>
      <label
        >05 · Data source<select
          value=${i.mode}
          onChange=${a=>N({mode:a.target.value})}
        >
          ${i.mode==="import"&&u`<option value="import">Imported CSV</option>`}
          <option value="demo">Offline demonstration</option>
          <option value="backend">Python API · real ERA5</option>
        </select></label
      ><button
        className="primary accent"
        disabled=${o}
        onClick=${()=>W()}
      >
        ${o?"Analyzing…":"Run analysis"} <span>↗</span>
      </button>
      <div className="config-extra">
        <span className="unit"
          >Baseline <span style=${{color:"var(--ink)"}}>1961–1990</span> ·
          Fixed reference period</span
        ><span className="spacer"></span
        ><button className="textbtn" onClick=${()=>T("Methodology")}>
          How we measure ↗</button
        >${o&&u`<button
          className="textbtn"
          onClick=${()=>{var a;return(a=B.current)==null?void 0:a.abort()}}
        >
          Cancel request ×
        </button>`}
      </div>
    </div>
    ${o&&u`<div
      className="progress"
      role="status"
      aria-label="Loading and processing daily weather data"
    />`}
    <div className="hazard-tabs" aria-label="Select hazard">
      ${Object.entries(Q).map(([a,l])=>u`<button
            key=${a}
            disabled=${o}
            aria-pressed=${i.hazard===a}
            className=${i.hazard===a?"selected":""}
            onClick=${()=>{N({hazard:a})}}
          >
            <span>${l.icon}</span>${l.name}
          </button>`)}
    </div>
    ${b&&u`<div className="banner error" role="alert">${b}</div>`}${k&&u`<div className="banner info" role="status">${k}</div>`}${ke&&u`<div className="banner info">
      Selection changed. Run analysis to update the results below.
    </div>`}${e.config.mode==="demo"&&u`<div className="banner">
      Demonstration mode · These weather records are simulated. Switch to Python
      API · real ERA5 and run analysis for historical reanalysis data.
    </div>`}${e.ready?u`<div className="analysis-results">
          <div className="result-state">
            <strong
              >${E.name} / ${e.config.region.name} /
              ${e.config.start}–${e.config.end}</strong
            ><span
              >${e.config.region.lat.toFixed(2)}°,
              ${e.config.region.lon.toFixed(2)}° · ${e.source}</span
            >
          </div>
          <div className="metrics">
            <div className="metric">
              <div className="metric-label">
                Frequency change <span>↗</span>
              </div>
              <div className="metric-value">
                ${e.change==null?"—":(e.change>0?"+":"")+_(e.change,0)}${e.change!=null&&u`<em>%</em>`}
              </div>
              <small
                >First vs last ${e.comparison.window}-year average</small
              >
            </div>
            <div className="metric">
              <div className="metric-label">
                Detected event starts <span>≋</span>
              </div>
              <div className="metric-value">
                ${_(e.totalEvents,0)}<em>events</em>
              </div>
              <small>Across years with ≥90% coverage</small>
            </div>
            <div className="metric">
              <div className="metric-label">
                Longest qualifying run <span>↔</span>
              </div>
              <div className="metric-value">
                ${e.maxDuration}<em>days</em>
              </div>
              <small>Runs can cross calendar boundaries</small>
            </div>
            <div className="metric">
              <div className="metric-label">
                Daily data coverage <span>◉</span>
              </div>
              <div className="metric-value">
                ${_(e.coverage*100,1)}<em>%</em>
              </div>
              <small
                >${e.excludedYears.length} years excluded ·
                ${e.duplicates} duplicates</small
              >
            </div>
          </div>
          <div className="grid-main">
            <${ya}
              result=${e}
              metric=${y}
              setMetric=${P}
              onYear=${D}
            />
            <div className="panel panel-pad">
              <div className="panelhead" style=${{marginBottom:20}}>
                <div>
                  <h3>A place in the bigger picture</h3>
                  <p>${i.region.name} · select the next analysis point</p>
                </div>
                <span style=${{color:"var(--accent)",fontSize:20}}>⊕</span>
              </div>
              <${ga}
                region=${i.region}
                onSelect=${a=>N({region:a})}
                hazard=${e.config.hazard}
              />
            </div>
          </div>
          <div className="insight">
            <div className="symbol">✳</div>
            <div>
              <div
                className="eyebrow"
                style=${{color:"var(--accent)",fontSize:9}}
              >
                Computed insight ·
                ${e.config.mode==="demo"?"simulated":"descriptive analysis"}
              </div>
              <h3>${De}</h3>
              <p>
                <b>${E.name}</b>: ${E.definition} Threshold:
                <b
                  >${_(e.threshold,2)}
                  ${e.config.hazard==="heat"?"°C":"mm/day"}</b
                >.
                ${e.config.mode==="demo"?"This illustrates the method and is not a finding about the selected location.":"This is a descriptive association, not a forecast or proof of climate-change attribution."}
                ${e.config.hazard==="dry"?"Seasonal aridity can also produce long dry spells.":""}
              </p>
            </div>
          </div>
          <div className="grid-bottom">
            <${fa} result=${e} /><${ba}
              result=${e}
              year=${O}
              setYear=${D}
            />
          </div>
          <div className="result-state">
            <span
              >${e.totalDays.toLocaleString()} qualifying days · Fixed
              baseline coverage ${he(e.baselineCoverage)} ·
              ${e.excludedYears.length?"Excluded years: "+e.excludedYears.join(", "):"All analysis years meet coverage threshold"}</span
            >
            <div style=${{display:"flex",gap:15}}>
              <button className="textbtn" onClick=${()=>ae("annual")}>
                ↓ Export CSV</button
              ><button className="textbtn" onClick=${ve}>
                ↓ Print / PDF</button
              ><button className="textbtn" onClick=${ge}>
                ＋ Save snapshot
              </button>
            </div>
          </div>
        </div>`:u`<div className="empty-start panel">
          <span className="empty-orbit">◎</span>
          <div className="eyebrow">YOUR NEXT DISCOVERY STARTS HERE</div>
          <h3>Choose a place. Find its signal.</h3>
          <p>
            Run an analysis to explore real historical weather, interactive
            trends and the events behind them.
          </p>
        </div>`}
  </section>`;return u`<${de.Fragment}><a className="skip" href="#main">Skip to content</a><header className="topbar"><div className="shell navrow"><button className="logo" onClick=${()=>T("Observatory")} aria-label="Aether home"><span className="logomark" aria-hidden="true">✳</span><span>AETHER<small>CLIMATE INTELLIGENCE</small></span></button><nav className="navtabs" aria-label="Main navigation">${["Observatory","Explorer","Methodology","Data & exports","About"].map(a=>u`<button key=${a} className=${n===a?"active":""} aria-current=${n===a?"page":void 0} onClick=${()=>T(a)}>${a}</button>`)}</nav><div className="tools"><span className="live" style=${{fontSize:10,color:"var(--muted)"}}><i className="statusdot"></i>EARTH, IN FOCUS</span><button className="motion-button" aria-label=${w?"Pause animation":"Resume animation"} title=${w?"Pause motion":"Resume motion"} onClick=${()=>m(!w)}>${w?"Ⅱ":"▷"}</button></div></div></header><main id="main" className="shell">${n==="Observatory"&&u`<${de.Fragment}><section className="hero"><div className="hero-copy"><div className="eyebrow">One planet. A million signals.</div><h1 className="kinetic-title"><span className="hero-line"><span>Our planet.</span></span><span className="hero-line"><span>Always</span></span><span className="hero-line"><em>in motion.</em></span></h1><p>Explore the fingerprints of a changing climate. Turn decades of weather into patterns you can see, question, and understand.</p><div className="hero-actions"><button className="primary" onClick=${g}>Explore the data <span>↗</span></button><button className="textbtn" onClick=${()=>T("Methodology")}>Behind the science ↗</button></div></div><${va} motion=${w}/><div className="orbit-label">AETHER OBSERVATORY / 01<br/><br/>${w?"AUTO-ORBIT ACTIVE":"MOTION PAUSED"} · SCROLL TO EXPLORE</div><div className="globe-label"><b>⊙ ${i.region.name.toUpperCase()}</b>${Math.abs(i.region.lat).toFixed(4)}° ${i.region.lat>=0?"N":"S"} / ${Math.abs(i.region.lon).toFixed(4)}° ${i.region.lon>=0?"E":"W"}<br/><span style=${{color:"#81948b",fontSize:9}}>ILLUSTRATIVE EARTH · SELECTED COORDINATE</span></div><div className="hero-foot"><span className="scrollhint"><i></i>SCROLL INTO THE SIGNAL</span><span>HISTORICAL PATTERNS.<br/>BETTER QUESTIONS.</span><span>01 — 05</span></div></section><div className="ticker"><span>BUILT TO MAKE CLIMATE VISIBLE</span><b>ERA5 REANALYSIS</b><b>DAILY RESOLUTION</b><b>TRANSPARENT METHODS</b><span>1940 → ${Z}</span></div>${fe}</React.Fragment>`}${n==="Explorer"&&fe}${n==="Methodology"&&u`<section className="page">
      <div className="page-intro">
        <div className="eyebrow">02 / Behind the signal</div>
        <h1>Good insights start<br />with honest methods.</h1>
        <p>
          Every threshold, missing day, and comparison matters. AETHER uses
          explicit rules you can inspect, reproduce, and challenge. No black-box
          climate claims.
        </p>
      </div>
      <div className="cards3">
        <article className="method-card">
          <div className="step">01 / HEATWAVES</div>
          <h3>When heat persists.</h3>
          <p>
            Compute the 95th percentile of all valid daily maximum temperatures
            in 1961–1990 at the selected point. Count runs of at least three
            days strictly above that fixed threshold.
          </p>
          <div className="formula">Tmax &gt; P95 · run ≥ 3 days</div>
          <p>
            This annual pooled threshold highlights the hottest part of the
            year. It is not a calendar-day percentile or an official heat-health
            alert.
          </p>
        </article>
        <article className="method-card">
          <div className="step">02 / HEAVY RAINFALL</div>
          <h3>When rain intensifies.</h3>
          <p>
            Calculate the 95th percentile of baseline wet days, where daily
            precipitation is at least 1 mm. Consecutive days strictly above that
            threshold form one event.
          </p>
          <div className="formula">P &gt; P95(wet days)</div>
          <p>
            At least 30 baseline wet days are required. Precipitation includes
            rain and snow water equivalent; this is not a river-flood model.
          </p>
        </article>
        <article className="method-card">
          <div className="step">03 / DRY SPELLS</div>
          <h3>When rain stays away.</h3>
          <p>
            Find at least 14 consecutive days with precipitation below 1 mm/day.
            Report run lengths and counts without labelling every dry period a
            drought.
          </p>
          <div className="formula">P &lt; 1 mm · run ≥ 14 days</div>
          <p>
            This screening proxy does not include soil moisture, water demand,
            SPI, or SPEI. Local seasonality is essential context.
          </p>
        </article>
      </div>
      <div className="method-detail">
        <details open>
          <summary>Data quality is part of the result</summary>
          <p>
            Rows are sorted onto a complete daily calendar. Duplicate dates use
            the last supplied record. Invalid dates are discarded; non-numeric
            values, temperatures outside −90 to 65 °C, and precipitation outside
            0 to 3,000 mm/day become missing. These broad plausibility checks
            are not an exhaustive quality-control system. Missing days break
            event runs and are never filled with zero. Both the baseline and
            individual analysis years must have at least 90% coverage for the
            variable in use. Below-threshold years are excluded from totals,
            fits, and rolling means; event logs retain visible partial evidence.
            Even above 90%, missingness can bias counts.
          </p>
        </details>
        <details>
          <summary>What the trend and percentage actually mean</summary>
          <p>
            Ordinary least squares fits annual event starts, annual hazard days,
            or the longest run touching each year. The slope is displayed per
            decade alongside R². The five-year mean uses five consecutive valid
            calendar years. The headline percentage compares mean event starts
            in the first and last five years (at least ten years required). A
            zero initial mean produces no percentage. These are descriptive
            fits, with no significance test, confidence interval, or attribution
            claim. Counts can be noisy and serially correlated.
          </p>
        </details>
        <details>
          <summary>Events across years and incomplete boundaries</summary>
          <p>
            Detection runs continuously from the earlier of 1961 or the selected
            start year through the selected final year. Event starts count only
            in their starting year. Hazard days count in the calendar year in
            which they occur. A run crossing January can contribute its full
            length to both years' longest-run metric; the event log includes any
            run overlapping the analysis window. Runs reaching December 31 of
            the final year are marked as truncated. Seasons and extreme events
            crossing a missing day can be underestimated.
          </p>
        </details>
        <details>
          <summary>A coordinate is not an entire region</summary>
          <p>
            Each selection requests one ERA5 grid cell, approximately 0.25°
            resolution, via Open-Meteo. The provider may return a nearby grid
            coordinate; metadata is retained in JSON. It is reanalysis,
            combining modelling and observations, rather than a weather-station
            record. Whole-state or city-boundary averages would require a
            defined polygon and area-weighted sampling. The globe and map
            identify a location; their colours do not display measured global
            hazards.
            <a
              href="https://open-meteo.com/en/docs/historical-weather-api"
              target="_blank"
              rel="noreferrer"
              >Read the Open-Meteo source documentation ↗</a
            >
          </p>
        </details>
        <details>
          <summary>How the full application works</summary>
          <p>
            The React interface, Three.js globe, charts and animations run in
            your browser. Real historical weather is retrieved by the
            same-origin Python API, analyzed on the server and persisted in a
            NoSQL document store. Local installs use TinyDB; Docker Compose
            includes MongoDB. Offline demonstration and user-imported CSVs use
            the browser detector and remain explicitly labelled. Real API
            results are read from the database, not recomputed in the browser.
          </p>
        </details>
      </div>
      <div className="insight">
        <span className="symbol">↗</span>
        <div>
          <h3>Built for exploration, not emergency decisions.</h3>
          <p>
            Historical hazard patterns are not weather forecasts. Reanalysis
            resolution and these simple definitions cannot replace local
            observations, impact studies, or official warnings.
          </p>
        </div>
      </div>
    </section>`}${n==="Data & exports"&&!e.ready&&u`<section className="page">
      <div className="page-intro">
        <div className="eyebrow">DATA & EXPORTS</div>
        <h1>Your next insight<br />is waiting.</h1>
        <p>
          Run an analysis in Explorer to unlock annual data, event records,
          daily weather and PDF reports.
        </p>
        <button
          className="primary"
          style=${{marginTop:24}}
          onClick=${g}
        >
          Open Explorer ↗
        </button>
      </div>
    </section>`}${n==="Data & exports"&&e.ready&&u`<section className="page">
      <div className="page-intro">
        <div className="eyebrow">03 / Take the signal with you</div>
        <h1>Your data.<br />Beyond the dashboard.</h1>
        <p>
          Export the current analysis and inspect its provenance. Every export
          retains its source label.
        </p>
      </div>
      <div className="data-grid">
        <div>
          <div className="download-list" style=${{marginTop:0}}>
            ${[["Annual summary","Counts, hazard days, duration and coverage.","annual"],["Event catalogue","Start and end dates for every detected run.","events"],["Daily weather","Includes the 1961–1990 reference baseline.","daily"],["Analysis JSON","Parameters, metadata, statistics and events.","json"]].map(([a,l,f])=>u`<div key=${f} className="download-item">
                  <div>
                    <h3>${a}</h3>
                    <p>${l}</p>
                  </div>
                  <button className="secondary" onClick=${()=>ae(f)}>
                    ↓ ${f==="json"?"JSON":"CSV"}
                  </button>
                </div>`)}
            <div className="download-item">
              <div>
                <h3>Printable report</h3>
                <p>
                  Download a report generated by Python. Demonstration and
                  imported reports use browser print.
                </p>
              </div>
              <button className="secondary" onClick=${ve}>
                ↗ PDF
              </button>
            </div>
          </div>
          <div className="panel panel-pad" style=${{marginTop:20}}>
            <h3>Bring your own daily data</h3>
            <p className="help">
              CSV columns: date (YYYY-MM-DD), temperature_2m_max_C,
              precipitation_sum_mm. Include 1961–1990 plus your analysis period.
              Empty values are missing. Set the location and years in Explorer
              before importing. Imported results are labelled unverified.
            </p>
            <input
              type="file"
              accept=".csv,text/csv"
              ref=${c}
              onChange=${Te}
              className="hidden"
            /><button
              className="secondary"
              style=${{marginTop:16}}
              onClick=${()=>c.current.click()}
            >
              ↑ Import daily CSV
            </button>
          </div>
        </div>
        <div>
          <div className="panel panel-pad">
            <h3>Analysis provenance</h3>
            <dl className="metadata">
              <dt>Source</dt>
              <dd>${e.source}</dd>
              <dt>Location</dt>
              <dd>${e.config.region.name}</dd>
              <dt>Requested point</dt>
              <dd>
                ${e.config.region.lat}°, ${e.config.region.lon}°
              </dd>
              <dt>Returned grid</dt>
              <dd>
                ${e.grid?e.grid.lat+"°, "+e.grid.lon+"°":"Not applicable / unavailable"}
              </dd>
              <dt>Analysis window</dt>
              <dd>${e.config.start}–${e.config.end}</dd>
              <dt>Baseline</dt>
              <dd>1961–1990 · fixed</dd>
              <dt>Threshold</dt>
              <dd>
                ${_(e.threshold,3)}
                ${e.config.hazard==="heat"?"°C":"mm/day"}
              </dd>
              <dt>Timezone</dt>
              <dd>${e.timezone||"Date-only synthetic / imported"}</dd>
              <dt>Data retrieved</dt>
              <dd>
                ${e.fetchedAt?new Date(e.fetchedAt).toLocaleString():"Unknown"}
              </dd>
              <dt>Coverage</dt>
              <dd>${he(e.coverage)}</dd>
              <dt>Duplicate dates</dt>
              <dd>${e.duplicates}</dd>
              <dt>Invalid date rows</dt>
              <dd>${e.invalid}</dd>
              <dt>Backend record</dt>
              <dd>${e.backendId||"Browser analysis"}</dd>
            </dl>
            <p className="help">
              Weather data:
              <a href="https://open-meteo.com/" target="_blank" rel="noreferrer"
                >Open-Meteo</a
              >
              / Copernicus ERA5,
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noreferrer"
                >CC BY 4.0</a
              >. Review provider terms before commercial deployment. Earth
              texture: Three.js example asset.
            </p>
          </div>
          <div className="panel panel-pad" style=${{marginTop:20}}>
            <h3>Connected analysis service</h3>
            <p className="help">
              This application sends real weather requests to its Python
              backend. Results and daily weather are stored in the document
              database and read back through the API.
            </p>
            <dl className="metadata">
              <dt>Service</dt>
              <dd>
                ${M?"Online · v"+M.version:"Checking connection"}
              </dd>
              <dt>Database</dt>
              <dd>${(M==null?void 0:M.storage)||"Unavailable"}</dd>
              <dt>Cache</dt>
              <dd>30 days · persistent</dd>
            </dl>
            <a className="textbtn" href="/docs" target="_blank" rel="noreferrer"
              >Explore API documentation ↗</a
            >
          </div>
        </div>
      </div>
      <div className="sectionhead" style=${{marginTop:35}}>
        <div>
          <h3>Saved on this device</h3>
          <p>
            Up to eight snapshots. Browser storage can be cleared; export
            important work.
          </p>
        </div>
        <button className="secondary" onClick=${ge}>
          ＋ Save current analysis
        </button>
      </div>
      ${x.length?u`<div className="cards3">
            ${x.map(a=>{var l;return u`<div className="method-card" key=${a.id}>
                  <div className="step">${a.start}–${a.end}</div>
                  <h3>${a.name}</h3>
                  <p>${(l=Q[a.hazard])==null?void 0:l.name} · ${a.source}</p>
                  <button
                    className="textbtn"
                    style=${{marginTop:20}}
                    onClick=${()=>Ae(a.id)}
                  >
                    Open snapshot ↗
                  </button>
                </div>`})}
          </div>`:u`<div className="panel empty">
            Your saved analyses will appear here.
          </div>`}
    </section>`}${n==="About"&&u`<section className="page">
      <div className="about-layout">
        <div className="page-intro">
          <div className="eyebrow">04 / The person behind the project</div>
          <h1>
            Curiosity, code,<br />and a little<br /><span
              style=${{color:"var(--lime)"}}
              >planetary perspective.</span
            >
          </h1>
          <p>
            Hi, I’m ${C} — a junior software developer interested in AI,
            thoughtful interfaces, and turning complex data into something
            people can understand.
          </p>
          <p style=${{marginTop:20}}>
            I created AETHER to explore a question: how can we make climate
            patterns feel less abstract? This project brings together
            interactive 3D, historical data, and transparent analysis in one
            small observatory.
          </p>
          <div className="tags">
            ${["REACT","PYTHON","MONGODB","THREE.JS","CLIMATE DATA","AI CURIOSITY"].map(a=>u`<span className="tag" key=${a}>${a}</span>`)}
          </div>
          <button className="primary" onClick=${g}>
            Step into the observatory ↗
          </button>
        </div>
        <div className="creator-art" aria-hidden="true">
          <div className="creator-ring"></div>
          <div className="creator-ring"></div>
          <div className="creator-monogram">
            ${C.charAt(0).toUpperCase()}.
          </div>
        </div>
      </div>
      <div className="cards3">
        <div className="method-card">
          <div className="step">THE PURPOSE</div>
          <h3>Make the invisible visible.</h3>
          <p>
            A daily temperature record is one point. Across decades, patterns
            emerge. AETHER is a space to examine those patterns without losing
            sight of what the data can and cannot say.
          </p>
        </div>
        <div className="method-card">
          <div className="step">THE APPROACH</div>
          <h3>Delight with depth.</h3>
          <p>
            Real 3D geometry, scroll-responsive orbiting, accessible motion
            controls, and an analytical workflow. The visual atmosphere sets the
            scene; the measured data tells the story.
          </p>
        </div>
        <div className="method-card">
          <div className="step">MAKE IT YOURS</div>
          <h3>A personal signature.</h3>
          <label style=${{marginTop:15}}>
            <span>Creator name</span>
            <div className="static-creator-name">${C}</div>
          </label>
          <p className="help">
            Updates the author credit on this device. AI is an area of interest;
            the current insights are deterministic statistical summaries, not
            LLM output.
          </p>
        </div>
      </div>
    </section>`}</main><footer className="footer shell"><div><div className="foot-brand">✳ AETHER</div><p>A small observatory for a changing world.</p></div><div><p>Created by <strong>${C}</strong> · Junior Software Developer</p><p>Exploring AI, data, and meaningful digital experiences.</p></div><button onClick=${()=>T("Methodology")}>Built with curiosity. Grounded in data. ↗</button></footer>${A&&u`<div className="toast" role="status">${A}</div>`}</React.Fragment>`}aa.createRoot(document.getElementById("root")).render(u`<${$a} />`);
