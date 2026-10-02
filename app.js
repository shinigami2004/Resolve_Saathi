(() => {
 'use strict';
 const ids=['company','agent','moat','business'];
 const pages=ids.map(id=>document.getElementById(id));
 const nav=[...document.querySelectorAll('nav a')];
 const prev=document.getElementById('previous'),next=document.getElementById('next');
 let current=0,timers=[];
 function stopSequence(){timers.forEach(clearTimeout);timers=[];document.querySelectorAll('.workflow li').forEach(x=>x.classList.remove('running'));document.getElementById('play').textContent='Play sequence';}
 function show(){
  const hash=location.hash.slice(1);
  current=hash.startsWith('ref-')?3:Math.max(0,ids.indexOf(hash));
  pages.forEach((p,i)=>{p.hidden=i!==current;p.classList.toggle('active',i===current)});
  nav.forEach((a,i)=>i===current?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
  document.getElementById('page-count').textContent=`${current+1} / 4`;
  prev.disabled=current===0;next.disabled=current===3;
  document.title=`ResolveSaathi · ${['Company','Agent','Moat','Business'][current]}`;
  stopSequence();
  if(hash.startsWith('ref-')){setTimeout(()=>document.getElementById(hash)?.scrollIntoView({block:'center'}),10)}else{window.scrollTo({top:0,behavior:'instant'})}
 }
 prev.addEventListener('click',()=>{if(current>0)location.hash=ids[current-1]});
 next.addEventListener('click',()=>{if(current<3)location.hash=ids[current+1]});
 window.addEventListener('hashchange',show);
 document.addEventListener('keydown',e=>{if(e.altKey||e.ctrlKey||e.metaKey||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(e.key==='ArrowRight'&&current<3){location.hash=ids[current+1]}if(e.key==='ArrowLeft'&&current>0){location.hash=ids[current-1]}});
 document.getElementById('print').addEventListener('click',()=>window.print());
 const stages=['Illustration: caller verified','Illustration: policy and stock checked','Illustration: shopper confirms the option','Illustration: backend confirms request creation'];
 document.getElementById('play').addEventListener('click',()=>{
  stopSequence();document.getElementById('play').textContent='Replay sequence';
  const nodes=[...document.querySelectorAll('.workflow li')];
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  nodes.forEach((node,i)=>timers.push(setTimeout(()=>{nodes.forEach(n=>n.classList.remove('running'));node.classList.add('running');document.getElementById('sequence-status').textContent=stages[i]},reduced?0:i*1150)));
  timers.push(setTimeout(()=>{document.getElementById('sequence-status').textContent='Illustration complete. Pickup and final exchange still need tracking.';document.getElementById('play').textContent='Replay sequence'},reduced?100:5000));
 });
 show();
})();
